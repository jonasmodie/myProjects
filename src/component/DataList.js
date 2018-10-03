import React, { Component } from 'react';
import {StyleSheet, ActivityIndicator, ListView, Text, View, Alert,Image, Platform } from 'react-native';

export class DataList extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  GetItem (flower_name) {
  
    Alert.alert(flower_name);
   
  }

  componentDidMount() {
    
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
        console.log('*****************************network error****************')
        console.error(error);
      });
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      
      <View style={styles.MainContainer}>
        <ListView
          
          dataSource={this.state.dataSource}
          renderSeparator= {this.ListViewItemSeparator}
          renderRow={(rowData) =>
         <View style={{flex:1, flexDirection: 'column'}}>
 
           <Image source = {{ uri: "http://10.4.91.120:2000/" + rowData.img_url }} style={styles.imageViewContainer} />
           <Text onPress={this.GetItem.bind(this, rowData.img_name)} style={styles.titletextViewContainer}>
                {rowData.firstName}
           </Text>
         
           <Text onPress={this.GetItem.bind(this, rowData.img_name)} style={styles.textViewContainer} >{rowData.Post_Content}</Text>
           <Text onPress={this.GetItem.bind(this, rowData.img_name)} style={styles.minitextViewContainer} >{rowData.Date_Time}</Text>
         </View>
          }
        />
 
      </View>
    );
  }
}
const styles = StyleSheet.create({

  MainContainer :{
  
  // Setting up View inside content in Vertically center.
  justifyContent: 'center',
  flex:1,
  margin: 5,
  paddingTop: (Platform.OS === 'ios') ? 20 : 0,
  
  },
  
  imageViewContainer: {
  width: '50%',
  height: 100 ,
  margin: 10,
  borderRadius : 10
  
  },
  
  textViewContainer: {
  
    textAlignVertical:'center',
    width:'50%', 
    padding:20
  
  },
  minitextViewContainer :{
    height : 2,
    fontFamily: 'italic',
  },
  titletextViewContainer: {
    fontSize: 20,
    fontWeight: 'bold'
  }
  
  });
export default DataList
