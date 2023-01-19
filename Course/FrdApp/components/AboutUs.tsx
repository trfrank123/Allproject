import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import {StackParams} from '../App';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  Linking,
  ImageBackground
} from 'react-native';

function AboutUs(props) {

  return (
    <View style={styles.container}>
        <ImageBackground source={require('../src/img/IMG_0201.jpg')} style={styles.image}>
        <View style={styles.center}>
        <Text style={styles.caption}>關於我們</Text>
        
      <Text style={styles.caption2}>
        電郵:
      </Text>
      <Button onPress={() => Linking.openURL('mailto:hello@tecky.io?subject=我有啲嘢想同你講&body=意見如下') }
      title="📨 hello@tecky.io" />


      <Text style={styles.caption2}>
        電話:
      </Text>
      <Button onPress={() => Linking.openURL(`tel:97256400`) }
      title="📞 9725 6400" />
      </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
  },
  caption: {
    top: -150,
    position: "absolute",
    fontSize: 22,
    color: "#003f5c",
    fontWeight: "bold",
  },
  caption2: {
    margin:20,
    fontSize: 17,
    color: "#003f5c",
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
    justifyContent: "center",
    alignSelf: 'stretch'
  },
  center:{
    justifyContent: "center",
    alignItems:"center",
  }
});

export default AboutUs;
