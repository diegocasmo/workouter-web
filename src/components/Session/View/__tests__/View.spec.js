import React from 'react'
import {Factory} from 'rosie'
import {shallow} from 'enzyme'
import {expect} from 'chai'
import {SessionView} from '../View'
import {SessionStatistics} from '../Statistics'
import {WorkoutSetup} from '../../../Workout/View/Setup'
import {WorkoutExerciseList} from '../../../Workout/View/ExerciseList'

describe('<SessionView>', () => {

  let props
  beforeEach(() => {
    props = {
      session: Factory.build('session')
    }
  })

  it('renders', () => {
    const wrapper = shallow(<SessionView {...props}/>)
    // <SessionStatistics/>
    expect(wrapper.find(SessionStatistics).props().session).to.be.eql(props.session)

    // <WorkoutSetup/>
    expect(wrapper.find(WorkoutSetup).props()).to.be.eql(props.session)

    // <WorkoutExerciseList/>
    expect(wrapper.find(WorkoutExerciseList).props()).to.be.eql(props.session)
  })
})
