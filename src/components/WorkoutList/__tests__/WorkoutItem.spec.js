import React from 'react'
import sinon from 'sinon'
import {Factory} from 'rosie'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {WorkoutItem} from '../WorkoutItem'
import {Link} from 'react-router-dom'

describe('<WorkoutItem/>', () => {

  let props
  beforeEach(() => {
    props = {
      workout: Factory.build('workout'),
      handleDeleteWorkout: sinon.spy(),
    }
  })

  it('renders', () => {
    const wrapper = shallow(<WorkoutItem {...props}/>)
    expect(wrapper.find('.wkr-workout-item__title').props().to).to.be.equal(`/workouts/${props.workout.id}`)
    expect(wrapper.find('.wkr-workout-item__title').props().children.join(''))
      .to.be.equal(`${props.workout.name} (${props.workout.exercises.length} exercises)`)
  })
})
