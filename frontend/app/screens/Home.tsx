import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { FC, useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { endpoint } from "../api/endpoint";
import { getDataOnce } from "../api/getDataOneTime";
import { AppColors } from "../utils/AppColors";
import ChatMessageProfile from "../components/ChatMessageProfile";
import ChatTopBar from "../components/ChatTopBar";
import { Alert } from "react-native";
import TextButton from "../components/TextButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextComp from "../components/TextComp";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { updateData } from "../api/updateData";

interface Props {
  navigation: any;
}
const Home: FC<Props> = ({ navigation }) => {
  const { user, setUser } = useContext<any>(AuthContext);
  const [allChats, setAllChats] = useState([]);
  const [showDialogBox, setShowDialogBox] = useState(false);

  // console.log(user);

  // base url
  const url = `${endpoint}/api/chat/${user?._id}`;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataOnce(url)
        .then((data) => {
          // console.log(data);
          setAllChats(data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return unsubscribe;
  }, [navigation]);

  // gotoMsg
  const gotoMsg = (chat: any, chatId: any) => {
    // update last msg route path
    const updateroutepath = `${endpoint}/api/chat/update/${chatId}`;
    const updatedData = {
      seen: true,
    };

    updateData(updateroutepath, updatedData)
      .then((data) => {
        // console.log(data);
      })
      .catch((err) => console.log(err));
    navigation.navigate("Chat", { contactData: chat, chatId: chatId });
  };

  // wantToDelete
  const wantToDelete = () => {
    Alert.alert("hello");
  };

  // menuPrees
  const menuPress = () => {
    setShowDialogBox(!showDialogBox);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.DEEPBLUE} />

      {/* showDialogBox */}
      {showDialogBox && (
        <View style={styles.dialogBox}>
          <TextButton
            text="New Group"
            onPress={() => {
              navigation.navigate("CreateGroup");
              setShowDialogBox(!showDialogBox);
            }}
          />
          <TextButton
            text="Profile"
            onPress={() => {
              // navigation.navigate('Profile');
              // setShowDialogBox(!showDialogBox);
              AsyncStorage.clear();
              setUser(null);
            }}
          />
        </View>
      )}

      {/* topbar content */}
      <ChatTopBar
        text="Chatapp"
        extraHeaderStyle={styles.extraHeaderStyle}
        extraTextStyle={styles.extraTextStyle}
        menuPress={() => setShowDialogBox(!showDialogBox)}
      />
      {/* all chats chats */}

      <ScrollView>
        <View style={styles.chatWrapper}>
          {allChats.length == 0 ? (
            <TextComp text="No chats till now" />
          ) : (
            allChats.map((chat: any, index) => (
              <ChatMessageProfile
                key={index}
                members={chat?.members}
                chatId={chat?._id}
                onPress={gotoMsg}
                lastMsg={chat?.lastMsg}
                seen={chat?.seen}
                updatedAt={chat?.updatedAt}
                onLongPress={wantToDelete}
                senderId={chat?.senderId}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* floating button */}
      <TouchableOpacity
        style={styles.flotingContainer}
        onPress={() => {
          setShowDialogBox(false);
          navigation.navigate("Contacts", { allChats: allChats });
        }}
      >
        <MaterialIcons name="chat" size={20} color={AppColors.WHITE} />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.WHITE,
  },
  topContainer: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    paddingHorizontal: 15,
    backgroundColor: AppColors.DEEPBLUE,
  },
  appText: {
    color: AppColors.WHITE,
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "italic",
  },

  chatWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  flotingContainer: {
    width: 55,
    height: 55,
    position: "absolute",
    backgroundColor: AppColors.DEEPBLUE,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    bottom: 40,
    right: 40,
  },

  dialogBox: {
    position: "absolute",
    width: "45%",
    height: "20%",
    right: 15,
    top: 60,
    justifyContent: "center",
    backgroundColor: AppColors.WHITE,
    elevation: 2,
    zIndex: 999,
  },
  extraTextStyle: {
    fontSize: 20,
  },
  extraHeaderStyle: {
    height: 80,
  },
});
