import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const urlString = "";

class Header extends Component {

    constructor(){
        super();

        this.state = {
            openLogin: false,
            openNewPost: false,
            userTitle: '',
            userUrl: '',
            userDesc: '',
        }
    }

    // LOGIN FUNCTIONS

    // on click, change the state in parent to true
    handleOpenLogin = (stateOfwindow) => {
        // call function from parent to open the module window
        // this.props.showLoginFunc(true);

        const stateToSet = stateOfwindow;

        this.setState({
            openLogin: stateToSet,
        })
    }

    // on submit, post to the API and close the window
    handleLogin = ()=>{

        // call function to close the module window
        this.handleOpenLogin(false);

    }

    // on click, change the state in parent to true
    handleOpenPost = (stateOfwindow) => {

        // call function to open the module window
        const stateToSet = stateOfwindow;

        this.setState({
            openNewPost: stateToSet,
        })
    }

    // NEW POST FUNCTIONS

    // on change, grab the title
    handleTitle = (e)=>{
        this.setState({
            userTitle: e.target.value,
        })
    }

    // on change, grab the url
    handleUrl = (e)=>{
        this.setState({
            userUrl: e.target.value,
        })
    }

    // on change, grab the description
    handleDesc = (e)=>{

        this.setState({
            userDesc: e.target.value,
        })
    }

    // on submit, post to the API and close the window
    handlePost = (e)=>{

        // prevent default of the post
        e.preventDefault();

        // make variables 
        const title = this.state.userTitle;
        const url = this.state.userUrl;
        const description = this.state.userDesc;
        // const date = new Date();
        const likes = 0;
        const comments = [];

        // post the data to the api an recieve updated data
        axios({
          url: `${urlString}/article`,
          method: "POST",
          responseType: "json",
          data: {
            title,
            url,
            description,
            likes,
            comments,
          },
        }).then((response) => {
          this.props.getArticlesFunc();
        });



        // call function to close the module window
        this.handleOpenPost(false);


    }

    render(){
        return (
            <header>
                <div className="wrapper">
                    <h1>Minty news</h1>
                    <nav>
                        <ul>
                            <li><button className="newPostButton" onClick = {()=>this.handleOpenPost(true)}>+ New post</button></li>
                            {this.props.loggedIn ? 
                            <div>
                                <li><button className="profileButton" onClick = {()=>this.handleOpenProfile(true)}>Profile</button></li>
                                <li><button className="loginButton">Sign out</button></li> 
                            </div> : 
                            <li><button className="loginButton" onClick = {()=>this.handleOpenLogin(true)}>Login</button></li>
                            }
                        </ul>
                    </nav>
                    {this.state.openNewPost ? <div className="newPost moduleContainer">
                        <div className="moduleContent">
                        <button onClick={()=>this.handleOpenPost(false)} className="closeModule">
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                            <h3>Make a new post</h3>
                            <form action="" onSubmit = {this.handlePost}>
                                <label htmlFor="title">Title</label>
                                <input type="text" name="title" id="title" onChange ={this.handleTitle} required/>
        
                                <label htmlFor="link">URL</label>
                                <input type="text" name="link" id="link" onChange ={this.handleUrl} required/>
        
                                <label htmlFor="description">Description</label>
                                <textarea name="description" id="description" cols="30" rows="10" onChange ={this.handleDesc} required></textarea>
        
                                <button type="submit" className="submit">Post</button>
                            </form>
                        </div>
                    </div> : null}
                    
                    {this.state.openLogin ? <div className="login moduleContainer">
                        <div className="moduleContent">
                            <button onClick={()=>this.handleOpenLogin(false)} className="closeModule">
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                            <h3>Login</h3>
                            <form action="" onSubmit = {this.handleLogin}>
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" id="username"/>
        
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password"/>
        
                                <button type="submit" className="submit">Login</button>
                            </form>
                        </div>
                    </div> : null}
                </div>    
            </header>
        );
    }
}

export default Header;