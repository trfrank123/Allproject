import React, { useRef, useState, useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {StackParams} from '../App';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground
} from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../src/redux/reducers';
import { getAgeRange, updateUserInfo } from '../src/redux';

function UserName(){
const navigate = useNavigation<NativeStackNavigationProp<StackParams>>();


const dispatch = useDispatch();
useEffect(() => {
  dispatch(getAgeRange())
}, [])
const { age_range } = useSelector((state: RootState) => state.age)
const { userInfo } = useSelector((state:RootState) => state.userInfo)
// console.log(userInfo);

const handleChangeName = (name:string) => {
  dispatch(updateUserInfo({'username': name}))
}

const handleChangePassword = (password:string) => {
  dispatch(updateUserInfo({'password': password}))
}

const handleChangeConfirmPassword = (confirmPassword:string) => {
  dispatch(updateUserInfo({'confirm_password': confirmPassword}))
}

const handleChangeEmail = (email:string) => {
  dispatch(updateUserInfo({'email': email}))
}

const createButtonAlert = () => 
      Alert.alert(
        "🧐名同密碼未填好",
        "乖乖地填咗佢 好快就填完🥳",
        [
          { text: "OK", onPress: () => console.log("Cancel Pressed")}
        ]
      );

let ageRange = age_range.map((range:any) => {    
  return {
      label: range.age_range,
      value: range.age_range
  }
 })

let gender = '';
userInfo.gender == "M" ? gender = '🙋‍♂️' : userInfo.gender == "F" ? gender = '🙋‍♀️' : "";



return(

  <View style={styles.container}>
     <ImageBackground source={require('../src/img/IMG_0201.jpg')} style={styles.image}>
    <View style={styles.nameContainer}>
      <Text style={styles.gender}>請輸入以下個人資料</Text>
      <Text style={styles.must}>以下為必填</Text>
        <TextInput
          maxLength={60}
          placeholder="*你的名稱"
          placeholderTextColor="#003f5c"
          style={styles.name}
          onChangeText={handleChangeName}
          value={userInfo.username}
          
        ></TextInput>

        <TextInput
        secureTextEntry
          maxLength={60}
          placeholder="*密碼"
          placeholderTextColor="#003f5c"
          style={styles.name}
          onChangeText={handleChangePassword}
          value={userInfo.password}
        ></TextInput>

        <TextInput
        secureTextEntry
          maxLength={60}
          placeholder="*再次輸入密碼"
          placeholderTextColor="#003f5c"
          style={styles.name}
          onChangeText={handleChangeConfirmPassword}
          value={userInfo.confirm_password}
        ></TextInput>

        <TextInput
          maxLength={255}
          placeholder="電郵"
          placeholderTextColor="#003f5c"
          style={styles.name}
          onChangeText={handleChangeEmail}
          value={userInfo.email}
        ></TextInput>
    </View>

    <View style={styles.genderContainer}>
      <Text style={styles.gender}>性別(可選填)</Text>
      <Text>{gender}</Text>
    </View>
      
    <View style={styles.buttonContainer}>
      <View>
        <TouchableOpacity
          onPress={() => {
            dispatch(updateUserInfo({'gender':'M'}))

          }}
          style={styles.button}
          >
          <Text style={styles.text}>男</Text>
        </TouchableOpacity>
      </View>

    <View>
      <TouchableOpacity
        onPress={() => {
          dispatch(updateUserInfo({'gender':'F'}))

        }}
        style={styles.button}
        >
        <Text style={styles.text}>女</Text>
      </TouchableOpacity>
    </View>
  </View>
        
        <View style={styles.genderContainer}>
      <Text style={styles.gender}>年齡範圍(可選填)</Text>

      <View style={styles.picker}>
        <RNPickerSelect 
        style={pickerStyle}
        onValueChange={(value, index) => {
            dispatch(updateUserInfo({'age':{id: index, age_range:value}}))
        }}
        items={ageRange}
        placeholder={{
            label: "入嚟揀"
        }}
        
        />
      </View>
      </View>

      <View style={styles.next}>
          <Button title="下一題" 
          onPress={async() => {
          if (userInfo.username.trim() 
            && userInfo.password.trim() 
            && userInfo.password == userInfo.confirm_password 
            ){
              let res = await fetch("https://www.forcourse.me/user/checkUsernameHasBeenUsed", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: userInfo.username}),
              })
              let resJson = await res.json();

              if (resJson) {
                Alert.alert(
                  "🧐個名用咗啦",
                  "重新輸入啦",
                  [
                    { text: "OK"}
                  ]
                );
              } else {
                // console.log('pass')
                navigate.navigate('Identity')
              }
          } else {
            createButtonAlert()
          }
          
        }}
          ></Button>
      </View>
      </ImageBackground>
  </View>
  )
}

const pickerStyle = {
  inputIOS: {
      color: '#003f5c',
      fontSize: 17,
      margin:20,
      justifyContent: "center",
      alignItems: "center",
      textAlign:"center",
  },
  placeholder: {
    color: "#003f5c",
      fontSize: 17,
      fontWeight: "bold",
      alignItems:"center",
      justifyContent: "center",
    },
  inputAndroid: {
      color: 'white',
      paddingHorizontal: 10,
      backgroundColor: 'red',
      borderRadius: 5,
  },
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
  },
  nameContainer :{
    display: "flex",
    alignItems:"center",
  },
  name: {
    backgroundColor: "rgba(212,237,233,1)",
    height: 50,
    width: 200,
    margin:5,
    padding:15,
    fontSize:16,
    borderRadius: 50,
  },
  button:{
    height: 44,
    width: 98,
    margin: 20,
    backgroundColor: "rgba(212,237,233,1)",
    borderRadius: 50,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  genderContainer:{
    justifyContent: "center",
    alignItems:"center",

  },
  gender: {
    color: "#121212",
    fontSize: 17,
    margin:15,
    alignItems:"center",
    justifyContent: "center",
  },
  text: {
    color: "#003f5c",
    fontSize: 17,
  },
  buttonContainer: {
    flexDirection:"row",
    justifyContent: "center"
  },
  next:{
    position: "absolute",
    bottom: 20,
    width:'100%',
    textAlign: 'center'
  },
  picker:{
    width:120,
    height: 50,
    margin: 10,
    borderRadius: 50,
    backgroundColor: "rgba(212,237,233,1)",
  },
  must:{
    fontSize:12,
    color:"blue"
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
    justifyContent: "center",
    alignSelf: 'stretch'
  },

});


export default UserName;