import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {FC, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
import ChatProfileComp from '../components/ChatProfileComp';
import {endpoint} from '../api/endpoint';
import UseFetch from '../api/fetchData';
import {getDataOnce} from '../api/getDataOneTime';

interface Props {
  navigation: any;
}
const Home: FC<Props> = ({navigation}) => {
  const {user, setUser} = useContext<any>(AuthContext);
  const [allusers, setAllusers] = useState([]);

  // base url
  const url = `${endpoint}/api/auth`;

  useEffect(() => {
    getDataOnce(url)
      .then(data => {
        // console.log(data);
        setAllusers(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ChatProfileComp data={allusers} navigation={navigation} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
