import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header';
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

  // make function that changes the state of showing logged in window when button clicked
  handleLoginWindow = (stateOfwindow) => {
    const stateToSet = stateOfwindow;

    this.setState({
      openLogin: stateToSet,
    })
  }

  // make function that changes the state of showing new post window when button clicked
  handlePostWindow = (stateOfwindow) => {
    const stateToSet = stateOfwindow;

    this.setState({
      openNewPost: stateToSet,
    })
  }

  // CONNECT WITH OUR API
  componentDidMount(){
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
        <Header showLoginFunc = {this.handleLoginWindow} loggedIn = {this.state.openLogin} newPost = {this.state.openNewPost} showPostFunc = {this.handlePostWindow}/>
        <Articles articleData = {this.state.articles}/>
      </div>
    );
  }
}

export default App;
