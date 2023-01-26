import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
