import React from 'react'
import { act } from 'react-dom/test-utils'
import sinon from 'sinon'
import { Factory } from 'rosie'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import { UpdateWorkout } from '../UpdateWorkout'
import { WorkoutForm } from '../../components/Workout/Form/Form'

describe('<UpdateWorkout/>', () => {
  let props
  beforeEach(() => {
    props = {
      history: { push: () => {} },
      workoutId: 1,
      workout: Factory.build('workout', { id: 1 }),
      isLoading: false,
      fetchExercises: () => {},
      createExercise: () => {},
      updateWorkout: () => {},
      getWorkout: sinon.spy(),
    }
  })

  it('renders', () => {
    const wrapper = mount(
      <Router>
        <UpdateWorkout {...props} />
      </Router>
    )
    expect(wrapper.find(UpdateWorkout).length).to.be.equal(1)
    expect(wrapper.find(WorkoutForm)).to.have.lengthOf(1)
    expect(wrapper.find(WorkoutForm).props().workout).to.be.eql(props.workout)
    expect(wrapper.find(WorkoutForm).props().submitText).to.be.equal(
      'Update Workout'
    )
    expect(wrapper.find(WorkoutForm).props().history).to.be.eql(props.history)
    expect(wrapper.find(WorkoutForm).props().redirectTo).to.be.equal(
      `/workouts/${props.workoutId}`
    )
    expect(wrapper.find(WorkoutForm).props().fetchExercises).to.be.equal(
      props.fetchExercises
    )
    expect(wrapper.find(WorkoutForm).props().createExercise).to.be.equal(
      props.createExercise
    )
    expect(wrapper.find(WorkoutForm).props().handleSubmit).to.be.equal(
      props.updateWorkout
    )
  })

  it("calls 'getWorkout()'", () => {
    expect(props.getWorkout.called).to.be.false
    let wrapper
    act(() => {
      wrapper = mount(
        <Router>
          <UpdateWorkout {...props} />
        </Router>
      )
    })
    expect(props.getWorkout.calledOnce).to.be.true
    expect(props.getWorkout.calledWith(props.workoutId)).to.be.true
  })
})
