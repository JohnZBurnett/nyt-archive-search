import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import axios from 'axios'; 
import pdfjsLib from 'pdfjs-dist'; 


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

    getAndRenderPdf = async () => {
        const loadingTask = await pdfjsLib.getDocument(this.state.pdfUrl);
        const page = await pdfjsLib.getPage(1); 
        const scale = 1.5; 
        const viewport = page.getViewport(scale); 

        // const canvas = document.getElementById('the-canvas'); 
        // const context = canvas.getContext('2d');
        // canvas.height = viewport.height;
        // canvas.weidth = viewport.width; 

        // const renderContext = {
        //     canvasContext: context,
        //     viewport: viewport
        // }; 
        // const renderTask = page.render(renderContext); 
        return null; 
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
                <h1>{this.props.article.headline.main}</h1>
                <p>SNIPPET: {this.props.article.snippet}</p>
                <select value={this.state.collectionId} onChange={this.handleCollectionIdChange}>{this.renderAllUserCollectionsAsSelectOptions()}</select>
                <button onClick={this.saveArticleToCollection}>Save</button>
                <a href={this.props.article.web_url}>Click here to read the article on the NYT Website</a>
                <br/>
                <canvas id="the-canvas"></canvas>
                {this.state.pdfUrlFound ? this.getAndRenderPdf() : null}
                {/*<embed src={this.state.pdfUrl} height="600" width="200"></embed>*/}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);