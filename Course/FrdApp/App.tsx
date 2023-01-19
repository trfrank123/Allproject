import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
  Keyboard,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';

import {connect} from 'react-redux';
import {AnyAction, bindActionCreators, Dispatch} from 'redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

///page///
import First from './components/First';
import Become from './components/Become';
import Foreword from './components/Foreword';
import UserName from './components/UserName';
import Identity from './components/Identity';
import Education from './components/Education';
import ExpectSalaryAndWorkLocation from './components/ExpectSalaryAndWorkLocation';
import Location from './components/Location';
import EditUserInfo from './components/EditUserInfo';

import Hobby from './components/Hobby';

import Login from './components/Login';
import UserInfo from './components/UserInfo';

import Home from './components/Home';
import HotCourse from './components/Update';
import Foodter from './components/Foodter';
import AllCourse from './components/AllCourse';
import AboutUs from './components/AboutUs';
import Course from './components/Course';
import MatchCourseList from './components/MatchCourseList';
import Data from './components/Data';
import Update from './components/Update';
import MyCourse from './components/MyCourse';
import Home2 from './components/Home2';
import Foodter2 from './components/Foodter2';
import AllCourse2 from './components/AllCourse2';
import Become2 from './components/Become2';
import Course2 from './components/Course2';

// import Tast from'./components/Test';
// import LatestWorkCompany from "./components/LatestWorkCompany";
// import SelfProsAndCons from './components/SelfProsAndCons';
// import Disclaimer from './components/Disclaimer'
// import UploadIcon from './components/UploadIcon'
// import CourseFeeBudget from './components/CourseFeeBudget';

export type StackParams = {
  First;
  Become;
  Foreword;
  UserName;
  Identity;
  Education;
  ExpectSalaryAndWorkLocation;
  Location;
  Hobby;
  Foodter;
  Login;
  UserInfo;
  EditUserInfo;
  Home;
  AboutUs;
  HotCourse;
  AllCourse;
  Course;
  MatchCourseList;
  Data;
  Update;
  MyCourse;
  Home2;
  Foodter2;
  AllCourse2;
  Become2,
  Course2,
  // CourseFeeBudget,
  // Disclaimer,
  // UploadIcon,
  // UselessTextInput,
  // LatestWorkCompany,
  // SelfProsAndCons,
};

const Stack = createNativeStackNavigator<StackParams>();

import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';

function App() {
  useEffect(() => {
    async function main() {
      await requestUserPermission();
      await regNotificationListenter();
    }
    main();
  }, []);
  const regNotificationListenter = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('background' + remoteMessage.notification);
      Alert.alert('background' + remoteMessage.notification);
    });

    messaging().onMessage(async remoteMessage => {
      console.log('foreground' + remoteMessage);
      Alert.alert('foreground' + remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(remoteMessage.notification);
          Alert.alert(JSON.stringify(remoteMessage.notification));
        }
      });
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken();
    }
  };

  const getFcmToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      // Alert.alert(fcmToken)
      // console.log(fcmToken)
    } catch (error) {
      console.log(error);
    }
  };

  // , headerBackVisible:false
  // , headerShown: false

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Foodter2">
        <Stack.Screen
          name="First"
          component={First}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="Become"
          component={Become}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="Foreword"
          component={Foreword}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="UserName"
          component={UserName}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="Identity"
          component={Identity}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="Education"
          component={Education}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="ExpectSalaryAndWorkLocation"
          component={ExpectSalaryAndWorkLocation}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="Location"
          component={Location}
          options={{title: '工作地區'}}
        />
        <Stack.Screen 
        name="Hobby" 
        component={Hobby} 
        options={{title: '', headerStyle: {backgroundColor: 'rgba(168,193,197,255)'}}} />

        <Stack.Screen name="Home" 
        component={Home} 
        options={{title: ''}} />

        <Stack.Screen
          name="UserInfo"
          component={UserInfo}
          options={{title: '', 
            headerShown: false}}
        />
        <Stack.Screen
          name="EditUserInfo"
          component={EditUserInfo}
          options={{title: '', 
            headerStyle: {backgroundColor: 'rgba(168,193,197,255)'}}}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{title: '', 
            headerShown: false}}
        />
        <Stack.Screen
          name="HotCourse"
          component={HotCourse}
          options={{title: '', 
            headerStyle: {backgroundColor: 'rgba(168,193,197,255)'}}}
        />
        <Stack.Screen name="Login" 
        component={Login} 
        options={{title: '', 
          headerStyle: {backgroundColor: 'rgba(168,193,197,255)'}}} />

        <Stack.Screen
          name="Foodter"
          component={Foodter}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen
          name="AllCourse"
          component={AllCourse}
          options={{title: '', 
            headerStyle: {backgroundColor: 'rgba(168,193,197,255)'}}}
        />
        <Stack.Screen 
        name="Course" 
        component={Course} 
        options={{title: '課程詳細資料', 
          headerStyle: {backgroundColor: 'rgba(168,193,197,255)'}}} />
        
        <Stack.Screen
          name="MatchCourseList"
          component={MatchCourseList}
          options={{title: '', 
            headerStyle: {backgroundColor: 'rgba(168,193,197,255)'}}}/>

        <Stack.Screen name="Data" 
        component={Data} 
        options={{title: '', 
          headerStyle: {backgroundColor: 'rgba(168,193,197,255)'}}}/>

        <Stack.Screen 
        name="Update" 
        component={Update} 
        options={{title: '', 
          headerStyle: {backgroundColor: 'rgba(168,193,197,255)'}}} />
        
        <Stack.Screen
          name="MyCourse"
          component={MyCourse}
          options={{title: '', headerStyle: {backgroundColor: 'rgba(168,193,197,255)'}}}/>

        <Stack.Screen
          name="AllCourse2"
          component={AllCourse2}
          options={{title: '', headerStyle: {backgroundColor: 'rgba(168,193,197,255)'}}}
        />

        <Stack.Screen
          name="Home2"
          component={Home2}
          options={{title: ''}}/>

        <Stack.Screen
          name="Foodter2"
          component={Foodter2}
          options={{title: '', 
            headerShown: false, }}/>

        <Stack.Screen
          name="Become2"
          component={Become2}
          options={{title: '', 
            headerShown: false}}/>


        <Stack.Screen
          name="Course2"
          component={Course2}
          options={{title: '', 
          headerStyle: {backgroundColor: 'rgba(168,193,197,255)'}}}/>

        {/* <Stack.Screen name="Test" component={Test} options={{title: ''}}></Stack.Screen> */}
        {/* <Stack.Screen name="Update" component={Update} options={{title: ''}}> */}
        {/* <Stack.Screen name="CourseFeeBudget" component={CourseFeeBudget} options={{ title: '' }}/>  */}
        {/* <Stack.Screen name="MatchCourseList" component={MatchCourseList} options={{title: ''}}/>}
        {/* <Stack.Screen name="LatestWorkCompany" component={LatestWorkCompany} options={{ title: '' }}/> */}
        {/* <Stack.Screen name="SelfProsAndCons" component={SelfProsAndCons} options={{ title: '' }}/>   */}
        {/* <Stack.Screen name="Disclaimer" component={Disclaimer} options={{ title: '' }}/>   */}
        {/* <Stack.Screen name="UploadIcon" component={UploadIcon} options={{ title: '' }}/>  */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  header: {
    fontSize: 20,
  },
  bottom: {
    position: 'absolute',
    bottom: 30,
  },
  fixToText: {
    width: 300,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const mapStateToProps = (state: {count: {count: any}}) => ({
  count: state.count.count,
});

const ActionCreators = Object.assign(
  {},
  // countActions,
);
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default App;
