import React, { Component } from 'react';
import {StyleSheet,TextInput,FlatList,TouchableOpacity,View ,ScrollView, Text } from 'react-native';
import { List, ListItem } from "react-native-elements";

export class Users extends Component {
  state ={
    post: [],
    photos:'',
    title:'username',
    DataFromApi: [],
  }
  componentDidMount(){
    return fetch('http://10.4.91.120:2000/users')
    .then((response) => response.json())
    .then((responseJson) => {
        //assign json data to list of users
        this.setState({DataFromApi: responseJson})
        console.log(this.state.DataFromApi);
    })
    .catch((error) => {
      console.error(error);
      alert('something wrong with network')
    });
  };
  render(){
    return (
      <View style={styles.container}>
        <List>
          <FlatList
            data={this.state.DataFromApi}
            renderItem={({ item }) => (
              <ListItem
                title={`${item.StudentNumber}`}
                subtitle={item.UserName}
              />
            )}
            keyExtractor={item => item.UserName}
              />
        </List>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455a64',
    justifyContent: 'center',
    flexDirection: 'column'
  },
});
url = 'http://10.4.91.120:2000/users';
async function postdata() {
 try{
   let response = await fetch(url);
   let responseOfjson = await response.json();
   return responseOfjson; //list of data
 }catch(error){
   console.log('error is ' + error)
 }
}
export default Users
