import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppColors} from '../utils/AppColors';
import {useNavigation} from '@react-navigation/native';

interface Props {
  text: string;
  extraStyle?: any;
}
const TopBackComp: FC<Props> = ({text, extraStyle}) => {
  const navigation = useNavigation<any>();
  return (
    <View style={[styles.container, extraStyle]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
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
    height: 60,
    backgroundColor: AppColors.DEEPBLUE,
    paddingHorizontal: 15,
  },
  text: {
    color: AppColors.WHITE,
    marginLeft: 15,
    fontSize: 17,
  },
});
