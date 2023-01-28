import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {FC, useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppColors} from '../utils/AppColors';

interface Props {
  data: any;
  navigation: any;
}

const ContactProfileComp: FC<Props> = ({data, navigation}) => {
  return (
    <>
      {data.map((user: any) => (
        <ContactProfile
          key={user._id}
          userdata={user}
          navigation={navigation}
        />
      ))}
    </>
  );
};

export default ContactProfileComp;

interface ContactProfileProps {
  userdata: any;
  navigation: any;
}
const ContactProfile: FC<ContactProfileProps> = ({userdata, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.chatUserContainer}
      onPress={() => navigation.navigate('Chat', {userdata})}>
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
