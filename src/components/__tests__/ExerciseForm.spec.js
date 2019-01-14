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
    // Define an exercise which uses a measurement name not defined in measurements to verify
    // that it still shows up as an option in the select input
    const measurementName = 'a very unique name, unlikely to be randomly created by the measurements factory list'
    props = {
      exercise: Factory.build('exercise', {measurement: {name: measurementName}}),
      measurements: Factory.buildList('measurement', 2),
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
    expect(wrapper.find("select[name='measurement.name']")).to.have.lengthOf(1)
    expect(wrapper.find('option')).to.have.lengthOf(2)
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
    expect(wrapper.find("select[name='measurement.name']").props().value).to.be.equal(exercise.measurement.name)
    // Note it adds the exercise measurement to options if not already in measurements
    expect(wrapper.find('option')).to.have.lengthOf(3)
  })

  it('renders an exercise validation errors', async () => {
    const wrapper = mount(<ExerciseForm {...props}/>)
    wrapper.find("input[name='name']").simulate('change', {target: {id: 'name', value: ''}})
    wrapper.find("select[name='measurement.name']").simulate('change', {target: {id: 'measurement.name', value : ''}})
    wrapper.find('form').simulate('submit')
    await tick()
    wrapper.update()
    expect(wrapper.find("p").first().text()).to.be.equal('Name is required')
    expect(wrapper.find("p").last().text()).to.be.equal('Measurement name is required')
  })

  it("calls 'handleSubmit' when user submits a valid exercise", async () => {
    const attrs = {name: 'foo', measurement: {name: 'bar'}}
    expect(props.handleSubmit.calledOnce).to.be.false
    const wrapper = mount(<ExerciseForm {...props}/>)
    wrapper.find("input[name='name']").simulate('change', {target: {id: 'name', value: attrs.name}})
    wrapper.find("select[name='measurement.name']").simulate('change', {target: {id: 'measurement.name', value : attrs.measurement.name}})
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
