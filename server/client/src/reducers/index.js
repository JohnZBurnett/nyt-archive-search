import { RECORD_USER_LOGOUT, UPDATE_CURRENT_ARTICLE, SAVE_ARTICLE, UPDATE_ARTICLE_COLLECTIONS, FILTER_ARTICLES, ADD_ARTICLES_FROM_FETCH, UPDATE_CURRENT_USER} from '../actions/actionTypes';



const rootReducer = (state = {}, action) => {
    console.log("WE HIT THE REDUCER, ACTION IS: ", action)
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

        case UPDATE_CURRENT_USER: 
          return {
              ...state, auth: action.payload || false
          }
        
        case UPDATE_ARTICLE_COLLECTIONS:
          return {
              ...state, articleCollections: action.payload
          }

        case RECORD_USER_LOGOUT: 
          console.log("WE HIT RECORD_USER_LOGOUT IN THE REDUCER", action.payload); 
          return {
              ...state, auth: action.payload
          }
        default:
          return state
    }
}

export default rootReducer; 