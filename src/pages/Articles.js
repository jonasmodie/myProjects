import React from 'react';
import { FlatList } from 'react-native';
import Article from '../components/Article.js';

export class articles extends Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true };
    this.fetchNews = this.fetchNews.bind(this);
  }
  componentDidMount() {
    this.fetchNews();
   }

  fetchNews() {
    getNews()
      .then(articles => this.setState({ articles, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
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
const url =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=3b267e282e5e492da0ea7266cb2adc81";

export async function getNews() {
  let result = await fetch(url).then(response => response.json());
  return result.articles;
}

export default Articles