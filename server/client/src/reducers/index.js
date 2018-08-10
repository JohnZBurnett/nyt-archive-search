import { UPDATE_CURRENT_ARTICLE, SAVE_ARTICLE, FILTER_ARTICLES} from '../actions/actionTypes';
const initialState = {
    currentArticle: {},
    userSavedArticles: {},

};


const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_CURRENT_ARTICLE:
          return {
              ...state, currentArticle: action.payload
          }
        case SAVE_ARTICLE:
          return {
              ...state, userSavedArticles: [...state.userSavedArticles, action.payload]
          }
        
        // this probably shouldn't actually be used - we should filter in the component instead, so we don't overwrite the state 
        case FILTER_ARTICLES:
          const filteredList = state.articleList.filter( article => article.title.includes(action.payload));
          return {
              ...state, articleList: filteredList
          }
        default:
          return state
    }
}

export default rootReducer; 