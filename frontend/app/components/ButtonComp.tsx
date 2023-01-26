import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {FC} from 'react';
import {AppColors} from '../utils/AppColors';

interface Props {
  text: string;
  loading?: boolean;
  disabled?: boolean;
  onPress?: any;
  btnExtraStyle?: any;
}
const ButtonComp: FC<Props> = ({
  text,
  disabled,
  loading,
  onPress,
  btnExtraStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.btnContainer,
        btnExtraStyle,
        {backgroundColor: disabled ? AppColors.LightSkyBlue : AppColors.BLUE},
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color="red" />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonComp;

const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: AppColors.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 17,
    color: AppColors.WHITE,
  },
});
