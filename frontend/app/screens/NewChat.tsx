import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, FC, useEffect, useContext, useRef} from 'react';
import {AppColors} from '../utils/AppColors';
import InputComp from '../components/InputComp';
import ButtonComp from '../components/ButtonComp';
import {AuthContext} from '../context/AuthContext';
import {getDataOnce} from '../api/getDataOneTime';
import {endpoint} from '../api/endpoint';
import {postDataToDb} from '../api/postDataToDb';
import ChatTopBar from '../components/ChatTopBar';
import {io} from 'socket.io-client';

interface Props {
  route: any;
}

var socket, selectetdChatCompare;
const NewChat: FC<Props> = ({route}) => {
  const {user} = useContext<any>(AuthContext);
  const {contactData, chatId} = route.params;
  const [text, setText] = useState('');
  const [allMsg, setAllMsg] = useState([]);
  const [loading, setLoading] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);
  const scrollViewRef = useRef(null);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // socket io
  useEffect(() => {
    socket = io(endpoint);
    socket.emit('join', user);
    socket.on('connected', () => setSocketConnected(true));
    selectetdChatCompare = chatId;
    socket.emit('chat room', chatId);

    socket.emit('typing', () => setTyping(true));
    socket.emit('stop typing', () => setIsTyping(false));
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

  // api endpoint
  const messageUrl = `${endpoint}/api/message?chatId=${chatId}`;

  // get all messages
  useEffect(() => {
    setTimeout(() => {
      getDataOnce(messageUrl)
        .then(data => {
          // console.log(data);
          // setAllMsg(data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    }, 1500);
  }, []);

  //   create chat api
  const createchaturl = '/api/chat/createchat';
  // post msg api route path
  const routePath = '/api/message/postmessage';

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

    postDataToDb(chatdata, createchaturl)
      .then(data => {
        // console.log(data);
        const msgData = {
          chatId: data._id,
          senderId: user?._id,
          text,
        };
        postDataToDb(msgData, routePath)
          .then(data => {
            // console.log(data);

            // data passing to socket so user can recive data instantly
            socket.emit('new message', data, user._id, [
              user._id,
              contactData._id,
            ]);
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
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'small'} color={AppColors.WHITE} />
          </View>
        ) : (
          <View style={styles.msgContainer}>
            {allMsg?.length == 0 ? (
              <View style={styles.emptyTextContainer}>
                <Text style={styles.emptyText}>start messageing!</Text>
              </View>
            ) : (
              allMsg?.map((msg: any, index) => (
                <Message
                  index={index}
                  msg={msg}
                  currentuser={user}
                  key={index}
                />
              ))
            )}
          </View>
        )}
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

interface msgTypes {
  msg: any;
  index: any;
  currentuser: any;
}
const Message: FC<msgTypes> = ({msg, index, currentuser}) => {
  // console.log(msg);
  return (
    <View
      key={index}
      style={[
        styles.msgTextWraper,
        msg.senderId._id == currentuser._id
          ? styles.myMsgStyle
          : styles.friendMsg,
      ]}>
      <Text
        style={[
          styles.msgTextStyle,
          msg.senderId._id == currentuser._id && styles.mymsgTextStyle,
        ]}>
        {msg?.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  msgContainer: {
    padding: 10,
  },
  msgTextWraper: {
    width: '100%',
    alignItems: 'flex-start',
  },
  msgTextStyle: {
    fontSize: 15,
    marginBottom: 12,
    backgroundColor: AppColors.BLACK,
    paddingHorizontal: 15,
    paddingVertical: 7,
    minWidth: '20%',
    maxWidth: '80%',
    borderRadius: 19,
    color: AppColors.WHITE,
  },

  myMsgStyle: {alignItems: 'flex-end'},
  friendMsg: {alignItems: 'flex-start', textAlign: 'left'},
  mymsgTextStyle: {
    backgroundColor: AppColors.BLUE,
    textAlign: 'right',
  },

  emptyTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: AppColors.WHITE,
    fontSize: 17,
  },
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
