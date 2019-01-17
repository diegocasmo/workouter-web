import React from 'react'
import {Factory} from 'rosie'
import sinon from 'sinon'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {NewExercise} from '../NewExercise'
import {ExerciseForm} from '../../components/ExerciseForm'

describe('<NewExercise/>', () => {

  let props
  beforeEach(() => {
    props = {
      history: {
        push: sinon.spy()
      },
      handleCreateExercise: sinon.spy(() => Promise.resolve())
    }
  })

  it('renders', () => {
    const wrapper = mount(<NewExercise {...props}/>)
    expect(wrapper.find(NewExercise).length).to.be.equal(1)
    expect(wrapper.find(ExerciseForm)).to.have.lengthOf(1)
    expect(wrapper.find("button[type='submit']").text()).to.be.equal('Create')
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

  it("redirects to '/exercises' if submission is successful", async () => {
    // Submit a valid exercise
    const wrapper = mount(<NewExercise {...props}/>)
    expect(props.history.push.called).to.be.false
    wrapper.find("input[name='name']").simulate('change', {target: {id: 'name', value: 'foo'}})
    wrapper.find('form').simulate('submit')
    await tick()

    // Expect redirect
    expect(props.history.push.calledOnce).to.be.true
    expect(props.history.push.calledWith('/exercises')).to.be.true
  })
})

function tick() {
  return new Promise(resolve => {
    setTimeout(resolve, 0)
  })
}
