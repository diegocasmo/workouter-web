import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { UnauthenticatedApp } from '../UnauthenticatedApp'
import { ErrorListFromStore } from '../../components/ErrorList/ErrorList'
import { LoginFromStore } from '../../components/Auth/Login'

describe('<UnauthenticatedApp/>', () => {
  it('renders', () => {
    const wrapper = shallow(<UnauthenticatedApp />)

    expect(wrapper.find(LoginFromStore)).to.have.lengthOf(1)
    expect(wrapper.find(ErrorListFromStore)).to.have.lengthOf(1)
  })
})
