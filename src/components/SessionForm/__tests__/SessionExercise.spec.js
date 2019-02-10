import React from 'react'
import {Factory} from 'rosie'
import sinon from 'sinon'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {SessionExercise} from '../SessionExercise'
import {Timer} from '../../Timer'
import {WorkoutExerciseItem} from '../../WorkoutDetail/WorkoutExerciseItem'
const moment = require('moment')

describe('<SessionExercise/>', () => {

  let props = null
  beforeEach(() => {
    props = {
      startedAt: moment(),
      workoutExercise: Factory.build('workout').exercises[0],
      onExerciseCompleted: sinon.spy()
    }
  })

  it('renders', () => {
    const wrapper = shallow(<SessionExercise {...props}/>)
    expect(wrapper.find(WorkoutExerciseItem)).to.have.lengthOf(1)
    expect(wrapper.find(Timer)).to.have.lengthOf(1)
    expect(wrapper.find('button').text()).to.be.equal('Done')
  })

  it('calls onExerciseCompleted() when button is clicked', () => {
    const wrapper = shallow(<SessionExercise {...props}/>)
    expect(props.onExerciseCompleted.called).to.be.false
    wrapper.find('button').simulate('click', {preventDefault: () => {}})
    expect(props.onExerciseCompleted.calledOnce).to.be.true
  })
})
