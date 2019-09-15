import React from 'react'
import sinon from 'sinon'
import faker from 'faker'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { ErrorItem } from '../ErrorItem'

describe('<ErrorItem/>', () => {
  let props = null
  beforeEach(() => {
    props = {
      error: faker.lorem.words(),
      onClick: sinon.spy(),
    }
  })

  it('renders', () => {
    const wrapper = shallow(<ErrorItem {...props} />)
    expect(wrapper.find('.wkr-error-item__text').text()).to.be.equal(
      props.error
    )
    expect(wrapper.find("button[type='button']")).to.have.lengthOf(1)
  })

  it('calls onClick() when clicked', () => {
    const wrapper = shallow(<ErrorItem {...props} />)
    expect(props.onClick.called).to.be.false
    wrapper.find("button[type='button']").simulate('click')
    expect(props.onClick.calledOnce).to.be.true
  })
})
