import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import {StackParams} from '../App';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity
} from 'react-native';

function Disclaimer(props) {
  const [count, setCount] = useState(0);

//   useEffect(() => {
//     const interval = this.setTimeout(() => {
//       setCount(count + 1)
//       props.navigation.navigate("UserName")
//     }, 3000);
//     return () => {
//       clearInterval(this._interval);
//     }
//   }, []);

  return (
    <View style={styles.container}>
        <Text style={styles.header}>免責聲明</Text>
        <Text style={styles.caption}>
        本網站資料只供參考之用，
        該資料均以「現況」形式提供，只作一般性質及參考、說明用途。
        尤其是，對於該等內容的準確性、可靠性、安全性及時間性，
        xx概不作任何明示或默示的保證，xx亦不作出任何明示或暗示保證該等內容適合使用，並無侵權或不含電腦病毒。{"\n"}
        {"\n"}
        對該資料，xx不會就任何錯誤、遺漏、或錯誤陳述或失實陳述（不論明示或默示的）承擔任何責任。
        對任何因使用或不當使用或依據該資料或不能使用本網站而引致或所涉及的任何損失、毀壞或損害（包括但不限於相應而生的損失、毀壞或損害），xx概不承擔任何法律責任、義務或責任。
        如因使用或依據本網站或經本網站進入的任何第三方網站的內容而招致任何損失或損害，
        xx概不負上任何責任。{"\n"}
        
        </Text>
      {/* <Text style={styles.caption2}>
        填完個人資料後會幫你配對相似的課程
      </Text> */}
      {/* <View>
            <TouchableOpacity
            onPress={() => props.navigation.navigate("UserName")}
            >
            </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
    borderRadius: 50,
  },
  caption: {
    color: "rgba(0,0,0,1)",
    fontSize: 18,
    height: 600,
    margin: 15,
    backgroundColor: "rgba(212,237,233,1)",
    borderRadius: 50,
    padding: 30,
    overflow: 'hidden',
    lineHeight:30
  },
  header: {
    color: "black",
    fontSize: 23
  },
});

export default Disclaimer;
