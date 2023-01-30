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
import ChatTopBar from '../components/ChatTopBar';
import {Appbar} from 'react-native-paper';

interface Props {
  navigation: any;
  route: any;
}
const Contacts: FC<Props> = ({navigation, route}) => {
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

  const menuPress = () => {};

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.DEEPBLUE} />
      <ChatTopBar
        text="Contacts"
        back={true}
        extraTextStyle={styles.extraTextStyle}
        extraHeaderStyle={styles.extraHeaderStyle}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={AppColors.DEEPBLUE} />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.contactWraper}>
            {allusers?.map((user: any) => (
              <ContactProfileComp
                key={user._id}
                userdata={user}
                navigation={navigation}
              />
            ))}
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
    paddingHorizontal: 10,
  },
  extarBackStyle: {
    paddingHorizontal: 0,
  },
  extraTextStyle: {
    fontSize: 20,
  },
  extraHeaderStyle: {
    height: 70,
  },
});
