import React from 'react';
import sinon from 'sinon';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {Exercises} from '../Exercises';

describe('<Exercises/>', () => {

  let props;
  beforeEach(() => {
    props = {
      onFetchExercises: sinon.spy(),
      exercises: [{"name": "Burpees"},{"name": "Push Ups"}],
      isLoading: false,
      hasError: false
    };
  });

  it('renders', () => {
    const wrapper = mount(<Exercises {...props}/>);
    expect(wrapper.find(Exercises).length).to.be.equal(1);
  });

  it('calls onFetchExercises() on componentDidMount()', () => {
    expect(props.onFetchExercises.calledOnce).to.be.false;
    const wrapper = mount(<Exercises {...props}/>);
    expect(props.onFetchExercises.calledOnce).to.be.true;
  });

  it('renders loading when fetching', () => {
    props.isLoading = true;
    const wrapper = mount(<Exercises {...props}/>);
    expect(wrapper.find('.wkr-loading__text')).to.have.lengthOf(1);
  });

  it('renders error message when unable to fetch exercises', () => {
    props.hasError = true;
    const wrapper = mount(<Exercises {...props}/>);
    expect(wrapper.find('.wkr-error-msg')).to.have.lengthOf(1);
  });

  it('renders list of exercises', () => {
    const wrapper = mount(<Exercises {...props}/>);
    expect(wrapper.find('.wkr-exercise-list').children()).to.have.lengthOf(props.exercises.length);
  });
});