import React from 'react';
import ReactDOM from 'react-dom'
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import LandingPage from '../components/LandingPage';
import ErrorPage from '../components/ErrorPage'; 
import Routes from '../components/Routes'; 
import ArticleIndex from '../components/ArticleIndex';
import ArticleDetail from '../components/ArticleDetail';
import SavedArticles from '../components/SavedArticles'; 
import Register from '../components/Register';
import Login from '../components/Login'; 
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

    it('should redirect to the index page when given the correct URL', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/index']}>
              <Routes />
            </MemoryRouter>
        );

        expect(wrapper.find(ArticleIndex)).toHaveLength(1); 
    })

    it('should redirect to the article detail page when given the correct URL', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/detail']}>
              <Routes />
            </MemoryRouter>
        );
        
        expect(wrapper.find(ArticleDetail)).toHaveLength(1);
    })

    it('should redirect to the saved articles page when given the correct URL', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/saved']}>
              <Routes />
            </MemoryRouter>
        );

        expect(wrapper.find(SavedArticles)).toHaveLength(1); 
    })

    it('should show the Login page when given the correct URL', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/login']}>
              <Routes />
            </MemoryRouter>
        );

        expect(wrapper.find(Login)).toHaveLength(1);
    })

    it('should show the Register page when given the correct URL', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/register']}>
              <Routes />
            </MemoryRouter>
        );

        expect(wrapper.find(Register)).toHaveLength(1); 
    })
})