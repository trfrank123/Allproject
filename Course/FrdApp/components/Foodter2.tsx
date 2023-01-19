import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home2 from './Home2';
import Become from './Become';
import AboutUs from './AboutUs';


const Foodter2 = () => {
  const Tab = createBottomTabNavigator();
  return (
    
    <Tab.Navigator screenOptions={{
    }}
    initialRouteName='Home2' >
      <Tab.Screen
        name="Home"
        component={Home2}
        
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="關於"
        component={AboutUs}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="註冊和登入"
        component={Become}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Foodter2;