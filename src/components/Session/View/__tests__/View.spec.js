import React from 'react'
import {Factory} from 'rosie'
import {shallow} from 'enzyme'
import {expect} from 'chai'
import {SessionView} from '../View'
import {Duration} from '../../../Time/Duration'
import {RoundsCompleted} from '../RoundsCompleted'
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
    // <RoundsCompleted/>
    expect(wrapper.find(RoundsCompleted).props().rounds).to.be.equal(props.session.rounds)
    expect(wrapper.find(RoundsCompleted).props().roundsCompleted).to.be.equal(props.session.roundsCompleted)

    // <Duration/>
    expect(wrapper.find(Duration).props().start).to.be.equal(props.session.startedAt)
    expect(wrapper.find(Duration).props().stop).to.be.equal(props.session.finishedAt)

    // <WorkoutSetup/>
    expect(wrapper.find(WorkoutSetup).props()).to.be.eql(props.session)

    // <WorkoutExerciseList/>
    expect(wrapper.find(WorkoutExerciseList).props()).to.be.eql(props.session)
  })
})
