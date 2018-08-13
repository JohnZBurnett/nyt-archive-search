import { UPDATE_CURRENT_ARTICLE, SAVE_ARTICLE, FILTER_ARTICLES, ADD_ARTICLES_FROM_FETCH} from '../actions/actionTypes';



const rootReducer = (state = {}, action) => {
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

        case ADD_ARTICLES_FROM_FETCH:
          return {
              ...state, articleList: action.payload
          }

        case FETCH_USER: 
          return {
              ...state, auth: action.payload || false
          }
        default:
          return state
    }
}

export default rootReducer; 