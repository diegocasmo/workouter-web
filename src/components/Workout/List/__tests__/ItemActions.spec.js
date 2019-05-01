import React from 'react'
import {Factory} from 'rosie'
import {expect} from 'chai'
import sinon from 'sinon'
import {shallow} from 'enzyme'
import {Link} from 'react-router-dom'
import {WorkoutItemActions} from '../ItemActions'

describe('<WorkoutItemActions/>', () => {

  let props = null
  beforeEach(() => {
    props = {
      workout: Factory.build('workout'),
      handleDeleteWorkout: sinon.spy()
    }
  })

  it('renders', () => {
    const wrapper = shallow(<WorkoutItemActions {...props}/>)
    // Start session link
    expect(wrapper.find({to: `/sessions/new/${props.workout.id}`}).props().children)
      .to.be.equal('Start')

    // Update link
    expect(wrapper.find({to: `/workouts/update/${props.workout.id}`}).props().children)
      .to.be.equal('Update')

    // Delete link
    expect(wrapper.find({to: `/workouts`}).props().children)
      .to.be.equal('Delete')
  })

  describe('handleDeleteWorkout', () => {
    afterEach(() => {
      window.confirm.restore()
    })

    it("calls 'handleDeleteWorkout' when action is clicked and confirmed", () => {
      const wrapper = shallow(<WorkoutItemActions {...props}/>)
      expect(props.handleDeleteWorkout.called).to.be.false

      // Click on delete item and confirm
      sinon.stub(window, 'confirm').returns(true)
      const event = {preventDefault: sinon.spy()}
      wrapper.find('.wkr-workout-item-actions__delete-link').simulate('click', event)

      // Expect 'handleDeleteWorkout()' to be called with workout id
      expect(props.handleDeleteWorkout.calledOnce).to.be.true
      expect(props.handleDeleteWorkout.calledWith(props.workout.id)).to.be.true
      // User confirmed, so the redirection must happen
      expect(event.preventDefault.called).to.be.false
    })

    it("doesn\'t call 'handleDeleteWorkout' when action is clicked but UNconfirmed", () => {
      const wrapper = shallow(<WorkoutItemActions {...props}/>)
      expect(props.handleDeleteWorkout.called).to.be.false

      // Click on delete item and cancel
      sinon.stub(window, 'confirm').returns(false)
      const event = {preventDefault: sinon.spy()}
      wrapper.find('.wkr-workout-item-actions__delete-link').simulate('click', event)

      // Expect 'handleDeleteWorkout()' not to be called at all
      expect(props.handleDeleteWorkout.calledOnce).to.be.false
      // User canceled, so the redirection must be prevented
      expect(event.preventDefault.calledOnce).to.be.true
    })
  })
})
