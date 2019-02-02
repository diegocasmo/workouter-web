import faker from 'faker'
import {expect} from 'chai'
import {trimmedMsg, requiredMsg, numTypeMsg, positiveNumMsg, atLeastNumMsg} from '../error-message'

it('trimmedMsg()', () => {
  const attr = faker.lorem.word()
  expect(trimmedMsg(attr)).to.be.equal(`${attr} must be a trimmed string`)
})

it('requiredMsg()', () => {
  const attr = faker.lorem.word()
  expect(requiredMsg(attr)).to.be.equal(`${attr} is required`)
})

it('numTypeMsg()', () => {
  const attr = faker.lorem.word()
  expect(numTypeMsg(attr)).to.be.equal(`${attr} must be a number`)
})

it('positiveNumMsg()', () => {
  const attr = faker.lorem.word()
  expect(positiveNumMsg(attr)).to.be.equal(`${attr} must be a positive number`)
})

it('atLeastNumMsg()', () => {
  const attr = faker.lorem.word()
  const num = 0
  expect(atLeastNumMsg(attr, num)).to.be.equal(`${attr} must be at least ${num}`)
})
