import React from 'react'
import {Factory} from 'rosie'
import {expect} from 'chai'
import sinon from 'sinon'
import {mount} from 'enzyme'
import {ExerciseForm} from '../ExerciseForm'
import {Formik, Field, Form, ErrorMessage} from 'formik'

describe('<ExerciseForm/>', () => {

  let props
  beforeEach(() => {
    props = {
      exercise: Factory.build('exercise'),
      isSubmitting: false,
      submitText: 'Foo',
      handleSubmit: sinon.spy()
    }
  })

  it('renders', () => {
    props.exercise = null
    const wrapper = mount(<ExerciseForm {...props}/>)
    expect(wrapper.find('form')).to.have.lengthOf(1)
    expect(wrapper.find("input[name='name']")).to.have.lengthOf(1)
    expect(wrapper.find("button[type='submit']").props().disabled).to.be.false
    expect(wrapper.find("button[type='submit']").text()).to.be.equal(props.submitText)
  })

  it('disables submit button when form is being submitted', () => {
    props.isSubmitting = true
    const wrapper = mount(<ExerciseForm {...props}/>)
    expect(wrapper.find("button[type='submit']").props().disabled).to.be.true
  })

  it('renders a pre-filled form with an exercise', () => {
    const {exercise} = props
    const wrapper = mount(<ExerciseForm {...props}/>)
    expect(wrapper.find("input[name='name']").props().value).to.be.equal(exercise.name)
  })

  it('renders an exercise validation errors', async () => {
    const wrapper = mount(<ExerciseForm {...props}/>)
    wrapper.find("input[name='name']").simulate('change', {target: {id: 'name', value: ''}})
    wrapper.find('form').simulate('submit')
    await tick()
    wrapper.update()
    expect(wrapper.find("p").first().text()).to.be.equal('Name is required')
  })

  it("calls 'handleSubmit' when user submits a valid exercise", async () => {
    const attrs = Factory.build('exercise', {}, {except: ['id']})
    expect(props.handleSubmit.calledOnce).to.be.false
    const wrapper = mount(<ExerciseForm {...props}/>)
    wrapper.find("input[name='name']").simulate('change', {target: {id: 'name', value: attrs.name}})
    wrapper.find('form').simulate('submit')
    await tick()
    expect(props.handleSubmit.calledOnce).to.be.true
    expect(props.handleSubmit.calledWith(attrs)).to.be.true
  })
})

function tick() {
  return new Promise(resolve => {
    setTimeout(resolve, 0)
  })
}
