import React from 'react'
import {Factory} from 'rosie'
import sinon from 'sinon'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {NewExercise} from '../NewExercise'
import {ErrorMsg} from '../../components/ErrorMsg'
import {ExerciseForm} from '../../components/ExerciseForm'

describe('<NewExercise/>', () => {

  let props
  beforeEach(() => {
    props = {
      exercise: null,
      isSubmitting: false,
      errors: [],
      handleCreateExercise: sinon.spy(),
      handleResetCreateExercise: sinon.spy()
    }
  })

  it('renders', () => {
    const wrapper = mount(<NewExercise {...props}/>)
    expect(wrapper.find(NewExercise).length).to.be.equal(1)
    expect(wrapper.find(ErrorMsg)).to.have.lengthOf(0)
    expect(wrapper.find(ExerciseForm)).to.have.lengthOf(1)
    expect(wrapper.find("button[type='submit']").text()).to.be.equal('Create')
  })

  it("calls 'handleResetCreateExercise()' on 'componentWillUnmount()'", () => {
    const wrapper = mount(<NewExercise {...props}/>)
    expect(props.handleResetCreateExercise.calledOnce).to.be.false
    wrapper.unmount()
    expect(props.handleResetCreateExercise.calledOnce).to.be.true
  })

  it("calls 'handleCreateExercise()' on form submit", async () => {
    // Fill-in form with valid exercise attributes
    const wrapper = mount(<NewExercise {...props}/>)
    const attrs = Factory.build('exercise', {}, {except: ['id']})
    wrapper.find("input[name='name']").simulate('change', {target: {id: 'name', value: attrs.name}})

    // Submit form
    expect(props.handleCreateExercise.calledOnce).to.be.false
    wrapper.find('form').simulate('submit')
    await tick()

    // Expect to be called with the exercise attributes in form
    expect(props.handleCreateExercise.calledOnce).to.be.true
    expect(props.handleCreateExercise.calledWith(attrs)).to.be.true
  })

  it('disables submit button when form is submitting', () => {
    props.isSubmitting = true
    const wrapper = mount(<NewExercise {...props}/>)
    expect(wrapper.find("button[type='submit']").props().disabled).to.be.true
  })

  it('renders errors', () => {
    props.errors = ['foo', 'bar']
    const wrapper = mount(<NewExercise {...props}/>)
    expect(wrapper.find(ErrorMsg)).to.have.lengthOf(props.errors.length)
  })
})

function tick() {
  return new Promise(resolve => {
    setTimeout(resolve, 0)
  })
}
