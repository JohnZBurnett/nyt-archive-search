import React from 'react';
import Enzyme from 'enzyme';
import { shallow, mount, render } from 'enzyme';
import ArticleDetail from '../components/ArticleCard';
import Adapter from 'enzyme-adapter-react-16';


describe('Article Details', () => {
    let wrapper;

    it('returns a div', () => {
        wrapper = shallow(<ArticleDetail />);
        expect(wrapper.find('div').length).toBe(1); 
    })
})