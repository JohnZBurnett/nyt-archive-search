import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import App from './App';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() }); 

describe('App', () => {

  it('should render a <div />', () => {
    let wrapper = shallow(< App />)
    expect(wrapper.find('div').length).toEqual(1); 
  });
})
