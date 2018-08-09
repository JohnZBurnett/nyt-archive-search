import React from 'react';
import { mount, render, shallow } from 'enzyme';
import ContentContainer from '../components/ContentContainer';

describe('ContentContainer', () => {
    let wrapper; 

    it('returns a placeholder div without throwing', () => {
        wrapper = shallow(<ContentContainer />);
        expect(wrapper.find('div').length).toBe(1);
    })

    it('renders the placeholder text as static HTML', () => {
        expect(render(<ContentContainer />).text()).toBe("I am a ContentContainer placeholder."); 
    })
})