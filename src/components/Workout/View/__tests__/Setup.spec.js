import React from 'react'
import { Factory } from 'rosie'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { WorkoutSetup } from '../Setup'
import { UNITS } from '../../../../api/unit'

describe('<WorkoutSetup/>', () => {
  let props = null
  beforeEach(() => {
    props = Factory.build('workout')
  })

  it('renders', () => {
    const wrapper = shallow(<WorkoutSetup {...props} />)
    expect(wrapper.find('.wkr-workout-setup__title').text()).to.be.equal(
      'Setup'
    )
    expect(wrapper.find('.wkr-workout-setup__workout-name').text()).to.be.equal(
      `Name: ${props.name}`
    )
    expect(
      wrapper.find('.wkr-workout-setup__workout-rounds').text()
    ).to.be.equal(`Rounds: ${props.rounds}`)
    expect(
      wrapper.find('.wkr-workout-setup__workout-rest-time-per-round').text()
    ).to.be.equal(
      `Rest time per round: ${props.restTimePerRound} ${UNITS.SECONDS.text}`
    )
    expect(
      wrapper.find('.wkr-workout-setup__workout-rest-time-per-exercise').text()
    ).to.be.equal(
      `Rest time per exercise: ${props.restTimePerExercise} ${UNITS.SECONDS.text}`
    )
  })
})
