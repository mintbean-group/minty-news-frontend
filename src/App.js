import React, { Component } from "react";
import Header from "./Header";
import axios from "axios";
import Articles from "./Articles";
import "./App.css";

const urlString = "https://t3minty-api.herokuapp.com";

class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: true,
      articles: [],
      user: {
        name: 'Kay',
        picture: 'https://lh3.googleusercontent.com/a-/AOh14GinaUIVVR9aQc6qz8Mg1Sl7wFeDMnJTzBzDDrtLjg'
      },
    };
  }

  componentDidMount = () => {
    axios({
      url: `${urlString}/check`,
      method: "GET",
      responseType: "json",
    }).then((response) => {
      console.log("component mounted");
      console.log("user", response.data.user);
      console.log("loggedIN?", response.data.status);

      this.setState(
        {
          isLoggedIn: response.data.status,
        },
        () =>
          response.data.user ? this.setState({ user: response.data.user }) : ""
      );
    });
  };

  // make function to update articles
  updateArticles = (article) => {
    axios({
      url: `${urlString}/article/${article._id}`,
      method: "PUT",
      responseType: "json",
      data: article,
    })
      .then((response) => {
        this.getArticles();
      })
      .catch((error) => {
        if (typeof error.response === "undefined") {
          window.location = "https://t4minty.herokuapp.com/login";
        }
      });
  };

  // make function to recieve the articles data
  getArticles = () => {
    axios({
      url: `${urlString}/articles`,
      method: "GET",
      responseType: "json",
    }).then((response) => {
      const articleResponse = response.data;
      // set state to the response from the API
      this.setState({
        articles: articleResponse,
      });
    });
  };

  render() {
    return (
      <div>
        <Header
          loggedIn={this.state.isLoggedIn}
          getArticlesFunc={this.getArticles}
          userObject={this.state.user}
        />
        <Articles
          updateArticlesFunc={this.updateArticles}
          getArticlesFunc={this.getArticles}
          articleData={this.state.articles}
          userObject={this.state.user}
        />
      </div>
    );
  }
}

export default App;
