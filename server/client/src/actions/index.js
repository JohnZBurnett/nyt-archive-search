import { UPDATE_CURRENT_ARTICLE, ADD_ARTICLES_FROM_FETCH, FILTER_ARTICLES, GET_CURRENT_USER, GET_CURRENT_ARTICLE, SAVE_ARTICLE} from './actionTypes';
import axios from 'axios'; 

export const updateCurrentArticle = article => ({
    type: UPDATE_CURRENT_ARTICLE, payload: article
});

export const saveArticle = article => ({
    type: SAVE_ARTICLE, payload: article
})

export const filterArticles = searchTerm => ({
    type: FILTER_ARTICLES, payload: searchTerm
})

export const addArticlesFromFetch = articles => ({
    type: ADD_ARTICLES_FROM_FETCH, payload: articles
})

export const fetchArticlesFromApi = async (dispatch, getState) => {
    const articleResults = await axios.get('http://localhost:5000/articles'); 
    dispatch(addArticlesFromFetch(articleResults.data));
    console.log(articleResults);  
}