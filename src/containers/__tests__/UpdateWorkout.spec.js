import React from 'react'
import {act} from 'react-dom/test-utils'
import sinon from 'sinon'
import faker from 'faker'
import {Factory} from 'rosie'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {BrowserRouter as Router} from 'react-router-dom'
import {UpdateWorkout} from '../UpdateWorkout'
import {WorkoutForm} from '../../components/WorkoutForm'

describe('<UpdateWorkout/>', () => {

  let props
  beforeEach(() => {
    props = {
      history: {push: sinon.spy()},
      workoutId: 1,
      workout: Factory.build('workout', {id: 1}),
      exercises: Factory.buildList('exercise', 2),
      isLoading: false,
      updateWorkout: sinon.spy(() => Promise.resolve()),
      getWorkout: sinon.spy(),
      fetchExercises: sinon.spy(),
    }
  })

  it('renders', () => {
    const wrapper = mount(<Router><UpdateWorkout {...props}/></Router>)
    expect(wrapper.find(UpdateWorkout).length).to.be.equal(1)
    expect(wrapper.find(WorkoutForm)).to.have.lengthOf(1)
  })

  it("calls 'getWorkout()' and 'fetchExercises()'", () => {
    expect(props.getWorkout.called).to.be.false
    expect(props.fetchExercises.called).to.be.false
    let wrapper
    act(() => { wrapper = mount(<Router><UpdateWorkout {...props}/></Router>) })
    expect(props.getWorkout.calledOnce).to.be.true
    expect(props.getWorkout.calledWith(props.workoutId)).to.be.true
    expect(props.fetchExercises.calledOnce).to.be.true
  })

  it('can update a workout', async () => {
    const wrapper = mount(<Router><UpdateWorkout {...props}/></Router>)
    const updatedWorkout = Factory.build('workout')

    // Helper method to facilitate building `simulate` events
    const getEvent = (id, v) => ({target: {id: id, value: v}})

    // Update workout setup details
    wrapper.find("input[name='name']").simulate('change', getEvent('name', updatedWorkout.name))
    wrapper.find("input[name='rounds']").simulate('change', getEvent('rounds', updatedWorkout.rounds))
    wrapper.find("input[name='restTimePerRound']").simulate('change', getEvent('restTimePerRound', updatedWorkout.restTimePerRound))
    wrapper.find("input[name='restTimePerExercise']").simulate('change', getEvent('restTimePerExercise', updatedWorkout.restTimePerExercise))

    // Navigate to next page
    wrapper.find('form').simulate('submit')
    await tick()
    wrapper.update()

    // Update some details of the first exercise
    const exerciseName = 'foo'
    const exerciseQuantity = 99
    const exerciseWeight = 23
    wrapper.find(`select[name='exercises.0.name']`).simulate('change', getEvent('exercises.0.name', exerciseName))
    wrapper.find(`input[name='exercises.0.quantity']`).simulate('change', getEvent('exercises.0.quantity', exerciseQuantity))
    wrapper.find(`input[name='exercises.0.weight']`).simulate('change', getEvent('exercises.0.weight', exerciseWeight))

    // Store update exercises for comparison with excepted behavior
    let updatedExercises = props.workout.exercises
    updatedExercises[0] = {
      ...props.workout.exercises[0],
      name: exerciseName,
      quantity: exerciseQuantity,
      weight: exerciseWeight
    }

    // Submit updated workout
    wrapper.find('form').simulate('submit')
    await tick()

    // Expect to be called with the update workout in form
    expect(props.updateWorkout.calledOnce).to.be.true
    expect(props.updateWorkout.calledWith({
      ...props.workout,
      name: updatedWorkout.name,
      rounds: updatedWorkout.rounds,
      restTimePerRound: updatedWorkout.restTimePerRound,
      restTimePerExercise: updatedWorkout.restTimePerExercise,
      exercises: updatedExercises
    })).to.be.true

    // Expect redirect
    expect(props.history.push.calledOnce).to.be.true
    expect(props.history.push.calledWith('/workouts')).to.be.true
  })
})

function tick() {
  return new Promise(resolve => {
    setTimeout(resolve, 0)
  })
}
