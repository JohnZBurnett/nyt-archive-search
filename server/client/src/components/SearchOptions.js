import React from 'react'; 
import { connect } from 'react-redux';
import { updateArticleStartMonthFilter, updateArticleEndMonthFilter, updateArticleTitleFilter} from '../actions/index'; 

function mapStateToProps(state) {
    return(
        {
            titleFilter: state.titleFilter,
            articleStartMonthFilter: state.articleStartMonthFilter,
            articleEndMonthFilter: state.articleEndMonthFilter
        }
    )
}

function mapDispatchToProps(dispatch) {
    return(
        {
            updateArticleStartMonthFilter: (newStartMonth) => dispatch(updateArticleStartMonthFilter(newStartMonth)),
            updateArticleEndMonthFilter: (newEndMonth) => dispatch(updateArticleEndMonthFilter(newEndMonth)),
            updateArticleTitleFilter: (newFilterWords) => dispatch(updateArticleTitleFilter(newFilterWords))
        }
    )
}


const searchOptions = (props) => {
    function handleUpdatingTitleFilterField(event) {
        props.updateArticleTitleFilter(event.target.value); 
        console.log("TITLE FILTER: ", props.titleFilter); 
    }

    return(
        <div>
            <label>Search titles by keywords:</label>
            <input type="text" value={props.titleFilter} onChange={handleUpdatingTitleFilterField} />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(searchOptions); 
