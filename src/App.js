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

  // CONNECT WITH OUR API
  // componentDidMount(){
  //   axios({
  //     url: ,
  //     method: 'GET',
  //     responseType: 'json',
  //   })
  //   .then((response) => {

  //   })
  // }

  render(){
    return (
      <div>
        <Header />
        <Articles articleData = {this.state.articles}/>
      </div>
    );
  }
}

export default App;
