import React, {Component} from 'react'
import {Formik, Form, FieldArray} from 'formik'
import {Input} from './Form/Input'
import {Select} from './Form/Select'
import {WorkoutSetupSchema, WorkoutSchema} from '../api/workout'
import {UNITS, getUnits} from '../api/unit'
import {Link} from 'react-router-dom'

class Wizard extends Component {
  static Page = ({children}) => children

  constructor(props) {
    super(props)
    this.state = {
      pageNum: 0,
      values: props.initialValues,
    }
  }

  handleGoToNext = (values) => {
    this.setState(({pageNum}) => ({
      pageNum: Math.min(pageNum + 1, this.props.children.length - 1),
      values,
    }))
  }

  handleGoToPrevious = () => {
    this.setState(({pageNum}) => ({
      pageNum: Math.max(pageNum - 1, 0),
    }))
  }

  handleSubmit = (values, bag) => {
    const {pageNum} = this.state
    const {children, onWizardSubmit} = this.props
    const isLastPage = pageNum === React.Children.count(children) - 1
    if (isLastPage) {
      return onWizardSubmit(values, bag)
    } else {
      this.handleGoToNext(values)
      bag.setTouched({})
      bag.setSubmitting(false)
    }
  }

  render() {
    const {pageNum, values} = this.state
    const {children, submitText} = this.props
    const activePage = React.Children.toArray(children)[pageNum]
    const isLastPage = pageNum === React.Children.count(children) - 1
    return (
      <Formik
        initialValues={values}
        enableReinitialize={false}
        validationSchema={activePage.props.validationSchema}
        onSubmit={this.handleSubmit}
        render={({isSubmitting}) => (
          <Form>
            {activePage}
            <div>
              {pageNum > 0 && <button type='button' onClick={this.handleGoToPrevious}>« Previous</button>}
              {!isLastPage && <button type='submit'>Next »</button>}
              {isLastPage && <button type='submit' disabled={isSubmitting}>{submitText}</button>}
            </div>
          </Form>
        )}/>
    )
  }
}

export const WorkoutForm = ({
  workout,
  exercises,
  submitText,
  history,
  redirectTo,
  handleSubmit
}) => {
  if(exercises && exercises.length > 0) {
    const emptyWorkout = {
      name: '',
      rounds: 4,
      restTimePerRound: 60,
      restTimePerExercise: 20,
      exercises: [{
        name: exercises[0].name,
        quantity: 10,
        quantityUnit: getUnits()[0].value,
        weight: 0,
        weightUnit: UNITS.KG.value
      }]
    }
    return (
      <Wizard
        initialValues={workout || emptyWorkout}
        onWizardSubmit={(attrs, {setErrors}) =>
          handleSubmit(attrs)
            .then(() => (history && redirectTo) ? history.push(redirectTo) : null)
            .catch((errors) => setErrors(errors))
        }
        submitText={submitText}>
        {/* First page: Workout setup details (i.e., name, rounds, etc) */}
        <Wizard.Page validationSchema={WorkoutSetupSchema}>
          <h3>Workout Setup</h3>
          <Input name='name' label='Name' placeholder='Name' type='text'/>
          <Input name='rounds' label='Rounds' placeholder='4' type='number'/>
          <Input name='restTimePerRound' label='Rest time per round (seconds)' placeholder='60' type='number'/>
          <Input name='restTimePerExercise' label='Rest time per exercise (seconds)' placeholder='20' type='number'/>
        </Wizard.Page>
        {/* Second page: Workout exercises */}
        <Wizard.Page validationSchema={WorkoutSchema}>
          <h3>Workout Exercises</h3>
          <FieldArray
            name='exercises'
            render={({remove, push, form}) => (
              <div>
                {form.values.exercises.length > 0 && form.values.exercises.map((_, idx) => (
                  <div key={idx}>
                    <Select name={`exercises.${idx}.name`} label='Name' options={exercises.map((x) => ({text: x.name, value: x.name}))}/>
                    <Input name={`exercises.${idx}.quantity`} label='Quantity' placeholder='10' type='number'/>
                    <Select name={`exercises.${idx}.quantityUnit`} label='Quantity unit' options={getUnits()}/>
                    <Input name={`exercises.${idx}.weight`} label='Weight' placeholder='0' type='number'/>
                    <Input name={`exercises.${idx}.weightUnit`} label='Weight Unit' type='string' value={UNITS.KG.value} readOnly disabled/>
                    {form.values.exercises.length > 1 && <button type='button' onClick={() => remove(idx)}>X</button>}
                  </div>
                ))}
                <button type='button' onClick={() => push(emptyWorkout.exercises[0])}>Add</button>
              </div>
            )}/>
        </Wizard.Page>
      </Wizard>
    )
  } else {
    return <p>Please, <Link to='/exercises/new'>create some exercises</Link> first</p>
  }
}
