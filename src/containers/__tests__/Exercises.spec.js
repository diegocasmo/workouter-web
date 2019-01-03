import React from 'react'
import sinon from 'sinon'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {Exercises} from '../Exercises'
import {Loading} from '../../components/Loading'
import {ErrorMsg} from '../../components/ErrorMsg'
import {ExerciseItem} from '../../components/ExerciseList/ExerciseItem'

describe('<Exercises/>', () => {

  let props
  beforeEach(() => {
    props = {
      onFetchExercises: sinon.spy(),
      exercises: [{"name": "Burpees"},{"name": "Push Ups"}],
      areExercisesLoading: false,
      hasExercisesError: false
    }
  })

  it('renders', () => {
    const wrapper = mount(<Exercises {...props}/>)
    expect(wrapper.find(Exercises).length).to.be.equal(1)
  })

  it('calls onFetchExercises() on componentDidMount()', () => {
    expect(props.onFetchExercises.calledOnce).to.be.false
    const wrapper = mount(<Exercises {...props}/>)
    expect(props.onFetchExercises.calledOnce).to.be.true
  })

  it('renders <Loading/> when fetching exercises', () => {
    props.areExercisesLoading = true
    const wrapper = mount(<Exercises {...props}/>)
    expect(wrapper.find(Loading)).to.have.lengthOf(1)
  })

  it('renders <ErrorMsg/> when unable to fetch exercises', () => {
    props.hasExercisesError = true
    const wrapper = mount(<Exercises {...props}/>)
    expect(wrapper.find(ErrorMsg)).to.have.lengthOf(1)
  })

  it('renders list of exercises', () => {
    const wrapper = mount(<Exercises {...props}/>)
    expect(wrapper.find(ExerciseItem)).to.have.lengthOf(props.exercises.length)
  })
})
