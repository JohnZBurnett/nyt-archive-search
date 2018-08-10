import { UPDATE_CURRENT_ARTICLE, FILTER_ARTICLES, GET_CURRENT_USER, GET_CURRENT_ARTICLE, SAVE_ARTICLE} from './actionTypes';

export const updateCurrentArticle = article => ({
    type: UPDATE_CURRENT_ARTICLE, payload: article
});

export const saveArticle = article => ({
    type: SAVE_ARTICLE, payload: article
})

export const filterArticles = searchTerm => ({
    type: FILTER_ARTICLES, payload: searchTerm
})