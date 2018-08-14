import React from 'react'; 
import { connect } from 'react-redux'; 

function mapStateToProps(state)  {
    return(
        {
            articleCollections: state.articleCollections
        }
    )
}


const SavedArticles = (props) => {
    
    return(
        <div>I am a SavedArticles placeholder.</div>
    )
}

export default connect(mapStateToProps)(SavedArticles); 