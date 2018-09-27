import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import axios from 'axios'; 
import NewCommentBox from './NewCommentBox'; 
import CommentList from './CommentList'; 


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
            collectionId: "",
            pdfUrlFound: false
        }
    }

    componentDidMount() {
        this.fetchPdfUrl(); 
        setTimeout(2000, this.forceUpdate()); 
    }

    fetchPdfUrl = async() => {
        const results = await axios.post('http://localhost:5000/api/current_article', {
            web_url: this.props.article.web_url
        }); 
        this.setState({
            pdfUrl: results.data.pdfUrl,
            pdfUrlFound: true
        })
        console.log("NYT SCRAPE RESULTS: ", results); 
    }

    saveArticleToCollection = async () => {
        const updatedCollection = this.findSelectedCollectionAndAddArticle(); 
        console.log("SELECTED COLLECTION: ", updatedCollection); 
        const results = await axios.put(`http://localhost:5000/api/collections/${this.state.collectionId}`, {
            articles: updatedCollection.articles,
            user: this.props.currentUserId
        });
    }

    findSelectedCollectionAndAddArticle = () => {
        const selectedCollection = this.props.collections.find( collection => collection._id === this.state.collectionId);
        
        // this mutates the Redux state in its current form - refactor to a dispatch
        selectedCollection.articles.push(this.props.article._id); 
        return selectedCollection; 
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
                <div className="float-left half-width">
                    <h1 className="headline-font">HEADLINE: </h1>
                    <br />
                    <h1 className="headline-font headline">{this.props.article.headline.main}</h1>
                    <p className="typewriter-font summary">SNIPPET: {this.props.article.snippet}</p>
                    <a href={this.props.article.web_url}>Click here to read the article on the NYT Website</a>
                    <h4>Select a category to save the article to: </h4>
                    <select value={this.state.collectionId} onChange={this.handleCollectionIdChange}>
                        <option value="Placeholder">Please select a value:</option>
                        {this.renderAllUserCollectionsAsSelectOptions()}
                    </select>
                    <button onClick={this.saveArticleToCollection}>Save</button>
                </div>
                <br/>
                {/* this.state.pdfUrlFound ? this.getAndRenderPdf() : null */}
                { /* <div className="article-pdf">
                    <object data={this.state.pdfUrl} width="500" height="500"></object>
        </div> */}
                {this.props.currentUserId ? <NewCommentBox /> : null }
              <h3>Comments on This Article: </h3>
                { <CommentList />}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);