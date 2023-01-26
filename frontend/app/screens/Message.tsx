import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {AppColors} from '../utils/AppColors';
import InputComp from '../components/InputComp';
import ButtonComp from '../components/ButtonComp';

const Message = () => {
  const [text, setText] = useState('');
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={styles.topContainer}>
        <Text style={styles.namePlaceholder}>Message</Text>
      </View>
      <ScrollView></ScrollView>
      <View style={styles.footerContainer}>
        <InputComp
          placeholder="text"
          setValue={setText}
          extraStyle={styles.extraStyle}
        />

        <ButtonComp text="Send" btnExtraStyle={styles.btnExtraStyle} />
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  topContainer: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    backgroundColor: AppColors.BLUE,
    paddingHorizontal: 20,
  },
  namePlaceholder: {
    color: AppColors.WHITE,
    fontSize: 19,
  },
  footerContainer: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: AppColors.WHITE,
    paddingHorizontal: 15,
  },
  extraStyle: {
    width: '70%',
  },
  btnExtraStyle: {
    width: '25%',
    marginTop: -10,
  },
});
