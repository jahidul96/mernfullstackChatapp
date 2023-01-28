import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopBackComp from '../components/TopBackComp';

const Profile = () => {
  return (
    <View style={styles.container}>
      <TopBackComp text="Profile" />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
