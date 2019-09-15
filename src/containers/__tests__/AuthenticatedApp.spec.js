import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { AuthenticatedApp } from '../AuthenticatedApp'
import { ErrorListFromStore } from '../../components/ErrorList/ErrorList'
import { Navigation } from '../../components/Navigation'
import { Routes } from '../../components/Routes'

describe('<AuthenticatedApp/>', () => {
  it('renders', () => {
    const wrapper = shallow(<AuthenticatedApp />)

    expect(wrapper.find(Navigation)).to.have.lengthOf(1)
    expect(wrapper.find(ErrorListFromStore)).to.have.lengthOf(1)
    expect(wrapper.find(Routes)).to.have.lengthOf(1)
  })
})
