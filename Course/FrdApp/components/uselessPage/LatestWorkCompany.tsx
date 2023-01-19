import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import { StackParams } from '../App';

import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../src/redux/reducers';
import { updateUserInfo } from '../src/redux';

const LatestWorkCompany = () => {
  const navigate = useNavigation<NativeStackNavigationProp<StackParams>>();
  return (
    <View style={styles.container}>

      <View>
        <Text style={styles.text}>你最近就職的公司是{"\n"}</Text>
        <Text style={styles.text2}>我哋會幫你保守秘密🤫</Text>

        <TextInput
          placeholder="輸入..."
          placeholderTextColor="#9B9B9B"
          style={styles.edit}
          ></TextInput>
        
      </View>

      <View style={styles.next}>
            <Button title="下一題" onPress={() => navigate.navigate('Education')}></Button>
      </View>
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
  textCenter:{
    textAlign :'center'
  },
  header:  {
    fontSize: 20, 
  },
  bottom: {
    position: 'absolute',
    bottom:30
  },
  fixToText: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  next:{
    position: "absolute",
    bottom: 20
},
edit: {
  height: 50,
  backgroundColor: "rgba(212,237,233,1)",
  width: 250,
  marginTop: 50,
  padding:15,
  fontSize:20,
  borderRadius: 50,
  borderColor: 'gray',
},
text: {
  color: "#121212",
  fontSize: 20,
},
text2: {
  color: "#121212",
  fontSize: 15,
},
});

export default LatestWorkCompany;