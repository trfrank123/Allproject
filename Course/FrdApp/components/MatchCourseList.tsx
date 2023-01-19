import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ScrollView, ImageBackground} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackParams} from '../App';
import {getStorge} from '../service/storge';
import {REACT_APP_PUBLIC_DEV_ENDPOINT, REACT_APP_PUBLIC_PRO_ENDPOINT} from '../env';
interface dataState {
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
  "language": number,
  "contact": null,
  "course_type": number,
  "score": null,
  "number_of_rating": null,
  "created_at": string,
  "updated_at": string,
  "fund_mode": number,
  "year": string,
  "program_name": string,
  "area_of_study": number,
  "industry": number,
}
interface resultState {
  data: dataState[];
  isLast: boolean;
  total_page: number;
}

const MatchCourseList = () => {
  const [matchList, setMatchList] = useState<dataState[] | null>(null);

  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  useEffect(() => {
    async function getMatchCourse() {
      let user_id = await getStorge('userId');
      let res = await fetch(
        `${REACT_APP_PUBLIC_PRO_ENDPOINT}/relatedDetialCourse`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            user_id: user_id,
          }),
        },
      );
      const resJson = await res.json();
      

      setMatchList(resJson);
      
    }
    getMatchCourse();
  },[]);
  return (
    <>
        <ImageBackground source={require('../src/img/IMG_0201.jpg')} style={styles.image}>
        <SafeAreaView>
        
      <ScrollView>
    {matchList !== null
        ? matchList.map((obj:dataState,index:number) => (
          <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate('Course', {id: obj.id})
            }>
            <View style={styles.bigbox}>
              

              <Text style={styles.text}>{obj.program_name}</Text>
              <Text style={styles.text2}>{obj.location}</Text>
              
            </View>
            </TouchableOpacity>
          ))

        : null}
        </ScrollView>
        
        </SafeAreaView>
        </ImageBackground>
    </>
  );
};
const styles = StyleSheet.create({
  bigbox: {
    display: 'flex',
    alignItems: 'center',
    margin: 20,
    borderRadius: 5,
    padding: 12,
    backgroundColor: 'rgba(212,237,233,1)',
  },
  box: {
    marginRight: 0,
  },
  text:{
    fontSize: 18,
    color: "#003f5c",
    fontWeight: 'bold',
    alignItems: 'center',
  },
  text2:{
    fontSize: 16,
    color: "#003f5c",
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
    justifyContent: "center",
    alignSelf: 'stretch'
  },
});

export default MatchCourseList;
