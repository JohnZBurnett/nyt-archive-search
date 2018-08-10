import React from 'react'; 
import { mount, shallow, render} from 'enzyme'; 
import Register from '../components/Register'; 

describe('Register', () => {
    let wrapper; 

    it('returns a div without throwing', () => {
        wrapper = shallow(<Register />);
        expect(wrapper.find('div').length).toBe(1); 
    })

    it('contains the placeholder text as static HTML', () => {
        wrapper = render(<Register />);
        expect(wrapper.text()).toBe('This is a Register placeholder.'); 
    })
})