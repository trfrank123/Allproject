import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState, useEffect } from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Platform, Image} from 'react-native';
import { StackParams } from '../App';
import { launchImageLibrary } from 'react-native-image-picker';

import { useSelector } from "react-redux";
import { IRootState } from "../src/redux/store"
import { RootState } from '../src/redux';

const SERVER_URL = 'http://https://www.forcourse.me';

interface state{
    icon: String;
  }


const createFormData = (photo, body = {}) => {
    const data = new FormData();
    const formValuseListener = useSelector((state:RootState) => state)
    console.log(formValuseListener)
    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
    console.log(data)
    return data;
  };
  
  
  const UploadIcon = () => {
    const dispatch = useDispatch();
    const navigate = useNavigation<NativeStackNavigationProp<StackParams>>();

    const [photo, setPhoto] = React.useState(null);

    const handleChoosePhoto = () => {
      launchImageLibrary({ noData: true }, (response) => {
        // console.log(response.assets[0]);
        if (response) {
          setPhoto(response.assets[0]);
        }
      });
    };
  
    const handleUploadPhoto = () => {
      
      fetch(`${SERVER_URL}/upload`, {
        method: 'POST',
        body: createFormData(photo),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log('response', response);
        })
        .catch((error) => {
          console.log('error', error);
        });
        dispatch(updateUserInfo({'icon':photo.fileName }))
        navigate.navigate('UserInfo')
    };
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>最後一步啦</Text>
        <Text>上傳你嘅頭像啦</Text>
        {photo && (
          <>
            <Image
              source={{ uri: photo.uri }}
              style={{ width: 300, height: 300 }}
            />
            <Button title="Upload Photo" onPress={handleUploadPhoto} />
          </>
        )}
        <Button title="Choose Photo" onPress={handleChoosePhoto} />
      </View>
    );
  };
  


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems:"center",
    }, 
    caption: {
      top: 100,
      position: "absolute",
      color: "rgba(155,155,155,1)",
      fontSize: 22
  },
    statusContainer:{
      fontSize:17,
      margin:20
    },
    button:{
      height: 44,
      width: 200,
      margin: 10,
      backgroundColor: "rgba(212,237,233,1)",
      borderRadius: 50,
      paddingLeft: 16,
      paddingRight: 16,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    next:{
      position: "absolute",
      bottom: 20
    },
    text: {
      color: "#121212",
      fontSize: 17,
    },
    educationContainer: {
      flexDirection: "row",
    },
    education:{
      fontSize:17,
      margin:20,
      fontWeight:"bold",
      color:'#64CCBB'
    },
    });
  
    export default UploadIcon;