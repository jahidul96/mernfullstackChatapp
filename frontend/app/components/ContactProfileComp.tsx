import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {FC, useContext, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppColors} from '../utils/AppColors';
import {AuthContext} from '../context/AuthContext';
import {getDataOnce} from '../api/getDataOneTime';
import {endpoint} from '../api/endpoint';
import {Image} from 'react-native';

interface Props {
  userdata: any;
  navigation: any;
}
const img =
  'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg';

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
    <TouchableOpacity style={styles.container} onPress={gotoMsg}>
      <View style={styles.imgWrapper}>
        <Image source={{uri: img}} style={styles.imgStyle} />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{userdata?.name}</Text>
        <Text style={styles.bio}>Bio!!</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ContactProfileComp;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  imgWrapper: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  nameContainer: {
    marginLeft: 12,
  },

  name: {
    fontSize: 16,
    color: AppColors.BLACK,
    textTransform: 'capitalize',
  },
  bio: {
    fontSize: 15,
  },
});
