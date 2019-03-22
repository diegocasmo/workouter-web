import React from 'react'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {act} from 'react-dom/test-utils'
import {BrowserRouter as Router} from 'react-router-dom'
import {NewWorkout} from '../NewWorkout'
import {WorkoutForm} from '../../components/Workout/Form/Form'

describe('<NewWorkout/>', () => {

  let wrapper
  let props
  beforeEach(() => {
    props = {
      history: {push: () => {}},
      createWorkout: () => {},
      fetchExercises: () => {}
    }
  })

  it('renders', () => {
    act(() => { wrapper = mount(<Router><NewWorkout {...props}/></Router>) })
    expect(wrapper.find(NewWorkout).length).to.be.equal(1)
    expect(wrapper.find(WorkoutForm)).to.have.lengthOf(1)
    expect(wrapper.find(WorkoutForm).props().submitText).to.be.equal('Create Workout')
    expect(wrapper.find(WorkoutForm).props().history).to.be.eql(props.history)
    expect(wrapper.find(WorkoutForm).props().redirectTo).to.be.equal('/workouts')
    expect(wrapper.find(WorkoutForm).props().fetchExercises).to.be.equal(props.fetchExercises)
    expect(wrapper.find(WorkoutForm).props().handleSubmit).to.be.equal(props.createWorkout)
  })
})
