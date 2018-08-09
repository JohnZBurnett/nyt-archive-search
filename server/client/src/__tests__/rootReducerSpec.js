import React from 'react';
import rootReducer from '../reducers/index';

describe('rootReducer', () => {
    const initialState = {}; 
    const dummyAction = {
        type: "DUMMY_ACTION",
        payload: {}
    }
    it('returns the initial state by default', () => {
        expect(rootReducer(initialState, dummyAction)).toEqual({}); 
    })
})