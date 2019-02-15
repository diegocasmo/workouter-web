import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {Duration} from '../Duration'
const moment = require('moment')

describe('<Duration/>', () => {

  let props
  beforeEach(() => {
    const now = moment()
    props = {
      start: moment(now),
      stop: moment(now)
              .add('3', 'hours')
              .add('2', 'minutes')
              .add('30', 'seconds')
    }
  })

  it('renders', () => {
    const wrapper = shallow(<Duration {...props}/>)
    expect(wrapper.find('.wkr-duration__hours').text()).to.be.equal('03')
    expect(wrapper.find('.wkr-duration__minutes').text()).to.be.equal('02')
    expect(wrapper.find('.wkr-duration__seconds').text()).to.be.equal('30')
  })
})
