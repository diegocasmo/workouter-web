import React from 'react'
import {Factory} from 'rosie'
import sinon from 'sinon'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {SessionExercise} from '../Exercise'
import {Timer} from '../../../Clock/Timer'
import {Countdown} from '../../../Clock/Countdown'
import {WorkoutExerciseItem} from '../../../Workout/View/ExerciseItem'
import {UNITS} from '../../../../api/unit'
const moment = require('moment')

describe('<SessionExercise/>', () => {

  let props = null
  beforeEach(() => {
    props = {
      startedAt: moment(),
      exercise: {
        ...Factory.build('workout').exercises[0],
        quantityUnit: UNITS.REPS.value
      },
      onExerciseCompleted: sinon.spy()
    }
  })

  it('renders', () => {
    const wrapper = shallow(<SessionExercise {...props}/>)
    expect(wrapper.find(WorkoutExerciseItem)).to.have.lengthOf(1)
    expect(wrapper.find(Countdown)).to.have.lengthOf(0)
    expect(wrapper.find(Timer)).to.have.lengthOf(1)
    expect(wrapper.find('button').text()).to.be.equal('Done')
  })

  it('calls onExerciseCompleted() when button is clicked', () => {
    const wrapper = shallow(<SessionExercise {...props}/>)
    expect(props.onExerciseCompleted.called).to.be.false
    wrapper.find('button').simulate('click', {preventDefault: () => {}})
    expect(props.onExerciseCompleted.calledOnce).to.be.true
  })

  it('renders <Countdown/> when exercise is time-based', () => {
    props = {
      ...props,
      exercise: {
        ...props.exercise,
        quantityUnit: UNITS.SECONDS.value
      }
    }
    const wrapper = shallow(<SessionExercise {...props}/>)

    // Check <Countdown/> is correctly rendered
    expect(wrapper.find(Countdown)).to.have.lengthOf(1)
    expect(moment(wrapper.find(Countdown).props().finishAt).isValid()).to.be.true
    expect(wrapper.find(Countdown).props().onCountdownCompleted).to.be.equal(props.onExerciseCompleted)
    expect(wrapper.find(WorkoutExerciseItem)).to.have.lengthOf(1)

    // Verify <Timer/> and other components are not rendered
    expect(wrapper.find(Timer)).to.have.lengthOf(0)
    expect(wrapper.find('button')).to.have.lengthOf(0)
  })
})
