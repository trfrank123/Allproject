import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParams} from '../App';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import Header2 from './Header2';
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

const Home2 = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<dataState[]>([]);
  const navigate = useNavigation<NativeStackNavigationProp<StackParams>>();
  const [search, setSearch] = useState('');
  const [flIsActive, setFlIsActive] = useState<boolean>(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
      const getOverviewCourse = async () =>{
        
        const res = await fetch('https://www.forcourse.me/overviewCourse?year=2022/23&page=1')
        const res_json = await res.json()
        
        setFilteredDataSource(res_json);
        setMasterDataSource(res_json);
        
        
        
      }
      getOverviewCourse()
  }, []);
  useEffect(() => {
    const getCourseList = async () => {
      const res = await fetch(
        'https://www.forcourse.me/overviewCourse?year=2022/23&page=1',
      );
      const res_json = await res.json();
      let arr = res_json.data.filter((obj:{program_id:number})=>obj.program_id ===1||obj.program_id ===9||obj.program_id===10 ||obj.program_id=== 5)
      setData(arr);
      setLoading(false);
    };
    getCourseList();
  }, []);

  const searchFilterFunction = (text:string) => {
    // Alert.alert(text)
    
    if (text) {
      
      const newData = masterDataSource.data.filter(item =>
        item.program_name.includes(text)||item.area_of_study.includes(text)||item.organization_name.includes(text)
      );
      
      
      setFilteredDataSource(newData);
      setSearch(text);
      if (newData.length > 0) {
        setFlIsActive(true);
      } else {
        setFlIsActive(false);
      }
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
      setFlIsActive(false);

    }
  };

  const ItemView = ({item} : any) => {
    return (
      
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.program_id}
        {'.'}
        {item.area_of_study}
        {'.'}
        {item.organization_name}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = item => {
    // Function for click on an item
    navigate.navigate('Course2', {id: item.program_id})
    // alert('Id : ' + item.program_id + ' Title : ' + item.area_of_study);
  };

  return (

    <ImageBackground source={require('../src/img/IMG_0201.jpg')} style={styles.image}>     
    <SafeAreaView style={{flex: 1}}>

      <View style={styles.container}>
     <Header2 />
        
        <TextInput
          style={styles.textInputStyle}
          onChangeText={searchFilterFunction}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="分類搜尋"
        />
        {flIsActive?
        <FlatList
          style={flIsActive ? styles.flatlistIsActive : styles.flatlist}
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
        :<></>
        }
      </View>
      
      
        {data !== null ? (
              <FlatList
                data={data}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigate.navigate('Course2', {id: item.program_id})
                    }>
                    <View style={styles.bigbox}>
                      <Text style={styles.box1}> {item.program_name}</Text>
                      <Text style={styles.box}>{item.course_type}</Text>
                      <Text style={styles.box}> {item.organization_name}</Text>
                      {/* <Text style={styles.box}>${item.price}</Text> */}
                      <Text style={styles.box}>{item.year}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
          ) : null}
      

      

    </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#003f5c',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#003f5c',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
  },
  flatlist: {
    display: 'none',
  },
  flatlistIsActive: {
    display: 'flex',
  },
  container2: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
    bigbox: {
       display: 'flex',
       alignItems: 'center',
       margin: 14,
       borderRadius: 50,
       padding: 12,
       backgroundColor: 'rgba(212,237,233,1)',
     },
     box:{
      marginRight:0,
      color: "#003f5c",
      fontSize: 16,
    },
    box1:{
      marginRight:0,
      color: "#003f5c",
      fontWeight: 'bold',
      fontSize: 18,
    },
    image: {
      flex: 1,
      resizeMode: "stretch",
      justifyContent: "center",
      alignSelf: 'stretch',
    },
    container3: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      },
      tinyLogo: {
        width: 50,
        height: 50,
      },
      button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
   });


export default Home2;