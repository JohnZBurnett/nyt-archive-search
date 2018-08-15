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

    function generateMonthSelectOptions() {
        const countArr = [...Array(12).keys()];
        return countArr.map( num => {
            return <option value={num}>{num + 1}</option>
        })
    }

    return(
        <div>
            <label>Start Month: </label>
            <select>
                {generateMonthSelectOptions()}
            </select>
            <label>End Month: </label>
            <select>
                {generateMonthSelectOptions()}
            </select>
            <label>Search titles by keywords:</label>
            <input type="text" value={props.titleFilter} onChange={handleUpdatingTitleFilterField} />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(searchOptions); 
