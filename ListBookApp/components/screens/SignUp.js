import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import background from '../imgs/nen.jpg';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Fontisto';

const {width: WIDTH} = Dimensions.get('window')

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      showPass: true,
      email: '',
      name: '',
      pass: '',
      press: false
    }
  }

  doSignUp() {
    fetch('http://192.168.43.155:81/user/SignUp.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        name: this.state.name,
        pass: this.state.pass
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.message === 'Success') {
        this.props.navigation.navigate('Login');
      } else if(responseJson.message === '123') {
        alert('ton tai')
      }else {
        alert('thich thi fail thoi')
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
                <Text style={styles.text}>REGISTER</Text>
              </View>
              <View>
                <Text onPress={() => this.props.navigation.navigate('Login')} 
                    style={styles.signUp}>Login</Text>
              </View>
              <View style={styles.inputContainer}>
                <Icon2
                  name={'email'}
                  size={28}
                  color={'rgba(255, 255, 255, 0.7)'}
                  style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder={'Email'}
                  value={this.state.email}
                  onChangeText={(value) => this.setState({email:value})}
                  placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                  underlineColorAndroid='transparent'
                />
              </View>
              <View style={styles.inputContainer}>
                <Icon
                  name={'ios-person'}
                  size={28}
                  color={'rgba(255, 255, 255, 0.7)'}
                  style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder={'Username'}
                  value={this.state.name}
                  onChangeText={(value) => this.setState({name:value})}
                  placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                  underlineColorAndroid='transparent'
                />
              </View>
              <View style={styles.inputContainer}>
                <Icon
                  name={'ios-lock'}
                  size={28}
                  color={'rgba(255, 255, 255, 0.7)'}
                  style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder={'Password'}
                  value={this.state.pass}
                  onChangeText={(value) => this.setState({pass:value})}
                  placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                  underlineColorAndroid='transparent'
                  secureTextEntry={this.state.showPass}
                />
                <TouchableOpacity style={{position: 'absolute', top: 8, right: 37}}
                                  onPress={this.showPass.bind(this)}>
                  <Icon name={this.state.press == false ? 'ios-eye' : 'ios-eye-off'}
                    size={24}
                    color={'rgba(255, 255, 255, 0.7)'} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => this.doSignUp()} style={styles.btnLogin}>
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
      marginTop: 10,
      marginBottom: 5
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
