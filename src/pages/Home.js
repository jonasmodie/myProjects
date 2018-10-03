import React, { Component } from 'react';
import {StyleSheet,TextInput,AsyncStorage,View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Users from './Users.js';
import Messenger from './Messenger.js';
import Articles from './Articles.js';
import Feed from '../component/Feed.js';
import DataList from '../component/DataList.js';
import Post_update from '../component/Post_update.js';

export class Home extends Component {
  state ={
    image: null,
    post: [],
    photos:'',
    title:'username',
    username:'',
    DataFromApi: [],
    isLoading: true
  }
  refresh=()=>{
    
    return fetch('http://10.4.91.120:2000/updates')
    .then((response) => response.json())
    .then((responseJson) => {
        //assign json data to list of users
        this.setState({DataFromApi: responseJson})
        console.log(this.state.DataFromApi);
    })
    .catch((error) => {
      console.error(error);
    });

  }
  render() {
    return (
      <View style={styles.container}>
        <Post_update/>
        <DataList/>
      </View>

    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455a64',
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column',
  }
});

 export default createBottomTabNavigator({
  Home : Home,
  Users: Users,
  Messenger: Messenger,
  Articles: Articles,
});
