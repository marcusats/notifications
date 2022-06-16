import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });



export default function HomeScreen({navigation}) {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    
    const lastNotificationResponse = Notifications.useLastNotificationResponse();
    
    const send = (notification) => {
        navigation.navigate("notificationScreen", {
            title: notification.request.content.title,
            body: notification.request.content.body,
            data: JSON.stringify(notification.request.content.data),
        })
    }
    
    
    useEffect(() => { 
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        send(notification);
        setNotification(notification);
      });
      
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response.notification.request.content);
        send(response.notification);
      });
      


      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);

   


  return (
    <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
    }}
    >
      <Text>Home Screen</Text>
      <Button
      title='Go'
      />
    </View>
  );
}




async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}