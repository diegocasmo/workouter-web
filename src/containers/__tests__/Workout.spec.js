import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Workout } from '../Workout';

describe('<Workout>', () => {

  let props;
  beforeEach(() => {
    props = {
      match: {
        params: { id: 1 }
      }
    }
  });

  it('renders', () => {
    const wrapper = shallow(<Workout {...props}/>);
    expect(wrapper.text()).to.be.equal(`Workout: ${props.match.params.id}`);
  });
});
