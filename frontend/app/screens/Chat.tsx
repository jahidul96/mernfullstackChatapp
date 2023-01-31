import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  StatusBar,
  Text,
  Image,
} from "react-native";
import React, { useState, FC, useEffect, useContext, useRef } from "react";
import { AppColors } from "../utils/AppColors";
import InputComp from "../components/InputComp";
import ButtonComp from "../components/ButtonComp";
import { AuthContext } from "../context/AuthContext";
import { getDataOnce } from "../api/getDataOneTime";
import { endpoint, postmessageurl } from "../api/endpoint";
import { postDataToDb, sendMessage } from "../api/postDataToDb";
import ChatTopBar from "../components/ChatTopBar";
import { updateData } from "../api/updateData";
import { io } from "socket.io-client";
import Allmsg from "../components/Allmsg";
import { useNavigation } from "@react-navigation/native";

interface Props {
  route: any;
}

var socket: any, selectetdChatCompare: any;
const Chat: FC<Props> = ({ route }) => {
  const { user } = useContext<any>(AuthContext);
  const { contactData, chatId } = route.params;
  const [text, setText] = useState("");
  const [allMsg, setAllMsg] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);
  const scrollViewRef = useRef<any>(null);
  const [typing, setTyping] = useState(false);
  const [stopTyping, setStopTyping] = useState(false);
  const navigation = useNavigation<any>();

  // api and route end points

  // update last msg route path
  const updateroutepath = `${endpoint}/api/chat/update/${chatId}`;
  // all msg api endpoint
  const messageUrl = `${endpoint}/api/message?chatId=${chatId}`;

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, []);
  // socket io
  useEffect(() => {
    socket = io(endpoint);
    socket.emit("chat room", chatId);
    socket.on("typing", () => setTyping(true));
    socket.on("stop typing", () => setTyping(false));
  }, []);

  useEffect(() => {
    socket?.on("message recived", (newmessageRecived: any) => {
      // console.log(newmessageRecived);
      setAllMsg([...allMsg, newmessageRecived]);
    });
  });

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [allMsg]);

  // get all messages
  useEffect(() => {
    setTimeout(() => {
      getDataOnce(messageUrl)
        .then((data) => {
          // console.log(data);
          setAllMsg(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1500);
  }, []);

  // sendmsg
  const sendMsg = () => {
    if (!text) {
      return Alert.alert("Type a message!");
    }
    socket.emit("stop typing", chatId);
    const data = {
      chatId: chatId,
      senderId: user?._id,
      text,
    };

    const updatedTextData = { lastMsg: text, seen: false, senderId: user?._id };

    // sending msg and updating reuseable func
    sendMessage(postmessageurl, data, socket, chatId)
      .then((data) => {
        // console.log(data);
        // update last msg
        updateData(updateroutepath, updatedTextData)
          .then((data) => {
            // console.log(data);
          })
          .catch((err) => console.log(err));
        setAllMsg([...allMsg, data]);
      })
      .catch((err) => {
        console.log(err);
      });
    setText("");
  };

  // backPress

  const backPress = () => {
    navigation.goBack();
  };

  const graveInputVal = (val: any) => {
    setText(val);

    // if (!socketConnected) return;
    if (!typing) {
      socket.emit("typing", chatId);
    }

    let lasttypingTime = new Date().getTime();
    let timerlength = 3000;

    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lasttypingTime;
      if (timeDiff >= timerlength && typing) {
        socket.emit("stop typing", chatId);
        setTyping(false);
      }
    }, timerlength);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors.DEEPBLUE,
      }}
    >
      <StatusBar backgroundColor={AppColors.DEEPBLUE} />

      {/* top header comp */}
      <ChatTopBar
        back
        text={contactData?.name}
        extraTextStyle={styles.extraTextStyle}
        extraHeaderStyle={styles.extraHeaderStyle}
        messageBar
        backPress={backPress}
      />

      {/* messages */}
      <ScrollView
        ref={scrollViewRef}
        style={{
          backgroundColor: AppColors.LIGHTDEEPBLUE,
        }}
      >
        <Allmsg allMsg={allMsg} loading={loading} />
      </ScrollView>

      {typing && (
        <View
          style={{
            backgroundColor: AppColors.LIGHTDEEPBLUE,
          }}
        >
          <Image
            source={require("../assets/images/typing.gif")}
            style={styles.typingImg}
          />
        </View>
      )}

      {/* footer comp */}
      <View style={styles.footerContainer}>
        <InputComp
          placeholder="text"
          setValue={graveInputVal}
          extraStyle={styles.extraStyle}
          value={text}
          numberOfLines={5}
          multiline={true}
        />

        <ButtonComp
          text="Send"
          btnExtraStyle={styles.btnExtraStyle}
          onPress={sendMsg}
        />
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  footerContainer: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: AppColors.LIGHTDEEPBLUE,
    paddingHorizontal: 15,
  },
  extraStyle: {
    width: "70%",
    minHeight: 50,
    maxHeight: 100,
  },
  btnExtraStyle: {
    width: "25%",
    marginTop: -10,
    backgroundColor: AppColors.DEEPBLUE,
  },
  extraTextStyle: {
    fontSize: 20,
  },
  extraHeaderStyle: {
    height: 65,
  },
  typingImg: {
    width: 50,
    height: 30,
    marginRight: 10,
    alignSelf: "flex-end",
  },
});
