import React, {Component} from 'react';
import axios from 'axios';


class Articles extends Component{
    constructor(){
        super();

        this.state = {
            isCommentsOpen: false,
            userComment: '',
        }
    }

    componentDidMount(){
        this.props.getArticlesFunc();
    }

    // make function that handles the comments button
    handleComments = () =>{
        const newState = !this.state.isCommentsOpen;

        this.setState({
            isCommentsOpen: newState,
        })
    }

    // make function to grab the specific article
    handleGetArticle = (id)=>{
        // grab the specific article and store in the article
        const specificArticle = this.props.articleData.filter((article)=>{
            if(article._id === id){
                return article;
            }
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

        axios({
            url: `https://t3minty-api.herokuapp.com/comment`,
            method: 'POST',
            responseType: 'json',
            data: newComment,
        })
        .then((response) => {
            newComment.id = response.id;

            // push article to array
            article.comments.push(newComment.id);
    
            // update the api
            this.props.updateArticlesFunc(article);
        })
        

        
    }
    
    // make function that handles the likes
    handleLikes = (id)=>{

        // call function to grab the specific article
        const article = this.handleGetArticle(id);

        // increase the likes by one
        article.likes++;

        // update the api
        this.props.updateArticlesFunc(article);

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
                                <li key={article._id}>
                                    <button onClick = {()=>this.handleLikes(article._id)}>Like</button>
                                    <h2><a href={article.url}>{article.title}</a></h2>
                                    <p className="description">{article.description}</p>
                                    <p className="likes">{article.likes}</p>
                                    <p className="date">{article.date}</p>
                                    {/* add button to show and hide the comments */}
                                    <button onClick={this.handleComments}>{article.comments.length} comments</button>
                                    {/* check if the comments are true, if they are show the comments */}
                                    {this.state.isCommentsOpen ? 
                                        <div className="comments">
                                            {/* form for new comments */}
                                                <label htmlFor="newComment" className="sr-only">Please enter a comment</label>
                                                <input onChange={this.handleUserComment} type="text" name="newComment" id="newComment"/>
                                                <button onClick={()=>this.handleNewComment(article._id)}>Add comment</button>
                                            {/* check if the comments are empty, if they arent map through them and display */}
                                            {article.comments.length === 0 ? <p>No comments</p> : 
                                            <ul className="commentContainer">
                                                {article.comments.map((comment)=>{
                                                    return(
                                                        <li key={comment._id}>{comment.comment}</li>
                                                    )
                                                })}
                                            </ul>
                                            }
                                        </div>
                                        : null
                                    }
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