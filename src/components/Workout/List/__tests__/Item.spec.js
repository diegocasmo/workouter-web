import React from 'react'
import { Factory } from 'rosie'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { WorkoutItem } from '../Item'
import { Link } from 'react-router-dom'

describe('<WorkoutItem/>', () => {
  let props = null
  beforeEach(() => {
    props = {
      workout: Factory.build('workout'),
    }
  })

  it('renders', () => {
    const wrapper = shallow(<WorkoutItem {...props} />)
    // <Link/>
    expect(wrapper.find(Link).props().to).to.be.equal(
      `/workouts/${props.workout.id}`
    )
    expect(wrapper.find('.wkr-workout-item__name').text()).to.be.equal(
      props.workout.name
    )
    expect(
      wrapper.find('.wkr-workout-item__exercise-count').text()
    ).to.be.equal(`${props.workout.exercises.length} exercises`)
  })
})
