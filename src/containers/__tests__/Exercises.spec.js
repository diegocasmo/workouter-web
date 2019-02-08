import React from 'react'
import {Factory} from 'rosie'
import sinon from 'sinon'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {act} from 'react-dom/test-utils'
import {BrowserRouter as Router} from 'react-router-dom'
import {Exercises} from '../Exercises'
import {Loading} from '../../components/Loading'
import {ExerciseList} from '../../components/ExerciseList/ExerciseList'
import {ExerciseItem} from '../../components/ExerciseList/ExerciseItem'

describe('<Exercises/>', () => {

  let props
  beforeEach(() => {
    props = {
      exercises: Factory.buildList('exercise', 2),
      isLoading: false,
      fetchExercises: sinon.spy(),
      deleteExercise: sinon.spy(),
    }
  })

  it('renders', () => {
    const wrapper = mount(<Router><Exercises {...props}/></Router>)
    expect(wrapper.find(Exercises).length).to.be.equal(1)
    expect(wrapper.find(Loading)).to.have.lengthOf(0)
    expect(wrapper.find(ExerciseList)).to.have.lengthOf(1)
  })

  it("calls 'fetchExercises()'", () => {
    expect(props.fetchExercises.calledOnce).to.be.false
    let wrapper
    act(() => { wrapper = mount(<Router><Exercises {...props}/></Router>) })
    expect(props.fetchExercises.calledOnce).to.be.true
  })

  describe('deleteExercise()', () => {

    afterEach(() => {
      window.confirm.restore()
    })

    it("calls 'deleteExercise()' when a user attempts to delete an exercise", () => {
      const wrapper = mount(<Router><Exercises {...props}/></Router>)
      expect(props.deleteExercise.calledOnce).to.be.false

      // Click on delete item and confirm
      sinon.stub(window, 'confirm').returns(true)
      wrapper.find('.wkr-exercise-item__action-delete').first().simulate('click', {preventDefault: () => {}})

      // Expect 'deleteExercise()' to be called with workout id
      expect(props.deleteExercise.calledOnce).to.be.true
      expect(props.deleteExercise.calledWith(props.exercises[0].id)).to.be.true
    })
  })

  it('renders <Loading/> when fetching exercises', () => {
    props.isLoading = true
    const wrapper = mount(<Router><Exercises {...props}/></Router>)
    expect(wrapper.find(Loading)).to.have.lengthOf(1)
    expect(wrapper.find(ExerciseList)).to.have.lengthOf(0)
  })

  it('renders list of exercises', () => {
    const wrapper = mount(<Router><Exercises {...props}/></Router>)
    expect(wrapper.find(Loading)).to.have.lengthOf(0)
    expect(wrapper.find(ExerciseItem)).to.have.lengthOf(props.exercises.length)
  })
})
