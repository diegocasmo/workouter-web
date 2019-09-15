import React from 'react'
import { Factory } from 'rosie'
import { expect } from 'chai'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'
import { WorkoutActions } from '../Actions'

describe('<WorkoutActions/>', () => {
  let props = null
  beforeEach(() => {
    props = {
      workout: Factory.build('workout'),
      handleDeleteWorkout: sinon.spy(),
    }
  })

  it('renders', () => {
    const wrapper = shallow(<WorkoutActions {...props} />)
    // Start session link
    expect(
      wrapper.find('.wkr-workout-actions__start').props().children
    ).to.be.equal('Start')
    expect(wrapper.find('.wkr-workout-actions__start').props().to).to.be.equal(
      `/sessions/new/${props.workout.id}`
    )
    // Update link
    expect(
      wrapper.find('.wkr-workout-actions__update').props().children
    ).to.be.equal('Update')
    expect(wrapper.find('.wkr-workout-actions__update').props().to).to.be.equal(
      `/workouts/update/${props.workout.id}`
    )
    // Delete link
    expect(
      wrapper.find('.wkr-workout-actions__delete').props().children
    ).to.be.equal('Delete')
    expect(wrapper.find('.wkr-workout-actions__delete').props().to).to.be.equal(
      `/workouts`
    )
  })

  describe('handleDeleteWorkout', () => {
    afterEach(() => {
      window.confirm.restore()
    })

    it("calls 'handleDeleteWorkout' when action is clicked and confirmed", () => {
      const wrapper = shallow(<WorkoutActions {...props} />)
      expect(props.handleDeleteWorkout.called).to.be.false

      // Click on delete item and confirm
      sinon.stub(window, 'confirm').returns(true)
      const event = { preventDefault: sinon.spy() }
      wrapper.find('.wkr-workout-actions__delete').simulate('click', event)

      // Expect 'handleDeleteWorkout()' to be called with workout id
      expect(props.handleDeleteWorkout.calledOnce).to.be.true
      expect(props.handleDeleteWorkout.calledWith(props.workout.id)).to.be.true
      // User confirmed, so the redirection must happen
      expect(event.preventDefault.called).to.be.false
    })

    it("doesn't call 'handleDeleteWorkout' when action is clicked but UNconfirmed", () => {
      const wrapper = shallow(<WorkoutActions {...props} />)
      expect(props.handleDeleteWorkout.called).to.be.false

      // Click on delete item and cancel
      sinon.stub(window, 'confirm').returns(false)
      const event = { preventDefault: sinon.spy() }
      wrapper.find('.wkr-workout-actions__delete').simulate('click', event)

      // Expect 'handleDeleteWorkout()' not to be called at all
      expect(props.handleDeleteWorkout.calledOnce).to.be.false
      // User canceled, so the redirection must be prevented
      expect(event.preventDefault.calledOnce).to.be.true
    })
  })
})
