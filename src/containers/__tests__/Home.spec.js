import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Home } from '../Home';

describe('<Home/>', () => {

  let props = null;

  beforeEach(() => {
    props = {
      onFetchWorkouts: sinon.spy()
    };
  });

  it('renders', () => {
    const wrapper = mount(<Home {...props}/>);
    expect(wrapper.find(Home).length).to.be.equal(1);
  });

  it('calls onFetchWorkouts() on componentDidMount()', () => {
    expect(props.onFetchWorkouts.calledOnce).to.be.false;
    const wrapper = mount(<Home {...props}/>);
    expect(props.onFetchWorkouts.calledOnce).to.be.true;
  });
})
