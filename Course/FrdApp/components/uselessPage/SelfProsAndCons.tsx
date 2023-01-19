import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import { StackParams } from '../App';



const UselessTextInput = (props) => {
    return (
      <TextInput
        {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable
        maxLength={400}
      />
    );
  }

const SelfProsAndCons = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const [text, onChangeText] = React.useState("SelfProsAndCons");
    return (
      <View style={styles.container}>
        <View>
        <Text style={styles.header}>分享一下你的個人優勢吧</Text>
        <Text>稍後可以隨時修改</Text>

  <UselessTextInput
        multiline
        numberOfLines={4}
        onChangeText={(text: React.SetStateAction<string>) => onChangeText(text)}
        value={text}
        placeholder="從性格、技能、在校榮譽和實習經歷方面簡單
        介紹"
        style={{padding: 10, borderWidth: 1,}}
      />
        </View>
  
        <View style={styles.bottom}>
          <Button
          title="Next"
          onPress={() =>
            navigation.navigate('UploadIcon')
          }
          />
        </View>
  
      </View>
    );

    const UselessTextInputMultiline = () => {
        const [value, onChangeText] = React.useState('Useless Multiline Placeholder');
      
        // If you type something in the text box that is a color, the background will change to that
        // color.
        return (
          <View
            style={{
              backgroundColor: value,
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
            }}>
            <SelfProsAndCons
              multiline
              numberOfLines={4}
              onChangeText={text => onChangeText(text)}
              value={value}
              style={{padding: 10}}
            />
          </View>
        );
      }
  };


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textCenter:{
      textAlign :'center'
    },
    header:  {
      fontSize: 20, 
    },
    bottom: {
      position: 'absolute',
      bottom:30
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
  });
  

  export default SelfProsAndCons;