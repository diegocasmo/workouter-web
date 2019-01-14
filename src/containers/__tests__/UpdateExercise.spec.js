import React from 'react'
import {Factory} from 'rosie'
import sinon from 'sinon'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {UpdateExercise} from '../UpdateExercise'
import {Loading} from '../../components/Loading'
import {ErrorMsg} from '../../components/ErrorMsg'
import {ExerciseForm} from '../../components/ExerciseForm'

describe('<UpdateExercise/>', () => {

  let props
  beforeEach(() => {
    props = {
      exerciseId: 99,
      exercise: Factory.build('exercise'),
      isSubmitting: false,
      errors: [],
      measurements: Factory.buildList('measurement', 2),
      isLoading: false,
      hasLoadingError: false,
      handleFetchMeasurements: sinon.spy(),
      handleResetFetchMeasurements: sinon.spy(),
      handleGetExercise: sinon.spy(),
      handleUpdateExercise: sinon.spy(),
      handleResetGetExercise: sinon.spy(),
      handleResetUpdateExercise: sinon.spy()
    }
  })

  it('renders', () => {
    const wrapper = mount(<UpdateExercise {...props}/>)
    expect(wrapper.find(UpdateExercise).length).to.be.equal(1)
    expect(wrapper.find(Loading)).to.have.lengthOf(0)
    expect(wrapper.find(ErrorMsg)).to.have.lengthOf(0)
    expect(wrapper.find(ExerciseForm)).to.have.lengthOf(1)
    expect(wrapper.find("button[type='submit']").text()).to.be.equal('Update')
  })

  it("calls 'handleFetchMeasurements()' and 'handleGetExercise()' on 'componentDidMount()'", () => {
    expect(props.handleFetchMeasurements.calledOnce).to.be.false
    const wrapper = mount(<UpdateExercise {...props}/>)
    expect(props.handleFetchMeasurements.calledOnce).to.be.true
    expect(props.handleGetExercise.calledOnce).to.be.true
    expect(props.handleGetExercise.calledWith(props.exerciseId)).to.be.true
  })

  it(`calls 'handleResetGetExercise()',
    'handleResetUpdateExercise()', and
    'handleResetFetchMeasurements()' on 'componentWillUnmount()'`, () => {
    const wrapper = mount(<UpdateExercise {...props}/>)
    expect(props.handleResetGetExercise.calledOnce).to.be.false
    expect(props.handleResetUpdateExercise.calledOnce).to.be.false
    expect(props.handleResetFetchMeasurements.calledOnce).to.be.false
    wrapper.unmount()
    expect(props.handleResetGetExercise.calledOnce).to.be.true
    expect(props.handleResetUpdateExercise.calledOnce).to.be.true
    expect(props.handleResetFetchMeasurements.calledOnce).to.be.true
  })

  it("calls 'handleUpdateExercise()' on form submit", async () => {
    // Fill-in form with valid exercise attributes (different from the original in props.exercise)
    const wrapper = mount(<UpdateExercise {...props}/>)
    const attrs = {name: 'Abs', measurement: {name: 'time'}}
    wrapper.find("input[name='name']").simulate('change', {target: {id: 'name', value: attrs.name}})
    wrapper.find("select[name='measurement.name']").simulate('change', {target: {id: 'measurement.name', value : attrs.measurement.name}})

    // Submit form
    expect(props.handleUpdateExercise.calledOnce).to.be.false
    wrapper.find('form').simulate('submit')
    await tick()

    // Expect to be called with the update exercise attributes in form (but same id)
    expect(props.handleUpdateExercise.calledOnce).to.be.true
    expect(props.handleUpdateExercise.calledWith({...props.exercise, ...attrs})).to.be.true
  })

  it('disables submit button when form is submitting', () => {
    props.isSubmitting = true
    const wrapper = mount(<UpdateExercise {...props}/>)
    expect(wrapper.find("button[type='submit']").props().disabled).to.be.true
  })

  it('renders errors', () => {
    props.errors = ['foo', 'bar']
    const wrapper = mount(<UpdateExercise {...props}/>)
    expect(wrapper.find(ErrorMsg)).to.have.lengthOf(props.errors.length)
  })

  it('renders <Loading/> when resources are being loaded', () => {
    props.isLoading = true
    const wrapper = mount(<UpdateExercise {...props}/>)
    expect(wrapper.find(Loading)).to.have.lengthOf(1)
    expect(wrapper.find(ErrorMsg)).to.have.lengthOf(0)
    expect(wrapper.find(ExerciseForm)).to.have.lengthOf(0)
  })

  it('renders </ErrorMsg> when unable to fetch required resources', () => {
    props.hasLoadingError = true
    const wrapper = mount(<UpdateExercise {...props}/>)
    expect(wrapper.find(Loading)).to.have.lengthOf(0)
    expect(wrapper.find(ErrorMsg)).to.have.lengthOf(1)
    expect(wrapper.find(ExerciseForm)).to.have.lengthOf(0)
  })
})

function tick() {
  return new Promise(resolve => {
    setTimeout(resolve, 0)
  })
}
