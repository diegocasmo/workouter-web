import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {ExerciseList} from '../ExerciseList'
import {ExerciseItem} from '../ExerciseItem'

describe('<ExerciseList/>', () => {

  let props = null
  beforeEach(() => {
    props = {
      exercises: [{'name': 'Push Ups'},{'name': 'Burpees'}],
      handleDeleteExercise: () => {}
    }
  })

  it('renders', () => {
    const wrapper = shallow(<ExerciseList {...props}/>)
    expect(wrapper.find(ExerciseItem)).to.have.lengthOf(props.exercises.length)
  })

  it('renders a message when there are no exercises', () => {
    props.exercises = []
    const wrapper = shallow(<ExerciseList {...props}/>)
    expect(wrapper.find(ExerciseItem)).to.have.lengthOf(0)
    expect(wrapper.find('p').text()).to.be.equal('There are no exercises to show')
  })
})
