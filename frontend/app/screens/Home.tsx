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

interface Props {
  navigation: any;
}
const Home: FC<Props> = ({navigation}) => {
  const {user} = useContext<any>(AuthContext);
  const [allChats, setAllChats] = useState([]);

  // base url
  const url = `${endpoint}/api/chat/${user?._id}`;

  useEffect(() => {
    getDataOnce(url)
      .then(data => {
        // console.log(data);
        setAllChats(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.DEEPBLUE} />
      <View style={styles.topContainer}>
        <Text style={styles.appText}>Chatapp</Text>
      </View>

      {/* all chats chats */}

      <ScrollView>
        <View style={styles.chatWrapper}>
          {allChats.map((chat: any, index) => (
            <ChatMessageProfile
              key={index}
              members={chat?.members}
              chatId={chat?._id}
            />
          ))}
        </View>
      </ScrollView>

      {/* floating button */}
      <TouchableOpacity
        style={styles.flotingContainer}
        onPress={() => navigation.navigate('Contacts')}>
        <MaterialIcons name="chat" size={20} color={AppColors.WHITE} />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
