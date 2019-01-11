import React from 'react'
import sinon from 'sinon'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {ExerciseItem} from '../ExerciseItem'
import {Link} from 'react-router-dom'

describe('<ExerciseItem/>', () => {

  let props = null
  beforeEach(() => {
    props = {
      exercise: {id: 1, 'name': 'Abs'},
      handleDeleteExercise: sinon.spy()
    }
  })

  it('renders', () => {
    const wrapper = shallow(<ExerciseItem {...props}/>)
    expect(wrapper.find('.wkr-exercise-item__name').text()).to.be.equal(props.exercise.name)
    expect(wrapper.find({to: `/exercises/update/${props.exercise.id}`})).to.have.lengthOf(1)
  })

  describe('handleDeleteExercise', () => {
    afterEach(() => {
      window.confirm.restore()
    })

    it("calls 'handleDeleteExercise' when action is clicked and confirmed", () => {
      expect(props.handleDeleteExercise.called).to.be.false
      sinon.stub(window, 'confirm').returns(true)
      const wrapper = shallow(<ExerciseItem {...props}/>)
      wrapper.find('.wkr-exercise-item__action-delete').simulate('click', {preventDefault: () => {}})
      expect(props.handleDeleteExercise.calledOnce).to.be.true
      expect(props.handleDeleteExercise.calledWith(props.exercise.id)).to.be.true
    })

    it("doesn\'t call 'handleDeleteExercise' when action is clicked but unconfirmed", () => {
      expect(props.handleDeleteExercise.called).to.be.false
      sinon.stub(window, 'confirm').returns(false)
      const wrapper = shallow(<ExerciseItem {...props}/>)
      wrapper.find('.wkr-exercise-item__action-delete').simulate('click', {preventDefault: () => {}})
      expect(props.handleDeleteExercise.calledOnce).to.be.false
    })
  })
})
