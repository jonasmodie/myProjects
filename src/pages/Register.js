import React, { Component } from 'react';
import { StyleSheet,ScrollView,StatusBar, TouchableOpacity,Button,TextInput,Text, View } from 'react-native';

export class Register extends Component {
  state = {
      email: '',
      password: '',
      firstName:'',
      LastName:'',
      ConfirmPassword: '',
      StudentNumber:'',
      PhoneNumber: ''
   }
   handleStudentNo = (text) => {
      this.setState({ StudentNumber: text })
   }
   handlePhoneNo = (text) => {
    this.setState({ PhoneNumber: text })
 }
   handleEmail = (text) => {
      this.setState({ email: text })
   }
   handleFName = (text) => {
      this.setState({ firstName: text })
   }
   handleLName = (text) => {
      this.setState({ LastName: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }
   handleCPassword = (text) => {
      this.setState({ ConfirmPassword: text })
   }
   login = () => {
    body = { 
    StudentNumber:this.state.StudentNumber,
    firstName:this.state.firstName,
    LastName:this.state.LastName,     
    email: this.state.email,
    password: this.state.password,
    PhoneNumber: this.state.PhoneNumber,
    ConfirmPassword :this.state.ConfirmPassword
  }
    if(body.ConfirmPassword == body.password){
      postuser(body).then((jresponse) =>{
        if(jresponse.success === true){
          alert('you have registered now you can login');
          this.props.navigation.navigate('Login')
        }else{
          alert('input incorrect , make sure email is valid , student number , phone number and password has more than 5 characters'); 
        }
      });
    }
    else{
      alert('passwords do not match');
    }
    
  }
  render() {
    return (
      <ScrollView Styles={styles.contentContainer}>
        <StatusBar
          backgroundColor="#1c313a"
          barStyle="light-content"
        />
        <Text style={styles.textstyle}>login</Text>
        <TextInput style={styles.inputStyle}

          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="firstName"
          placeholderTextColor="#ffffff"
          onChangeText = {this.handleFName}/>
          <TextInput style={styles.inputStyle}

            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="LastName"
            placeholderTextColor="#ffffff"
            onChangeText = {this.handleLName}/>
        <TextInput style={styles.inputStyle}

          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="email"
          placeholderTextColor="#ffffff"
          onChangeText = {this.handleEmail}/>

          <TextInput style={styles.inputStyle}

            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="StudentNumber"
            placeholderTextColor="#ffffff"
            onChangeText = {this.handleStudentNo}/>

            <TextInput style={styles.inputStyle}

            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="PhoneNumber"
            placeholderTextColor="#ffffff"
            onChangeText = {this.handlePhoneNo}/>

        <TextInput style={styles.inputStyle}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="password"
          onChangeText = {this.handlePassword}/>

          <TextInput style={styles.inputStyle}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="ConfirmPassword"
            onChangeText = {this.handleCPassword}/>


          <TouchableOpacity style = {styles.submitButton}
            onPress = {() => this.login()
              }>
              <Text style = {styles.submitButtonText}> Submit </Text>
          </TouchableOpacity>
      </ScrollView>


    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,
    flex: 1,
    backgroundColor: '#455a64',
  },
  inputStyle: {
    alignItems: 'center',
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

url = 'http://10.4.91.120:2000/people';
async function postuser(param) {
 try{
   let response = await fetch(url, {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(param)
   });
   let jresponse = await response.json();
   return jresponse;
 }catch(error){
   console.log('error is ' + error)
 }
}
export default Register
