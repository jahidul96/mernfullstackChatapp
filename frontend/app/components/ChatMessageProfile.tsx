import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../context/AuthContext';
import {AppColors} from '../utils/AppColors';

interface Props {
  members: any;
  chatId: any;
}
const ChatMessageProfile: FC<Props> = ({members, chatId}) => {
  //   console.log(members);
  const {user} = useContext<any>(AuthContext);

  const allChats = members.filter((member: any) => member._id !== user?._id);
  //   console.log(allChats);

  const gotoMsg = () => {
    console.log(chatId);
  };
  return (
    <>
      {allChats.map((chat: any, index: any) => (
        <TouchableOpacity
          style={styles.container}
          key={index}
          onPress={gotoMsg}>
          <View>
            <Ionicons name="person" size={24} />
          </View>
          <Text style={styles.name}>{chat?.name}</Text>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default ChatMessageProfile;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.GRAY,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  name: {
    marginLeft: 7,
    fontSize: 16,
  },
});
