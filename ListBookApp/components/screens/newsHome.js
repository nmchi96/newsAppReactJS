import React from 'react';
import { FlatList } from 'react-native';
// Import getNews function from news.js
import { getNews } from '../src/news';
// We'll get to this one later
import Article from '../src/component/Article';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

export default class NewsHome extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state

    return {
      headerTitle: 'News',
      headerRight: (
        <Icon
          onPress={() => params.logout()}
          name={'power-off'}
          size={28}
          color={'#000'} />
      ),
    }
  };
  constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true };
    this.props.navigation.setParams({ logout: this.doLogOut })
    this.fetchNews = this.fetchNews.bind(this);
  }
  // Called after a component is mounted
  componentDidMount() {
    this.fetchNews();
   }

  fetchNews() {
    getNews()
      .then(articles => this.setState({ articles, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  }
  doLogOut = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('AuthLoading');
  }
  handleRefresh() {
    this.setState(
      {
        refreshing: true
    },
      () => this.fetchNews()
    );
  }

  render() {
    return (
      <FlatList
        data={this.state.articles}
        renderItem={({ item }) => <Article article={item} />}
        keyExtractor={item => item.url}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh.bind(this)}
      />
  );
  }
}