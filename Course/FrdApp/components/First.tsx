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
  ImageBackground,
  Image
} from 'react-native';

function First(props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = this.setTimeout(() => {
      setCount(count + 1)
      props.navigation.navigate("Become")
    }, 2000);
    return () => {
      clearInterval(this._interval);
    }
  }, []);

  return (
    <View style={styles.container}>
        <ImageBackground source={require('../src/img/IMG_0201.jpg')} style={styles.image}>
        <View style={styles.center}>
        <Image style={styles.logo} source={require('../iconFile/img4.gif')}/>
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
  image: {
    flex: 1,
    resizeMode: "stretch",
    justifyContent: "center",
    alignSelf: 'stretch'
  },
  center:{
    alignItems:"center",
    height:700,
  },
  text: {
    color: "rgba(0,0,0,1)",
    fontSize: 22,
  },
  logo:{
    width: 500,
    height: 500,
  }
});

export default First;
