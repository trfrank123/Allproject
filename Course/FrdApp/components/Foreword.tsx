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
  ImageBackground
} from 'react-native';

function Foreword(props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setTimeout(() => {
      setCount(count + 1)
      props.navigation.navigate("UserName")
    }, 3000);
    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <View style={styles.container}>
        <ImageBackground source={require('../src/img/IMG_0201.jpg')} style={styles.image}>
        <View style={styles.center}>
          <Text style={styles.text}>
            現在誠心邀請你填寫個人資料{"\n"}
            {"\n"}大約會花費你3分鐘時間
          </Text>
          <Text style={styles.caption2}>
            填完個人資料後會幫你配對相似的課程
          </Text>
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
    color: "rgba(0,0,0,1)",
    fontSize: 22,

  },
  caption2: {
    color: "rgba(0,0,0,0.8)",
    fontSize: 17,
    margin:50
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
    justifyContent: "center",
    alignSelf: 'stretch'
  },
  center:{
    alignItems:"center",
    height:400,

  },
  text: {
    color: "rgba(0,0,0,1)",
    fontSize: 22,
  },
});

export default Foreword;
