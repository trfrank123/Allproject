import React, {useState, useEffect } from 'react';
import {StackParams} from '../App';
import {Button, Text, View, StyleSheet, TouchableOpacity, ImageBackground, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../src/redux/reducers';
import { getIdentity, updateUserInfo } from '../src/redux';

const Identity = () => {
  const navigate = useNavigation<NativeStackNavigationProp<StackParams>>();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.userInfo)
  const { identity } = useSelector((state: RootState) => state.identity)
  
  useEffect(() => {
  dispatch(getIdentity())
}, [])
  
  // const createButtonAlert = () => 
  //     Alert.alert(
  //       "🧐你好似有啲野未揀好",
  //       "乖乖地揀左佢 好快就填完🥳",
  //       [
  //         { text: "OK", onPress: () => console.log("Cancel Pressed")}
  //       ]
  //     );

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../src/img/IMG_0201.jpg')} style={styles.image}>

      <View style={styles.statusContainer}>
        <Text style={styles.tittle}>你的目前狀態(可選填)</Text>
        <Text style={styles.identity}>{userInfo.identity.identity}</Text>
        {
          identity.map((id: any) => {
            return (
              <TouchableOpacity
              key={id.identity}
              onPress={async () => {
                dispatch(updateUserInfo({"identity": {
                  id:id.id,
                  identity:id.identity
                }}))
                // console.log(userInfo);
                
                // navigate.navigate('Education');

          }}
          style={styles.button}>
          <Text style={styles.text}>{id.identity}</Text>
        </TouchableOpacity>
            )
          }
          )
}
      </View>

      <View style={styles.next}>
        <Button
          title="下一題"
          onPress={async () => {
            // if (userInfo.identity.identity.trim()){
              navigate.navigate('Education')
            // } else {
              // createButtonAlert()
            // }
          }}></Button>
      </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  caption: {
    top: 100,
    position: 'absolute',
    color: 'rgba(155,155,155,1)',
    fontSize: 22,
  },
  button: {
    height: 44,
    width: 140,
    margin: 20,
    backgroundColor: 'rgba(212,237,233,1)',
    borderRadius: 50,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  statusContainer: {
    fontSize: 17,
    display: "flex",
    alignItems:"center",
  },
  next: {
    position: "absolute",
    bottom: 50,
    width:'100%',
    textAlign: 'center'
  },
  text: {
    color: "#003f5c",
    fontSize: 17,
  },
  identity:{
    fontSize:17,
    margin:20,
    fontWeight:"bold",
    color:'#003f5c'
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
    justifyContent: "center",
    alignSelf: 'stretch'
  },
  tittle:{
    color: "#121212",
    fontSize: 17,
    margin:15,
    alignItems:"center",
    justifyContent: "center",
  }
});

export default Identity;
