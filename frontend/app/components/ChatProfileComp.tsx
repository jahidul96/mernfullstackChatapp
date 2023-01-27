import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {FC, useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppColors} from '../utils/AppColors';
import {AuthContext} from '../context/AuthContext';

interface Props {
  data: any;
  navigation: any;
}

const ChatProfileComp: FC<Props> = ({data, navigation}) => {
  return (
    <>
      {data.map((user: any) => (
        <ChatUserProfile
          key={user._id}
          userdata={user}
          navigation={navigation}
        />
      ))}
    </>
  );
};

export default ChatProfileComp;

interface ChatUserProfileProps {
  userdata: any;
  navigation: any;
}
const ChatUserProfile: FC<ChatUserProfileProps> = ({userdata, navigation}) => {
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
    backgroundColor: AppColors.GRAY,
    borderRadius: 10,
    paddingHorizontal: 6,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatorContainer: {
    width: 45,
    height: 45,
    borderRadius: 100,
    backgroundColor: AppColors.LightSkyBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    marginLeft: 6,
  },
});
