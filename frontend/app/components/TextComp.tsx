import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';

interface Props {
  text: string;
  extraTextStyle?: any;
}
const TextComp: FC<Props> = ({text, extraTextStyle}) => (
  <Text style={[styles.text, extraTextStyle]}>{text}</Text>
);

export default TextComp;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
