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
  ImageBackground
} from 'react-native';

import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../src/redux/reducers';
import { getUserInfo, getAgeRange, getIdentity, getEducation, getWorkExperience, getJobFunctions, getBudgetForCourse, updateUserInfo, uploadUserInfo} from '../src/redux';
import RNPickerSelect from "react-native-picker-select";
import {getStorge} from '../service/storge';



function EditUserInfo(){

const dispatch = useDispatch();
const  {userInfo}  = useSelector((state: RootState) => state.userInfo)
const { age_range } = useSelector((state: RootState) => state.age)
const { identity } = useSelector((state: RootState) => state.identity)
const { education } = useSelector((state: RootState) => state.educations)
const  {year_range}  = useSelector((state: RootState) => state.year_experiences)
// const { job_type } = useSelector((state: RootState) => state.job_type)
const { budget_range } = useSelector((state: RootState) => state.budget_for_courses)
    

useEffect(() => {
    async function getUserStorge () {
        const userId = await getStorge('userId');
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



 
const navigate = useNavigation<NativeStackNavigationProp<StackParams>>();
const [edit, setEdit] = React.useState(false);

const [password1, newPassword1] = React.useState("");
const [password2, newPassword2] = React.useState("");
const [userId, setUserId] = React.useState();
const [email, newEmail] = React.useState(userInfo.email);
const [age, newAge] = React.useState(userInfo.age.age_range);
const [identity1, newIdentity1] = React.useState(userInfo.identity.identity);
const [education1, newEducation1] = React.useState(userInfo.education.education_level);
const [budgetForCourse1, newBudgetForCourse1] = React.useState(userInfo.budget_for_course.budget_range);

//   console.log('userInfo',userInfo);

   let newAgeRange = age_range.map((range:any) => {        
    return {
        label: range.age_range,
        value: range.age_range
    }
   })

   let newIdentity = identity.map((identity:any) => {
    return {
        label: identity.identity,
        value: identity.identity
    }
   })

   let newEducation = education.map((education_level:any) => {
    return {
        label: education_level.education_level,
        value: education_level.education_level
    }
   })
   
//    let newWorkExperience = year_range.map((year_range:any) => {
//     return {
//         label: year_range.year_range,
//         value: year_range.year_range
//     }
//    })

   
//    let newJobFunctions = job_type.map((job_type:any) => {
//     return {
//         label: job_type.job_type,
//         value: job_type.job_type
//     }
//    })

   let newBudgetForCourse = budget_range.map((budget_range:any) => {
    return {
        label: budget_range.budget_range,
        value: budget_range.budget_range
    }
   })

    return (
        <>
        <ImageBackground source={require('../src/img/IMG_0201.jpg')} style={styles.image}>
            <View style={{flexDirection:'row', justifyContent: 'center'}}>
            
                <View >
                    <Text style={styles.tittle}>帳戶名稱: </Text>
                    <Text style={styles.tittle}>性別: </Text>
                    <Text style={styles.tittle}>請輸入密碼: </Text>
                    <Text style={styles.tittle}>再次輸入密碼: </Text>
                    <Text style={styles.tittle}>登記電郵: </Text>
                    <Text style={styles.tittle}>年齡: </Text>
                    <Text style={styles.tittle}>目前狀態: </Text>
                    <Text style={styles.tittle}>學歷: </Text>
                    <Text style={styles.tittle}>進修預算: </Text>
                </View>

                <View style={styles.data}>
                    <Text style={styles.text}>{userInfo.username}</Text>
                    <Text style={styles.text}>{userInfo.gender} </Text>
                    
                    {/* password 1 */}
                    <TextInput secureTextEntry style={styles.input} onChangeText={newPassword1} placeholder='按此修改' value={password1}/>

                    {/* password 2 */}
                    <TextInput secureTextEntry style={styles.input} onChangeText={newPassword2} placeholder='按此修改' value={password2}/>

                    {/* email */}
                    <TextInput style={styles.input} onChangeText={newEmail} placeholder='按此修改' value={email}/>
                    
                    {/* age */}
                    <View style={styles.picker}>
                        <RNPickerSelect 
                           onValueChange={(value, index) => {
                            newAge({
                                id: index,
                                age_range: value
                            })
                           }}
                            // value={age.age_range}
                            items={newAgeRange}
                            placeholder={{
                                label: "按此修改"
                            }}
                        />
                    </View>
                    
                    {/* identity */}
                    <View style={styles.picker}>
                        <RNPickerSelect 
                        onValueChange={(value,index) => {
                            newIdentity1({
                                id: index,
                                identity: value
                            })
                        }}
                        // value={identity1.identity}
                        items={newIdentity}
                        placeholder={{
                            label: "按此修改"
                        }}
                        />
                    </View>
                    
                    {/* education */}
                    <View style={styles.picker}>
                        <RNPickerSelect
                            onValueChange={(value,index) => {
                                newEducation1({
                                    id: index,
                                    education_level: value
                                })
                            }}
                        items={newEducation}
                        // value={education1.education_level}
                        placeholder={{
                            label: "按此修改"
                        }}
                        />
                    </View>

                    {/* budget for course */}
                    <View style={styles.picker}>
                        <RNPickerSelect 
                        onValueChange={(value,index) => {
                            newBudgetForCourse1({
                                id: index,
                                budget_range: value
                            })
                        }}
                        items={newBudgetForCourse}
                        // value={budgetForCourse1.budget_range}
                        placeholder={{
                            label: "按此修改"
                        }}
                        />
                    </View>

                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                
                        if (password1.trim() && password2.trim() && password1 == password2){
                            console.log('pass')
                            userInfo.password = password1
                            userInfo.confirm_password = password2
                        }
                        if (email.trim()) userInfo.email = email;   

                        if (age.age_range) userInfo.age = age;
                        if (identity1.identity) userInfo.identity = identity1;
                        if (education1.education_level) userInfo.education = education1;
                        if (budgetForCourse1.budget_range) userInfo.budget_for_course = budgetForCourse1;
                        dispatch(updateUserInfo(userInfo))
                        dispatch(uploadUserInfo(userId, userInfo))
                        navigate.navigate('Foodter')
                    }}
                    style={styles.button}
                >
                    <Text style={styles.text}>確定更改</Text>
                </TouchableOpacity>
            </View>
            </ImageBackground>
        </>
    )
}


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
  }

});


export default EditUserInfo;