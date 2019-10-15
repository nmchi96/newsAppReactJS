import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import background from '../imgs/nen.jpg';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';

const {width: WIDTH} = Dimensions.get('window')

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      showPass: true,
      name: '',
      pass: '',
      press: false
    }
  }
  _SignInAsync = async (responseJson) => {
    try {
      await AsyncStorage.setItem('uid', responseJson.content[0].id);
      this.props.navigation.navigate('NewsHome');
    } catch (e) {
    // saving error
    }
  }
  doLogin() {
    fetch('http://192.168.43.155:81/user/SignIn.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        pass: this.state.pass
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.message === 'Success') {
        this._SignInAsync(responseJson);
      } else {
        alert('sai pass')
      }
    }).catch((e) => {
      alert(e);
    });
  }
  showPass = () => {
      if (this.state.press == false){
      this.setState({showPass: false, press: true})
      }else{
      this.setState({showPass: true, press: false})
      }
  }
  render() {
      return(
          <ImageBackground source={background} style={styles.container}>
            <View>
              <Text style={styles.text}>LOGIN</Text>
            </View>
            <View>
              <Text onPress={() => this.props.navigation.navigate('SignUp')} 
                  style={styles.signUp}>Register</Text>
            </View>
            <View style={styles.inputContainer}>
              <Icon
                name={'user'}
                size={28}
                color={'rgba(255, 255, 255, 0.7)'}
                style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={'Username'}
                value={this.state.name}
                onChangeText={value => this.setState({name: value})}
                placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                underlineColorAndroid='transparent'
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon
                name={'key'}
                size={28}
                color={'rgba(255, 255, 255, 0.7)'}
                style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={'Password'}
                value={this.state.pass}
                onChangeText={value => this.setState({pass: value})}
                placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                underlineColorAndroid='transparent'
                secureTextEntry={this.state.showPass}
              />
              <TouchableOpacity style={{position: 'absolute', top: 8, right: 37}}
                                onPress={this.showPass.bind(this)}>
                <Icon name={this.state.press == false ? 'eye' : 'eye-with-line'}
                  size={24}
                  color={'rgba(255, 255, 255, 0.7)'} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => this.doLogin()} style={styles.btnLogin}>
                <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>Login</Text>
            </TouchableOpacity>
          </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: null,
        height: null
    },
    text: {
      color: '#111111',
      fontSize: 30,
      fontWeight: '500',
      opacity: 0.5
    },
    input: {
      width: WIDTH - 55,
      height: 45,
      borderRadius: 25,
      fontSize: 16,
      paddingLeft: 45,
      backgroundColor: 'rgba(0, 0, 0, 0.35)',
      color: 'rgba(255, 255, 255, 0.7)',
      marginHorizontal: 25
    },
    inputIcon: {
      position: 'absolute',
      top: 8,
      left: 37
    },
    inputContainer: {
      marginTop: 5,
      marginBottom: 7
    },
    btnLogin: {
      width: WIDTH - 55,
      height: 45,
      borderRadius: 25,
      backgroundColor: '#FF9933',
      justifyContent: 'center',
      marginTop: 20
    },
    signUp: {
      color: 'white',
      alignSelf: 'flex-end',
      fontStyle: 'italic',
      paddingLeft: 210
    }
})
