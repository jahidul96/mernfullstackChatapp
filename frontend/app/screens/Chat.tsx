import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useState, FC, useEffect, useContext} from 'react';
import {AppColors} from '../utils/AppColors';
import InputComp from '../components/InputComp';
import ButtonComp from '../components/ButtonComp';
import {AuthContext} from '../context/AuthContext';
import {getDataOnce} from '../api/getDataOneTime';
import {endpoint} from '../api/endpoint';
import {postDataToDb} from '../api/postDataToDb';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

interface Props {
  route: any;
}
const Chat: FC<Props> = ({route}) => {
  const {user} = useContext<any>(AuthContext);
  const {userdata} = route.params;
  const [text, setText] = useState('');
  const [allMsg, setAllMsg] = useState([]);
  const navigation = useNavigation<any>();

  // api endpoint
  const messageUrl = `${endpoint}/api/message?from=${user?._id}&to=${userdata?._id}`;

  // get all messages
  // useEffect(() => {
  //   getDataOnce(messageUrl)
  //     .then(data => {
  //       // console.log(data);
  //       setAllMsg(data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);

  // sendmsg

  const sendMsg = () => {
    const routePath = '/api/message/postmessage';
    if (!text) {
      return Alert.alert('Type a message!');
    }
    const data = {
      chatmembers: [user?._id, userdata?._id],
      senderId: user?._id,
      text,
    };
    postDataToDb(data, routePath)
      .then(data => {
        // console.log(data);
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
      }}>
      <StatusBar backgroundColor={AppColors.DEEPBLUE} />

      {/* top header comp */}
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color={AppColors.WHITE} />
        </TouchableOpacity>
        <Text style={styles.namePlaceholder}>{userdata?.name}</Text>
      </View>

      {/* messages */}
      <ScrollView
        style={{
          backgroundColor: AppColors.LIGHTDEEPBLUE,
        }}>
        {/* <View style={styles.msgContainer}>
          {allMsg.map((msg: any, index) => (
            <Message index={index} msg={msg} currentuser={user} />
          ))}
        </View> */}
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

export default Chat;

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
        msg.senderId == currentuser._id ? styles.myMsgStyle : styles.friendMsg,
      ]}>
      <Text
        style={[
          styles.msgTextStyle,
          msg.senderId == currentuser._id && styles.mymsgTextStyle,
        ]}>
        {msg?.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.DEEPBLUE,
    paddingHorizontal: 20,
    // borderBottomColor: AppColors.GRAY,
    // borderBottomWidth: 1,
    elevation: 3,
  },
  namePlaceholder: {
    color: AppColors.WHITE,
    fontSize: 19,
    marginLeft: 8,
    textTransform: 'capitalize',
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
  friendMsg: {alignItems: 'flex-start'},
  mymsgTextStyle: {
    backgroundColor: AppColors.BLUE,
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
