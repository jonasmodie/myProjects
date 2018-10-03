import React, { Component } from 'react';
import {StyleSheet, ActivityIndicator, ListView, Text, View, Alert,Image, Platform } from 'react-native';

export class Feed extends Component {


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
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 ,sectionHeaderHasChanged: (s1, s2) => s1 !== s2  });
        this.setState({
          isLoading: false,
          dataSource :ds.cloneWithRowsAndSections(responseJson),
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
          
          renderRow={(rowData,sectionID, rowID) =>
            <View style={{flex:1, flexDirection: 'column'}}>
                {rowData}
            </View>
          }
          renderSectionHeader={ (sectionData,sectionID) => {
            <View style={styles.sectionHeader}>
            
                <Image source = {{ uri: "http://10.4.91.120:2000/" + sectionData.img_url}} style={styles.imageViewContainer} />
                <Text style={styles.sectionHeaderText}>{sectionData.firstName} {sectionData.Post_Content}</Text>
            </View>
          }}

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
  sectionHeader: {
    backgroundColor: '#48D1CC'
  },
  sectionHeaderText: {
    fontFamily: 'AvenirNext-Medium',
    fontSize: 16,
    color: 'white',
    paddingLeft: 10
}
  
  });
export default Feed
