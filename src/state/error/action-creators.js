import { ERROR } from './actions'

// Add an error
export function addError(err) {
  const errorMsg = err.message ? err.message : err
  return { type: ERROR.ADD, errorMsg }
}

// Remove an error
export function removeError(index) {
  return { type: ERROR.REMOVE, index }
}
