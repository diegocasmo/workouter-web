import React from 'react'
import {expect} from 'chai'
import faker from 'faker'
import sinon from 'sinon'
import {mount} from 'enzyme'
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {AsyncCreateSelect} from '../AsyncCreateSelect'

describe('<AsyncCreateSelect/>', () => {

  let props = null
  let options = null
  const makeOption = () => ({
    value: faker.lorem.words(),
    label: faker.lorem.words()
  })

  beforeEach(() => {
    options = new Array(10).fill({}).map(() => makeOption())
    props = {
      defaultOptions: true,
      name: 'fieldName',
      label: 'fieldLabel',
      onLoadOptions: sinon.spy(() => Promise.resolve(options)),
      onCreateOption: sinon.spy(() => Promise.resolve())
    }
  })

  afterEach(() => {
    props = null
    options = null
  })

  it('renders', async () => {
    const wrapper = mount(<Formik
      initialValues={{[props.name]: ''}}
      render={() => (
        <Form><AsyncCreateSelect {...props}/></Form>
      )}/>
    )

    // It correctly renders component
    expect(wrapper.find('label').props().htmlFor).to.be.equal(props.name)
    expect(wrapper.find('label').text()).to.be.equal(props.label)
    expect(wrapper.find(Field).props().name).to.be.equal(props.name)
    expect(wrapper.find(ErrorMessage).props().name).to.be.equal(props.name)
    expect(props.onLoadOptions.calledOnce).to.be.true

    // Simulate user will select an option
    wrapper.find('.wkr-searchable-select__dropdown-indicator').simulate('mouseDown', {button: 0})
    await tick()
    wrapper.update()

    // It renders asynchronously options returned by `onLoadOptions`
    expect(wrapper.find('.wkr-searchable-select__option')).to.have.lengthOf(options.length)
    wrapper.find('.wkr-searchable-select__option').forEach((x, i) => {
      expect(x.text()).to.be.equal(options[i].label)
    })

    // Verify selecting an option correctly updates Formik field value
    expect(wrapper.state().values[props.name]).to.be.equal('')
    wrapper.find('.wkr-searchable-select__option').first().simulate('click')
    expect(wrapper.state().values[props.name]).to.be.equal(options[0].value)
  })

  it('supports default options', async () => {
    props = {
      ...props,
      defaultOptions: [makeOption()]
    }

    const wrapper = mount(<Formik render={() => (
      <Form><AsyncCreateSelect {...props}/></Form>
    )}/>)

    // No need to fetch, there are default options
    expect(props.onLoadOptions.calledOnce).to.be.false

    // Simulate user will select an option
    wrapper.find('.wkr-searchable-select__dropdown-indicator').simulate('mouseDown', {button: 0})
    await tick()
    wrapper.update()

    // It should render default options (no fetch)
    expect(wrapper.find('.wkr-searchable-select__option')).to.have.lengthOf(1)
    expect(wrapper.find('.wkr-searchable-select__option').first().text()).to.be.equal(props.defaultOptions[0].label)
  })

  it('renders currently selected option', () => {
    const {value, label} = makeOption()
    props = {
      ...props,
      value,
      defaultOptions: [{value, label}]
    }

    const wrapper = mount(<Formik render={() => (
      <Form><AsyncCreateSelect {...props}/></Form>
    )}/>)

    // Verify currently selected option is equal to `value` prop passed to it
    expect(wrapper.find(AsyncCreatableSelect).props().value).to.be.eql({value, label: value})
  })
})

const tick = () => ((new Promise(resolve => setTimeout(resolve, 0))))
