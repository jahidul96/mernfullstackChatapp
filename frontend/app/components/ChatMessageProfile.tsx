import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AppColors } from "../utils/AppColors";
import { Image } from "react-native";
import TimeAgo from "react-native-timeago";
interface Props {
  members: any;
  chatId: any;
  onPress?: any;
  onLongPress: any;
  lastMsg: any;
  updatedAt?: any;
  seen?: boolean;
  senderId?: any;
}

const img =
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg";

const ChatMessageProfile: FC<Props> = ({
  members,
  chatId,
  onPress,
  onLongPress,
  lastMsg,
  updatedAt,
  seen,
  senderId,
}) => {
  const { user } = useContext<any>(AuthContext);

  // console.log(updatedAt);
  // console.log(seen);
  const allChats = members?.filter((member: any) => member._id !== user?._id);

  return (
    <>
      {allChats?.map((chat: any, index: any) => (
        <TouchableOpacity
          style={styles.container}
          key={index}
          onLongPress={onLongPress}
          onPress={() => onPress(chat, chatId)}
          activeOpacity={0.9}
        >
          <View style={styles.imgWrapper}>
            <Image source={{ uri: img }} style={styles.imgStyle} />
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.nameandDateContainer}>
              <Text style={styles.name}>{chat?.name}</Text>
              {/* <Text style={styles.date}>{updatedAt}</Text> */}
              <TimeAgo time={updatedAt} hideAgo={true} />
            </View>
            <View style={styles.nameandDateContainer}>
              <Text style={styles.lastmsg}>{lastMsg}</Text>
              {senderId == user?._id || seen ? null : (
                <View style={styles.notificationContainer}>
                  <Text style={styles.notificationText}>new</Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default ChatMessageProfile;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  imgWrapper: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  imgStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 8,
  },
  nameandDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    color: AppColors.BLACK,
    textTransform: "capitalize",
  },
  date: {},
  lastmsg: {},
  notificationContainer: {
    backgroundColor: "red",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    paddingVertical: 1,
    paddingHorizontal: 5,
  },
  notificationText: {
    color: AppColors.WHITE,
    marginBottom: 1,
    fontWeight: "bold",
  },
});
