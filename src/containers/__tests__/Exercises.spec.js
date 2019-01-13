import React from 'react'
import sinon from 'sinon'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {BrowserRouter as Router} from 'react-router-dom'
import {Exercises} from '../Exercises'
import {Loading} from '../../components/Loading'
import {ErrorMsg} from '../../components/ErrorMsg'
import {ExerciseList} from '../../components/ExerciseList/ExerciseList'
import {ExerciseItem} from '../../components/ExerciseList/ExerciseItem'

describe('<Exercises/>', () => {

  let props
  beforeEach(() => {
    props = {
      exercises: [{id: 1, 'name': 'Burpees'},{id: 2, 'name': 'Push Ups'}],
      isLoading: false,
      hasError: false,
      handleFetchExercises: sinon.spy(),
      handleResetFetchExercises: sinon.spy(),
      handleDeleteExercise: sinon.spy(),
      handleResetDeleteExercise: sinon.spy()
    }
  })

  it('renders', () => {
    const wrapper = mount(<Router><Exercises {...props}/></Router>)
    expect(wrapper.find(Exercises).length).to.be.equal(1)
    expect(wrapper.find(Loading)).to.have.lengthOf(0)
    expect(wrapper.find(ErrorMsg)).to.have.lengthOf(0)
    expect(wrapper.find(ExerciseList)).to.have.lengthOf(1)
  })

  it("calls 'handleFetchExercises()' on 'componentDidMount()'", () => {
    expect(props.handleFetchExercises.calledOnce).to.be.false
    const wrapper = mount(<Router><Exercises {...props}/></Router>)
    expect(props.handleFetchExercises.calledOnce).to.be.true
  })

  it("calls 'handleResetFetchExercises()' and 'handleResetDeleteExercise()' on 'componentWillUnmount()'", () => {
    const wrapper = mount(<Router><Exercises {...props}/></Router>)
    expect(props.handleResetDeleteExercise.calledOnce).to.be.false
    wrapper.unmount()
    expect(props.handleResetFetchExercises.calledOnce).to.be.true
    expect(props.handleResetDeleteExercise.calledOnce).to.be.true
  })

  describe('handleDeleteExercise()', () => {

    afterEach(() => {
      window.confirm.restore()
    })

    it("calls 'handleDeleteExercise()' when a user attempts to delete an exercise", () => {
      sinon.stub(window, 'confirm').returns(true)
      const wrapper = mount(<Router><Exercises {...props}/></Router>)
      expect(props.handleDeleteExercise.calledOnce).to.be.false
      wrapper.find('.wkr-exercise-item__action-delete').first().simulate('click', {preventDefault: () => {}})
      expect(props.handleDeleteExercise.calledOnce).to.be.true
      expect(props.handleDeleteExercise.calledWith(props.exercises[0].id)).to.be.true

    })
  })

  it('renders <Loading/> when fetching exercises', () => {
    props.isLoading = true
    const wrapper = mount(<Router><Exercises {...props}/></Router>)
    expect(wrapper.find(Loading)).to.have.lengthOf(1)
    expect(wrapper.find(ErrorMsg)).to.have.lengthOf(0)
    expect(wrapper.find(ExerciseList)).to.have.lengthOf(0)
  })

  it('renders <ErrorMsg/> when unable to fetch exercises', () => {
    props.hasError = true
    const wrapper = mount(<Router><Exercises {...props}/></Router>)
    expect(wrapper.find(Loading)).to.have.lengthOf(0)
    expect(wrapper.find(ErrorMsg)).to.have.lengthOf(1)
    expect(wrapper.find(ExerciseList)).to.have.lengthOf(0)
  })

  it('renders list of exercises', () => {
    const wrapper = mount(<Router><Exercises {...props}/></Router>)
    expect(wrapper.find(Loading)).to.have.lengthOf(0)
    expect(wrapper.find(ErrorMsg)).to.have.lengthOf(0)
    expect(wrapper.find(ExerciseItem)).to.have.lengthOf(props.exercises.length)
  })
})
