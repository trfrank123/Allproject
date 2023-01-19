import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { Avatar, ListItem } from "@react-native-material/core";
import { StackParams } from '../App';




const Update = () => {
  const navigate = useNavigation<NativeStackNavigationProp<StackParams>>();


return (
<View>
<Button title="上次結果" 
          onPress={async() => { navigate.navigate('MatchCourseList')
        }}
          ></Button>
          <Button title="新結果" 
          onPress={async() => { navigate.navigate('Hobby')
        }}
          ></Button>
</View>
  )};
export default Update;