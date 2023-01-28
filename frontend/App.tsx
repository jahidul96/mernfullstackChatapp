import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './app/screens/Register';
import Login from './app/screens/Login';
import {AuthContext, AuthProvider} from './app/context/AuthContext';
import Home from './app/screens/Home';
import {getData} from './app/utils/AppStorage';
import Loading from './app/screens/Loading';
import Chat from './app/screens/Chat';
import Contacts from './app/screens/Contacts';
import NewChat from './app/screens/NewChat';
import Profile from './app/screens/Profile';
import CreateGroup from './app/screens/CreateGroup';

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [appLoading, setAppLoading] = useState(true);
  useEffect(() => {
    getData()
      .then(value => {
        setUser(value);
        setAppLoading(false);
        // console.log(value);
      })
      .catch(e => {
        console.log(e), setAppLoading(false);
      })
      .finally(() => {
        setAppLoading(false);
      });
  }, []);
  return (
    <NavigationContainer>
      <AuthContext.Provider value={{user, setUser}}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {appLoading ? (
            <Stack.Screen name="Loading" component={Loading} />
          ) : user ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Chat" component={Chat} />
              <Stack.Screen name="NewChat" component={NewChat} />
              <Stack.Screen name="Contacts" component={Contacts} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="CreateGroup" component={CreateGroup} />
            </>
          ) : (
            <>
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Login" component={Login} />
            </>
          )}
        </Stack.Navigator>
        {/* {user ? (
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            initialRouteName="Register"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        )} */}
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
