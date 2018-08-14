import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import axios from 'axios'; 


const mapStateToProps = (state) => {
    return(
        {
            article: state.currentArticle,
            currentUserId: state.auth._id,
            collections: state.articleCollections
        }
    )
}

const mapDispatchToProps = (dispatch) => {
    return(
        {
            updateArticlePdf: (pdfUrl) => dispatch(pdfUrl) 
        }
    )
}

class ArticleDetail extends Component {
    constructor(props) {
        super(props); 

        this.state = {
            pdfUrl: "",
            collectionId: ""
        }
    }

    componentDidMount() {
        this.fetchPdfUrl(); 
    }

    fetchPdfUrl = async() => {
        const results = await axios.post('http://localhost:5000/api/current_article', {
            web_url: this.props.article.web_url
        }); 
        this.setState({
            pdfUrl: results.data.pdfUrl 
        })
        console.log("NYT SCRAPE RESULTS: ", results); 
    }

    saveArticleToCollection = async () => {
        const selectedCollection = this.props.collections.find( collection => collection._id === this.state.collectionId); 
        console.log("SELECTED COLLECTION: ", selectedCollection); 
        const results = await axios.post('http://localhost:5000/api/collections', {
            collection: selectedCollection,
            user: this.props.currentUserId
        });
          
    }

    handleCollectionIdChange = (event) => {
        this.setState({
            collectionId: event.target.value
        })
    }

    renderAllUserCollectionsAsSelectOptions = () => {
        const collectionsForThisUser = this.filterToCollectionsForThisUser()
        return collectionsForThisUser.map( collection => {
            return <option value={collection._id} key={collection._id}>{collection.name}</option>
        }); 
    }

    filterToCollectionsForThisUser = () => {
        console.log("USER:  ", this.props.currentUserId);
        return (
            this.props.collections.filter( collection => collection.user === this.props.currentUserId)
        ) 
    }

    render() {
        return(
            <div>
                <h1>{this.props.article.headline.main}</h1>
                <p>SNIPPET: {this.props.article.snippet}</p>
                <select value={this.state.collectionId} onChange={this.handleCollectionIdChange}>{this.renderAllUserCollectionsAsSelectOptions()}</select>
                <button onClick={this.saveArticleToCollection}>Save</button>
                <a href={this.props.article.web_url}>Click here to read the article on the NYT Website</a>
                <br/>
                <embed src={this.state.pdfUrl} height="600" width="200"></embed>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);