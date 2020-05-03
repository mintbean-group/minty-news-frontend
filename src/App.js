import React, {Component} from 'react';
import Header from './Header';
import axios from 'axios';
import Articles from './Articles';
import './App.css';

const urlString = "https://t3minty-api.herokuapp.com";

class App extends Component {

  constructor(){
    super();

    this.state = {
      isLoggedIn: false,
      articles: [],
    }
  }

  // make function to update articles
  updateArticles = (article) => {
    axios({
      url: `${urlString}/article/${article._id}`,
      method: "PUT",
      responseType: "json",
      data: article,
    }).then((response) => {
      this.getArticles();
    });
  }

  // make function to recieve the articles data
  getArticles = () => {
    axios({
      url: `${urlString}/articles`,
      method: "GET",
      responseType: "json",
    }).then((response) => {
      const articleResponse = response.data;
      console.log(articleResponse);

      // set state to the response from the API
      this.setState({
        articles: articleResponse,
      });
    });
  }



  render(){
    return (
      <div>
        <Header  loggedIn = {this.state.openLogin} getArticlesFunc = {this.getArticles}/>
        <Articles updateArticlesFunc = {this.updateArticles} getArticlesFunc = {this.getArticles} articleData = {this.state.articles}/>
      </div>
    );
  }
}

export default App;
