import React, {Component} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faUserCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

const urlString = "https://t3minty-api.herokuapp.com";

class Articles extends Component{
    constructor(){
        super();

        this.state = {
            userComment: '',
        }
    }

    componentDidMount(){
        this.props.getArticlesFunc();
    }

    // make function that handles the comments button
    handleComments = (e) =>{
        const commentSection = e.currentTarget.nextElementSibling;

        commentSection.classList.toggle('opened');
    }

    // make function to grab the specific article
    handleGetArticle = (id)=>{
        // grab the specific article and store in the article
        const specificArticle = this.props.articleData.filter((article)=>{
            return article._id === id;
        })

        return specificArticle[0];
    }

    // make function to bind input to state
    handleUserComment = (e)=>{
        this.setState({
            userComment: e.target.value,
        })
    }
    
    // make function to add new comment
    handleNewComment = (id) => {

        // call function to grab the article
        const article = this.handleGetArticle(id);

        // make comment object
        const newComment = {
            comment: this.state.userComment,
        }

        document.getElementById('newComment').value = '';

        axios({
            url: `${urlString}/comment`,
            method: 'POST',
            responseType: 'json',
            data: newComment,
        })
        .then((response) => {
            newComment.id = response.data.id;

            // push article to array
            article.comments.push(newComment.id);
    
            // update the api
            this.props.updateArticlesFunc(article);

        })
                
    }
    
    // make function that handles the likes
    handleLikes = (e, id)=>{


        // make variable for the button being selected
        const button = e.currentTarget;

        // only add class for those that are liked
        button.classList.toggle('liked');

        console.log(button.classList);

        
        if(button.classList.length === 1){

            // call function to grab the specific article
            const article = this.handleGetArticle(id);
    
            // increase the likes by one
            article.likes++;
    
            // update the api
            this.props.updateArticlesFunc(article);

        } else if(button.classList.length === 0){
            // call function to grab the specific article
            const article = this.handleGetArticle(id);
    
            // increase the likes by one
            article.likes--;
    
            // update the api
            this.props.updateArticlesFunc(article);
        }


    }

    render(){

        // console.log(this.props.articleData);
        return(
            <main>
                <div className="wrapper">
                    <ul>
                        {/* map through the articles and display them in lis */}
                        {this.props.articleData.map((article)=>{
                            return(
                                <li key={article._id} className="article">
                                    <div className="likesSection">
                                        <button onClick = {(e)=>this.handleLikes(e, article._id)}>
                                            <FontAwesomeIcon icon={faCaretUp} />
                                        </button>
                                        <p className="likes">{article.likes}</p>
                                    </div>
                                    <div className="articleInfo">
                                        <h2><a href={article.url} target="_blank">{article.title}</a></h2>
                                        <p className="description">{article.description}</p>
                                        <p className="date">{article.date}</p>
                                        {/* add button to show and hide the comments */}
                                        <button className="showComments" onClick={(e)=>this.handleComments(e)}>{article.comments.length} comment(s)</button>
                                        <div className="comments">
                                            {/* check if the comments are empty, if they arent map through them and display */}
                                            {article.comments.length === 0 ? <p className="noComment">No comments</p> : 
                                            <ul className="commentContainer">
                                                {article.comments.map((comment)=>{
                                                    return(
                                                        <li key={comment._id} className="comment">
                                                            {this.props.userObject.picture ? <img src={this.props.userObject.picture} alt={this.props.userObject.name}/> : 
                                                            <FontAwesomeIcon icon={faUserCircle} />
                                                            }
                                                            <p>{comment.comment}</p>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                            }
                                            {/* form for new comments */}
                                            <div className="newComment">
                                                <label htmlFor="newComment" className="sr-only">Please enter a comment</label>
                                                <input onChange={this.handleUserComment} type="text" name="newComment" id="newComment"/>
                                                <button onClick={()=>this.handleNewComment(article._id)}><FontAwesomeIcon icon={faPlus} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </main>
        )
    }
}

export default Articles;