import React from 'react'
import { Factory } from 'rosie'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { WorkoutView } from '../View'
import { WorkoutSetup } from '../Setup'
import { WorkoutExerciseList } from '../ExerciseList'
import { WorkoutActions } from '../Actions'

describe('<WorkoutView>', () => {
  let props
  beforeEach(() => {
    props = {
      workout: Factory.build('workout'),
      deleteWorkout: () => {},
    }
  })

  it('renders', () => {
    const wrapper = shallow(<WorkoutView {...props} />)
    // <WorkoutSetup/>
    expect(wrapper.find(WorkoutSetup).props()).to.be.eql(props.workout)

    // <WorkoutExerciseList/>
    expect(wrapper.find(WorkoutExerciseList).props()).to.be.eql(props.workout)

    // <WorkoutActions/>
    expect(wrapper.find(WorkoutActions).props().workout).to.be.eql(
      props.workout
    )
    expect(
      wrapper.find(WorkoutActions).props().handleDeleteWorkout
    ).to.be.equal(props.deleteWorkout)
  })
})
