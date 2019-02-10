import React from 'react'
import {Factory} from 'rosie'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {WorkoutExerciseList} from '../WorkoutExerciseList'
import {WorkoutExerciseItem} from '../WorkoutExerciseItem'

describe('<WorkoutExerciseList/>', () => {

  let props = null
  beforeEach(() => {
    props = Factory.build('workout')
  })

  it('renders', () => {
    const wrapper = shallow(<WorkoutExerciseList {...props}/>)
    expect(wrapper.find('.wkr-workout-exercise-list__title').text()).to.be.equal('Exercises:')
    expect(wrapper.find(WorkoutExerciseItem)).to.have.lengthOf(props.exercises.length)
  })

  it('renders a message when there are no exercises', () => {
    props.exercises = []
    const wrapper = shallow(<WorkoutExerciseList {...props}/>)
    expect(wrapper.find(WorkoutExerciseItem)).to.have.lengthOf(0)
    expect(wrapper.find('p').text()).to.be.equal('There are no exercises to show')
  })
})
