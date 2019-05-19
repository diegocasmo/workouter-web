import React from 'react'
import sinon from 'sinon'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {WorkoutExerciseForm} from '../Exercise'
import {AsyncCreateSelect} from '../../../UI/AsyncCreateSelect'
import {UNITS, getUnits} from '../../../../api/unit'

describe('<WorkoutExerciseForm/>', () => {

  let props
  let wrapper
  beforeEach(() => {
    props = {
      index: 0,
      exerciseName: 'foo bar',
      onRemove: sinon.spy(() => Promise.resolve()),
      fetchExercises: sinon.spy(() => Promise.resolve()),
      createExercise: sinon.spy(() => Promise.resolve()),
      canRemove: true
    }
  })

  it('renders', () => {
    wrapper = shallow(<WorkoutExerciseForm {...props}/>)

    // <AsyncCreateSelect/>
    expect(wrapper.find(AsyncCreateSelect).props().label).to.be.equal('Name')
    expect(wrapper.find(AsyncCreateSelect).props().name).to.be.equal(`exercises.${props.index}.name`)
    expect(wrapper.find(AsyncCreateSelect).props().value).to.be.equal(props.exerciseName)
    expect(wrapper.find(AsyncCreateSelect).props().defaultOptions).to.be.true

    // Quantity <Input/>
    const Quantity = wrapper.findWhere(c => c.props().name === `exercises.${props.index}.quantity`)
    expect(Quantity.props().label).to.be.equal('Quantity')
    expect(Quantity.props().placeholder).to.be.equal('10')
    expect(Quantity.props().type).to.be.equal('number')

    // Quantity Unit <Select/>
    const QuantityUnit = wrapper.findWhere(c => c.props().name === `exercises.${props.index}.quantityUnit`)
    expect(QuantityUnit.props().label).to.be.equal('Quantity unit')
    expect(QuantityUnit.props().options).to.be.eql(getUnits())

    // Weight <Input/>
    const Weight = wrapper.findWhere(c => c.props().name === `exercises.${props.index}.weight`)
    expect(Weight.props().label).to.be.equal('Weight')
    expect(Weight.props().placeholder).to.be.equal('0')
    expect(Weight.props().type).to.be.equal('number')

    // Weight Unit <Input/>
    const WeightUnit = wrapper.findWhere(c => c.props().name === `exercises.${props.index}.weightUnit`)
    expect(WeightUnit.props().label).to.be.equal('Weight Unit')
    expect(WeightUnit.props().value).to.be.equal(UNITS.KG.value)
    expect(WeightUnit.props().type).to.be.equal('string')
    expect(WeightUnit.props().readOnly).to.be.true
    expect(WeightUnit.props().disabled).to.be.true
  })

  it("calls 'onRemove' props", () => {
    wrapper = shallow(<WorkoutExerciseForm {...props}/>)

    expect(wrapper.find('button')).to.have.lengthOf(1)
    expect(props.onRemove.called).to.be.false

    wrapper.find('button').simulate('click')

    expect(props.onRemove.calledOnce).to.be.true
  })

  it("doesn\'t render remove button when 'canRemove' is false", () => {
    props = {...props, canRemove: false}
    wrapper = shallow(<WorkoutExerciseForm {...props}/>)
    expect(wrapper.find('button')).to.have.lengthOf(0)
  })
})
