import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {FC, useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppColors} from '../utils/AppColors';
import {AuthContext} from '../context/AuthContext';

interface Props {
  data: any;
}

const ChatProfileComp: FC<Props> = ({data}) => {
  const {user} = useContext<any>(AuthContext);

  // excluding myself
  const alluser = data.filter((d: any) => d._id !== user?._id);
  //   console.log('all user =========');
  //   console.log(alluser);
  return (
    <>
      {alluser.map((user: any) => (
        <ChatUserProfile key={user._id} data={user} />
      ))}
    </>
  );
};

export default ChatProfileComp;

interface ChatUserProfileProps {
  data: any;
}
const ChatUserProfile: FC<ChatUserProfileProps> = ({data}) => {
  return (
    <TouchableOpacity
      style={styles.chatUserContainer}
      onPress={() => Alert.alert('hell')}>
      <View style={styles.contentWrapper}>
        <View style={styles.avatorContainer}>
          <Ionicons name="person" size={24} />
        </View>
        <View style={styles.nameContainer}>
          <Text>{data?.name}</Text>
          <Text>hello</Text>
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
