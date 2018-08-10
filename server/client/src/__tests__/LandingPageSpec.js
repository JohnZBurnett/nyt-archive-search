import React from 'react';
import LandingPage from '../components/LandingPage';
import { shallow, render } from 'enzyme';

describe('LandingPage', () => {
    let wrapper;

    it('returns a placeholder div without throwing', () => {
        wrapper = shallow(<LandingPage />);
        expect(wrapper.find('div').length).toBe(1); 
    })

    it('renders the landing page text as static HTML', () => {
        expect(render(<LandingPage />).text()).toBe('Welcome to 1943: A Year in the Times!');
    })
})