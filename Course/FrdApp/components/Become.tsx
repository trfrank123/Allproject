import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {StackParams} from '../App';
import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Platform,
  Alert,
  ImageBackground,
  Image
} from 'react-native';

function Become(props: { navigation: { navigate: (arg0: string) => void; }; }) {
  
    const createButtonAlert = () => 
      Alert.alert(
        "收集個人資料聲明",
        "Course(本APP)會使用你提供的個人資料，向申請人提供申請人所需要的活動、課程或服務，包括參與活動、課程或服務的相關用途、簽發收據、收集意見及資料分析。\n\n申請人可隨時向Course(本APP)表明或更改接收推廣及宣傳意願。\n\n閣下有責任提供申請表格上列為「必填」的資料，或啟動相關流程必須提供的資料，否則Course(本APP)有可能無法提供閣下要求之服務。\n\n申請人所提供的個人資料，會供Course(本APP)在工作上有需要知道該等資料的職員或指定人士使用。\n\nCourse(本APP)不會租用、出售、轉移或披露所持有之個人資料予他人或非Course(本APP)有關單位，除非：i. 對方為於業務上向Course(本APP)提供服務的代理機構、承辦商或服務提供者；ii. 閣下要求之服務由有關人士／公司負責提供；iii. 已預先得到資料當事人的同意；iv. 對非法活動、懷疑詐騙、涉及或威脅到任何人的人身安全的事件作出調查、預防及採取行動；v. 遵循所有適用法津、規定、法律程序、具法律效力的政府要求、行政制度或規例要求。\n申請人請確保向Course(本APP)提供的資料正確無誤，並有責任向Course(本APP)更新資料，否則青協有可能無法提供閣下要求之服務。\n申請人有權要求查閱和改正所提供的個人資料及索取有關資料的複本。",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => props.navigation.navigate("UserName")}
        ]
      );
  

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../src/img/IMG_0201.jpg')} style={styles.image}>
       
       <View style={{justifyContent:'center',alignItems:'center'}}>
          <Image style={styles.logo} source={require('../iconFile/img6.png')}/> 

          <TouchableOpacity
            onPress={ createButtonAlert}
            style={styles.button}
            >
            <Text style={styles.text}>希望成為學生</Text>
          </TouchableOpacity>

          <Image style={styles.logo} source={require('../iconFile/img7.png')}/> 

          <TouchableOpacity
            onPress={() => props.navigation.navigate("Login")}
            style={styles.button}
            >
            <Text style={styles.text2}>已是學生 登入😂</Text>
          </TouchableOpacity>

        </View> 

      </ImageBackground>

      
    </View>
      
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
    justifyContent: "center",
    alignSelf: 'stretch'
  },
  button:{
    height: 63,
    width: 230,
    backgroundColor: "rgba(212,237,233,1)",
    borderRadius: 50,
    margin:20,
    justifyContent: "center",
    alignItems: "center",
    },
  text:{
    color: "#003f5c",
    fontSize: 18,
    fontWeight:"bold",
  },
  text2:{
    color: "#003f5c",
    fontSize: 18
  },
  logo: {
    width: 180 ,
    height: 180
  },
});

export default Become;
