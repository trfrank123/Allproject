import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState, useEffect }from 'react';
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ImageBackground} from 'react-native';
import { StackParams } from '../App';

import { RootState } from '../src/redux/reducers';
import { useSelector, useDispatch } from "react-redux";
import { getSalaryRange, updateUserInfo, getBudgetForCourse, createUser } from '../src/redux';
import RNPickerSelect from "react-native-picker-select";

const ExpectSalaryAndWorkLocation = () => {
    const navigate = useNavigation<NativeStackNavigationProp<StackParams>>();
    // const { selectedLocation } = useSelector((state: RootState) => state.locations)

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getSalaryRange())
      dispatch(getBudgetForCourse())
    }, [])
    const { salary_range } = useSelector((state: RootState) => state.salary)
    const { budget_range } = useSelector((state: RootState) => state.budget_for_courses)
    // console.log(salary_range);
    
    const { userInfo } = useSelector((state:RootState) => state.userInfo)
    // console.log(userInfo);

    const createButtonAlert = () => 
      Alert.alert(
        "註冊完成",
        "請登入",
        [
          { text: "OK", onPress: () => navigate.navigate("Become")}
          // { text: "OK", onPress: () => console.log('done')}
        ]
      );

      // const errorButtonAlert = () => 
      // Alert.alert(
      //   "🧐你好似有啲野未揀好",
      //   "乖乖地揀左佢 好快就填完🥳",
      //   [
      //     { text: "OK", onPress: () => console.log("Cancel Pressed")}
      //   ]
      // );  


    let salaryRange = salary_range.map((range:any) => {
      return {
          label: range.salary_range,
          value: range.salary_range
      }
     })

     let budgetRange = budget_range.map((range:any) => {
      return {
          label: range.budget_range,
          value: range.budget_range
      }
     })

    return (
      <View style={styles.container}>
        <ImageBackground source={require('../src/img/IMG_0201.jpg')} style={styles.image}>

          <Text style={styles.workingPlaceContainer}>你理想的工作地區是(可選填)</Text>
          <TouchableOpacity onPress={() => {
            navigate.navigate('Location')
          }}>
          <Text style={styles.workingPlace}>{userInfo.ideal_work_location.district}</Text>
          <Text style={styles.chooseLocation}>入黎揀la{"\n"}</Text>
          </TouchableOpacity>

          <View style={styles.center}>
        <Text style={styles.salaryTittle}>你的期望月薪是(可選填)</Text>

        <View style={styles.picker}>
        <RNPickerSelect 
        style={pickerStyle}
        onValueChange={(value, index) => {
            // call action to update state
            //  setAge(value)
            dispatch(updateUserInfo({'expect_salary':{id: index, salary_range:value}}))
        }}
        // value={age}
        items={salaryRange}
        placeholder={{
            label: "按此"
        }}
        />
        </View>
      </View>

      <View style={styles.center}>
          <Text style={styles.tittle}>你願意為你嘅未來{"\n"}投放幾多資金去報讀課程？(可選填)</Text>
          <Text style={styles.tips}>PS. 以年計</Text>
        

      <View style={styles.picker}>
        <RNPickerSelect 
        style={pickerStyle}
        onValueChange={(value, index) => {
            // call action to update state
            //  setAge(value)
            dispatch(updateUserInfo({'budget_for_course':{id: index, budget_range:value}}))
        }}
        // value={age}
        items={budgetRange}
        placeholder={{
            label: "按此"
        }}
        />
        </View>
      </View>

        <View style={styles.bottom}>
          <Button
          title="問卷完成 提交"
          onPress={() => {
            // if (userInfo.ideal_work_location.district.trim() 
            //   && userInfo.expect_salary.salary_range.trim()){
                createButtonAlert()
                dispatch(createUser(userInfo))
              // } else {
              //   errorButtonAlert()
              // }
            
          }}
          />
        </View> 
        </ImageBackground>
      </View>
    );
  };

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
      color: '#003f5c',
      fontSize: 17,
      margin:20,
      justifyContent: "center",
      alignItems: "center",
      textAlign:"center",
    },
  };
  


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    workingPlaceContainer:{
      textAlign :'center',
      fontSize:17,
      margin:15,
    },
    header:  {
      fontSize: 20, 
    },
    bottom: {
      position: "absolute",
      bottom: 50,
      width:'100%',
      textAlign: 'center'
    },
      chooseLocation:{
        textAlign :'center',
        marginTop:20,
        textDecorationLine: 'underline',
        fontSize: 16,
        color:'#4A90E2'
      },
      salaryRange:{
        margin:20,
      },
      salaryTittle:{
        fontSize:17,
        textAlign :'center',
        margin:20
      },
      picker:{
        backgroundColor:'rgba(212,237,233,1)',
        width:200,
        borderRadius: 50,
        height: 50,
        justifyContent: "center",
        margin:10
      },
      tips:{
        fontSize:12,
        textAlign :'center',
        margin:10,
      },
      tittle:{
        textAlign :'center',
        fontSize:17,
        margin:20,
        lineHeight:30
      },
      workingPlace:{
        color: '#003f5c',
        fontWeight: 'bold',
        fontSize:17,
        textAlign :'center',
      },
      image: {
        flex: 1,
        resizeMode: "stretch",
        justifyContent: "center",
        alignSelf: 'stretch'
      },
      center:{
        display: "flex",
        alignItems:"center",
      }
  });
  

  export default ExpectSalaryAndWorkLocation;