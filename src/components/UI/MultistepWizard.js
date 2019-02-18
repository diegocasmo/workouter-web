import React, {Component} from 'react'
import {Formik, Form} from 'formik'
import {Prompt} from 'react-router-dom'

// Create Formik forms of multiple pages
// See more: https://github.com/jaredpalmer/formik/blob/master/examples/MultistepWizard.js
export class MultistepWizard extends Component {
  static Page = ({children}) => children

  constructor(props) {
    super(props)
    this.state = {
      pageNum: 0,
      values: props.initialValues
    }
  }

  handleGoToNext = (values) => {
    this.setState(({pageNum}) => ({
      pageNum: Math.min(pageNum + 1, this.props.children.length - 1),
      values
    }))
  }

  handleGoToPrevious = () => {
    this.setState(({pageNum}) => ({
      pageNum: Math.max(pageNum - 1, 0)
    }))
  }

  handleSubmit = (values, bag) => {
    const {pageNum} = this.state
    const {children, onSubmit} = this.props
    const isLastPage = pageNum === React.Children.count(children) - 1
    if (isLastPage) {
      return onSubmit(values, bag)
    } else {
      bag.setTouched({})
      bag.setSubmitting(false)
      this.handleGoToNext(values)
    }
  }

  render() {
    const {pageNum, values} = this.state
    const {children, submitText, initialValues} = this.props
    const activePage = React.Children.toArray(children)[pageNum]
    const isLastPage = pageNum === React.Children.count(children) - 1
    return (
      <Formik
        initialValues={values}
        enableReinitialize={false}
        validationSchema={activePage.props.validationSchema}
        onSubmit={this.handleSubmit}
        render={({isSubmitting, values}) => (
          <>
            <Prompt
              when={!isSubmitting && JSON.stringify(values) !== JSON.stringify(initialValues)}
              message='You have unsaved changes. Are you sure you want to leave?'/>
            <Form>
              {activePage}
              <div>
                {pageNum > 0 && <button type='button' onClick={this.handleGoToPrevious}>« Previous</button>}
                {!isLastPage && <button type='submit'>Next »</button>}
                {isLastPage && <button type='submit' disabled={isSubmitting}>{submitText}</button>}
              </div>
            </Form>
          </>
        )}/>
    )
  }
}
