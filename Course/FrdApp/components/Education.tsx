import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState, useEffect } from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ImageBackground} from 'react-native';
import { StackParams } from '../App';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../src/redux/reducers';
import { getEducation, updateUserInfo } from '../src/redux';

const Education = () => {
  const dispatch = useDispatch();
  const { education } = useSelector((state: RootState) => state.educations)
  const { userInfo } = useSelector((state: RootState) => state.userInfo)
  const navigate = useNavigation<NativeStackNavigationProp<StackParams>>();

  useEffect(() => {
    dispatch(getEducation())
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
        <Text style={styles.tittle}>你的學歷是(可選填)</Text>
        <Text style={styles.education}>{userInfo.education.education_level}</Text>

        { 
          education.map((education: any) => {
            return (
              <TouchableOpacity
                key={education.id}
                onPress={async () => {
                  dispatch(updateUserInfo({"education": {
                    id: education.id,
                    education_level: education.education_level
                  }}))
                }}
                style={styles.button}
              >
                <Text style={styles.text}>{education.education_level}</Text>
              </TouchableOpacity>
            )
          }) 
        }
      
      </View>

      <View style={styles.next}>
        <Button 
        title="下一題" 
        onPress={async () => {
          // if (userInfo.education.education_level.trim()) {
            navigate.navigate('ExpectSalaryAndWorkLocation')
          // } else {
          //   createButtonAlert()
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
    fontSize: 17,
    display: "flex",
    alignItems:"center",
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
    bottom: 50,
    width:'100%',
    textAlign: 'center'
  },
  text: {
    color: "#003f5c",
    fontSize: 17,
  },

  education:{
    fontSize:17,
    margin:20,
    fontWeight:"bold",
    color:'#003f5c',
    textAlign:"center",
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

  export default Education;