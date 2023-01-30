import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import React, {FC, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../context/AuthContext';
import {postDataToDb} from '../../api/postDataToDb';
import InputComp from '../../components/InputComp';
import ButtonComp from '../../components/ButtonComp';
import TextComp from '../../components/TextComp';
import {AppColors} from '../../utils/AppColors';
import {authStyles} from './authStyles';

interface Props {
  navigation: any;
}

const Login: FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {setUser} = useContext<any>(AuthContext);

  const login = async () => {
    setLoading(true);
    const routePath = '/api/auth/login';
    if (!email || !password) {
      setLoading(false);
      return Alert.alert("Fill all the field's");
    }

    const data = {
      email: email.toLowerCase(),
      password,
    };

    setTimeout(() => {
      try {
        postDataToDb(data, routePath)
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
      <Text style={authStyles.registerText}>Login</Text>
      <InputComp placeholder="email" setValue={setEmail} />
      <InputComp placeholder="password" setValue={setPassword} secured={true} />
      <ButtonComp
        text="Sing In"
        onPress={login}
        disabled={loading ? true : false}
        loading={loading}
        btnExtraStyle={authStyles.btnExtraStyle}
      />
      <View style={authStyles.linkTextWrapper}>
        <TextComp
          text="Don't have an account ?"
          extraTextStyle={authStyles.extraTextStyle}
        />
        <TouchableOpacity
          style={authStyles.linkWrapper}
          onPress={() => navigation.navigate('Register')}>
          <TextComp
            text="Register!"
            extraTextStyle={authStyles.extraTextStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
