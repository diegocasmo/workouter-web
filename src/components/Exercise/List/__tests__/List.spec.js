import React from 'react'
import {Factory} from 'rosie'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {ExerciseList} from '../List'
import {ExerciseItem} from '../Item'

describe('<ExerciseList/>', () => {

  let props = null
  beforeEach(() => {
    props = {
      hasMore: false,
      exercises: Factory.buildList('exercise', 2),
      handleDeleteExercise: () => {}
    }
  })

  it('renders', () => {
    const wrapper = shallow(<ExerciseList {...props}/>)
    expect(wrapper.find(ExerciseItem)).to.have.lengthOf(props.exercises.length)
  })

  it('does not render there are no exercises message when `hasMore` is true', () => {
    props = {
      ...props,
      hasMore: true,
      exercises: []
    }
    const wrapper = shallow(<ExerciseList {...props}/>)
    expect(wrapper.find('p')).to.have.lengthOf(0)
    expect(wrapper.find(ExerciseItem)).to.have.lengthOf(0)
  })

  it('renders a message when there are no exercises', () => {
    props = {
      ...props,
      hasMore: false,
      exercises: []
    }
    const wrapper = shallow(<ExerciseList {...props}/>)
    expect(wrapper.find(ExerciseItem)).to.have.lengthOf(0)
    expect(wrapper.find('p').text()).to.be.equal('There are no exercises to show')
  })
})
