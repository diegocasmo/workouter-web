import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {UnauthenticatedApp} from '../UnauthenticatedApp'
import {ErrorList} from '../../components/ErrorList/ErrorList'
import {Login} from '../../components/Auth/Login'

describe('<UnauthenticatedApp/>', () => {

  let props
  beforeEach(() => {
    props = {
      errors: [],
      removeError: () => {},
      addError: () => {}
    }
  })

  it('renders', () => {
    const wrapper = shallow(<UnauthenticatedApp {...props}/>)

    expect(wrapper.find(Login)).to.have.lengthOf(1)
    expect(wrapper.find(ErrorList)).to.have.lengthOf(1)
  })

  it('renders a list of errors', () => {
    props = {
      ...props,
      errors: ['foo', 'bar']
    }
    const wrapper = shallow(<UnauthenticatedApp {...props}/>)

    expect(wrapper.find(ErrorList).props().errors).to.have.lengthOf(props.errors.length)
  })
})
