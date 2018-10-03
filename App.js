import React, { Component } from 'react';
import { StyleSheet,StatusBar, TouchableOpacity,Button,TextInput,Text, View } from 'react-native';
import { createStackNavigator,} from 'react-navigation';
import Home from './src/pages/Home.js';
import Login from './src/pages/Login.js';
import Register from './src/pages/Register.js';

export default class App extends React.Component {

  render() {
    return (
      <AppNavigator/>
    );
  }
}

const AppNavigator = createStackNavigator({
Login : {screen: Login},
Home : {screen: Home},
Register: {screen: Register}
})
