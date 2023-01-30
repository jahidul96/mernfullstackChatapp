import {StyleSheet, View, ScrollView, Alert, StatusBar} from 'react-native';
import React, {useState, FC, useEffect, useContext, useRef} from 'react';
import {AppColors} from '../utils/AppColors';
import InputComp from '../components/InputComp';
import ButtonComp from '../components/ButtonComp';
import {AuthContext} from '../context/AuthContext';
import {getDataOnce} from '../api/getDataOneTime';
import {createchaturl, endpoint, postmessageurl} from '../api/endpoint';
import {postDataToDb, sendMessage} from '../api/postDataToDb';
import ChatTopBar from '../components/ChatTopBar';
import {io} from 'socket.io-client';
import Allmsg from '../components/Allmsg';
import {updateData} from '../api/updateData';

interface Props {
  route: any;
}

var socket: any, selectetdChatCompare: any;
const NewChat: FC<Props> = ({route}) => {
  const {user} = useContext<any>(AuthContext);
  const {contactData, chatId} = route.params;
  const [text, setText] = useState('');
  const [allMsg, setAllMsg] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);
  const scrollViewRef = useRef<any>(null);

  // api endpoints

  // get all msg api endpoint
  const messageUrl = `${endpoint}/api/message?chatId=${chatId}`;

  // socket io
  useEffect(() => {
    socket = io(endpoint);
    socket.emit('join', user);
    socket.on('connected', () => setSocketConnected(true));
    selectetdChatCompare = chatId;
    socket.emit('chat room', chatId);
  }, []);

  useEffect(() => {
    socket?.on('message recived', (newmessageRecived: any) => {
      if (
        !selectetdChatCompare ||
        selectetdChatCompare !== newmessageRecived.chatId
      ) {
        // give notification
      } else {
        setAllMsg([...allMsg, newmessageRecived]);
      }
    });
  });
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  }, []);
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  }, [allMsg]);

  // get all messages
  useEffect(() => {
    setTimeout(() => {
      getDataOnce(messageUrl)
        .then(data => {
          // console.log(data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    }, 1500);
  }, []);

  // sendmsg
  const sendMsg = () => {
    if (!text) {
      return Alert.alert('Type a message!');
    }

    const chatdata = {
      senderId: user?._id,
      reciverId: contactData?._id,
      lastMsg: text,
    };

    // creating a new chat and then sending a text bcz it's a new chat not exiting!!!
    postDataToDb(chatdata, createchaturl)
      .then(data => {
        // console.log(data);
        const msgData = {
          chatId: data._id,
          senderId: user?._id,
          text,
        };

        // sending msg and updating reuseable func
        sendMessage(
          postmessageurl,
          msgData,
          socket,
          user?._id,
          contactData?._id,
        )
          .then(data => {
            setAllMsg([...allMsg, data]);
          })
          .catch(err => {
            console.log(err);
          });

        setText('');
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      <StatusBar backgroundColor={AppColors.DEEPBLUE} />

      {/* top header comp */}
      <ChatTopBar contactData={contactData} />

      {/* messages */}
      <ScrollView
        ref={scrollViewRef}
        style={{
          backgroundColor: AppColors.LIGHTDEEPBLUE,
        }}>
        <Allmsg loading={loading} allMsg={allMsg} />
      </ScrollView>

      {/* footer comp */}
      <View style={styles.footerContainer}>
        <InputComp
          placeholder="text"
          setValue={setText}
          extraStyle={styles.extraStyle}
          value={text}
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

export default NewChat;

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: AppColors.LIGHTDEEPBLUE,
    paddingHorizontal: 15,
  },
  extraStyle: {
    width: '70%',
  },
  btnExtraStyle: {
    width: '25%',
    marginTop: -10,
    backgroundColor: AppColors.DEEPBLUE,
  },
});
