import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// TODO: Define factories somewhere else?
import {Factory} from 'rosie'
import faker from 'faker'

// Remove unwanted attributes from an object
function removeUnwantedAttrs(obj={}, unwantedAttrs=[]) {
  if(unwantedAttrs && unwantedAttrs.length > 0) {
    // If the 'id' attr is in the 'unwantedAttrs' array, then 'createdAt' and
    // 'updatedAt' must also be removed (i.e., a record that hasn't been created
    // yet, can't have timestamps)
    if(unwantedAttrs.find((x) => x === 'id')) {
      unwantedAttrs = unwantedAttrs.concat(['createdAt', 'updatedAt'])
    }
    // Remove all unwanted attrs from the object
    unwantedAttrs.forEach((x) => {
      const attrs = x.split('.')
      const attr = attrs.pop()
      let parent = attrs.reduce((o, k) => o[k], obj)
      delete parent[attr]
    })
  }
  return obj
}

Factory.define('measurement')
  .sequence('id')
  .attr('name', faker.lorem.words())
  .attr('createdAt', new Date())
  .attr('updatedAt', new Date())
  .after((attrs, opts) => (removeUnwantedAttrs(attrs, opts.except)))

Factory.define('exercise')
  .sequence('id')
  .attr('name', faker.lorem.words())
  .attr('measurement', () =>
    Factory.build('measurement', {}, {except: ['id']}) // Measurement must be self-container, no id
  )
  .attr('createdAt', new Date())
  .attr('updatedAt', new Date())
  .after((attrs, opts) => (removeUnwantedAttrs(attrs, opts.except)))

Factory.define('workout')
  .sequence('id')
  .attr('name', faker.lorem.words())
  .attr('rounds', faker.random.number())
  .attr('restTimePerRound', faker.random.number())
  .attr('restTimePerExercise', faker.random.number())
  .attr('exercises', () =>
    Factory.buildList('exercise',
      faker.random.number({min: 1, max: 10}), // Generate a random number of exercises in [1, 10]
      {quantity: faker.random.number({min: 1, max: 100})}, // Each exercise has a quantity in [1, 100]
      {except: ['id']}) // Exercises must be self-container, no id
  )
  .attr('createdAt', new Date())
  .attr('updatedAt', new Date())
  .after((attrs, opts) => (removeUnwantedAttrs(attrs, opts.except)))

configure({adapter: new Adapter()});
