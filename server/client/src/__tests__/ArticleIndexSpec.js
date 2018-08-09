import React from 'react';
import { mount, shallow, render } from 'enzyme';
import ArticleIndex from '../components/ArticleIndex';

describe('ArticleIndex', () => {
    let wrapper;

    it('returns a div without throwing', () => {
        wrapper = shallow(<ArticleIndex />);
        expect(wrapper.find('div').length).toBe(1); 
    })

    it('contains placeholder text when rendered as HTML', () => {
        expect(render(<ArticleIndex />).text()).toBe('I am an ArticleIndex placeholder.'); 
    })
})