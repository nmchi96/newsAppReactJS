import React, { Component } from 'react';
import {
  ProgressBarAndroid,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoadingScreen extends Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    try {
        const value = await AsyncStorage.getItem('uid');
        this.props.navigation.navigate(value ? 'App' : 'Auth');
    } catch(e) {
      alert(e);
    }
  };

  render() {
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ProgressBarAndroid styleAttr="Horizontal" color="#c93838" progress={0.5} />
      </View>
    );
  }
}