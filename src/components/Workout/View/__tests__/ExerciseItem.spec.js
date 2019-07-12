import React from 'react'
import {Factory} from 'rosie'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {WorkoutExerciseItem} from '../ExerciseItem'
import {getUnitFromUnitValue} from '../../../../api/unit'

describe('<WorkoutExerciseItem/>', () => {

  let props = null
  beforeEach(() => {
    props = Factory.build('workout').exercises[0]
  })

  it('renders', () => {
    const wrapper = shallow(<WorkoutExerciseItem {...props}/>)
    const {name, quantity, weight, quantityUnit, weightUnit} = props
    const title = weight > 0
      ? `${name} x${quantity} ${getUnitFromUnitValue(quantityUnit).text} @${weight} ${weightUnit}`
      : `${name} x${quantity} ${getUnitFromUnitValue(quantityUnit).text}`
    expect(wrapper.find('.wkr-workout-exercise-item__title').text()).to.be.equal(title)
  })
})
