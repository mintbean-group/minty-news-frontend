import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class Header extends Component {

    constructor(){
        super();

        this.state = {
            openLogin: false,
            openNewPost: false,
        }
    }


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

    // on submit, post to the API and close the window
    handlePost = ()=>{

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
                            <li className="newPost"><button onClick = {()=>this.handleOpenPost(true)}>New post</button></li>
                            <li className="login"><button onClick = {()=>this.handleOpenLogin(true)}>Login</button></li>
                        </ul>
                    </nav>
                    {this.state.openLogin ? <div className="newPost module">
                        <form action="" onSubmit = {this.handlePost}>
                            <label htmlFor="title">Please enter a title</label>
                            <input type="text" name="title" id="title"/>
    
                            <label htmlFor="link">Please enter the link</label>
                            <input type="text" name="link" id="link"/>
    
                            <label htmlFor="description">Please enter a short description</label>
                            <textarea name="description" id="description" cols="30" rows="10"></textarea>
    
                            <button type="submit">Submit</button>
                        </form>
                    </div> : null}
                    
                    {this.state.openNewPost ? <div className="logIn module">
    
                        <form action="" onSubmit = {this.handleLogin}>
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" id="username"/>
    
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password"/>
    
                            <button type="submit">Log in</button>
                        </form>
                    </div> : null}
                </div>    
            </header>
        );
    }
}

export default Header;