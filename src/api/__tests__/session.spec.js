import db, {clearDb} from '../../test-utils/db-mock'
import {Factory} from 'rosie'
import {expect} from 'chai'
import {validateSession} from '../session'

describe('Session', () => {

  describe('validateSession()', () => {

    // Each of the following attributes are required for a session
    [
      'name',
      'rounds',
      'restTimePerRound',
      'restTimePerExercise',
      'exercises',
      'exercises[0].name',
      'exercises[0].quantity',
      'exercises[0].quantityUnit',
      'exercises[0].weight',
      'exercises[0].weightUnit',
      'startedAt',
      'finishedAt'
    ].forEach((x) => {
      it(`does not allow to create a session without '${x}'`, () => {
        const attrs = Factory.build('session', {}, {except: ['id', x]})
        return validateSession(attrs)
          .then(() => expect(true).to.be.false) // force catch to always be executed
          .catch((errors) => expect(errors[x]).to.be.a('string'))
      })
    })

    it('returns the session if valid', () => {
      const attrs = Factory.build('session', {}, {except: ['id']})
      return validateSession(attrs)
        .then((res) => expect(res).to.be.eql(attrs))
    })
  })
})
