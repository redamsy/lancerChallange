import React, { Component } from 'react';
import {  Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import  axios  from "axios";
import { insertNewItem } from '../../databases/allSchemas';

class QRCodeScannerComponent extends React.Component {
  state = {
      rawData : '',//for non url qrcode
      urlData:{},//for url qrcode
      flag:false
    }
  
  onRead = e => {
    console.log(e.data)
    const check = e.data.substring(0, 4);
    if (check === 'http') {
      this.getapiData(e.data)
      this.setState({flag:true})
    }
    else {
      this.setState ({rawData : e.data})
      this.setState({flag:false})
    }
    this.showADDConfirmation()
  }

  async getapiData(url) {
    let resp = await axios({
        method:'get',
        url:url
    })
    this.setState({ urlData: resp.data })
    console.log(this.state.urlData)
  }

  showADDConfirmation = () => {
    Alert.alert(
      'Add',
      'Add a item',
      [
          {
              text: 'No', onPress: () => { },//Do nothing
              style: 'cancel'
          },
          {
              text: 'Yes', onPress: () => {
                console.log(JSON.stringify(this.state.urlData))
                const data = this.state.flag === true ? JSON.stringify(this.state.urlData) : this.state.rawData
                const newItem = {
                  id: Math.floor(Date.now() / 1000),
                  rawData: data,
                  creationDate: new Date()
                };
                
                insertNewItem(newItem).then(
                    (data)=>alert("item: "+data.rawData+" inserted"+data.creationDate),
                    this.props.navigation.navigate('ItemComponent')
                ).catch((error) => {
                    alert(`Insert new item error ${error}`);
                });
              }
          },
      ],
      { cancelable: true }
    );
  };

  render() {
      return (
          <QRCodeScanner onRead={this.onRead} /* flashMode={RNCamera.Constants.FlashMode.torch} */ />
      );
  }
}
export default QRCodeScannerComponent;