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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Avatar, ListItem} from '@react-native-material/core';
import {getStorge} from '../service/storge';
import {REACT_APP_PUBLIC_DEV_ENDPOINT, REACT_APP_PUBLIC_PRO_ENDPOINT} from '../env';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface childState {
  id: number;
  chi_name: string;
  industrial_classification: number;
}
interface cateState {
  id: number;
  job_type: string;
  isActive: boolean;
}
let ref_arr: childState[] = [];

const Separator = () => <View style={styles.separator} />;

const Hobby = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  const [cateIsLoad, serCateIsLoad] = useState<boolean>(true);
  const [childIsLoad, serChildIsLoad] = useState<boolean>(true);
  const [child, setChild] = useState<childState[]>([]);
  const [cate, setCate] = useState<cateState[]>([]);
  const [selectJob, setSelectJob] = useState<childState[]>([]);
  useEffect(() => {
    const getClass = async () => {
      const res = await fetch(
        `${REACT_APP_PUBLIC_PRO_ENDPOINT}/industrialClassification`,
      );
      const res_json = await res.json();

      setCate(res_json);
    };
    const getWork = async () => {
      const res = await fetch(`${REACT_APP_PUBLIC_PRO_ENDPOINT}/Idealwork`);
      const res_json = await res.json();
      ref_arr = res_json;

      // setChild(res_json)
    };
    function main() {
      getClass();
      getWork();
    }
    main();
  }, []);

  const mapChildList: any = (id: number) => {
    let res = ref_arr.filter(obj => obj.industrial_classification === id);
    setChild(res);
  };

  const getMatchCourse = (obj: childState) => {

    let newArr = [...selectJob];

    let check = newArr.filter(Sobj => Sobj.id === obj.id);
    if (check.length > 0) {
      return;
    }
    newArr.push(obj);

    if (newArr.length > 3) {
      newArr.splice(0, 1);
    }
    setSelectJob(newArr);
  };
  const removeMatchCourse = (obj: childState) => {
    let newArr = [...selectJob];
    newArr = newArr.filter(sObj => sObj.id !== obj.id);
    setSelectJob(newArr);
  };
  const findMatchCourse = async () => {
    let body: any = {
      user_id: await getStorge('userId'),
      ideal_career1: 1,
      ideal_career2: 1,
      ideal_career3: 1,
    };
    for (let i = 0; i < selectJob.length; i++) {
      if (i === 0) {
        body['ideal_career1'] = selectJob[i].id;
      } else if (i === 1) {
        body['ideal_career2'] = selectJob[i].id;
      } else if (i === 2) {
        body['ideal_career3'] = selectJob[i].id;
      }
    }

    let res = await fetch(`${REACT_APP_PUBLIC_PRO_ENDPOINT}/writeMatchCareer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    let res_json = await res.json();
    navigation.navigate('MatchCourseList');
  };

  return (
    
    <ImageBackground source={require('../src/img/IMG_0201.jpg')} style={styles.image}>
    <>
    
      <ScrollView>
        <View style={styles.center}>
          <Text style={styles.textTittle}>請選三項</Text>
        </View>
      <View style={styles.ans}>
        {selectJob.map(obj => (
          <View style={styles.topname}>
            <Text style={styles.text}>{obj.chi_name}</Text>
            <TouchableHighlight onPress={() => removeMatchCourse(obj)}>
              <Image
                style={styles.tinyLogo}
                source={require('../iconFile/cross.png')}
              />
            </TouchableHighlight>
          </View>
        ))}
        </View>
        <Separator />

        <View style={styles.view}>
          <View style={styles.touchbar}>
            {cate.map(obj => (
              <Text 
                onPress={() => {
                  mapChildList(obj.id);
                }}
                style={
                  styles.carname
                }>
                {obj.chi_name}
              </Text>
            ))}
          </View>

          <View style={styles.right}>
            {childIsLoad ? (
              child.map(obj => (
                <TouchableOpacity style={styles.btn2}>
                  <Text
                    onPress={() => {
                      getMatchCourse(obj);
                    }}
                    style={styles.child}>
                    {obj.chi_name}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text>child is loading</Text>
            )}
          </View>
          
        </View>
        
      </ScrollView>

        <View style={styles.btn}>
          <Button title="確認" onPress={() => findMatchCourse()} />
        </View>
    </>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  view: {
    // display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width:"50%",
  },

  touchbar: {
    alignItems:'center',
    fontSize:20,
    // borderRadius: 50,
    
},
  carname:{
    alignItems:'center',
    margin:1,
    justifyContent: 'center',
    fontSize:17,
    display: 'flex',
    textAlign: "center",
    borderRadius: 50,
    height:35,
    width:275,
    backgroundColor: "#E0D5D3",
    color: "#003f5c",
    fontWeight: 'bold',
},
  btn2:{
    width:130,
    margin:10,
    paddingVertical: 8,
    borderColor: "#FFF",
    borderRadius: 10,
    backgroundColor: "rgba(212,237,233,1)",
},
  right:{
    borderRadius: 10,
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
},

  child:{
    height: 40,
    width: '100%',
    textAlign: "center",
    fontSize: 18,
    color: "#003f5c",
},
  tinyLogo: {
    width: 25,
    height: 25,
  },
  ans:{
    flexDirection: 'row',
    marginTop: 10,
    height:60,
  },
  topname:{
    margin:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor: "rgba(212,237,233,1)",
    height: 45,
    width: 110,
    padding:15,
    fontSize:13,
    borderRadius: 50,
    color: "#003f5c",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  btn:{
    top:-30,
    margin: 15,
    alignItems:'center',
    height: 45,
    fontSize:13,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
    justifyContent: "center",
    alignSelf: 'stretch'
  },
  text:{
    color: "#003f5c",
    fontWeight: 'bold',
  },
  textTittle:{
    color: "#003f5c",
    fontWeight: 'bold',
    fontSize:15,
  },
  center:{
    justifyContent: 'center',
    alignItems:'center',
  }
 
});

export default Hobby;
