import * as measurement from '../../db/models/measurement'
import {MEASUREMENT} from './measurement-actions'

// Fetch a list of measurements
export function fetchMeasurements() {
  return (dispatch) => {
    dispatch({type: MEASUREMENT.FETCH_INIT})
    return measurement.fetchMeasurements()
      .then((data) => dispatch({type: MEASUREMENT.FETCH_SUCCESS, items: data}))
      .catch(() => dispatch({
        type: MEASUREMENT.FETCH_FAILURE,
        errorMsg: 'There was an error while fetching the measurements'
      }))
  }
}

// Reset fetch measurements
export function resetFetchMeasurements() {
  return {type: MEASUREMENT.FETCH_RESET}
}
