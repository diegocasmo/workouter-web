import React from 'react'
import { Factory } from 'rosie'
import sinon from 'sinon'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { BrowserRouter as Router } from 'react-router-dom'
import { UpdateExercise } from '../UpdateExercise'
import { Loading } from '../../components/Loading'
import { Header } from '../../components/UI/Header'
import { ExerciseForm } from '../../components/Exercise/Form/Form'

describe('<UpdateExercise/>', () => {
  let props
  beforeEach(() => {
    props = {
      exerciseId: 99,
      exercise: Factory.build('exercise', { id: 99 }),
      isLoading: false,
      history: {
        push: sinon.spy(),
      },
      updateExercise: sinon.spy(() => Promise.resolve()),
      getExercise: sinon.spy(),
    }
  })

  it('renders', () => {
    const wrapper = mount(
      <Router>
        <UpdateExercise {...props} />
      </Router>
    )
    expect(wrapper.find(Header)).to.have.lengthOf(1)
    expect(wrapper.find(Loading)).to.have.lengthOf(0)
    expect(wrapper.find(ExerciseForm)).to.have.lengthOf(1)
    expect(wrapper.find("button[type='submit']").text()).to.be.equal('Update')
  })

  it("calls 'getExercise()'", () => {
    expect(props.getExercise.calledOnce).to.be.false
    let wrapper
    act(() => {
      wrapper = mount(
        <Router>
          <UpdateExercise {...props} />
        </Router>
      )
    })
    expect(props.getExercise.calledOnce).to.be.true
    expect(props.getExercise.calledWith(props.exerciseId)).to.be.true
  })

  it("calls 'updateExercise()' on form submit", async () => {
    // Fill-in form with valid exercise attributes (different from the original in props.exercise)
    const wrapper = mount(
      <Router>
        <UpdateExercise {...props} />
      </Router>
    )
    const attrs = Factory.build('exercise', {}, { except: ['id'] })
    wrapper
      .find("input[name='name']")
      .simulate('change', { target: { id: 'name', value: attrs.name } })

    // Submit form
    expect(props.updateExercise.calledOnce).to.be.false
    wrapper.find('form').simulate('submit')
    await tick()

    // Expect to be called with the update exercise attributes in form (but same id)
    expect(props.updateExercise.calledOnce).to.be.true
    expect(props.updateExercise.calledWith({ ...props.exercise, ...attrs })).to
      .be.true
  })

  it("redirects to '/exercises' if submission is successful", async () => {
    // Submit a valid exercise
    const wrapper = mount(
      <Router>
        <UpdateExercise {...props} />
      </Router>
    )
    expect(props.history.push.called).to.be.false
    wrapper
      .find("input[name='name']")
      .simulate('change', { target: { id: 'name', value: 'foo' } })
    wrapper.find('form').simulate('submit')
    await tick()

    // Expect redirect
    expect(props.history.push.calledOnce).to.be.true
    expect(props.history.push.calledWith('/exercises')).to.be.true
  })

  it('renders <Loading/> when resources are being loaded', () => {
    props.isLoading = true
    const wrapper = mount(
      <Router>
        <UpdateExercise {...props} />
      </Router>
    )
    expect(wrapper.find(Loading)).to.have.lengthOf(1)
    expect(wrapper.find(ExerciseForm)).to.have.lengthOf(0)
  })
})

const tick = () => new Promise(resolve => setTimeout(resolve, 0))
