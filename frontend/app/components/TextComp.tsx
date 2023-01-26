import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';

interface Props {
  text: string;
}
const TextComp: FC<Props> = ({text}) => <Text style={styles.text}>{text}</Text>;

export default TextComp;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
