import React from 'react'
import {shallow} from 'enzyme'
import {Factory} from 'rosie'
import {expect} from 'chai'
import {SessionStatistics} from '../SessionStatistics'
import {Duration} from '../../Clock/Duration'

describe('<SessionStatistics/>', () => {

  let props = null
  beforeEach(() => {
    props = {
      session: Factory.build('session', {}, {except: ['id']})
    }
  })

  it('renders', () => {
    const wrapper = shallow(<SessionStatistics {...props}/>)
    expect(wrapper.find(Duration).props().start).to.be.equal(props.session.startedAt)
    expect(wrapper.find(Duration).props().stop).to.be.equal(props.session.finishedAt)
  })
})
