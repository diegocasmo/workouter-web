import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {ExerciseListHeader} from '../Header'
import {Link} from 'react-router-dom'

describe('<ExerciseListHeader/>', () => {

  it('renders', () => {
    const wrapper = shallow(<ExerciseListHeader/>)
    expect(wrapper.find('.wkr-exercise-list-header__title').text()).to.be.equal('Exercises')
    expect(wrapper.find(Link).props().to).to.be.equal('/exercises/new')
  })
})
