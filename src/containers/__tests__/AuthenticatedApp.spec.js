import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {AuthenticatedApp} from '../AuthenticatedApp'
import {ErrorList} from '../../components/ErrorList/ErrorList'
import {Navigation} from '../../components/Navigation'
import {Routes} from '../../components/Routes'

describe('<AuthenticatedApp/>', () => {

  let props
  let wrapper
  beforeEach(() => {
    props = {
      errors: [],
      removeError: () => {}
    }
  })

  it('renders', () => {
    wrapper = shallow(<AuthenticatedApp {...props}/>)

    expect(wrapper.find(Navigation)).to.have.lengthOf(1)
    expect(wrapper.find(ErrorList)).to.have.lengthOf(1)
    expect(wrapper.find(Routes)).to.have.lengthOf(1)
  })

  it('renders a list of errors', () => {
    props = {
      ...props,
      errors: ['foo', 'bar']
    }
    wrapper = shallow(<AuthenticatedApp {...props}/>)

    expect(wrapper.find(ErrorList).props().errors).to.have.lengthOf(props.errors.length)
  })
})
