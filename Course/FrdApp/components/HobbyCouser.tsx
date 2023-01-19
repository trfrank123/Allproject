import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation,useRoute } from '@react-navigation/native';
import { StackParams } from '../App';
import { REACT_APP_PUBLIC_DEV_ENDPOINT, REACT_APP_PUBLIC_PRO_ENDPOINT } from '../env';

interface courseState{
  "id": number,
	"price": number,
	"start_time": null,
	"discription": string,
	"career_path": null,
	"image": number,
	"requirements": number,
	"location": string,
	"study_period": number,
	"organization": number,
	"quota": null,
	"language": string,
	"contact": null,
	"course_type": string,
	"score": null,
	"number_of_rating": null,
	"created_at": string,
	"updated_at": string,
	"fund_mode": string,
	"year": string,
	"program_name": string,
	"area_of_study": string,
	"education_requirement": string,
	"source": string,
	"name": string,
	"organization_name": string,
	"organization_hotline": string,
	"organization_hotline2": null,
	"establishment_year": string,
	"address": string,
	"email": string,
	"website": string,
	"chi_name": string,
	"eng_name": string,
	"program_id": number,
	"classification_id": number,
  "industry_eng_name":string,
}

 const HobbyCourse = () => {
  const [course,setCoures] = useState<courseState>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  
  const [ModelMess,setModelMess] = useState<string>('');
  const route = useRoute<any>();
  
  useEffect(() => {
    const getSingleCourse = async () => {
      const res = await fetch(`${REACT_APP_PUBLIC_PRO_ENDPOINT}/detialCourse?course_id=${route.params.id}`)
      const res_json = await res.json();
      setCoures(res_json);
    }
    getSingleCourse()
  },[])
  
    const addMyFavour = async() => {
      const res = await fetch(`${REACT_APP_PUBLIC_PRO_ENDPOINT}/addFavouriteCourse`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          course_id: route.params.id,
        })
      })

      const res_json = await res.json();
      setModelMess(res_json)
    }
  
  

  return (
  <>
    <View style={styles.bigbox}>
    <Text style={styles.box}>{course?.name}</Text>
      <Text style={styles.box}>學費：${course?.price}</Text>
     <Text style={styles.box}>開班時間：{course?.discription}</Text>
     <Text>地點：</Text>
     <Text style={styles.box}>{course?.location}</Text>
     <Text style={styles.box}>電話：{course?.organization_hotline}</Text>
     <Text style={styles.box}>語言：{course?.language}</Text>
     <Text style={styles.box}>{course?.course_type}</Text>
     <Text style={styles.box}>{course?.fund_mode}</Text>
     <Text style={styles.box}>{course?.program_name}</Text>
     <Text style={styles.box}>{course?.area_of_study}</Text>
     <Text style={styles.box}>{course?.establishment_year}</Text>
     <Text style={styles.box}>{course?.address}</Text>
     <Text style={styles.box}>{course?.email}</Text>
      <Text style={styles.box}>{course?.website}</Text>
      <Text style={styles.box}>{course?.industry_eng_name}</Text>
     
    </View>
    <View>
    <TouchableOpacity style={styles.btn}
            onPress={addMyFavour}>
            
            <Text>收藏</Text>
        </TouchableOpacity>
     </View>
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
            <Text style={styles.modalText}>{ModelMess}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>I got it</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
  </>
  );
};
const styles = StyleSheet.create({
  bigbox: {
     display: 'flex',
     alignItems: 'center',
     margin: 20,
     borderRadius: 5,
     fontSize: 15,
     padding: 12,
     backgroundColor: 'rgba(212,237,233,1)',
   },
   box:{
     margin:10,
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
  btn:{
    backgroundColor: "rgba(212,237,233,1)",
    height: 50,
    width: 60,
    // margin:5,
    padding:15,
    fontSize:16,
    borderRadius:50,
    marginLeft: 300,
    // marginTop: 2,
    // justifyContent: "center",
    // alignItems: "center",
  }
 });

export default HobbyCourse;