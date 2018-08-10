import React from 'react';
import ReactDOM from 'react-dom'
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import LandingPage from '../components/LandingPage';
import ErrorPage from '../components/ErrorPage'; 
import App from '../App';

jest.mock('firebase/app');

describe('BrowserRouter', () => {
    it('should redirect invalid path to 404', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/random']}>
              <App />
            </MemoryRouter>
        ); 
        expect(wrapper.find(ErrorPage)).toHaveLength(1); 
    })
})