import React from 'react'
import sinon from 'sinon'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {NewExercise} from '../NewExercise'
import {BrowserRouter as Router} from 'react-router-dom'

describe('<NewExercise/>', () => {

  let props
  beforeEach(() => {
    props = {
      handleFetchMeasurements: sinon.spy(),
      measurements: [{'name': 'Burpees'},{'name': 'Push Ups'}],
      isLoading: false,
      hasError: false
    }
  })

  it('renders', () => {
    const wrapper = mount(<NewExercise {...props}/>)
    expect(wrapper.find(NewExercise).length).to.be.equal(1)
  })

  it('calls handleFetchMeasurements() on componentDidMount()', () => {
    expect(props.handleFetchMeasurements.calledOnce).to.be.false
    const wrapper = mount(<NewExercise {...props}/>)
    expect(props.handleFetchMeasurements.calledOnce).to.be.true
  })

  it('renders loading when fetching', () => {
    props.isLoading = true
    const wrapper = mount(<NewExercise {...props}/>)
    expect(wrapper.find('.wkr-loading__text')).to.have.lengthOf(1)
  })

  it('renders error message when unable to fetch measurements', () => {
    props.hasError = true
    const wrapper = mount(<NewExercise {...props}/>)
    expect(wrapper.find('.wkr-error-msg')).to.have.lengthOf(1)
  })
})
