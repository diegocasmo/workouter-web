import React from 'react'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {string, object} from 'yup'
import {Input} from '../Input'

describe('<Input/>', () => {

  let props = null
  beforeEach(() => {
    props = {
      name: 'foo',
      label: 'bar',
      placeholder: 'at',
      type: 'text'
    }
  })

  it('renders', () => {
    const wrapper = mount(
      <Formik
        initialValues={{}}
        validationSchema={{}}
        render={() => (<Form><Input {...props}/></Form>)}/>)
    // label component
    expect(wrapper.find('label').text()).to.be.equal(props.label)
    expect(wrapper.find('label').props().htmlFor).to.be.equal(props.name)
    // Field component
    expect(wrapper.find(Field).props().name).to.be.equal(props.name)
    expect(wrapper.find(Field).props().placeholder).to.be.equal(props.placeholder)
    expect(wrapper.find(Field).props().type).to.be.equal(props.type)
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
        render={() => (<Form><Input {...props}/></Form>)}/>)
    expect(wrapper.find(Field).props().readOnly).to.be.equal(props.readOnly)
    expect(wrapper.find(Field).props().disabled).to.be.equal(props.disabled)
  })

  it('renders validation errors', async () => {
    props = {
      ...props,
      name: 'username',
      label: 'Username',
      placeholder: 'Username...',
    }

    const wrapper = mount(
      <Formik
        initialValues={{username: ''}}
        validationSchema={object().shape({
          username: string().trim().required()
        })}
        render={() => (<Form><Input {...props}/></Form>)}/>)

    expect(wrapper.find(ErrorMessage).text()).to.be.null

    // Simulate an invalid username has been set
    wrapper.find("input[name='username']").simulate('change', {target: {id: 'username', value: ''}})
    wrapper.find('form').simulate('submit')
    await tick()

    // Expect an error message to be rendered
    expect(wrapper.find(ErrorMessage).text()).to.be.equal('username is a required field')
  })
})

function tick() {
  return new Promise(resolve => {
    setTimeout(resolve, 0)
  })
}
