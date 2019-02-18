import db, {clearDb} from '../../test-utils/db-mock'
import {Factory} from 'rosie'
import {expect} from 'chai'
import {fetchSessions, validateSession, createSession} from '../session'

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
      'roundsCompleted',
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

  describe('fetchSessions()', () => {

    it('returns paginated sessions', async () => {
      // Retrieve the 20 items paginated into 2 pages
      await db.sessions.bulkAdd(Factory.buildList('session', 20, {}, {except: ['id']}))
      const firstPage = await fetchSessions({pageNum: 0, perPage: 10, db})
      const secondPage = await fetchSessions({pageNum: 1, perPage: 10, db})

      // Verify each page contains 10 elements
      expect(firstPage.length).to.be.equal(10)
      expect(secondPage.length).to.be.equal(10)

      // Check every page contains the right elements
      const allSessions = await db.sessions.toArray()
      expect(firstPage).to.be.eql(allSessions.slice(0, 10))
      expect(secondPage).to.be.eql(allSessions.slice(10))
    })
  })

  describe('createSession()', () => {

    it('creates a valid session in DB', async () => {
      const attrs = Factory.build('session', {}, {except: ['id']})
      const id = await createSession(attrs, db)
      expect(id).to.be.a('number')
    })

    it('doesn\'t allow to create an session with invalid attrs', async () => {
      const invalidAttrs = Factory.build('session', {}, {except: ['id', 'name']})
      try {
        await createSession(invalidAttrs, db)
        expect(true).to.be.false // force catch to always be executed
      } catch(errors) {
        expect(errors.name).to.be.equal('Name is required')
      }
    })
  })
})
