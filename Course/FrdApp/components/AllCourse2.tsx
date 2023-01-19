import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackParams} from '../App';
import Header2 from './Header2';
import { REACT_APP_PUBLIC_DEV_ENDPOINT, REACT_APP_PUBLIC_PRO_ENDPOINT } from '../env';

interface dataState {
  program_id: number;
  program_name: string;
  course_type: string;
  organization_name: string;
  price: number;
  year: string;
  classification_id: number;
  area_of_study: string;
}
// interface resultState {
//   data: dataState[];
//   isLast: boolean;
//   total_page: number;
// }

const AllCourse2 = () => {
  
  const flatListRef = React.useRef<FlatList>(null);
  
  const [isLoading, setLoading] = useState(true);
  const [curPage, setCurPage] = useState(1);
  const [itemNumber, setItemNumber] = useState(10);
  const [data, setData] = useState<dataState[]>([]);
  
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
  useEffect(() => {
    const getCourseList = async () => {
      const res = await fetch(
        `${REACT_APP_PUBLIC_PRO_ENDPOINT}/overviewCourse?year=2022/23&page=${curPage}}`,
      );
      const res_json = await res.json();
      
      setData(res_json.data);
      setLoading(false);
      setCurPage(cur=>cur + 1)
      
    };
    getCourseList();
  }, []);
let getNextPage = async() =>{
  
  setCurPage(()=>curPage + 1)
  setItemNumber(()=>(curPage + 1) * 10)
  
  
  // setLoading(true)
  const res = await fetch(
    `${REACT_APP_PUBLIC_PRO_ENDPOINT}/overviewCourse?year=2022/23&page=${curPage}`,
  );
  const res_json = await res.json();
  
  let new_data = data.concat(res_json.data)
  
  setData(new_data);
  
  
  
  // setLoading(false);
}
let fetchNextPageData = async () => {
  
  await getNextPage()

  // setTimeout(()=>{
  //   // Alert.alert(JSON.stringify(itemNumber))
  //   flatListRef.current?.scrollToEnd({ animated: false });
  // },1)
  
}
  return (

    // <SafeAreaView>
    
    <ImageBackground source={require('../src/img/IMG_0201.jpg')} style={styles.image}>
    
      <Header2 />
      <View style={{flex: 1, padding: 24}}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            {/* <Text style={{ fontSize: 18, color: 'green', textAlign: 'center'}}>{data.data.title}</Text> */}
            <Text
              style={{
                fontSize: 14,
                color: 'green',
                textAlign: 'center',
                paddingBottom: 10,
              }}>
              Coruse:
            </Text>

            {/* {data.map(item=>
                <TouchableOpacity
                onPress={() => navigation.navigate('Course',{id:item.program_id})}
                >
                <Text>{item.program_name}</Text>
                </TouchableOpacity>
            )} */}
            
              <FlatList
                data={data}
                ref={flatListRef}
                // getItemLayout={(data,index) => {
                // return { length: 170, offset: 170 * itemNumber, index};
                // }}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    
                    key={item.id}
                    onPress={() =>
                      navigation.navigate('Course2', {id: item.program_id})
                    }>
                    <View style={styles.bigbox}>
                      <Text style={styles.box1}> {item.program_name}</Text>
                      <Text style={styles.box}>{item.course_type}</Text>
                      <Text style={styles.box}> {item.organization_name}</Text>
                      {/* <Text style={styles.box}>${item.price}</Text> */}
                      <Text style={styles.box}>{item.year}</Text>
                    <Text style={styles.box}>詳情</Text>
                    </View>
                  </TouchableOpacity>
                )}
                onEndReached={fetchNextPageData}
              />
              <TouchableOpacity onPress={()=>flatListRef.current?.scrollToEnd({ animated: true })}>
              {/* <Text>to end</Text> */}
              </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>

    
    // </SafeAreaView>
  );
};
const styles = StyleSheet.create({
 bigbox: {
    display: 'flex',
    alignItems: 'center',
    margin: 14,
    borderRadius: 45,
    padding: 8,
    height:130,
    backgroundColor: 'rgba(212,237,233,1)',
  },
  box:{
    color: "#003f5c",
    fontSize: 16,
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
    justifyContent: "center",
    alignSelf: 'stretch'
  },
  box1:{
    color: "#003f5c",
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default AllCourse2;