import React from 'react'
import {expect} from 'chai'
import sinon from 'sinon'
import faker from 'faker'
import {shallow, mount} from 'enzyme'
import {App} from '../App'
import {ErrorList} from '../../components/ErrorList/ErrorList'
import {Navigation} from '../../components/Navigation'
import {Routes} from '../../components/Routes'
import {Provider} from 'react-redux'
import {getStore} from '../../state/store'

describe('<App/>', () => {

  let props
  beforeEach(() => {
    props = {
      errors: [],
      removeError: sinon.spy()
    }
  })

  it('renders', () => {
    const wrapper = shallow(<App {...props}/>)
    expect(wrapper.find(Navigation)).to.have.lengthOf(1)
    expect(wrapper.find(ErrorList).props().errors).to.have.lengthOf(props.errors.length)
    expect(wrapper.find(Routes)).to.have.lengthOf(1)
  })

  it('renders a list of errors', () => {
    props.errors = [faker.lorem.words(), faker.lorem.words()]
    const wrapper = shallow(<App {...props}/>)
    expect(wrapper.find(Navigation)).to.have.lengthOf(1)
    expect(wrapper.find(ErrorList).props().errors).to.have.lengthOf(props.errors.length)
    expect(wrapper.find(Routes)).to.have.lengthOf(1)
  })

  it('calls removeError() when an <ErrorItem/> is clicked in the remove button', () => {
    props.errors = [faker.lorem.words(), faker.lorem.words()]
    const wrapper = mount(<Provider store={getStore()}><App {...props}/></Provider>)
    expect(props.removeError.called).to.be.false
    wrapper.find("button[type='button']").first().simulate('click', {preventDefault: () => {}})
    expect(props.removeError.calledOnce).to.be.true
    expect(props.removeError.calledWith(0)).to.be.true
  })
})
