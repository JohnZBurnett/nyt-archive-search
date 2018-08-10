import React from 'react';
import {shallow, render} from 'enzyme'; 
import ErrorPage from '../components/ErrorPage'; 

describe('ArticleIndex', () => {
    let wrapper;

    it('returns a div without throwing', () => {
        wrapper = shallow(<ErrorPage />);
        expect(wrapper.find('div').length).toBe(1); 
    })

    it('contains placeholder text when rendered as HTML', () => {
        wrapper = render(<ErrorPage />)
        expect(wrapper.text()).toBe('This page could not be found!'); 
    })
})