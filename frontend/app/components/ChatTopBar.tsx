import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {AppColors} from '../utils/AppColors';
import {useNavigation} from '@react-navigation/native';
import {Appbar} from 'react-native-paper';

interface Props {
  contactData?: any;
  text?: any;
  back?: boolean;
  extraTextStyle?: any;
  extraHeaderStyle?: any;
  messageBar?: boolean;
  menuPress?: any;
}
const ChatTopBar: FC<Props> = ({
  contactData,
  text,
  extraTextStyle,
  back,
  extraHeaderStyle,
  messageBar,
  menuPress,
}) => {
  const navigation = useNavigation<any>();
  return (
    <Appbar.Header
      style={[styles.headerStyle, extraHeaderStyle]}
      elevated={true}>
      {back && (
        <Appbar.BackAction
          color={AppColors.WHITE}
          onPress={() => navigation.goBack()}
        />
      )}
      <Appbar.Content
        titleStyle={[styles.appText, extraTextStyle]}
        title={text}
      />

      {messageBar && (
        <Appbar.Action
          icon={require('../assets/icons/video.png')}
          color={AppColors.WHITE}
          onPress={() => {}}
        />
      )}
      {messageBar ? (
        <Appbar.Action
          size={20}
          icon={require('../assets/icons/phone.png')}
          color={AppColors.WHITE}
          onPress={() => {}}
        />
      ) : (
        <Appbar.Action
          icon="magnify"
          color={AppColors.WHITE}
          onPress={() => {}}
        />
      )}

      <Appbar.Action
        icon="dots-vertical"
        color={AppColors.WHITE}
        onPress={menuPress}
      />
    </Appbar.Header>
  );
};

export default ChatTopBar;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: AppColors.DEEPBLUE,
    height: 80,
  },
  appText: {
    color: AppColors.WHITE,
    fontSize: 23,
    fontWeight: 'bold',
  },
});
