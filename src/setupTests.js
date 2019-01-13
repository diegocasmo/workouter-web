import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// TODO: Define factories somewhere else?
import {Factory} from 'rosie'
import faker from 'faker'

// Remove unwanted attributes specified in the except array
function removeUnwantedAttrs(attrs={}, except=[]) {
  if(except && except.length > 0) {
    except.forEach((x) => {
      const keys = x.split('.')
      const key = keys.pop()
      let parent = keys.reduce((o, k) => o[k], attrs)
      delete parent[key]
    })
  }
  return attrs
}

Factory.define('measurement')
  .sequence('id')
  .attr('name', () => faker.lorem.words())
  .after((attrs, opts) => {
    return removeUnwantedAttrs(attrs, opts.except)
  })

Factory.define('exercise')
  .sequence('id')
  .attr('name', () => faker.lorem.words())
  .attr('measurement', () => Factory.build('measurement', {}, {except: ['id']}))
  .after((attrs, opts) => {
    return removeUnwantedAttrs(attrs, opts.except)
  })

configure({adapter: new Adapter()});
