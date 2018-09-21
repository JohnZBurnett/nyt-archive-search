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

    function handleUpdatingStartMonthFilter(event) {
        // we need to update the end month if the current one precedes the new start month 
        if (parseInt(props.articleEndMonthFilter) < event.target.value) {
            props.updateArticleEndMonthFilter(event.target.value.toString()); 
        }

        props.updateArticleStartMonthFilter(event.target.value.toString()); 
    }

    function handleUpdatingEndMonthFilter(event) {

        // we also need to update the start month if it's now after the new end month
        if (parseInt(props.articleStartMonthFilter) > event.target.value ) {
            props.updateArticleStartMonthFilter(event.target.value.toString()); 
        }

        props.updateArticleEndMonthFilter(event.target.value.toString()); 
    }


    function generateMonthSelectOptions() {
        const countArr = [...Array(12).keys()];
        return countArr.map( num => {
            return <option value={num + 1}>{num + 1}</option>
        })
    }

    console.log("SearchOptions PROPS: ", props);
    return(
        
        <div className="keyword-search">
            <div className="keyword-options">
                <label>Search titles by keywords:</label>
                <input type="text" value={props.titleFilter} onChange={handleUpdatingTitleFilterField} />
            </div>
            <div className="month-options">
                <label>Start Month: </label>
                <select value={props.articleStartMonthFilter} onChange={handleUpdatingStartMonthFilter}>
                    {generateMonthSelectOptions()}
                </select>
                <label className="option-gap">End Month: </label>
                <select value={props.articleEndMonthFilter} onChange={handleUpdatingEndMonthFilter}>
                    {generateMonthSelectOptions()}
                </select>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(searchOptions); 
