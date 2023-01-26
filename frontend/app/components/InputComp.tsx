import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {FC} from 'react';
import {AppColors} from '../utils/AppColors';

interface Props {
  placeholder: string;
  value?: string;
  setValue: any;
  secured?: boolean;
}
const InputComp: FC<Props> = ({placeholder, setValue, value, secured}) => (
  <TextInput
    style={styles.inputStyle}
    placeholder={placeholder}
    onChangeText={text => setValue(text)}
    secureTextEntry={secured}
  />
);

export default InputComp;

const styles = StyleSheet.create({
  inputStyle: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: AppColors.GRAY,
    marginBottom: 10,
    paddingLeft: 10,
  },
});
