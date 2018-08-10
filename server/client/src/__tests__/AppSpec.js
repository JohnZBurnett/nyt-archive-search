import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import { shallow, mount, render } from 'enzyme';
import App from '../App';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() }); 

describe('App', () => {
  let wrapper;

  beforeEach( () => {
    wrapper = shallow(<App />)
  })

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1); 
  });

  it('should mount in the DOM', () => {
    expect(mount(<App />).find('div').length).toEqual(1);
  })

  it('should render to static HTML', function() {
    expect(render(< App />).text()).toEqual('Welcome to 1943: A Year in the Times!'); 
  })
})
