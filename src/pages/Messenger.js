import React, { Component } from 'react';
import {StyleSheet,SectionList,TouchableHighlight,TextInput ,View, Text } from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";

export class Messenger extends Component {
  state = {
    messages: [],
  };
  componentDidMount(){
    this.setState({
      messages:[
        {
          _id:1,
          text:'ola',
          createdAt: new Date(),
          name:'jonas',
          avatar:'https://facebook.github.io/react/img/logo_og.png',
        }

      ]
    })
  }
  sendMessages=(messages =[])=>{

    this.setState((previousState)=>({
      messages : GiftedChat.append(previousState.messages, messages)
    }))
    sendMessage(messages).then((jres) =>{
      if(jres.success === true){
        alert('you have registered now you can login');
        
      }else{
        alert('check network connection'); 
      }
    });
  }
  render() {
      return (
          <GiftedChat messages={this.state.messages} 
          onSend={(messages)=>this.sendMessages(messages)}
          user={{
            _id:1,
          }}
          />
      );
    
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

url = 'http://10.4.64.215:2000/messages';
async function sendMessage(param) {
 try{
   let response = await fetch(url, {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(param)
   });
   let jres = await response.json();
   return jres;
 }catch(error){
   console.log('error is ' + error)
 }
}

export default Messenger
