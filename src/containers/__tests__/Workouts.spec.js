import React from 'react'
import sinon from 'sinon'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {BrowserRouter as Router} from 'react-router-dom'
import {Workouts} from '../Workouts'
import {Loading} from '../../components/Loading'
import {ErrorMsg} from '../../components/ErrorMsg'
import {WorkoutList} from '../../components/WorkoutList/WorkoutList'
import {WorkoutItem} from '../../components/WorkoutList/WorkoutItem'

describe('<Workouts/>', () => {

  let props
  beforeEach(() => {
    props = {
      workouts: [{'name': 'Full Body I'},{'name': 'Full Body II'}],
      isLoading: false,
      hasError: false,
      handleFetchWorkouts: sinon.spy(),
      handleResetFetchWorkouts: sinon.spy()
    }
  })

  it('renders', () => {
    const wrapper = mount(<Router><Workouts {...props}/></Router>)
    expect(wrapper.find(Workouts).length).to.be.equal(1)
    expect(wrapper.find(Loading)).to.have.lengthOf(0)
    expect(wrapper.find(ErrorMsg)).to.have.lengthOf(0)
    expect(wrapper.find(WorkoutList)).to.have.lengthOf(1)
  })

  it('calls handleFetchWorkouts() on componentDidMount()', () => {
    expect(props.handleFetchWorkouts.calledOnce).to.be.false
    const wrapper = mount(<Router><Workouts {...props}/></Router>)
    expect(props.handleFetchWorkouts.calledOnce).to.be.true
  })

  it("calls 'handleResetFetchWorkouts()' on 'componentWillUnmount()'", () => {
    const wrapper = mount(<Router><Workouts {...props}/></Router>)
    expect(props.handleResetFetchWorkouts.calledOnce).to.be.false
    wrapper.unmount()
    expect(props.handleResetFetchWorkouts.calledOnce).to.be.true
  })

  it('renders <Loading/> when fetching workouts', () => {
    props.isLoading = true
    const wrapper = mount(<Router><Workouts {...props}/></Router>)
    expect(wrapper.find(Loading)).to.have.lengthOf(1)
    expect(wrapper.find(ErrorMsg)).to.have.lengthOf(0)
    expect(wrapper.find(WorkoutList)).to.have.lengthOf(0)
  })

  it('renders <ErrorMsg/> when unable to fetch exercises', () => {
    props.hasError = true
    const wrapper = mount(<Router><Workouts {...props}/></Router>)
    expect(wrapper.find(Loading)).to.have.lengthOf(0)
    expect(wrapper.find(ErrorMsg)).to.have.lengthOf(1)
    expect(wrapper.find(WorkoutList)).to.have.lengthOf(0)
  })

  it('renders list of workouts', () => {
    const wrapper = mount(<Router><Workouts {...props}/></Router>)
    expect(wrapper.find(Loading)).to.have.lengthOf(0)
    expect(wrapper.find(ErrorMsg)).to.have.lengthOf(0)
    expect(wrapper.find(WorkoutItem)).to.have.lengthOf(props.workouts.length)
  })
})
