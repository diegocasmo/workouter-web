import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Train } from '../Train';

describe('<Train>', () => {

  let props;
  beforeEach(() => {
    props = {
      match: {
        params: { workoutId: 1 }
      }
    }
  });

  it('renders', () => {
    const wrapper = shallow(<Train {...props}/>);
    expect(wrapper.text()).to.be.equal(`Train: ${props.match.params.workoutId}`);
  });
});
