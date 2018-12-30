import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {ExerciseItem} from '../ExerciseItem';

describe('<ExerciseItem/>', () => {

  let props = null;
  beforeEach(() => {
    props = {'name': 'Push Ups'};
  });

  it('renders', () => {
    const wrapper = shallow(<ExerciseItem {...props}/>);
    expect(wrapper.find('.wkr-exercise-item__name').props().children).to.be.equal(props.name);
  });
})
