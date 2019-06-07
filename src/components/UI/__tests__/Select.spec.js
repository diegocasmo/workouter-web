import React from 'react'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {number, object} from 'yup'
import {Select} from '../Select'

describe('<Select/>', () => {

  let props = null
  beforeEach(() => {
    props = {
      name: 'number',
      label: 'Number',
      options: [{
        value: 1,
        text: 'One'
      }, {
        value: 2,
        text: 'Two'
      },{
        value: -3,
        text: 'Negative three'
      }]
    }
  })

  it('renders', () => {
    const wrapper = mount(
      <Formik
        initialValues={{}}
        validationSchema={{}}
        render={() => (<Form><Select {...props}/></Form>)}/>)
    // label component
    expect(wrapper.find('label').text()).to.be.equal(props.label)
    expect(wrapper.find('label').props().htmlFor).to.be.equal(props.name)
    // Field component
    expect(wrapper.find(Field).props().name).to.be.equal(props.name)
    expect(wrapper.find(Field).props().component).to.be.equal('select')
    // Options
    props.options.forEach((opt, idx) => {
      expect(wrapper.find(Field).props().children[idx].props.value)
        .to.be.equal(props.options[idx].value)
      expect(wrapper.find(Field).props().children[idx].props.children)
        .to.be.equal(props.options[idx].text)
    })
  })

  it('renders additional props in the Field component', () => {
    props = {
      ...props,
      readOnly: true,
      disabled: true
    }
    const wrapper = mount(
      <Formik
        initialValues={{}}
        validationSchema={{}}
        render={() => (<Form><Select {...props}/></Form>)}/>)
    expect(wrapper.find(Field).props().readOnly).to.be.equal(props.readOnly)
    expect(wrapper.find(Field).props().disabled).to.be.equal(props.disabled)
  })

  it('renders validation errors', async () => {
    props = {
      ...props,
      name: 'number',
      label: 'Number'
    }

    const wrapper = mount(
      <Formik
        initialValues={{number: props.options[0].value}}
        validationSchema={object().shape({
          number: number().positive()
        })}
        render={() => (<Form><Select {...props}/></Form>)}/>)

    expect(wrapper.find(ErrorMessage).text()).to.be.equal('')

    // Simulate an invalid (negative) number is selected
    wrapper.find('select').simulate('change', {target: {id: 'number', value: -3}})
    wrapper.find('form').simulate('submit')
    await tick()
    wrapper.update()

    // Expect an error message to be rendered
    expect(wrapper.find(ErrorMessage).text()).to.be.equal('number must be a positive number')
  })
})

function tick() {
  return new Promise(resolve => {
    setTimeout(resolve, 0)
  })
}
