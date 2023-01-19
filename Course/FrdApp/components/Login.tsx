import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View, TextInput, Button, Text, ImageBackground, Alert, Modal, Pressable, Image} from 'react-native';
import {StackParams} from '../App';

import {useState} from 'react';
import {setStorge , getStorge} from '../service/storge';
import { REACT_APP_PUBLIC_DEV_ENDPOINT, REACT_APP_PUBLIC_PRO_ENDPOINT } from '../env';
interface state {
  username: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigation<NativeStackNavigationProp<StackParams>>();
  const [formobj, setformobj] = useState<state>({
    username: '',
    password: '',
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [errMess, setErrMess] = useState<string>("");
  let handleLogin = async () => {
    
    const res = await fetch(`${REACT_APP_PUBLIC_PRO_ENDPOINT}/user/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formobj),
    })
    
    const res_json = await res.json();
    if(res_json.hasOwnProperty('errMess')){
      setModalVisible(true)
      setErrMess(res_json.errMess);
    }
    
    // console.log("res_json: ", res_json)
    // if (res_json.status == 404){
    //   console.log("Hi")
    // }
    if(res_json.hasOwnProperty('id')){
      await setStorge('isLogin','true')
      await setStorge('userId',res_json.id.toString())
      console.log("res_json: ", res_json)
      navigate.navigate('Foodter')
    }
    
  }
  return (
    <>
    
    <View style={styles.container}>
      <ImageBackground source={require('../src/img/IMG_0201.jpg')} style={styles.image}>

      <View style={styles.center}>
        <Image style={styles.logo} source={require('../iconFile/img4.gif')}/>
        </View>

      <View style={styles.nameContainer}>
      <TextInput
      placeholder="輸入用户名稱"
      placeholderTextColor="#003f5c"
      style={styles.name}
      onChangeText={text => setformobj({...formobj,username:text})}
      ></TextInput>
      </View>

      <View style={styles.nameContainer}>
      <TextInput
      secureTextEntry
      placeholder="輸入用户密碼"
      placeholderTextColor="#003f5c"
      style={styles.name}
      onChangeText={text => setformobj({...formobj,password:text})}
      ></TextInput>
      </View>

      <View>
          <Button title="登入" onPress={handleLogin}
          ></Button>
      </View>
      </ImageBackground>
    </View>





    {/* <View style={styles.centeredView}> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{errMess}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>I got it</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      
    {/* </View> */}



    </>

  


  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
  },
  text: {
    color: "#121212",
    fontSize: 20,
  },
  nameContainer: {
    display: "flex",
    alignItems:"center",
    margin:20,
    top:-100
  },
  name: {
    backgroundColor: "rgba(212,237,233,1)",
    height: 50,
    width: 220,
    padding:12,
    fontSize:15,
    borderRadius: 30,
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
    justifyContent: "center",
    alignSelf: 'stretch'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  logo:{
    width: 300,
    height: 300,
  },
  center:{
    alignItems:"center",
    top:-80
  },
});

export default Login;
