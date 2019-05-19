import React from 'react'
import {Factory} from 'rosie'
import {expect} from 'chai'
import sinon from 'sinon'
import {mount} from 'enzyme'
import {BrowserRouter as Router, Prompt} from 'react-router-dom'
import {WorkoutForm} from '../Form'
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable'
import {Formik, Form, ErrorMessage} from 'formik'
import {wrapInTestContext} from 'react-dnd-test-utils'
import {UNITS} from '../../../../api/unit'

describe('<WorkoutForm/>', () => {

  let props = null
  const exercises = Factory.buildList('exercise', 10)
  const DnDContext = wrapInTestContext(WorkoutForm)
  beforeEach(async () => {
    props = {
      workout: null,
      submitText: 'Foo',
      history: {push: sinon.spy()},
      redirectTo: 'fooBar',
      fetchExercises: sinon.spy(() => Promise.resolve(exercises)),
      createExercise: sinon.spy(() => Promise.resolve()),
      handleSubmit: sinon.spy(() => Promise.resolve())
    }
  })

  it('renders <Prompt/>', () => {
    const wrapper = mount(<Router><DnDContext {...props}/></Router>)
    expect(wrapper.find(Prompt).props().when).to.be.false
    expect(wrapper.find(Prompt).props().message).to.be.equal('You have unsaved changes. Are you sure you want to leave?')
  })

  it('can create a valid workout', async () => {
    const wrapper = mount(<Router><DnDContext {...props}/></Router>)
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

    // Expect <Prompt/> to be truthy
    expect(wrapper.find(Prompt).props().when).to.be.true

    // Shows '« Previous' and submit buttons
    expect(wrapper.find("button[type='button']").last().props().children).to.be.equal('« Previous')
    expect(wrapper.find("button[type='submit']").props().disabled).to.be.false
    expect(wrapper.find("button[type='submit']").text()).to.be.equal(props.submitText)

    // Shows button to add more exercises
    expect(wrapper.find("button[type='button']").first().props().children).to.be.equal('Add')

    // Verify workout exercises' default values
    expect(wrapper.find(AsyncCreatableSelect).text()).to.be.equal('Select...')
    expect(wrapper.find("input[name='exercises.0.quantity']").props().value).to.be.equal(10)
    expect(wrapper.find(`select[name='exercises.0.quantityUnit']`).props().value).to.be.equal(UNITS.REPS.value)
    expect(wrapper.find("input[name='exercises.0.weight']").props().value).to.be.equal(0)
    expect(wrapper.find("input[name='exercises.0.weightUnit']").props().value).to.be.equal(UNITS.KG.value)

    // Select a valid exercise
    wrapper.find('.wkr-searchable-select__dropdown-indicator').first().simulate('mouseDown', {button: 0})
    await tick()
    wrapper.update()
    wrapper.find('.wkr-searchable-select__option').first().simulate('click')
    expect(wrapper.find(AsyncCreatableSelect).text()).to.be.equal(exercises[0].name)

    // Submit valid workout
    wrapper.find('form').simulate('submit')
    await tick()
    wrapper.update()

    // <Prompt/> shouldn't show message when submitting a valid workout
    expect(wrapper.find(Prompt).props().when).to.be.false
    expect(wrapper.find("button[type='submit']").props().disabled).to.be.true
    expect(props.handleSubmit.calledOnce).to.be.true
    expect(props.handleSubmit.calledWith({
      name: 'foo',
      rounds: 4,
      restTimePerRound: 60,
      restTimePerExercise: 20,
      exercises: [{
        name: exercises[0].name,
        quantity: 10,
        quantityUnit: UNITS.REPS.value,
        weight: 0,
        weightUnit: UNITS.KG.value
      }]
    })).to.be.true
    expect(props.history.push.calledWith(props.redirectTo)).to.be.true
  })

  it('can update an existing workout', async () => {
    props = {...props, workout: Factory.build('workout')}
    const wrapper = mount(<Router><DnDContext {...props}/></Router>)
    const oldWorkout = {...props.workout}
    const newWorkout = Factory.build('workout', {id: oldWorkout.id})
    const getEvent = (id, value) => ({target: {id, value}})

    // Update some workout's setup fields
    wrapper.find("input[name='name']").simulate('change', getEvent('name', newWorkout.name))
    wrapper.find("input[name='rounds']").simulate('change', getEvent('rounds', newWorkout.rounds))
    wrapper.find('form').simulate('submit')
    await tick()
    wrapper.update()

    // Update first exercise
    wrapper.find('.wkr-searchable-select__dropdown-indicator').first().simulate('mouseDown', {button: 0})
    await tick()
    wrapper.update()
    wrapper.find('.wkr-searchable-select__option').first().simulate('click')
    wrapper.find("input[name='exercises.0.quantity']").simulate('change', getEvent('exercises.0.quantity', newWorkout.exercises[0].quantity))
    wrapper.find("input[name='exercises.0.weight']").simulate('change', getEvent('exercises.0.weight', newWorkout.exercises[0].weight))

    // Submit updated workout
    wrapper.find('form').simulate('submit')
    await tick()
    wrapper.update()

    // Expect submitted workout to have updated fields
    expect(wrapper.find(Prompt).props().when).to.be.false
    expect(wrapper.find("button[type='submit']").props().disabled).to.be.true
    expect(props.handleSubmit.calledOnce).to.be.true
    expect(props.handleSubmit.calledWith({
      ...oldWorkout,
      name: newWorkout.name,
      rounds: newWorkout.rounds,
      exercises: [{
        name: exercises[0].name,
        quantity: newWorkout.exercises[0].quantity,
        quantityUnit: oldWorkout.exercises[0].quantityUnit,
        weight: newWorkout.exercises[0].weight,
        weightUnit: oldWorkout.exercises[0].weightUnit
      }, ...oldWorkout.exercises.slice(1)]
    })).to.be.true
    expect(props.history.push.calledWith(props.redirectTo)).to.be.true
  })
})

const tick = () => ((new Promise(resolve => setTimeout(resolve, 0))))
