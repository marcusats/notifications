import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Platform ,TouchableOpacity} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';


export default function NotificationScreen({route, navigation}) {
    const [notification, setNotification] = useState(true);

    const { title } = route.params;
    const { body } = route.params;
    const {data} = route.params;

    const sendTo = async () => {
      console.log(data)
      fetch(`https://93de-2603-7000-4603-cbd-68f8-fa81-2179-e6c8.ngrok.io/did?id=123`,{method: "GET",})
      .then((response) => response.json()).then((resJ) => console.log(resJ)).catch((err) => console.log(err));
  
    }


    return (
      <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around', 
      }}
    >
      <TouchableOpacity
        onPress={() => sendTo()}
        style={{ backgroundColor: 'green', borderRadius: 2.5}}>
        <Text style={{ fontSize: 20, color: '#fff' }}>YES</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => alert('Hello, world!')}
        style={{ backgroundColor: 'red', borderRadius: 2.5}}>
        <Text style={{ fontSize: 20, color: '#fff' }}>NO</Text>
      </TouchableOpacity>

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && title} </Text>
        <Text>Body: {notification && body}</Text>
        <Text>Data: {notification && data}</Text>
      </View>
    </View>
    );
}
  