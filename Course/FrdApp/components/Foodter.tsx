import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import MyCourse from './MyCourse';
import UserInfo from './UserInfo';
import AboutUs from './AboutUs';


const Foodter = () => {
  const Tab = createBottomTabNavigator();
  return (
    
    <Tab.Navigator screenOptions={{
      // tabBarStyle: { 
      //   backgroundColor:'#E0D5D3',
      // },
    }}
    initialRouteName='Home' >
      <Tab.Screen
        name="Home"
        component={Home}
        
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="我的課程"
        component={MyCourse}
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
        name="個人資料"
        component={UserInfo}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Foodter;
