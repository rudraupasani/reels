import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Profile from './componets/Profile';

import Welcome from './componets/Welcome';
import Register from './componets/Register';
import Reels from './componets/Reels';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Custom Plus Icon Component for TikTok-style center button
const PlusIcon = ({ focused }) => (
  <View
    style={{
      width: 80,
      height: 45,
      backgroundColor: focused ? '#ff0050' : '#fe2c55',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:20
    }}
  >
    <Icon name="add" size={24} color="white" />
  </View>
);

// Auth Stack for Login/Register
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Welcome} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

// Main Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopWidth: 0,
          height: 60,
          position:'absolute',
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      
      <Tab.Screen
        name="Discover"
        component={Reels} // Replace with your Discover component
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Icon 
              name="play-circle-outline" 
              size={focused ? 28 : 24} 
              color={color} 
            />
          ),
          tabBarLabel: 'Reels',
        }}
      />
      
      <Tab.Screen
        name="Reels"
        component={Reels}
        options={{
          tabBarIcon: ({ focused }) => <PlusIcon focused={focused} />,
          tabBarLabel: '',
        }}
      />
            
      <Tab.Screen
        name="Profile"
        component={Profile} // Replace with your Profile component
        options={{
          tabBarIcon: ({ color, size, focused , marginTop }) => (
            <Icon 
              name="person" 
              size={focused ? 28 : 24} 
              color={color} 
            />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MainTabs">
          <Stack.Screen name="AuthStack" component={AuthStack} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}