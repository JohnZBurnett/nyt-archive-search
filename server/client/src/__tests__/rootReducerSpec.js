import React from 'react';
import rootReducer from '../reducers/index';
import { updateCurrentArticle } from '../actions/index'

describe('rootReducer', () => {
    const initialState = {
        placeholder: 'placeholder'
    }; 
    const dummyAction = {
        type: "DUMMY_ACTION",
        payload: {}
    }
    it('returns the initial state by default', () => {
        expect(rootReducer(initialState, dummyAction)).toEqual(initialState); 
    })

    it('updates the current article in state', () => {
        expect(rootReducer(initialState, updateCurrentArticle('dummy article'))).toEqual({
            ...initialState, currentArticle: 'dummy article'
        })
    })
})