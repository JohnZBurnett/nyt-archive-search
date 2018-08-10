import React from 'react';
import {mount, shallow, render} from 'enzyme';
import Login from '../components/Login';

describe('Login', () => {
    let wrapper;

    it('renders a div without throwing', () => {
        wrapper = shallow(<Login />); 
        expect(wrapper.find('div').length).toBe(1); 
    })

    it('displays the placeholder text as HTML', () => {
        wrapper = render(<Login />); 
        expect(wrapper.text()).toBe("This is a Login placeholder."); 
    })
})