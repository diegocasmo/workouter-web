import React from 'react'
import {Factory} from 'rosie'
import {expect} from 'chai'
import sinon from 'sinon'
import {mount} from 'enzyme'
import {BrowserRouter as Router, Prompt} from 'react-router-dom'
import {ExerciseForm} from '../ExerciseForm'
import {Formik, Form, ErrorMessage} from 'formik'

describe('<ExerciseForm/>', () => {

  let props
  beforeEach(() => {
    props = {
      exercise: Factory.build('exercise'),
      submitText: 'Foo',
      history: {
        push: sinon.spy()
      },
      redirectTo: '/foo/bar',
      handleSubmit: sinon.spy(() => Promise.resolve())
    }
  })

  it('renders', () => {
    props.exercise = null
    const wrapper = mount(<Router><ExerciseForm {...props}/></Router>)
    expect(wrapper.find(Prompt).props().when).to.be.false
    expect(wrapper.find(Prompt).props().message).to.be.equal('You have unsaved changes. Are you sure you want to leave?')
    expect(wrapper.find('form')).to.have.lengthOf(1)
    expect(wrapper.find("input[name='name']")).to.have.lengthOf(1)
    expect(wrapper.find("button[type='submit']").props().disabled).to.be.false
    expect(wrapper.find("button[type='submit']").text()).to.be.equal(props.submitText)
  })

  it('enables <Prompt/> when form values change', () => {
    const wrapper = mount(<Router><ExerciseForm {...props}/></Router>)

    // Modify form
    wrapper.find("input[name='name']").simulate('change', {target: {id: 'name', value: 'foo bar'}})

    // Expect <Prompt/> to be truthy
    expect(wrapper.find(Prompt).props().when).to.be.true
  })

  it('disables submit button when form is being submitted', async () => {
    const wrapper = mount(<Router><ExerciseForm {...props}/></Router>)
    expect(wrapper.find("button[type='submit']").props().disabled).to.be.false
    wrapper.find('form').simulate('submit')
    await tick()
    expect(wrapper.find("button[type='submit']").props().disabled).to.be.true
  })

  it('renders a pre-filled form with an exercise', () => {
    const {exercise} = props
    const wrapper = mount(<Router><ExerciseForm {...props}/></Router>)
    expect(wrapper.find("input[name='name']").props().value).to.be.equal(exercise.name)
  })

  it('renders an exercise validation errors', async () => {
    const wrapper = mount(<Router><ExerciseForm {...props}/></Router>)
    wrapper.find("input[name='name']").simulate('change', {target: {id: 'name', value: ''}})
    wrapper.find('form').simulate('submit')
    await tick()
    wrapper.update()
    expect(wrapper.find("p").first().text()).to.be.equal('Name is required')
  })

  it('renders API validation errors', async () => {
    const apiErrorMsg = 'API error msg'
    props.validationSchema = {}
    props.handleSubmit = sinon.spy(() => Promise.reject({name: apiErrorMsg}))
    const wrapper = mount(<Router><ExerciseForm {...props}/></Router>)

    wrapper.find("input[name='name']").simulate('change', {target: {id: 'name', value: ''}})
    wrapper.find('form').simulate('submit')
    await tick()

    wrapper.update()
    expect(wrapper.find("p").first().text()).to.be.equal(apiErrorMsg)
  })

  it("calls 'handleSubmit' when user submits a valid exercise", async () => {
    const attrs = Factory.build('exercise', {}, {except: ['id']})
    expect(props.handleSubmit.calledOnce).to.be.false
    const wrapper = mount(<Router><ExerciseForm {...props}/></Router>)
    wrapper.find("input[name='name']").simulate('change', {target: {id: 'name', value: attrs.name}})
    wrapper.find('form').simulate('submit')
    await tick()
    expect(props.handleSubmit.calledOnce).to.be.true
    expect(props.handleSubmit.calledWith(attrs)).to.be.true
    // <Prompt/> shouldn't show message when submitting a valid exercise
    expect(wrapper.find(Prompt).props().when).to.be.false
  })

  it("redirects if 'history' and 'redirectTo' are defined", async () => {
    const attrs = Factory.build('exercise', {}, {except: ['id']})
    expect(props.history.push.called).to.be.false

    // Submit a valid exercise
    const wrapper = mount(<Router><ExerciseForm {...props}/></Router>)
    wrapper.find("input[name='name']").simulate('change', {target: {id: 'name', value: attrs.name}})
    wrapper.find('form').simulate('submit')
    await tick()

    // Expect redirect
    expect(props.history.push.calledOnce).to.be.true
    expect(props.history.push.calledWith(props.redirectTo)).to.be.true
  })

  it("does not redirect if 'redirectTo' is undefined", async () => {
    props.redirectTo = null
    const attrs = Factory.build('exercise', {}, {except: ['id']})
    expect(props.history.push.called).to.be.false

    // Submit a valid exercise
    const wrapper = mount(<Router><ExerciseForm {...props}/></Router>)
    wrapper.find("input[name='name']").simulate('change', {target: {id: 'name', value: attrs.name}})
    wrapper.find('form').simulate('submit')
    await tick()

    // Expect no redirect, since 'redirectTo' is null
    expect(props.history.push.called).to.be.false
  })
})

const tick = _ => (new Promise(resolve => setTimeout(resolve, 0)))
