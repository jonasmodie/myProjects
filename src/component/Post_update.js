import React, { Component } from 'react';
import {StyleSheet,TextInput,AsyncStorage,
  Clipboard,Image,TouchableOpacity,View ,ListView, Text,StatusBar } from 'react-native';
import { ImagePicker } from 'expo';
import Home from '../pages/Home.js';

export class Post_update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            post: '',
            photos:'',
            title:'username',
            username:'',
            isLoading: true
        }
    }
  _maybeRenderImage = () => {
    let {
      image
    } = this.state;

    if (!image) {
      return;
    }

    return (
      <View
        style={styles.maybeRenderContainer}>
        <View
          style={styles.maybeRenderImageContainer}>
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>

        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={styles.maybeRenderImageText}>
          {image}
        </Text>
      </View>
    );
};
_share = () => {
  Share.share({
    message: this.state.image,
    title: 'Check out this photo',
    url: this.state.image,
  });
};

_copyToClipboard = () => {
  Clipboard.setString(this.state.image);
  alert('Copied image URL to clipboard');
};

  _pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });
    this._handleImagePicked(result);
  
    
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({
        uploading: true
      });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();
        this.setState({
          image: uploadResult.location
        });
        console.log('sending image to server ');
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({
        uploading: false
      });
    }
  };

  //retrieve logged in username from local storage
_retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userkey');
      if (value !== null) {
        this.setState({username: value})
        console.log('value from asyncStorage is ' + value);
      }
     } catch (error) {
       console.log('error in getting data from asynStorage');
       console.log('and the error is ' + error);
     }
}
  handlePosts = (text) => {
     this.setState({ post: text })
  }

  refresh=()=>{
    
    return fetch('http://10.4.91.120:2000/updates')
    .then((response) => response.json())
    .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {
          console.log('data loaded from api in articles');
          console.log('the data is :'+ this.state.dataSource);
        });
    })
    .catch((error) => {
      console.error(error);
    });

  }
  componentDidMount(){
    setTimeout(() => {
      this.setState({time: true})
    }, 1000)
    this._retrieveData();
  };
  postUpdate =(news,username) => {
    console.log('the user :' + username +'is posting data');
    body ={
      firstName: username,
      Post_Content: news,
      Date_Time   : new Date()
    }
    updatedata(body).then((updatesRes) =>{
      if(updatesRes.success === true){
        alert('posted');
        <Home/>
      }else{
        console.log('failed')
        alert('failed to upload make sure you have internet connection');
      }
      console.log(updatesRes);
    })
  }
  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#1c313a"
          barStyle="light-content"
          Text = {this.state.username}
        />
      <TextInput style={styles.inputStyle}

        underlineColorAndroid='rgba(0,0,0,0)'
        placeholder="Post an update"
        placeholderTextColor="#ffffff"
        onChangeText = {this.handlePosts}/>
        <View style = {styles.Buttoncontainer}>
          <TouchableOpacity style = {styles.buttonStyle}
            onPress = {() => this.postUpdate(this.state.post , this.state.username)}>
              <Text style = {styles.submitButtonText}> update </Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.buttonStyle}
            onPress = {() => this._pickImage()}>
              <Text style = {styles.submitButtonText}> upload </Text>
          </TouchableOpacity>
          {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}  
        </View>
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
   
  },
  inputStyle: {
    width:300,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 20,
    fontSize: 16,
    margin:10,
  },
  buttonStyle : {
    width:'40%',
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 30,
 },
 submitButtonText:{
    color: 'white'
 },
 Buttoncontainer: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  height: 10
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: 250,
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden',
  },
  imageView: {
  
    width: '50%',
    height: 100 ,
    margin: 7,
    borderRadius : 7

  }
});

updateurl = 'http://10.4.91.120:2000/updates';
async function updatedata(param) {
  try{
    let response = await fetch(updateurl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param)
    });
    let updatesRes = await response.json();
    return updatesRes
  }catch(error){
    console.log('error is ' + error)
  }
 }

 async function uploadImageAsync(uri){
  let apiUrl = 'http://10.4.91.120:2000/img';

  let uriParts = uri.split('.');               //create uri into a normal image path
  let fileType = uriParts[uriParts.length - 1]; //assign file type
  let formData = new FormData();
  formData.append('profile', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });
  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type' : 'multipart/form-data',
    },
  };
    console.log('image data that should be sent to server : ' + formData.filename);
    console.log('mimetype : ' + formData.mimetype)
    return fetch(apiUrl, options);
}
 export default Post_update


