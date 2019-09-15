import React from 'react'
import { Factory } from 'rosie'
import sinon from 'sinon'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import { Exercises } from '../Exercises'
import { Header } from '../../components/UI/Header'
import { ExerciseList } from '../../components/Exercise/List/List'
import { ExerciseItem } from '../../components/Exercise/List/Item'
import InfiniteScroll from 'react-infinite-scroller'

describe('<Exercises/>', () => {
  let props
  let wrapper
  beforeEach(() => {
    const exercises = Factory.buildList('exercise', 10)
    props = {
      hasMore: true,
      canLoadMore: true,
      exercises,
      fetchExercises: sinon.spy(() => Promise.resolve(exercises)),
      fetchClear: sinon.spy(),
      deleteExercise: sinon.spy(() => Promise.resolve()),
    }
  })

  it('renders', () => {
    const wrapper = mount(
      <Router>
        <Exercises {...props} />
      </Router>
    )
    expect(wrapper.find(Exercises).length).to.be.equal(1)

    // Exercises header
    expect(wrapper.find(Header)).to.have.lengthOf(1)
    expect(wrapper.find({ to: '/exercises/new' }).text()).to.equal(
      'New Exercise'
    )

    // Infinite scroll
    expect(wrapper.find(InfiniteScroll).props().pageStart).to.be.equal(-1)
    expect(wrapper.find(InfiniteScroll).props().loadMore).to.be.equal(
      props.fetchExercises
    )
    expect(wrapper.find(InfiniteScroll).props().hasMore).to.be.equal(
      props.canLoadMore
    )

    // Exercises list
    expect(wrapper.find(ExerciseList)).to.have.lengthOf(1)
    expect(wrapper.find(ExerciseItem)).to.have.lengthOf(props.exercises.length)
  })

  it("calls 'fetchClear' when component will unmount", () => {
    const wrapper = mount(
      <Router>
        <Exercises {...props} />
      </Router>
    )
    expect(props.fetchClear.calledOnce).to.be.false
    wrapper.unmount()
    expect(props.fetchClear.calledOnce).to.be.true
  })

  describe('deleteExercise()', () => {
    afterEach(() => {
      window.confirm.restore()
    })

    it("calls 'deleteExercise()' when a user attempts to delete an exercise", () => {
      const wrapper = mount(
        <Router>
          <Exercises {...props} />
        </Router>
      )
      expect(props.deleteExercise.calledOnce).to.be.false

      // Click on delete item and confirm
      sinon.stub(window, 'confirm').returns(true)
      wrapper
        .find('.wkr-exercise-item__action-delete')
        .first()
        .simulate('click', { preventDefault: () => {} })

      // Expect 'deleteExercise()' to be called with workout id
      expect(props.deleteExercise.calledOnce).to.be.true
      expect(props.deleteExercise.calledWith(props.exercises[0].id)).to.be.true
    })
  })
})
