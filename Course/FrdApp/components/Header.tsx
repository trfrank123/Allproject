import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParams} from '../App';
import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

const Header = () => {
  const navigate = useNavigation<NativeStackNavigationProp<StackParams>>();
  return (
    <ImageBackground source={require('../src/img/IMG_0202.jpg')}>
      <View style={styles.container2}>
        
       <View style={styles.button}>
      <TouchableOpacity
            onPress={async () => {
              navigate.navigate('Foodter');
            }}>
              <Image
            style={styles.tinyLogo}
            source={require('../iconFile/1.png')}
            /> 
            <Text>熱門課程</Text>
        </TouchableOpacity>
        </View>

        <View style={styles.button}>
        <TouchableOpacity
            onPress={async () => {
              navigate.navigate('Hobby');
            }}>
              <Image
            style={styles.tinyLogo}
            source={require('../iconFile/2.png')}
            /> 
            <Text>配對課程</Text>
        </TouchableOpacity>
        </View>


        <View style={styles.button}>
        <TouchableOpacity
            onPress={async () => {
              navigate.navigate('Data');
            }}>
              <Image
            style={styles.tinyLogo}
            source={require('../iconFile/3.png')}
            /> 
            <Text>相關資料</Text>
        </TouchableOpacity>
        </View>

       <View style={styles.button}>
            <TouchableOpacity
            onPress={async () => {
              navigate.navigate('AllCourse');
            }}>
              <Image
            style={styles.tinyLogo}
            source={require('../iconFile/4.png')}
            /> 
            <Text>全部課程</Text>
        </TouchableOpacity>
        </View>
        </View>
    </ImageBackground>
    
  );
};
const styles = StyleSheet.create({
  container2: {
    flexDirection: 'row',  
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  button:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
export default Header;
