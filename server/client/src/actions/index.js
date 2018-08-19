import { UPDATE_ARTICLE_START_MONTH_FILTER, UPDATE_ARTICLE_COMMENTS, UPDATE_CURRENT_ARTICLE_COMMENTS, UPDATE_ARTICLE_END_MONTH_FILTER, UPDATE_ARTICLE_TITLE_FILTER, UPDATE_CURRENT_ARTICLE, RECORD_USER_LOGOUT, UPDATE_ARTICLE_COLLECTIONS, ADD_ARTICLES_FROM_FETCH, FILTER_ARTICLES, UPDATE_CURRENT_USER, SAVE_ARTICLE, GET_ARTICLE_COLLECTIONS} from './actionTypes';
import axios from 'axios'; 

export const updateArticleStartMonthFilter = startMonth => ({
    type: UPDATE_ARTICLE_START_MONTH_FILTER, payload: startMonth
})

export const updateArticleEndMonthFilter = endMonth => ({
    type: UPDATE_ARTICLE_END_MONTH_FILTER, payload: endMonth
})

export const updateArticleTitleFilter = title => ({
    type: UPDATE_ARTICLE_TITLE_FILTER, payload: title
})

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

export const updateCurrentUser = user => ({
    type: UPDATE_CURRENT_USER, payload: user
})

export const recordUserLogout = () => ({
    type: RECORD_USER_LOGOUT, payload: false
})

export const updateArticleCollections = articleCollections => ({
    type: UPDATE_ARTICLE_COLLECTIONS, payload: articleCollections
})

export const updateArticleComments = articleComments => ({
    type: UPDATE_ARTICLE_COMMENTS, payload: articleComments
})

export const updateCurrentArticleComments = articleComment => ({
    type: UPDATE_CURRENT_ARTICLE_COMMENTS, payload: articleComment
})

export const fetchArticlesFromApi = async (dispatch, getState) => {
    const articleResults = await axios.get('http://localhost:5000/articles'); 
    dispatch(addArticlesFromFetch(articleResults.data));
    console.log(articleResults);  
}

export const fetchUser = async (dispatch, getState) => {
    const userResults = await axios.get('http://localhost:5000/api/current_user', {
        withCredentials: true,
        headers: {
            'Content-Type':'application/json',
        },
        credentials: "same-origin"
    }); 
    dispatch(updateCurrentUser(userResults.data)); 
    console.log("USER RESULTS: ", userResults);
}

export const getArticleCollectionsFromApi = async (dispatch, getState) => {
    const articleCollectionResults = await axios.get('http://localhost:5000/api/collections');
    dispatch(updateArticleCollections(articleCollectionResults.data)); 
    console.log("DISPATCH: ", dispatch); 
    console.log("ARTICLE COLLECTION RESULTS: ", articleCollectionResults); 
}

export const getArticleCommentsFromApi = async (dispatch, getState) => {
    const articleCommentResults = await axios.get('http://localhost:5000/api/articlecomments'); 
    dispatch(updateCurrentArticleComments(articleCommentResults.data)); 
}