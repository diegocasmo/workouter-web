import React from 'react'
import {Factory} from 'rosie'
import sinon from 'sinon'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {UpdateExercise} from '../UpdateExercise'
import {Loading} from '../../components/Loading'
import {ExerciseForm} from '../../components/ExerciseForm'

describe('<UpdateExercise/>', () => {

  let props
  beforeEach(() => {
    props = {
      exerciseId: 99,
      exercise: Factory.build('exercise', {id: 99}),
      isLoading: false,
      handleUpdateExercise: sinon.spy(() => Promise.resolve()),
      handleGetExercise: sinon.spy()
    }
  })

  it('renders', () => {
    const wrapper = mount(<UpdateExercise {...props}/>)
    expect(wrapper.find(UpdateExercise).length).to.be.equal(1)
    expect(wrapper.find(Loading)).to.have.lengthOf(0)
    expect(wrapper.find(ExerciseForm)).to.have.lengthOf(1)
    expect(wrapper.find("button[type='submit']").text()).to.be.equal('Update')
  })

  it("calls 'handleGetExercise()' on 'componentDidMount()'", () => {
    expect(props.handleGetExercise.calledOnce).to.be.false
    const wrapper = mount(<UpdateExercise {...props}/>)
    expect(props.handleGetExercise.calledOnce).to.be.true
    expect(props.handleGetExercise.calledWith(props.exerciseId)).to.be.true
  })

  it("calls 'handleUpdateExercise()' on form submit", async () => {
    // Fill-in form with valid exercise attributes (different from the original in props.exercise)
    const wrapper = mount(<UpdateExercise {...props}/>)
    const attrs = Factory.build('exercise', {}, {except: ['id']})
    wrapper.find("input[name='name']").simulate('change', {target: {id: 'name', value: attrs.name}})

    // Submit form
    expect(props.handleUpdateExercise.calledOnce).to.be.false
    wrapper.find('form').simulate('submit')
    await tick()

    // Expect to be called with the update exercise attributes in form (but same id)
    expect(props.handleUpdateExercise.calledOnce).to.be.true
    expect(props.handleUpdateExercise.calledWith({...props.exercise, ...attrs})).to.be.true
  })

  it('renders <Loading/> when resources are being loaded', () => {
    props.isLoading = true
    const wrapper = mount(<UpdateExercise {...props}/>)
    expect(wrapper.find(Loading)).to.have.lengthOf(1)
    expect(wrapper.find(ExerciseForm)).to.have.lengthOf(0)
  })
})

function tick() {
  return new Promise(resolve => {
    setTimeout(resolve, 0)
  })
}
