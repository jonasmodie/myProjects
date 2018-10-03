import React, { Component } from 'react';
import { StyleSheet,StatusBar, AsyncStorage,TouchableOpacity,Button,TextInput,Text, View } from 'react-native';
import Home from './Home.js';

export class Login extends Component {


  state = {
      email: '',
      password: '',
      list_of_users:[],
   }
   handleEmail = (text) => {
      this.setState({ email: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }
   login = (email, pass) => {
      body ={
        username: email,
        password: pass
      }
      verify(body).then((responseOfjson)=>{
        console.log(responseOfjson);
        if(responseOfjson.success === true){
          console.log('response message from server is : ' + responseOfjson.message) ;
          console.log('saving username :' + body.username +' in local storage');
          _storeData(body.username)
          this.props.navigation.navigate('Home')
        }
        else{
          console.log('incorrect data')
          alert(responseOfjson.message);
        }
      })
      
   }
   register = () => {
      this.props.navigation.navigate('Register')
   }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#1c313a"
          barStyle="light-content"
        />
        <Text style={styles.textstyle}>login</Text>
        <TextInput style={styles.inputStyle}

          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="username"
          placeholderTextColor="#ffffff"
          onChangeText = {this.handleEmail}/>

        <TextInput style={styles.inputStyle}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="password"
          onChangeText = {this.handlePassword}/>


          <TouchableOpacity style = {styles.submitButton}
            onPress = {() => this.login(this.state.email, this.state.password)
              }>
              <Text style = {styles.submitButtonText}> Login </Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.submitButton}
            onPress = {() => this.register()
              }>
              <Text style = {styles.submitButtonText}> Register </Text>
          </TouchableOpacity>

      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455a64',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {

    width:300,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 20,
    fontSize: 16,
    margin:10

  },
  textstyle: {
    color:'#ffffff',
    fontSize: 20,
  },
  submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
});
url1 = 'http://10.4.91.120:2000/login';
async function verify(param) {
 try{
   let response = await fetch(url1, {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(param)
   });
   let responseOfjson = await response.json();
   return responseOfjson
 }catch(error){
   console.log('error is ' + error)
 }
}
async function _storeData(userId) {
  try {
    await AsyncStorage.setItem('userkey', userId);
  } catch (error) {
    console.log(error);
  }
}
export default Login
