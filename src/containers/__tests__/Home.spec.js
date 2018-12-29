import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Home } from '../Home';

describe('<Home/>', () => {

  let props = null;

  beforeEach(() => {
    props = {
      onFetchWorkouts: sinon.spy(),
      workouts: [{"title": "Full Body I"},{"title": "Full Body II"}],
      hasFetchFailure: false
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

  it('renders error message when unable to fetch workouts', () => {
    props.hasFetchFailure = true;
    const wrapper = mount(<Home {...props}/>);
    expect(wrapper.find('.wkr-error-msg')).to.have.lengthOf(1);
  });

  it('renders list of workouts', () => {
    const wrapper = mount(<Home {...props}/>);
    expect(wrapper.find('ul').children()).to.have.lengthOf(props.workouts.length);
  });
});
