import React, {useEffect, useState} from 'react';
import {StackParams} from '../App';
import {
  Button,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  GestureResponderEvent,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Avatar, ListItem} from '@react-native-material/core';
import {getStorge} from '../service/storge';
import {REACT_APP_PUBLIC_DEV_ENDPOINT, REACT_APP_PUBLIC_PRO_ENDPOINT} from '../env';
import { Colors } from 'react-native/Libraries/NewAppScreen';
interface cateState{
    user_id: number
    id: number;
};

function MyCourse(){
    const [matchList, setMatchList] = useState<cateState[] | null>(null);

    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  
    useEffect(() => {
      async function getFavouriteCourse() {
        let user_id = await getStorge('userId');
        let res = await fetch(
          `${REACT_APP_PUBLIC_PRO_ENDPOINT}/getFavouriteCourse/`,
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
      getFavouriteCourse();
    },[]);

    return(
        <>
  <ImageBackground source={require('../src/img/IMG_0201.jpg')} style={styles.image}>
 <SafeAreaView>

      <ScrollView>
    {matchList !== null
        ? matchList.map((obj:cateState,index:number) => (
          <TouchableOpacity
                    key={index}
                    onPress={() =>

                      {
                        
                        navigation.navigate('Course', {id: obj.id})
                        
                      }
            }>
            <View style={styles.bigbox}>
              

              <Text style={styles.text}>{obj.program_name}</Text>
              <Text></Text>
              
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
    fontSize: 15,
    padding: 12,
    backgroundColor: 'rgba(212,237,233,1)',
  },
  box: {
    marginRight: 0,
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
    justifyContent: "center",
    alignSelf: 'stretch'
  },
  text:{
    fontSize: 18,
    color: "#003f5c",
  }
});
export default MyCourse;