import { UPDATE_CURRENT_ARTICLE, GET_CURRENT_USER, GET_CURRENT_ARTICLE, SAVE_ARTICLE} from './actionTypes';

export const updateCurrentArticle = article => ({
    type: UPDATE_CURRENT_ARTICLE, payload: article
});