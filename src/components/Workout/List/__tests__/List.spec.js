import React from 'react'
import {Factory} from 'rosie'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {WorkoutList} from '../List'
import {WorkoutItem} from '../Item'

describe('<WorkoutList/>', () => {

  let props
  beforeEach(() => {
    props = {
      hasMore: true,
      workouts: Factory.buildList('workout', 3)
    }
  })

  it('renders', () => {
    const wrapper = shallow(<WorkoutList {...props}/>)
    expect(wrapper.find(WorkoutItem)).to.have.lengthOf(props.workouts.length)
  })

  it('does not render there are no workouts message when `hasMore` is true', () => {
    props = {
      ...props,
      hasMore: true,
      workouts: []
    }
    const wrapper = shallow(<WorkoutList {...props}/>)
    expect(wrapper.find('p')).to.have.lengthOf(0)
    expect(wrapper.find(WorkoutItem)).to.have.lengthOf(0)
  })

  it('renders a message when there are no workouts', () => {
    props = {
      ...props,
      hasMore: false,
      workouts: []
    }
    const wrapper = shallow(<WorkoutList {...props}/>)
    expect(wrapper.find(WorkoutItem)).to.have.lengthOf(0)
    expect(wrapper.find('p').text()).to.be.equal('There are no workouts to show')
  })
})
