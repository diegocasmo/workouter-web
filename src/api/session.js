import connection from './db'
import {number, object} from 'yup'
import {transformYupToFormikError} from './utils/error-transform'
import {requiredMsg, numTypeMsg} from './utils/error-message'
import {WorkoutSchema} from './workout'
const moment = require('moment')

// A session schema
const SessionSchema = object()
  .concat(WorkoutSchema)
  .shape({
    startedAt: number(numTypeMsg('Started at'))
                .required(requiredMsg('Started at'))
                .test('is-date', '${path} is an invalid date', (v) => v ? moment(v).isValid() : false),
    finishedAt: number(numTypeMsg('Finished at'))
                  .required(requiredMsg('Finished at'))
                  .test('is-date', '${path} is an invalid date', (v) => v ? moment(v).isValid() : false)
  })

// Validate a session attributes. Return a resolved Promise with the valid attrs, a Rails-like
// error object otherwise
export async function validateSession(attrs) {
  return SessionSchema.validate(attrs)
    .catch((yupError) => Promise.reject(transformYupToFormikError(yupError)))
}
