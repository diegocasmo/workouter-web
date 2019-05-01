import React from 'react'
import {act} from 'react-dom/test-utils'
import {Factory} from 'rosie'
import sinon from 'sinon'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {BrowserRouter as Router} from 'react-router-dom'
import {Workouts} from '../Workouts'
import {Loading} from '../../components/Loading'
import {WorkoutList} from '../../components/Workout/List/List'
import {WorkoutItem} from '../../components/Workout/List/Item'

describe('<Workouts/>', () => {

  let props
  beforeEach(() => {
    props = {
      workouts: Factory.buildList('workout', 2),
      isLoading: false,
      fetchWorkouts: sinon.spy(),
      deleteWorkout: sinon.spy()
    }
  })

  it('renders', () => {
    const wrapper = mount(<Router><Workouts {...props}/></Router>)
    expect(wrapper.find(Workouts).length).to.be.equal(1)
    expect(wrapper.find(Loading)).to.have.lengthOf(0)
    expect(wrapper.find(WorkoutList)).to.have.lengthOf(1)
  })

  it('calls fetchWorkouts()', () => {
    expect(props.fetchWorkouts.calledOnce).to.be.false
    let wrapper
    act(() => { wrapper = mount(<Router><Workouts {...props}/></Router>) })
    expect(props.fetchWorkouts.calledOnce).to.be.true
  })

  describe('deleteWorkout()', () => {

    afterEach(() => {
      window.confirm.restore()
    })

    it("calls 'deleteWorkout()' when a user attempts to delete a workout", () => {
      const wrapper = mount(<Router><Workouts {...props}/></Router>)
      expect(props.deleteWorkout.calledOnce).to.be.false

      // Click on delete item and confirm
      sinon.stub(window, 'confirm').returns(true)
      wrapper.find('.wkr-workout-item-actions__delete-link').first().simulate('click', {preventDefault: () => {}})

      // Expect 'deleteWorkout()' to be called with workout id
      expect(props.deleteWorkout.calledOnce).to.be.true
      expect(props.deleteWorkout.calledWith(props.workouts[0].id)).to.be.true
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
