import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState, useEffect } from 'react';
import {View, Text, TextInput, Button, StyleSheet, SectionList, SafeAreaView, TouchableHighlight, TouchableOpacity} from 'react-native';
import { StackParams } from '../App';

import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../src/redux/reducers';
import { getLocation, selectLocation, updateUserInfo } from '../src/redux';


let userSelectedLocation:Array<string> = []

  // const SelectedLocation = ({title}) => {
  //   const { userInfo } = useSelector((state: RootState) => state.userInfo)
  //   const { location } = useSelector((state: RootState) => state.locations)

  //   let selectedLocation:Array<string> = [];
  //    if (userInfo.ideal_work_location){
  //     userSelectedLocation = userInfo.ideal_work_location;
  //     userInfo.ideal_work_location.map((idealLocation: string) => {
  //       location.map((l:any) => {
  //         if (l.id == idealLocation){
  //           if (title == l.district){
  //             selectedLocation.push(l.district)
  //           }
  //         }
  //       })
  //     })
  //   }

  //   if (selectedLocation.includes(title)){
  //     return <Text>✔️</Text>
  //   }   
  // }

  const Item = ( {title} ) => {
    const navigate = useNavigation<NativeStackNavigationProp<StackParams>>();

    const dispatch = useDispatch();
    const { location } = useSelector((state: RootState) => state.locations)


    return (

    <TouchableOpacity 
      style={styles.item}  
      onPress={() => {
        location.map((l:any) => {
          if (l.district == title) {
          //   if (userSelectedLocation.includes(l.id)){
          //     let index = userSelectedLocation.indexOf(l.id)
          //     if (index > -1) {
          //       userSelectedLocation.splice(index, 1);
          //     } 
          //   } else {
          //     userSelectedLocation.push(l.id)
          //   }
            // dispatch(updateUserInfo({"ideal_work_location": userSelectedLocation}))
              dispatch(updateUserInfo({"ideal_work_location": {
                id:l.id,
                district:l.district
              }}))
              navigate.navigate('ExpectSalaryAndWorkLocation')
              
            }
            })
          }}
    >
      <Text style={styles.title}>{title}</Text>
      {/* <SelectedLocation title={title}/> */}
    </TouchableOpacity>
  )};  
  
  
  const Location = () => {
    const dispatch = useDispatch();
    const { location } = useSelector((state: RootState) => state.locations)

    let newLocation = []

    let groupedData = {}
    for (var i = 0; i < location.length; i++) {
      var object = location[i];
      if (Object.keys(groupedData).indexOf(object.area) === -1) {
          groupedData[object.area] = [];
      }
  
      groupedData[object.area].push(object.district);
  }
  

  for (const [key, value] of Object.entries(groupedData)) {
    let tempObj = {
        "area": key,
        "data": value
    }
    newLocation.push(tempObj)
  }
  
    useEffect(() => {
      dispatch(getLocation())
    }, [])

    // let selectedLocation = [];
    // if (userInfo.ideal_work_location){
    //   userInfo.ideal_work_location.map(location => {
        
    //   })
    // }

    return (
      <SafeAreaView>
        
          <SectionList
            style={{height:'100%', backgroundColor: 'white', paddingHorizontal: 10}}
            sections={newLocation}
            keyExtractor={(item, index) => item + index}
            renderSectionHeader={({ section: { area } }) => (
              <View  style={styles.itemHeader}>
                <Text style={{color: 'gray'}}>{area}</Text>
              </View>
            )}
            renderItem={({ item }) => ( 
              <View style={{borderBottomColor: 'lightgray', borderBottomWidth: 0.5}} >
                <Item title={item} />
              </View>
            )}
          />
  
      </SafeAreaView>
    );
  };


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    item: {
        padding: 10,
        marginVertical: 1, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',

      },
      header: {
        fontSize: 32,
        backgroundColor: "#fff"
      },
      bottom: {
        position: 'absolute',
        bottom:30
      },
      itemHeader: {
        paddingTop: 20,
        fontSize:20, 
        fontWeight: 'bold', 
        paddingBottom: 10, 
        backgroundColor: 'white', 
        borderBottomColor: 'lightgray', 
        borderBottomWidth: 0.5
      },
      title: {
        fontSize: 15,
        fontWeight: 'bold'
      },
  });

  

  export default Location;