import React from 'react'
import {Factory} from 'rosie'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {WorkoutItem} from '../Item'
import {Link} from 'react-router-dom'
import {WorkoutActions} from '../../../../components/WorkoutActions'

describe('<WorkoutItem/>', () => {

  let props = null
  beforeEach(() => {
    props = {
      workout: Factory.build('workout'),
      handleDeleteWorkout: () => {}
    }
  })

  it('renders', () => {
    const wrapper = shallow(<WorkoutItem {...props}/>)
    // <Link/>
    expect(wrapper.find(Link).props().to).to.be.equal(`/workouts/${props.workout.id}`)
    expect(wrapper.find(Link).props().children.join(''))
      .to.be.equal(`${props.workout.name} (${props.workout.exercises.length} exercises)`)

    // <WorkoutActions/>
    expect(wrapper.find(WorkoutActions).props().workout).to.be.eql(props.workout)
    expect(wrapper.find(WorkoutActions).props().handleDeleteWorkout).to.be.equal(props.handleDeleteWorkout)
  })
})
