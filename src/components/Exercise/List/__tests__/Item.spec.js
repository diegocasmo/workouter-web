import React from 'react'
import {Factory} from 'rosie'
import sinon from 'sinon'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {ExerciseItem} from '../Item'
import {Link} from 'react-router-dom'

describe('<ExerciseItem/>', () => {

  let props = null
  beforeEach(() => {
    props = {
      exercise: Factory.build('exercise'),
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
      const wrapper = shallow(<ExerciseItem {...props}/>)
      expect(props.handleDeleteExercise.called).to.be.false

      // Click on delete item and confirm
      sinon.stub(window, 'confirm').returns(true)
      wrapper.find('.wkr-exercise-item__action-delete').simulate('click', {preventDefault: () => {}})

      // Expect 'handleDeleteExercise()' to be called with exercise id
      expect(props.handleDeleteExercise.calledOnce).to.be.true
      expect(props.handleDeleteExercise.calledWith(props.exercise.id)).to.be.true
    })

    it("doesn\'t call 'handleDeleteExercise' when action is clicked but UNconfirmed", () => {
      const wrapper = shallow(<ExerciseItem {...props}/>)
      expect(props.handleDeleteExercise.called).to.be.false

      // Click on delete item and cancel
      sinon.stub(window, 'confirm').returns(false)
      wrapper.find('.wkr-exercise-item__action-delete').simulate('click', {preventDefault: () => {}})

      // Expect 'handleDeleteExercise()' not to be called at all
      expect(props.handleDeleteExercise.calledOnce).to.be.false
    })
  })
})
