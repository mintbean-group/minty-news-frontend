import React, {Component} from 'react';



class Articles extends Component{
    constructor(){
        super();


    }

    componentDidMount(){
        this.props.getArticlesFunc();
    }

    render(){
        return(
            <main>
                <div className="wrapper">
                    <ul>
                        {this.props.articleData.map((article)=>{
                            return(
                                <li key={article._id}>
                                    <button>Like</button>
                                    <h2><a href={article.url}>{article.title}</a></h2>
                                    <p>{article.description}</p>
                                    <p>{article.likes}</p>
                                    <p>{article.date}</p>
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