import React from 'react'
import sinon from 'sinon'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {NewExercise} from '../NewExercise'
import {Loading} from '../../components/Loading'
import {ErrorMsg} from '../../components/ErrorMsg'
import {ExerciseForm} from '../../components/ExerciseForm'

describe('<NewExercise/>', () => {

  let props
  beforeEach(() => {
    props = {
      exercise: null,
      exerciseErrors: [],
      measurements: [{'name': 'Burpees'},{'name': 'Push Ups'}],
      hasMeasurements: true,
      areMeasurementsLoading: false,
      hasMeasurementsError: false,
      handleFetchMeasurements: sinon.spy()
    }
  })

  it('renders', () => {
    const wrapper = mount(<NewExercise {...props}/>)
    expect(wrapper.find(NewExercise).length).to.be.equal(1)
    expect(wrapper.find(Loading)).to.have.lengthOf(0)
    expect(wrapper.find(ErrorMsg)).to.have.lengthOf(0)
    expect(wrapper.find(ExerciseForm)).to.have.lengthOf(1)
  })

  it('calls handleFetchMeasurements() on componentDidMount()', () => {
    expect(props.handleFetchMeasurements.calledOnce).to.be.false
    const wrapper = mount(<NewExercise {...props}/>)
    expect(props.handleFetchMeasurements.calledOnce).to.be.true
  })

  it('renders <Loading/> when fetching measurements', () => {
    props.areMeasurementsLoading = true
    const wrapper = mount(<NewExercise {...props}/>)
    expect(wrapper.find(Loading)).to.have.lengthOf(1)
    expect(wrapper.find(ErrorMsg)).to.have.lengthOf(0)
    expect(wrapper.find(ExerciseForm)).to.have.lengthOf(0)
  })

  it('renders </ErrorMsg> when unable to fetch measurements', () => {
    props.hasMeasurementsError = true
    const wrapper = mount(<NewExercise {...props}/>)
    expect(wrapper.find(Loading)).to.have.lengthOf(0)
    expect(wrapper.find(ErrorMsg)).to.have.lengthOf(1)
    expect(wrapper.find(ExerciseForm)).to.have.lengthOf(0)
  })
})
