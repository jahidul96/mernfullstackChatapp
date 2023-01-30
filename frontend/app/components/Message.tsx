import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {FC, useState} from 'react';
import {AppColors} from '../utils/AppColors';
import TimeAgo from 'react-native-timeago';

interface msgTypes {
  msg: any;
  index: any;
  currentuser: any;
}
const Message: FC<msgTypes> = ({msg, index, currentuser}) => {
  const [showMsgTime, setShowMsgTime] = useState(false);
  // console.log(msg);

  // console.log(currentuser);
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      key={index}
      onPress={() => setShowMsgTime(!showMsgTime)}
      style={[
        styles.msgTextWraper,
        msg.senderId?._id == currentuser?._id
          ? styles.myMsgStyle
          : styles.friendMsg,
      ]}>
      <Text
        style={[
          styles.msgTextStyle,
          msg.senderId?._id == currentuser?._id && styles.mymsgTextStyle,
        ]}>
        {msg?.text}
      </Text>
      {showMsgTime && (
        <Text style={styles.msgTimeStyle}>
          <TimeAgo time={msg?.createdAt} />
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Message;

const styles = StyleSheet.create({
  msgTextWraper: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 15,
    position: 'relative',
  },
  msgTextStyle: {
    fontSize: 15,
    backgroundColor: AppColors.BLACK,
    paddingHorizontal: 13,
    paddingVertical: 7,
    minWidth: '10%',
    maxWidth: '80%',
    borderRadius: 16,
    color: AppColors.WHITE,
  },

  myMsgStyle: {alignItems: 'flex-end'},
  friendMsg: {alignItems: 'flex-start', textAlign: 'left'},
  mymsgTextStyle: {
    backgroundColor: AppColors.BLUE,
    textAlign: 'right',
  },
  msgTimeStyle: {
    color: AppColors.WHITE,
    fontSize: 12,
    marginTop: 5,
  },
});
