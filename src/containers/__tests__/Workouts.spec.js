import React from 'react'
import sinon from 'sinon'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {BrowserRouter as Router} from 'react-router-dom'
import {Workouts} from '../Workouts'
import {Loading} from '../../components/Loading'
import {ErrorMsg} from '../../components/ErrorMsg'
import {WorkoutItem} from '../../components/WorkoutList/WorkoutItem'

describe('<Workouts/>', () => {

  let props
  beforeEach(() => {
    props = {
      workouts: [{'title': 'Full Body I'},{'title': 'Full Body II'}],
      areWorkoutsLoading: false,
      hasWorkoutsError: false,
      onFetchWorkouts: sinon.spy()
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

  it('renders <Loading/> when fetching workouts', () => {
    props.areWorkoutsLoading = true
    const wrapper = mount(<Router><Workouts {...props}/></Router>)
    expect(wrapper.find(Loading)).to.have.lengthOf(1)
  })

  it('renders <ErrorMsg/> when unable to fetch exercises', () => {
    props.hasWorkoutsError = true
    const wrapper = mount(<Router><Workouts {...props}/></Router>)
    expect(wrapper.find(ErrorMsg)).to.have.lengthOf(1)
  })

  it('renders list of workouts', () => {
    const wrapper = mount(<Router><Workouts {...props}/></Router>)
    expect(wrapper.find(WorkoutItem)).to.have.lengthOf(props.workouts.length)
  })
})
