import React from 'react';
import logo from './logo.svg';
import './App.css';

const Header = () => {

    return (
        <div>
            <h1>Minty news</h1>
            <nav>
                <ul>
                    <li><button>New post</button></li>
                    <li><button>Login</button></li>
                </ul>
            </nav>
            <div className="newPost">
                <form action="">
                    <label htmlFor="title">Please enter a title</label>
                    <input type="text" name="title" id="title"/>

                    <label htmlFor="link">Please enter the link</label>
                    <input type="text" name="link" id="link"/>

                    <label htmlFor="description">Please enter a short description</label>
                    <textarea name="description" id="description" cols="30" rows="10"></textarea>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Header;