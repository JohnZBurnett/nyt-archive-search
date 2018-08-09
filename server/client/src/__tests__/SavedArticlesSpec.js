import React from 'react';
import { render, shallow, mount } from 'enzyme';
import SavedArticles from '../components/SavedArticles';

describe('SavedArticles', () => {
    let wrapper;

    it('returns a div without throwing', () => {
        wrapper = shallow(<SavedArticles />); 
        expect(wrapper.find('div').length).toBe(1);
    })

    it('renders the placeholder text in static HTML', () => {
        expect(render(<SavedArticles />).text()).toBe('I am a SavedArticles placeholder.'); 
    })
})