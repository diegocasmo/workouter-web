import React from 'react'
import sinon from 'sinon'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {Workouts} from '../Workouts'
import {BrowserRouter as Router} from 'react-router-dom'

describe('<Workouts/>', () => {

  let props
  beforeEach(() => {
    props = {
      onFetchWorkouts: sinon.spy(),
      workouts: [{"title": "Full Body I"},{"title": "Full Body II"}],
      isFetching: false,
      hasFetchFailed: false
    }
  })

  it('renders', () => {
    const wrapper = mount(<Router><Workouts {...props}/></Router>)
    expect(wrapper.find(Workouts).length).to.be.equal(1)
  })

  it('calls onFetchWorkouts() on componentDidMount()', () => {
    expect(props.onFetchWorkouts.calledOnce).to.be.false
    const wrapper = mount(<Router><Workouts {...props}/></Router>)
    expect(props.onFetchWorkouts.calledOnce).to.be.true
  })

  it('renders loading when fetching', () => {
    props.isFetching = true
    const wrapper = mount(<Router><Workouts {...props}/></Router>)
    expect(wrapper.find('.wkr-loading__text')).to.have.lengthOf(1)
  })

  it('renders error message when unable to fetch workouts', () => {
    props.hasFetchFailed = true
    const wrapper = mount(<Router><Workouts {...props}/></Router>)
    expect(wrapper.find('.wkr-error-msg')).to.have.lengthOf(1)
  })

  it('renders list of workouts', () => {
    const wrapper = mount(<Router><Workouts {...props}/></Router>)
    expect(wrapper.find('.wkr-workout-list').children()).to.have.lengthOf(props.workouts.length)
  })
})
