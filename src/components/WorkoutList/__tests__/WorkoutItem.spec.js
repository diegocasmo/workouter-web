import React from 'react'
import {Factory} from 'rosie'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {WorkoutItem} from '../WorkoutItem'
import {Link} from 'react-router-dom'

describe('<WorkoutItem/>', () => {

  let props
  beforeEach(() => {
    props = Factory.build('workout')
  })

  it('renders', () => {
    const wrapper = shallow(<WorkoutItem {...props}/>)
    expect(wrapper.find(Link).props().to).to.be.equal(`/workouts/${props.id}`)
    expect(wrapper.find(Link).props().children.join(''))
      .to.be.equal(`${props.name} (${props.exercises.length} exercises)`)
  })
})
