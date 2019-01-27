import React from 'react'
import {Factory} from 'rosie'
import {expect} from 'chai'
import sinon from 'sinon'
import {mount} from 'enzyme'
import {BrowserRouter as Router} from 'react-router-dom'
import {WorkoutForm} from '../WorkoutForm'
import {Formik, Form, ErrorMessage} from 'formik'

describe('<WorkoutForm/>', () => {

  let props
  beforeEach(() => {
    props = {
      workout: null,
      exercises: Factory.buildList('exercise', 5),
      submitText: 'Foo',
      handleSubmit: sinon.spy(() => Promise.resolve()),
    }
  })

  it('it allows to create a valid workout', async () => {
    const wrapper = mount(<Router><WorkoutForm {...props}/></Router>)
    expect(wrapper.find(Form)).to.have.lengthOf(1)

    // Check default values are set
    expect(wrapper.find("input[name='name']").props().value).to.be.equal('')
    expect(wrapper.find("input[name='rounds']").props().value).to.be.equal(4)
    expect(wrapper.find("input[name='restTimePerRound']").props().value).to.be.equal(60)
    expect(wrapper.find("input[name='restTimePerExercise']").props().value).to.be.equal(20)

    // Shows 'Next »' button
    expect(wrapper.find("button[type='submit']").props().children).to.be.equal('Next »')

    // Set a valid workout name
    wrapper.find("input[name='name']").simulate('change', {target: {id: 'name', value: 'foo'}})
    wrapper.find('form').simulate('submit')
    await tick()
    wrapper.update()

    // Shows '« Previous' and submit buttons
    expect(wrapper.find("button[type='button']").last().props().children).to.be.equal('« Previous')
    expect(wrapper.find("button[type='submit']").props().disabled).to.be.false
    expect(wrapper.find("button[type='submit']").text()).to.be.equal(props.submitText)

    // Shows button to add more exercises
    expect(wrapper.find("button[type='button']").first().props().children).to.be.equal('Add')

    // Verify workout exercises' default values
    expect(wrapper.find(`select[name='exercises.0.name']`).props().value).to.be.equal(props.exercises[0].name)
    expect(wrapper.find("input[name='exercises.0.quantity']").props().value).to.be.equal(10)
    expect(wrapper.find(`select[name='exercises.0.quantityUnit']`).props().value).to.be.equal('reps')
    expect(wrapper.find("input[name='exercises.0.weight']").props().value).to.be.equal(0)
    expect(wrapper.find("input[name='exercises.0.weightUnit']").props().value).to.be.equal('Kg')

    // Submit valid workout
    wrapper.find('form').simulate('submit')
    await tick()
    wrapper.update()

    expect(wrapper.find("button[type='submit']").props().disabled).to.be.true
    expect(props.handleSubmit.calledOnce).to.be.true
    expect(props.handleSubmit.calledWith({
      name: 'foo',
      rounds: 4,
      restTimePerRound: 60,
      restTimePerExercise: 20,
      exercises: [{
        name: props.exercises[0].name,
        quantity: 10,
        quantityUnit: 'reps',
        weight: 0,
        weightUnit: 'Kg'
      }]
    })).to.be.true
  })
})

function tick() {
  return new Promise(resolve => {
    setTimeout(resolve, 0)
  })
}
