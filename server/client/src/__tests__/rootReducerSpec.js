import React from 'react';
import rootReducer from '../reducers/index';
import { updateCurrentArticle, saveArticle } from '../actions/index'
describe('rootReducer', () => {
    const initialState = {
        placeholder: 'placeholder',
        userSavedArticles: [{ title: 'placeholder'}]
    }; 
    const dummyAction = {
        type: "DUMMY_ACTION",
        payload: {}
    }
    it('returns the initial state by default', () => {
        expect(rootReducer(initialState, dummyAction)).toEqual(initialState); 
    });

    it('updates the current article in state', () => {
        expect(rootReducer(initialState, updateCurrentArticle('dummy article'))).toEqual({
            ...initialState, currentArticle: 'dummy article'
        })
    });

    it('adds the newly saved article to the list of saved articles', () => {
        expect(rootReducer(initialState, saveArticle({title: 'save test title'})).toEqual(
            {
            ...initialState, userSavedArticles: [...initialState.userSavedArticles, {title: 'save test title'}]
        }
      ))
    })
})