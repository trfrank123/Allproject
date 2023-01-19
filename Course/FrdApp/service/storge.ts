
import AsyncStorage from '@react-native-async-storage/async-storage';
export let setStorge = async (key:string,value:string) => {
    try {
      await AsyncStorage.setItem(
        key,value
      );
    } catch (error) {
      // Error saving data
    }
  };

export let getStorge = async (key:string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!
        console.log(value);
        return value;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

export async function removeStorage (key:string) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  }
  catch(error) {
    console.log('err: ',error)
    return false;
  }

}