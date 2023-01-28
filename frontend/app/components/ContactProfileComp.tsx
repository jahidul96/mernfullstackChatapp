import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {FC, useContext, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppColors} from '../utils/AppColors';
import {AuthContext} from '../context/AuthContext';
import {getDataOnce} from '../api/getDataOneTime';
import {endpoint} from '../api/endpoint';

interface Props {
  userdata: any;
  navigation: any;
}

const ContactProfileComp: FC<Props> = ({userdata, navigation}) => {
  // console.log(userdata._id);
  const {user} = useContext<any>(AuthContext);

  const apiurl = `${endpoint}/api/chat/singlechat?userid=${user?._id}&contactid=${userdata?._id}`;

  const gotoMsg = () => {
    // calling a api request to server to check already chat created or not!!!
    getDataOnce(apiurl)
      .then(data => {
        // console.log(data);
        data._id
          ? navigation.navigate('Chat', {
              contactData: userdata,
              chatId: data._id,
            })
          : navigation.navigate('NewChat', {
              contactData: userdata,
              chatId: data._id,
            });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  return (
    <TouchableOpacity style={styles.chatUserContainer} onPress={gotoMsg}>
      <View style={styles.contentWrapper}>
        <View style={styles.avatorContainer}>
          <Ionicons name="person" size={24} />
        </View>
        <View style={styles.nameContainer}>
          <Text>{userdata?.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ContactProfileComp;

const styles = StyleSheet.create({
  chatUserContainer: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: AppColors.LightSkyBlue,
    borderRadius: 10,
    paddingHorizontal: 6,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatorContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: AppColors.GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    marginLeft: 6,
  },
});
