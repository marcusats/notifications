import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import {NavigationContainer, useNavigation} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={"home"} 
        component={HomeScreen}
        options={{ headerShown: false }}

        />
        <Stack.Screen name={"notificationScreen"} component={NotificationScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});