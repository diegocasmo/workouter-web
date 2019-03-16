import React from 'react'
import {shallow} from 'enzyme'
import {expect} from 'chai'
import {RoundsCompleted} from '../RoundsCompleted'

describe('<RoundsCompleted/>', () => {

  let props = null
  beforeEach(() => {
    props = {
      rounds: 10,
      roundsCompleted: 8
    }
  })

  it('renders', () => {
    const wrapper = shallow(<RoundsCompleted {...props}/>)
    expect(wrapper.text()).to.be.equal(`${props.roundsCompleted}/${props.rounds} rounds`)
  })
})
