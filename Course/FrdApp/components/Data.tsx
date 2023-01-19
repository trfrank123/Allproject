import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {SafeAreaView, StyleSheet, View, Text, Image, ImageBackground} from 'react-native';

const Data = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setCurrentDate(date + '/' + month + '/' + year + '  00:00');
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={require('../src/img/IMG_0201.jpg')} style={styles.image}>
      <View>
          <Text>7日熱門工作平均人工</Text>
          <View>
          <Text style={styles.textStyle}>programmer：24055</Text>
          <Text style={styles.textStyle}>Data Analyst：24427</Text>
          <Text style={styles.textStyle}>medical:22437</Text>
          <Text style={styles.textStyle}>accountant：23137</Text>
        </View>
          <Text>7日熱門工作招聘數目</Text>
        <View>
          <Text style={styles.textStyle}>programmer：209</Text>
          <Text style={styles.textStyle}>Data Analyst：295</Text>
          <Text style={styles.textStyle}>medical:281</Text>
          <Text style={styles.textStyle}>accountant：340</Text>
        </View>
        <View>
          
        </View>
      </View>
        {<Text style={styles.textStyle2}>update at {currentDate}</Text>} 
        </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container1: {
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
  textStyle: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    margin:10
  },
  textStyle2: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    margin:60
  },
  logo: {
    width: "100%" ,
    height: 250
  },
});

export default Data;
