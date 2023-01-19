import React from "react";
import {
    View,
    Text,
    TextInput,
} from "react-native"
 import { useNavigation } from "@react-navigation/native";
 import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
 import{StackParams} from '../App'
 import {useState} from "react";
 interface state{
    school:string;
 }

 const School = () => {
    const [formobj,setformobj] = useState<state>({
      school:''
    })
    return(
      <>
        <Text>你最近就讀的學校是</Text>
            <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1}} placeholder = "school"
            onBlur = {(e) => {
              setformobj(
                Object.assign(formobj,{school:(e.currentTarget as any).value})
              
              );
            }}
            ></TextInput>
            </>
            )}
export default School;