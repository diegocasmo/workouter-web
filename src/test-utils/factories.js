import faker from 'faker'
import {Factory} from 'rosie'
import {UNITS} from '../api/unit'
const moment = require('moment')

// Transforms a string which specifies a possibly nested object attribute
// path to an array
// Examples:
// 'exercises[0].unit' -> ['exercises', 0, 'unit']
// 'user.settings.isActive' -> ['user', 'settings', 'isActive']
function parseAttrPath(path) {
  return (path.replace('[', '.')) // Replace left bracket by dot
    .replace(']', '') // Replace right bracket by empty string
    .split('.') // Split rest of the string by periods
}

// Remove unwanted attributes from an object
function removeUnwantedAttrs(obj={}, unwantedAttrs=[]) {
  // If the 'id' attr is in the 'unwantedAttrs' array, then 'createdAt' and
  // 'updatedAt' must also be removed (i.e., a record that hasn't been created
  // yet, can't have timestamps)
  if(unwantedAttrs.find((x) => x === 'id')) {
    unwantedAttrs = unwantedAttrs.concat(['createdAt', 'updatedAt'])
  }
  // Remove all unwanted attrs from the object
  unwantedAttrs.forEach((path) => {
    const attrs = parseAttrPath(path)
    const attr = attrs.pop()
    let parent = attrs.reduce((o, k) => o[k], obj)
    delete parent[attr]
  })
  return obj
}

Factory.define('user')
  .sequence('id')
  .attr('name', () => faker.lorem.words())
  .attr('email', () => faker.internet.email())
  .attr('pictureUrl', () => faker.image.imageUrl())
  .attr('createdAt', () => moment().valueOf())
  .attr('updatedAt', () => moment().valueOf())
  .after((attrs, opts) => (removeUnwantedAttrs(attrs, opts.except)))

Factory.define('exercise')
  .sequence('id')
  .attr('name', () => faker.lorem.words())
  .attr('createdAt', () => moment().valueOf())
  .attr('updatedAt', () => moment().valueOf())
  .after((attrs, opts) => (removeUnwantedAttrs(attrs, opts.except)))

Factory.define('workout')
  .sequence('id')
  .attr('name', () => faker.lorem.words())
  .attr('rounds', () => faker.random.number({min: 1, max: 20}))
  .attr('restTimePerRound', () => faker.random.number({min: 0, max: 180})) // Assumed to be in seconds
  .attr('restTimePerExercise', () => faker.random.number({min: 0, max: 180})) // Assumed to be in seconds
  .attr('exercises', () =>
    Factory.buildList('exercise',
      faker.random.number({min: 2, max: 10}), // Generate a random number of exercises in [1, 10]
      {},
      {except: ['id']} // Exercises must be self-contained
    )
  )
  .attr('createdAt', () => moment().valueOf())
  .attr('updatedAt', () => moment().valueOf())
  .after((attrs, opts) => {
    // Augment each exercise with required attributes when added to a workout
    attrs.exercises.forEach((exercise) => {
      // The # of times the exercise will be performed in each round
      exercise.quantity = faker.random.number({min: 1, max: 100})
      // The unit used to measure the quantity attribute
      exercise.quantityUnit = faker.random.arrayElement(Object.keys(UNITS).map((k) => UNITS[k].value))
      // Weight is assumed to be in Kg
      exercise.weight = faker.random.number({min: 0, max: 100})
      exercise.weightUnit = UNITS.KG.value
    })

    removeUnwantedAttrs(attrs, opts.except)
  })

Factory.define('session')
  .extend('workout')
  .sequence('id')
  .attr('startedAt', () => moment().valueOf())
  .attr('finishedAt', () => moment().valueOf())
  .after((attrs, opts) => {
    attrs.roundsCompleted = faker.random.number({min: 0, max: attrs.rounds})
    removeUnwantedAttrs(attrs, opts.except)
  })
