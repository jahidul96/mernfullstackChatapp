import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { AppColors } from "../utils/AppColors";

interface msgTypes {
  msg: any;
  index: any;
  currentuser: any;
}
const Message: FC<msgTypes> = ({ msg, index, currentuser }) => {
  // console.log(msg);
  return (
    <View
      key={index}
      style={[
        styles.msgTextWraper,
        msg.senderId._id == currentuser._id
          ? styles.myMsgStyle
          : styles.friendMsg,
      ]}
    >
      <Text
        style={[
          styles.msgTextStyle,
          msg.senderId._id == currentuser._id && styles.mymsgTextStyle,
        ]}
      >
        {msg?.text}
      </Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  msgContainer: {
    padding: 10,
  },
  msgTextWraper: {
    width: "100%",
    alignItems: "flex-start",
  },
  msgTextStyle: {
    fontSize: 15,
    marginBottom: 12,
    backgroundColor: AppColors.BLACK,
    paddingHorizontal: 13,
    paddingVertical: 7,
    minWidth: "10%",
    maxWidth: "80%",
    borderRadius: 16,
    color: AppColors.WHITE,
  },

  myMsgStyle: { alignItems: "flex-end" },
  friendMsg: { alignItems: "flex-start", textAlign: "left" },
  mymsgTextStyle: {
    backgroundColor: AppColors.BLUE,
    textAlign: "right",
  },
});
