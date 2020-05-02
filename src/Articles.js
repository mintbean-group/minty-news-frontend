import React, {Component} from 'react';



class Articles extends Component{
    constructor(){
        super();

        this.state = {
            isCommentsOpen: false,
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
    
    
    // make function that handles the likes
    handleLikes = (id)=>{
        // grab the specific article and store in the article
        const specificArticle = this.props.articleData.filter((article)=>{
            if(article._id === id){
                return article;
            }
        })

        const article =  specificArticle[0];

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
                                    <p>{article.description}</p>
                                    <p>{article.likes}</p>
                                    <p>{article.date}</p>
                                    {/* add button to show and hide the comments */}
                                    <button onClick={this.handleComments}>{article.comments.length} comments</button>
                                    {/* check if the comments are true, if they are show the comments */}
                                    {this.state.isCommentsOpen ? 
                                        <div className="comments">
                                            {/* form for new comments */}
                                            <form action="">
                                                <label htmlFor="newComment" className="sr-only">Please enter a comment</label>
                                                <input type="text" name="newComment" id="newComment"/>
                                                <button type="submit">Add comment</button>
                                            </form>
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