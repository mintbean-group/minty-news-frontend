import React, {Component} from 'react';

class Articles extends Component{
    constructor(){
        super();


    }

    render(){
        return(
            <div>
                {this.props.articleData.map((article)=>{
                    return(
                        <div>
                            <button>Like</button>
                            <h2><a href={article.url}>{article.title}</a></h2>
                            <p>{article.description}</p>
                            <p>{article.likes}</p>
                            <p>{article.date}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Articles;