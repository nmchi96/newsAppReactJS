import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './components/screens/Login';
import SignUp from './components/screens/SignUp';
import NewsHome from './components/screens/newsHome';
import AuthLoadingScreen from './components/screens/AuthLoadingScreen';

const AuthStack = createStackNavigator(
  {
    Login: Login,
    SignUp: SignUp,
  }
)

const AppStack = createStackNavigator(
  {
    NewsHome: NewsHome
  }
);

export default createAppContainer(
  createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));