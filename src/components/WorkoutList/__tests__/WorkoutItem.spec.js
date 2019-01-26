import React from 'react'
import sinon from 'sinon'
import {Factory} from 'rosie'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {WorkoutItem} from '../WorkoutItem'
import {Link} from 'react-router-dom'

describe('<WorkoutItem/>', () => {

  let props
  beforeEach(() => {
    props = {
      workout: Factory.build('workout'),
      handleDeleteWorkout: sinon.spy(),
    }
  })

  it('renders', () => {
    const wrapper = shallow(<WorkoutItem {...props}/>)
    expect(wrapper.find('.wkr-workout-item__title').props().to).to.be.equal(`/workouts/${props.workout.id}`)
    expect(wrapper.find('.wkr-workout-item__title').props().children.join(''))
      .to.be.equal(`${props.workout.name} (${props.workout.exercises.length} exercises)`)
  })

  describe('handleDeleteWorkout', () => {
    afterEach(() => {
      window.confirm.restore()
    })

    it("calls 'handleDeleteWorkout' when action is clicked and confirmed", () => {
      const wrapper = shallow(<WorkoutItem {...props}/>)
      expect(props.handleDeleteWorkout.called).to.be.false

      // Click on delete item and confirm
      sinon.stub(window, 'confirm').returns(true)
      wrapper.find('.wkr-workout-item__action-delete').simulate('click', {preventDefault: () => {}})

      // Expect 'handleDeleteWorkout()' to be called with workout id
      expect(props.handleDeleteWorkout.calledOnce).to.be.true
      expect(props.handleDeleteWorkout.calledWith(props.workout.id)).to.be.true
    })

    it("doesn\'t call 'handleDeleteWorkout' when action is clicked but UNconfirmed", () => {
      const wrapper = shallow(<WorkoutItem {...props}/>)
      expect(props.handleDeleteWorkout.called).to.be.false

      // Click on delete item and cancel
      sinon.stub(window, 'confirm').returns(false)
      wrapper.find('.wkr-workout-item__action-delete').simulate('click', {preventDefault: () => {}})

      // Expect 'handleDeleteWorkout()' not to be called at all
      expect(props.handleDeleteWorkout.calledOnce).to.be.false
    })
  })
})
