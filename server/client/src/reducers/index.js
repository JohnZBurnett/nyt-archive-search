const initialState = {};
import { UPDATE_CURRENT_ARTICLE } from '../actions/actionTypes'

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_CURRENT_ARTICLE:
          return {
              ...state, currentArticle: action.payload
          }
        default:
          return state
    }
}

export default rootReducer; 