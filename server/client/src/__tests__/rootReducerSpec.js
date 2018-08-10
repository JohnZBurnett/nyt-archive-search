import React from 'react';
import rootReducer from '../reducers/index';
import { updateCurrentArticle, saveArticle, filterArticles } from '../actions/index'
describe('rootReducer', () => {
    const initialState = {
        placeholder: 'placeholder',
        userSavedArticles: [{ title: 'placeholder'}],
        currentArticle: {},
        articleList: [{title: 'hello'}, {title: 'goodbye'}, {title: 'hellish'}],
    }; 
    const dummyAction = {
        type: 'DUMMY_ACTION',
        payload: {}
    }

    beforeEach( () => {

    })
    it('returns the initial state by default', () => {
        expect(rootReducer(initialState, dummyAction)).toEqual(initialState); 
    });

    it('updates the current article in state', () => {
        expect(rootReducer(initialState, updateCurrentArticle({title: 'dummy article'}))).toEqual({
            ...initialState, currentArticle: {title: 'dummy article'}
        })
    });

    it('adds the saved article successfully', () => {
        expect(rootReducer(initialState, saveArticle({title: 'dummy title'}))).toEqual(
            {
                ...initialState, userSavedArticles: [...initialState.userSavedArticles, {title: 'dummy title'}]
            }
        )
    })

    it('filters the list of articles based on title', () => {
        expect(rootReducer(initialState, filterArticles('hell'))).toEqual(
            {
                ...initialState, articleList: [{title: 'hello'}, {title: 'hellish'}]
            }
        )
    })

  })