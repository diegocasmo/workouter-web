import React from 'react'
import {Factory} from 'rosie'
import sinon from 'sinon'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {BrowserRouter as Router} from 'react-router-dom'
import {Workouts} from '../Workouts'
import {Loading} from '../../components/Loading'
import {Header} from '../../components/UI/Header'
import {WorkoutList} from '../../components/Workout/List/List'
import {WorkoutItem} from '../../components/Workout/List/Item'
import InfiniteScroll from 'react-infinite-scroller'

describe('<Workouts/>', () => {

  let wrapper
  let props
  beforeEach(() => {
    const workouts = Factory.buildList('workout', 3)
    props = {
      workouts,
      hasMore: true,
      canLoadMore: true,
      fetchWorkouts: sinon.spy(() => Promise.resolve(workouts)),
      fetchClear: sinon.spy()
    }
  })

  it('renders', () => {
    const wrapper = mount(<Router><Workouts {...props}/></Router>)
    expect(wrapper.find(Workouts).length).to.be.equal(1)

    // Workouts header
    expect(wrapper.find(Header)).to.have.lengthOf(1)
    expect(wrapper.find({to: '/workouts/new'}).text()).to.equal('New Workout')

    // Infinite scroll
    expect(wrapper.find(InfiniteScroll).props().pageStart).to.be.equal(-1)
    expect(wrapper.find(InfiniteScroll).props().loadMore).to.be.equal(props.fetchWorkouts)
    expect(wrapper.find(InfiniteScroll).props().hasMore).to.be.equal(props.canLoadMore)

    // Workouts list
    expect(wrapper.find(WorkoutList)).to.have.lengthOf(1)
    expect(wrapper.find(WorkoutItem)).to.have.lengthOf(props.workouts.length)
  })

  it("calls 'fetchClear' when component will unmount", () => {
    const wrapper = mount(<Router><Workouts {...props}/></Router>)
    expect(props.fetchClear.calledOnce).to.be.false
    wrapper.unmount()
    expect(props.fetchClear.calledOnce).to.be.true
  })
})
