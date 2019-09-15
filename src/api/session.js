import connection from './db'
import { number, object } from 'yup'
import { transformYupToFormikError } from './utils/error-transform'
import { requiredMsg, numTypeMsg, atLeastNumMsg } from './utils/error-message'
import { WorkoutSchema } from './workout'

// A session schema
const SessionSchema = object()
  .concat(WorkoutSchema)
  .shape({
    roundsCompleted: number(numTypeMsg('Rounds completed'))
      .min(0, atLeastNumMsg('Rounds completed', 0))
      .required(requiredMsg('Rounds completed')),
    startedAt: number(numTypeMsg('Started at')).required(
      requiredMsg('Started at')
    ),
    finishedAt: number(numTypeMsg('Finished at')).required(
      requiredMsg('Finished at')
    ),
  })

// Validate a session attributes. Return a resolved Promise with the valid attrs, a Rails-like
// error object otherwise
export async function validateSession(attrs) {
  try {
    const sessionAttrs = await SessionSchema.validate(attrs)
    return sessionAttrs
  } catch (yupError) {
    return Promise.reject(transformYupToFormikError(yupError))
  }
}

// Return a paginated array of sessions, where newest sessions are returned first (descending order)
export async function fetchSessions(opts = {}) {
  // Assign defaults to pagination if arguments are not provided
  const { pageNum = 0, perPage = 10, db = connection } = opts
  // Return paginated results
  return db.sessions
    .orderBy('id')
    .reverse()
    .offset(pageNum * perPage)
    .limit(perPage)
    .toArray()
}

// Return a session from DB if it exists, otherwise reject with an error
export async function getSession(id, db = connection) {
  const session = await db.sessions.get(id)
  return session
    ? session
    : Promise.reject(new Error(`Session ${id} doesn't exist`))
}

// Returns the id of the created session in DB if successful, a rejected Promise with a
// Rails-like object of errors otherwise
export async function createSession(attrs, db = connection) {
  const validAttrs = await validateSession(attrs)
  return db.sessions.add(validAttrs)
}
