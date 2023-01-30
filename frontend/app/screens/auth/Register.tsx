import {Text, TouchableOpacity, View, Alert, StatusBar} from 'react-native';
import React, {FC, useState, useContext} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../context/AuthContext';
import {postDataToDb} from '../../api/postDataToDb';
import {AppColors} from '../../utils/AppColors';
import InputComp from '../../components/InputComp';
import ButtonComp from '../../components/ButtonComp';
import TextComp from '../../components/TextComp';
import {authStyles} from './authStyles';
import {registerUrl} from '../../api/endpoint';

interface Props {
  navigation: any;
}

const Register: FC<Props> = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {setUser} = useContext<any>(AuthContext);

  const register = async () => {
    setLoading(true);
    const routePath = '/api/auth/register';
    if (!email || !password || !name) {
      setLoading(false);
      return Alert.alert("Fill all the field's");
    }

    const data = {
      email: email.toLowerCase(),
      password,
      name,
    };

    setTimeout(() => {
      try {
        postDataToDb(data, registerUrl)
          .then(async value => {
            Alert.alert(value.message);
            const jsonValue = JSON.stringify(value.user);
            await AsyncStorage.setItem('user', jsonValue);
            setUser(value.user);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    }, 2000);
  };
  return (
    <View style={authStyles.root}>
      <StatusBar backgroundColor={AppColors.DEEPBLUE} />
      <Text style={authStyles.registerText}>Register</Text>
      <InputComp placeholder="name" setValue={setName} />
      <InputComp placeholder="email" setValue={setEmail} />
      <InputComp placeholder="password" setValue={setPassword} secured />
      <ButtonComp
        text="Sign In"
        onPress={register}
        loading={loading}
        disabled={loading ? true : false}
        btnExtraStyle={authStyles.btnExtraStyle}
      />

      <View style={authStyles.linkTextWrapper}>
        <TextComp
          text="Already have an account ?"
          extraTextStyle={authStyles.extraTextStyle}
        />
        <TouchableOpacity
          style={authStyles.linkWrapper}
          onPress={() => navigation.navigate('Login')}>
          <TextComp text="Login!" extraTextStyle={authStyles.extraTextStyle} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
