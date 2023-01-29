import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {FC} from 'react';
import {AppColors} from '../utils/AppColors';

interface Props {
  placeholder: string;
  value?: string;
  setValue: any;
  secured?: boolean;
  extraStyle?: any;
  numberOfLines?: any;
  multiline?: boolean;
}
const InputComp: FC<Props> = ({
  placeholder,
  setValue,
  value,
  secured,
  extraStyle,
  numberOfLines,
  multiline,
}) => (
  <TextInput
    style={[styles.inputStyle, extraStyle]}
    placeholder={placeholder}
    onChangeText={text => setValue(text)}
    numberOfLines={numberOfLines}
    secureTextEntry={secured}
    value={value}
    multiline={multiline}
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
