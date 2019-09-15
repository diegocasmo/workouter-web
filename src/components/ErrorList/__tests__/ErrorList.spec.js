import React from 'react'
import sinon from 'sinon'
import faker from 'faker'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import { ErrorList } from '../ErrorList'
import { ErrorItem } from '../ErrorItem'

describe('<ErrorList/>', () => {
  let props = null
  beforeEach(() => {
    props = {
      errors: [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()],
      removeError: sinon.spy(),
    }
  })

  it('renders', () => {
    const wrapper = shallow(<ErrorList {...props} />)
    expect(wrapper.find(ErrorItem)).to.have.lengthOf(props.errors.length)
  })

  it('calls removeError() when an <ErrorItem/> is clicked in the remove button', () => {
    const wrapper = mount(<ErrorList {...props} />)
    expect(props.removeError.called).to.be.false
    wrapper
      .find("button[type='button']")
      .first()
      .simulate('click', { preventDefault: () => {} })
    expect(props.removeError.called).to.be.true
    expect(props.removeError.calledWith(0)).to.be.true
  })
})
