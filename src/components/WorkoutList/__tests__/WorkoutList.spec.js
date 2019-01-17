import React from 'react'
import {Factory} from 'rosie'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {WorkoutList} from '../WorkoutList'
import {WorkoutItem} from '../WorkoutItem'

describe('<WorkoutList/>', () => {

  let props
  beforeEach(() => {
    props = {
      workouts: Factory.buildList('workout', 3)
    }
  })

  it('renders', () => {
    const wrapper = shallow(<WorkoutList {...props}/>)
    expect(wrapper.find(WorkoutItem)).to.have.lengthOf(props.workouts.length)
  })

  it('renders a message when there are no workouts', () => {
    props.workouts = []
    const wrapper = shallow(<WorkoutList {...props}/>)
    expect(wrapper.find(WorkoutItem)).to.have.lengthOf(0)
    expect(wrapper.find('p').text()).to.be.equal('There are no workouts to show')
  })
})
