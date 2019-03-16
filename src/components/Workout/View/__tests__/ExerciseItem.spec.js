import React from 'react'
import {Factory} from 'rosie'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {WorkoutExerciseItem} from '../ExerciseItem'

describe('<WorkoutExerciseItem/>', () => {

  let props = null
  beforeEach(() => {
    props = Factory.build('workout').exercises[0]
  })

  it('renders', () => {
    const wrapper = shallow(<WorkoutExerciseItem {...props}/>)
    const {name, quantity, quantityUnit, weight, weightUnit} = props
    const title = weight > 0
      ? `${name} x${quantity} ${quantityUnit} @${weight} ${weightUnit}`
      : `${name} x${quantity} ${quantityUnit}`
    expect(wrapper.find('.wrk-workout-exercise-item__title').text()).to.be.equal(title)
  })
})
