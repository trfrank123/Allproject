import React, { useRef, useState, Component, useEffect } from 'react';
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
  Image,
  ImageBackground,
  Alert
} from 'react-native';

import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../src/redux/reducers';
import { getUserInfo, getAgeRange, getIdentity, getEducation, getWorkExperience, getJobFunctions, getBudgetForCourse, updateUserInfo, uploadUserInfo} from '../src/redux';
import RNPickerSelect from "react-native-picker-select";
import {getStorge, removeStorage, setStorge} from '../service/storge';



function UserInfo(){
const navigate = useNavigation<NativeStackNavigationProp<StackParams>>();

const dispatch = useDispatch();
const  {userInfo}  = useSelector((state: RootState) => state.userInfo)

useEffect(() => {
    async function getUserStorge () {
        let userId = await getStorge('userId');
        dispatch(getUserInfo(userId))
        setUserId(userId)
    }
    getUserStorge(),
    dispatch(getAgeRange()),
    dispatch(getIdentity()),
    dispatch(getEducation()),
    // dispatch(getWorkExperience()),
    // dispatch(getJobFunctions()),
    dispatch(getBudgetForCourse())

  }, [])

  const [userId, setUserId] = React.useState();

return(

  <View  style={styles.container}>
    <ImageBackground source={require('../src/img/IMG_0201.jpg')} style={styles.image}>


    <>
      <View style={{flexDirection:'row', justifyContent: 'center'}}>
        <View>
          <Text style={styles.tittle}>帳戶名稱: </Text>
          <Text style={styles.tittle}>性別: </Text>
          <Text style={styles.tittle}>密碼: </Text>
          <Text style={styles.tittle}>登記電郵: </Text>
          <Text style={styles.tittle}>年齡: </Text>
          <Text style={styles.tittle}>目前狀態: </Text>
          <Text style={styles.tittle}>學歷: </Text>
          {/* <Text style={styles.text}>工作經驗: </Text> */}
          {/* <Text style={styles.tittle}>感興趣的工作種類: </Text> */}
          <Text style={styles.tittle}>進修預算: </Text>
        </View>

        <View style={styles.data}>
          <Text style={styles.text}>{userInfo.username} </Text>
          <Text style={styles.text}>{userInfo.gender} </Text>
          <Text style={styles.text}>***** </Text>
          <Text style={styles.text}>{userInfo.email} </Text>
          <Text style={styles.text}>{userInfo.age?.age_range} </Text>
          <Text style={styles.text}>{userInfo.identity?.identity} </Text>
          <Text style={styles.text}>{userInfo.education?.education_level} </Text>
          {/* <Text style={styles.text}>{userInfo.work_experience} </Text> */}
          {/* <Text style={styles.text}>{userInfo.job_function?.job_type} </Text> */}
          <Text style={styles.text}>{userInfo.budget_for_course?.budget_range} </Text>
        </View>
      </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
                navigate.navigate('EditUserInfo')
            }}
            style={styles.button}
            >
            <Text style={styles.text}>更改資料</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Alert.alert(
                "🧐你真係要刪除帳號？",
                "確定？",
                [
                  {
                    text: "取消",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "確定", onPress: async () => {
                    let userId = await getStorge('userId')
                    fetch(`https://www.forcourse.me/user/delAc/${userId}`, {
                        method: 'DELETE'
                    })
                    await removeStorage('userId')
                    navigate.navigate('Become2')
                  }}
                ]
              )
            }}
            >
            <Text style={styles.text}>刪除帳號</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              await removeStorage('isLogin')
              navigate.navigate('Become2')
            }}
            style={styles.button}
            >
            <Text style={styles.text}>登出</Text>
          </TouchableOpacity>
      </View>
    </>
    </ImageBackground>
</View>  
)}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
  },
  text: {
    color: "#003f5c",
    fontSize: 16,
    lineHeight: 50,
  },
  data:{
    justifyContent: "center",
    maxWidth: 200
  },
  button:{
    width: 80,
    backgroundColor: "rgba(212,237,233,1)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign:'center',
    padding:5,
    margin:20
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems:"center",
    position: "absolute",
    textAlign: 'center',
    width:'100%',
    bottom:20,
    flexDirection: "row",
  },
  edit:{
    fontSize: 16,
    borderWidth: 2,    
  },
  input: {
    width:180,
    height: 30,
    margin: 10,
    borderRadius: 50,
    backgroundColor:'rgba(212,237,233,1)',
    padding: 5,
  },
  picker:{
    backgroundColor:'rgba(212,237,233,1)',
    borderRadius: 50,
    width:180,
    height: 30,
    margin: 10,
    padding:5,
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
  },
  tittle:{
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 50,
    color: "#003f5c",
  },
  row: {

    flexDirection: 'row',
  },


});


export default UserInfo;