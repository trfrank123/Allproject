import React from 'react';
import {
    StyleSheet,
    View,
    Button,
    Text,
    TextInput,
    Keyboard,
    TouchableOpacity,
    Platform
  } from 'react-native';
  import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParams} from '../App';

  import{useState} from "react"
  interface state{
    password: string;
    email: string;
  }

function Password(){
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const[formobj,setformobj] = useState<state> ({
        password: '',
        email: ''
    })
    return(
        <>
        <View>
            <Text>Password</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          // onChangeText={text => onChangeText(text)}
          placeholder="password"
          onBlur={(e) => {
            setformobj(
              Object.assign(formobj, { username:(e.currentTarget as any).value })
            );
          }}
        />
        </View>

        <View>
            <Text>Check password</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          // onChangeText={text => onChangeText(text)}
          placeholder="password"
          onBlur={(e) => {
            setformobj(
              Object.assign(formobj, { username:(e.currentTarget as any).value })
            );
          }}
        />
        </View>


        <View>
            <Text>Email</Text>
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          // onChangeText={text => onChangeText(text)}
          placeholder="email"
          onBlur={(e) => {
            setformobj(
              Object.assign(formobj, { username:(e.currentTarget as any).value })
            );
          }}
        />
        </View>

        <View>
            <Button title = "Next" onPress={() => navigation.navigate('Identity')}></Button>
        </View>
        </>
    )
}

export default Password;
