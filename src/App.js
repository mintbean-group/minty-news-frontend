import React, {Component} from 'react';
import Header from './Header';
import axios from 'axios';
import Articles from './Articles';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(){
    super();

    this.state = {
      isLoggedIn: false,
      articles: [],
    }


  }

  // make function to recieve the articles data
  getArticles = () => {
    axios({
        url: 'https://t3minty-api.herokuapp.com/articles',
        method: 'GET',
        responseType: 'json',
    })
    .then((response) => {
        const articleResponse = response.data;

      // set state to the response from the API
        this.setState({
        articles: articleResponse,
        })
    })
  }



  render(){
    return (
      <div>
        <Header  loggedIn = {this.state.openLogin} getArticlesFunc = {this.getArticles}/>
        <Articles getArticlesFunc = {this.getArticles} articleData = {this.state.articles}/>
      </div>
    );
  }
}

export default App;
