import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {FC, useContext, useState, useEffect} from 'react';
import {AuthContext} from '../context/AuthContext';
import {endpoint} from '../api/endpoint';
import {getDataOnce} from '../api/getDataOneTime';
import {AppColors} from '../utils/AppColors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ChatMessageProfile from '../components/ChatMessageProfile';
import ChatTopBar from '../components/ChatTopBar';
import {Alert} from 'react-native';
import TextButton from '../components/TextButton';

interface Props {
  navigation: any;
}
const Home: FC<Props> = ({navigation}) => {
  const {user} = useContext<any>(AuthContext);
  const [allChats, setAllChats] = useState([]);
  const [showDialogBox, setShowDialogBox] = useState(false);

  // base url
  const url = `${endpoint}/api/chat/${user?._id}`;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataOnce(url)
        .then(data => {
          // console.log(data);
          setAllChats(data);
        })
        .catch(err => {
          console.log(err);
        });
    });
    return unsubscribe;
  }, [navigation]);

  // gotoMsg
  const gotoMsg = (chat: any, chatId: any) => {
    // console.log(chatId);
    navigation.navigate('Chat', {contactData: chat, chatId: chatId});
  };

  // wantToDelete
  const wantToDelete = () => {
    Alert.alert('hello');
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
              navigation.navigate('CreateGroup');
              setShowDialogBox(!showDialogBox);
            }}
          />
          <TextButton
            text="Profile"
            onPress={() => {
              navigation.navigate('Profile');
              setShowDialogBox(!showDialogBox);
            }}
          />
        </View>
      )}

      {/* topbar content */}
      <ChatTopBar home={true} text="Chatapp" menuPrees={menuPress} />
      {/* all chats chats */}

      <ScrollView>
        <View style={styles.chatWrapper}>
          {allChats.map((chat: any, index) => (
            <ChatMessageProfile
              key={index}
              members={chat?.members}
              chatId={chat?._id}
              onPress={gotoMsg}
              lastMsg={chat?.lastMsg}
              onLongPress={wantToDelete}
            />
          ))}
        </View>
      </ScrollView>

      {/* floating button */}
      <TouchableOpacity
        style={styles.flotingContainer}
        onPress={() => {
          setShowDialogBox(false);
          navigation.navigate('Contacts', {allChats: allChats});
        }}>
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
    width: '100%',
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: AppColors.DEEPBLUE,
  },
  appText: {
    color: AppColors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },

  chatWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  flotingContainer: {
    width: 55,
    height: 55,
    position: 'absolute',
    backgroundColor: AppColors.DEEPBLUE,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 40,
    right: 40,
  },

  dialogBox: {
    position: 'absolute',
    width: '45%',
    height: '20%',
    right: 15,
    top: 60,
    justifyContent: 'center',
    backgroundColor: AppColors.WHITE,
    elevation: 2,
    zIndex: 999,
  },
});
