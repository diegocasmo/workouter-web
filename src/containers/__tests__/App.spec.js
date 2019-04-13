import React from 'react'
import {expect} from 'chai'
import faker from 'faker'
import {shallow} from 'enzyme'
import {App} from '../App'
import {ErrorList} from '../../components/ErrorList/ErrorList'
import {Navigation} from '../../components/Navigation'
import {Routes} from '../../components/Routes'

describe('<App/>', () => {

  let props = null
  let wrapper = null
  beforeEach(() => {
    props = {
      errors: [],
      removeError: () => {}
    }
  })

  it('renders', () => {
    wrapper = shallow(<App {...props}/>)
    expect(wrapper.find(Navigation)).to.have.lengthOf(1)
    expect(wrapper.find(ErrorList).props().errors).to.have.lengthOf(props.errors.length)
    expect(wrapper.find(Routes)).to.have.lengthOf(1)
  })

  it('renders a list of errors', () => {
    props = {
      ...props,
      errors: [faker.lorem.words(), faker.lorem.words()]
    }
    wrapper = shallow(<App {...props}/>)

    expect(wrapper.find(Navigation)).to.have.lengthOf(1)
    expect(wrapper.find(ErrorList).props().errors).to.have.lengthOf(props.errors.length)
    expect(wrapper.find(ErrorList).props().handleRemoveError).to.be.equal(props.removeError)
    expect(wrapper.find(Routes)).to.have.lengthOf(1)
  })
})
