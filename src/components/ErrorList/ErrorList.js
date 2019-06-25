import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {removeError} from '../../state/error/error-action-creators'
import {getErrors} from '../../state/error/error-selectors'
import {ErrorItem} from './ErrorItem'
import './ErrorList.css'

export const ErrorList = ({errors, removeError}) => (
  <div className='wkr-error-list__container col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 pt-2'>
    {errors.map((error, idx) =>
      <ErrorItem
        key={idx}
        error={error}
        onClick={() => { removeError(idx) }}/>)}
  </div>
)

ErrorList.propTypes = {
  errors: PropTypes.array.isRequired,
  removeError: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors: getErrors(state)
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({removeError}, dispatch)
)

export const ErrorListFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(ErrorList)
