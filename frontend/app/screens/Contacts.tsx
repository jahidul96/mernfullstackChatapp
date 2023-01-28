import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import {endpoint} from '../api/endpoint';
import {getDataOnce} from '../api/getDataOneTime';
import {AppColors} from '../utils/AppColors';
import ContactProfileComp from '../components/ContactProfileComp';
import TopBackComp from '../components/TopBackComp';

interface Props {
  navigation: any;
}
const Contacts: FC<Props> = ({navigation}) => {
  const {user} = useContext<any>(AuthContext);
  const [allusers, setAllusers] = useState([]);
  const [loading, setLoading] = useState(true);

  // base url
  const url = `${endpoint}/api/auth/${user?._id}`;

  useEffect(() => {
    setTimeout(() => {
      getDataOnce(url)
        .then(data => {
          // console.log(data);
          setAllusers(data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }, 1500);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.DEEPBLUE} />
      <View style={styles.topContainer}>
        <TopBackComp text="ChatApp" onPress={() => navigation.goBack()} />
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={AppColors.DEEPBLUE} />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.contactWraper}>
            <ContactProfileComp data={allusers} navigation={navigation} />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: AppColors.DEEPBLUE,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactWraper: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
