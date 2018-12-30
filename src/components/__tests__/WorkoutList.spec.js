import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {WorkoutList} from '../WorkoutList';

describe('<WorkoutList/>', () => {

  let props = null;

  beforeEach(() => {
    props = {
      workouts: [{"title": "Full Body I"},{"title": "Full Body II"}]
    };
  });

  it('renders', () => {
    const wrapper = shallow(<WorkoutList {...props}/>);
    expect(wrapper.find('.wkr-workout-list').children()).to.have.lengthOf(props.workouts.length);
  });
})
