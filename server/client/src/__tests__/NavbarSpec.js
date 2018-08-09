import React from 'react';
import Navbar from '../components/Navbar';
import { shallow, mount, render } from 'enzyme';

describe('Navbar', () => {
    let wrapper;

    it('returns a div without throwing', () => {
        wrapper = shallow(<Navbar />); 

        expect(wrapper.find('div').length).toBe(1);
    })

    it('renders the placeholder text as static HTML', () => {
        expect(render(<Navbar />).text()).toBe('I am a Navbar placeholder.')
    })
})