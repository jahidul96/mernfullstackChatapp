import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppColors} from '../utils/AppColors';

interface Props {
  text: string;
  onPress?: any;
}
const TopBackComp: FC<Props> = ({text, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name="chevron-back" size={22} color={AppColors.WHITE} />
      </TouchableOpacity>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default TopBackComp;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: AppColors.WHITE,
    marginLeft: 6,
    fontSize: 17,
  },
});
