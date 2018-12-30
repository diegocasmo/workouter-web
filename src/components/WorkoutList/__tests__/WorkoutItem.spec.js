import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {WorkoutItem} from '../WorkoutItem';

describe('<WorkoutItem/>', () => {

  let props = null;
  beforeEach(() => {
    props = {id: 1, 'name': 'Full Body I'};
  });

  it('renders', () => {
    const wrapper = shallow(<WorkoutItem {...props}/>);
    expect(wrapper.find('Link').props().to).to.be.equal(`/workout/${props.id}`);
    expect(wrapper.find('.wkr-workout-item__name').props().children).to.be.equal(props.name);
  });
})
