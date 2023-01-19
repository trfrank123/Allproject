import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState, useEffect } from 'react';
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { StackParams } from '../App';
import {Picker} from '@react-native-picker/picker';
//R

import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../src/redux/reducers';
import { getBudgetForCourse, updateUserInfo, uploadUserInfo } from '../src/redux';

const CourseFeeBudget = () => {
    const navigate = useNavigation<NativeStackNavigationProp<StackParams>>();

    const [selectedLanguage, setSelectedLanguage] = React.useState();

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getBudgetForCourse())
    }, [])
    const { budget_range } = useSelector((state: RootState) => state.budget_for_courses)
    console.log(budget_range);
    
    const { userInfo } = useSelector((state:RootState) => state.userInfo)
    console.log(userInfo);
    
    const createButtonAlert = () => 
      Alert.alert(
        "註冊完成",
        "請登入",
        [
          { text: "OK", onPress: () => navigate.navigate("Become")}
        ]
      );

    return (
      <View style={styles.container}>

        <View>
          <Text style={styles.tittle}>你願意為你嘅未來{"\n"}投放幾多資金去報讀課程？</Text>
          <Text style={styles.tips}>PS. 以年計</Text>
        </View>

        
          <Picker
            selectedValue={userInfo.budget_for_course.budget_range}
            style={{ height: 200, width: 300, backgroundColor:'rgba(212,237,233,1)', borderRadius: 30, margin:20}}
            onValueChange={(itemValue, itemIndex) =>
              dispatch(updateUserInfo({'budget_for_course':{
                id: itemIndex+1,
                budget_range: itemValue
              }}))
            }
            >
            { 
              budget_range.map((budget: any) => {
                return (
                  <Picker.Item key={budget.id} label={budget.budget_range}  value={budget.budget_range} />
                )
              }) 
            }

          </Picker>

        <View style={styles.bottom}>
          <Button
          title="問卷完成 提交"
          onPress={() => {
            createButtonAlert()
            dispatch(uploadUserInfo(userInfo))
          }}
          />
        </View> 
  
      </View>
    );
  };


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    tittle:{
      textAlign :'center',
      fontSize:17,
      margin:30,
      lineHeight:30
    },
    header:  {
      fontSize: 20, 
    },
    bottom: {
      position: 'absolute',
      bottom:30
    },
      chooseLocation:{
        textAlign :'center',
        fontWeight: 'bold',
        fontSize: 16,
        color:'#4A90E2'
      },
      salaryRange:{
        margin:20,
      },
      salaryTittle:{
        fontSize:17,
        textAlign :'center',
        margin:30
      },
      tips:{
        fontSize:12,
        textAlign :'center',
      }
  });
  

  export default CourseFeeBudget;