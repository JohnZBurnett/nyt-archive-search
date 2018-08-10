import React from 'react';
import ReactDOM from 'react-dom'
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import LandingPage from '../components/LandingPage';
import ErrorPage from '../components/ErrorPage'; 
import Routes from '../components/Routes'; 
import App from '../App';

describe('BrowserRouter', () => {
    it('should redirect invalid path to 404', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/random']}>
              <Routes />
            </MemoryRouter>
        ); 
        expect(wrapper.find(LandingPage)).toHaveLength(0); 
        expect(wrapper.find(ErrorPage)).toHaveLength(1); 
    })

    it('should display the landing page by default', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
              <Routes />
            </MemoryRouter>
        );
        expect(wrapper.find(LandingPage)).toHaveLength(1);
        expect(wrapper.find(ErrorPage)).toHaveLength(0); 
    })
})