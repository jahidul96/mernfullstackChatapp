import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopBackComp from '../components/TopBackComp';

const CreateGroup = () => {
  return (
    <View style={styles.container}>
      <TopBackComp text="CreateGroup" />
    </View>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
