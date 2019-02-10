import React from 'react'
import {act} from 'react-dom/test-utils'
import sinon from 'sinon'
import {Factory} from 'rosie'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {NewSession} from '../NewSession'
import {Loading} from '../../components/Loading'
import {SessionForm} from '../../components/SessionForm/SessionForm'

describe('<NewSession/>', () => {

  let wrapper
  let props
  beforeEach(() => {
    props = {
      workoutId: 1,
      workout: Factory.build('workout', {id: 1}),
      isLoading: false,
      getWorkout: sinon.spy(),
      createSession: () => {},
      addError: () => {}
    }
  })

  it('renders', () => {
    wrapper = mount(<NewSession {...props}/>)
    expect(wrapper.find(NewSession)).to.have.lengthOf(1)
    expect(wrapper.find(SessionForm)).to.have.lengthOf(1)
    expect(wrapper.find(Loading)).to.have.lengthOf(0)
    expect(wrapper.find(SessionForm).props().onCreateSession).to.be.equal(props.createSession)
    expect(wrapper.find(SessionForm).props().onCreateSessionFailure).to.be.equal(props.addError)
  })

  it('renders <Loading/> when resources are being loaded', () => {
    props.isLoading = true
    wrapper = mount(<NewSession {...props}/>)
    expect(wrapper.find(Loading)).to.have.lengthOf(1)
    expect(wrapper.find(SessionForm)).to.have.lengthOf(0)
  })

  it("calls 'getWorkout()'", () => {
    expect(props.getWorkout.called).to.be.false
    act(() => { wrapper = mount(<NewSession {...props}/>) })
    expect(props.getWorkout.called).to.be.true
    expect(props.getWorkout.calledWith(props.workoutId)).to.be.true
  })
})
