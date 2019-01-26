import React from 'react'
import {Factory} from 'rosie'
import sinon from 'sinon'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {BrowserRouter as Router} from 'react-router-dom'
import {Workouts} from '../Workouts'
import {Loading} from '../../components/Loading'
import {WorkoutList} from '../../components/WorkoutList/WorkoutList'
import {WorkoutItem} from '../../components/WorkoutList/WorkoutItem'

describe('<Workouts/>', () => {

  let props
  beforeEach(() => {
    props = {
      workouts: Factory.buildList('workout', 2),
      isLoading: false,
      handleFetchWorkouts: sinon.spy(),
      handleDeleteWorkout: sinon.spy(),
    }
  })

  it('renders', () => {
    const wrapper = mount(<Router><Workouts {...props}/></Router>)
    expect(wrapper.find(Workouts).length).to.be.equal(1)
    expect(wrapper.find(Loading)).to.have.lengthOf(0)
    expect(wrapper.find(WorkoutList)).to.have.lengthOf(1)
  })

  it('calls handleFetchWorkouts() on componentDidMount()', () => {
    expect(props.handleFetchWorkouts.calledOnce).to.be.false
    const wrapper = mount(<Router><Workouts {...props}/></Router>)
    expect(props.handleFetchWorkouts.calledOnce).to.be.true
  })

  describe('handleDeleteWorkout()', () => {

    afterEach(() => {
      window.confirm.restore()
    })

    it("calls 'handleDeleteWorkout()' when a user attempts to delete a workout", () => {
      const wrapper = mount(<Router><Workouts {...props}/></Router>)
      expect(props.handleDeleteWorkout.calledOnce).to.be.false

      // Click on delete item and confirm
      sinon.stub(window, 'confirm').returns(true)
      wrapper.find('.wkr-workout-item__action-delete').first().simulate('click', {preventDefault: () => {}})

      // Expect 'handleDeleteWorkout()' to be called with workout id
      expect(props.handleDeleteWorkout.calledOnce).to.be.true
      expect(props.handleDeleteWorkout.calledWith(props.workouts[0].id)).to.be.true
    })
  })

  it('renders <Loading/> when fetching workouts', () => {
    props.isLoading = true
    const wrapper = mount(<Router><Workouts {...props}/></Router>)
    expect(wrapper.find(Loading)).to.have.lengthOf(1)
    expect(wrapper.find(WorkoutList)).to.have.lengthOf(0)
  })

  it('renders list of workouts', () => {
    const wrapper = mount(<Router><Workouts {...props}/></Router>)
    expect(wrapper.find(Loading)).to.have.lengthOf(0)
    expect(wrapper.find(WorkoutItem)).to.have.lengthOf(props.workouts.length)
  })
})
