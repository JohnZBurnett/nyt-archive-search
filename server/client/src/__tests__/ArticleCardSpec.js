import React from 'react';
import Enzyme from 'enzyme';
import { shallow, mount, render } from 'enzyme';
import ArticleCard from '../components/ArticleCard';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() }); 

describe('Article Card', () => {
    let wrapper;

    beforeEach( () => {
        wrapper = shallow(<ArticleCard />);
    });

    it('returns a div successfully', () => {
        expect(wrapper.find('div').length).toEqual(1); 
    }); 

    it('should contain placeholder text when rendered as HTML', () => {
    expect(render(<ArticleCard/>).text()).toEqual('I am an article card!'); 
    })
})