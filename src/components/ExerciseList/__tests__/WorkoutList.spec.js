import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {ExerciseList} from '../ExerciseList';

describe('<ExerciseList/>', () => {

  let props = null;
  beforeEach(() => {
    props = {
      exercises: [{'name': 'Push Ups'},{'name': 'Burpees'}]
    };
  });

  it('renders', () => {
    const wrapper = shallow(<ExerciseList {...props}/>);
    expect(wrapper.find('.wkr-exercise-list').children()).to.have.lengthOf(props.exercises.length);
  });
})
