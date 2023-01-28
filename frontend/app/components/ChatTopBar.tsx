import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {AppColors} from '../utils/AppColors';
import {useNavigation} from '@react-navigation/native';

const ChatTopBar = ({contactData}) => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      {/* profile container */}
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color={AppColors.WHITE} />
        </TouchableOpacity>
        <Text style={styles.namePlaceholder}>{contactData?.name}</Text>
      </View>

      {/* icon container */}

      <View style={styles.rightContainer}>
        <TouchableOpacity>
          <Ionicons name="md-videocam" size={22} color={AppColors.WHITE} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="call" size={21} color={AppColors.WHITE} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo
            name="dots-three-vertical"
            size={20}
            color={AppColors.WHITE}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatTopBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: AppColors.DEEPBLUE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  leftContainer: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  namePlaceholder: {
    color: AppColors.WHITE,
    fontSize: 19,
    marginLeft: 8,
    textTransform: 'capitalize',
  },
  rightContainer: {
    width: '35%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
