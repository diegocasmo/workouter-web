import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {Loading} from '../Loading';

describe('<Loading/>', () => {
  it('renders', () => {
    const wrapper = shallow(<Loading/>);
    expect(wrapper.find('.wkr-loading__text').text()).to.be.equal('Loading...');
  });
})
