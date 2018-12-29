import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {WorkoutItem} from '../WorkoutItem';

describe('<WorkoutItem/>', () => {

  let props = null;

  beforeEach(() => {
    props = {"title": "Full Body I"};
  });

  it('renders', () => {
    const wrapper = shallow(<WorkoutItem {...props}/>);
    expect(wrapper.find('.wkr-workout-item__title').text()).to.be.equal(props.title);
  });
})
