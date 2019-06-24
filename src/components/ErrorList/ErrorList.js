import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {removeError} from '../../state/error/error-action-creators'
import {getErrors} from '../../state/error/error-selectors'
import {ErrorItem} from './ErrorItem'

export const ErrorList = ({errors, removeError}) => (
  errors.map((error, index) =>
    <ErrorItem
      key={index}
      index={index}
      error={error}
      removeError={removeError}/>)
)

const mapStateToProps = state => ({
  errors: getErrors(state)
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({removeError}, dispatch)
)

export const ErrorListFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(ErrorList)
