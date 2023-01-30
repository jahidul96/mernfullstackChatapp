import {StyleSheet, View, ScrollView, Alert, StatusBar} from 'react-native';
import React, {useState, FC, useEffect, useContext, useRef} from 'react';
import {AppColors} from '../utils/AppColors';
import InputComp from '../components/InputComp';
import ButtonComp from '../components/ButtonComp';
import {AuthContext} from '../context/AuthContext';
import {getDataOnce} from '../api/getDataOneTime';
import {endpoint, postmessageurl} from '../api/endpoint';
import {postDataToDb, sendMessage} from '../api/postDataToDb';
import ChatTopBar from '../components/ChatTopBar';
import {updateData} from '../api/updateData';
import {io} from 'socket.io-client';
import Allmsg from '../components/Allmsg';

interface Props {
  route: any;
}

var socket: any, selectetdChatCompare: any;
const Chat: FC<Props> = ({route}) => {
  const {user} = useContext<any>(AuthContext);
  const {contactData, chatId} = route.params;
  const [text, setText] = useState('');
  const [allMsg, setAllMsg] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);
  const scrollViewRef = useRef<any>(null);

  // api and route end points

  // update last msg route path
  const updateroutepath = `${endpoint}/api/chat/update/${chatId}`;
  // all msg api endpoint
  const messageUrl = `${endpoint}/api/message?chatId=${chatId}`;

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  }, []);
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
  }, [allMsg]);

  // get all messages
  useEffect(() => {
    setTimeout(() => {
      getDataOnce(messageUrl)
        .then(data => {
          // console.log(data);
          setAllMsg(data);
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
    const data = {
      chatId: chatId,
      senderId: user?._id,
      text,
    };

    const updatedTextData = {lastMsg: text};

    // sending msg and updating reuseable func
    sendMessage(postmessageurl, data, socket, user?._id, contactData?._id)
      .then(data => {
        // console.log(data);
        // update last msg
        updateData(updateroutepath, updatedTextData)
          .then(data => {
            // console.log(data);
          })
          .catch(err => console.log(err));
        setAllMsg([...allMsg, data]);
      })
      .catch(err => {
        console.log(err);
      });
    setText('');
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors.DEEPBLUE,
      }}>
      <StatusBar backgroundColor={AppColors.DEEPBLUE} />

      {/* top header comp */}
      <ChatTopBar
        back
        text={contactData?.name}
        extraTextStyle={styles.extraTextStyle}
        extraHeaderStyle={styles.extraHeaderStyle}
        messageBar
      />

      {/* messages */}
      <ScrollView
        ref={scrollViewRef}
        style={{
          backgroundColor: AppColors.LIGHTDEEPBLUE,
        }}>
        <Allmsg allMsg={allMsg} loading={loading} />
      </ScrollView>

      {/* footer comp */}
      <View style={styles.footerContainer}>
        <InputComp
          placeholder="text"
          setValue={setText}
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
    minHeight: 50,
    maxHeight: 100,
  },
  btnExtraStyle: {
    width: '25%',
    marginTop: -10,
    backgroundColor: AppColors.DEEPBLUE,
  },
  extraTextStyle: {
    fontSize: 20,
  },
  extraHeaderStyle: {
    height: 65,
  },
});
