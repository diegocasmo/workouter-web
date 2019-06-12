import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import {WorkoutListHeader} from '../Header'
import {Link} from 'react-router-dom'

describe('<WorkoutListHeader/>', () => {

  it('renders', () => {
    const wrapper = shallow(<WorkoutListHeader/>)
    expect(wrapper.find('.wkr-workout-list-header__title').text()).to.be.equal('Workouts')
    expect(wrapper.find(Link).props().to).to.be.equal('/workouts/new')
  })
})
