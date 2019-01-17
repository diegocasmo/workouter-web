import {expect} from 'chai'
import {UNITS, getUnits} from '../unit'

describe('Unit', () => {

  it('UNITS', () => {
    expect(UNITS.REPS).to.be.eql({text: 'Repetition(s)', value: 'reps'})
    expect(UNITS.SECONDS).to.be.eql({text: 'Second(s)', value: 'sec'})
    expect(UNITS.KM).to.be.eql({text: 'Km', value: 'Km'})
    expect(UNITS.KG).to.be.eql({text: 'Kg', value: 'Kg'})
  })

  it('getUnits()', () => {
    expect(getUnits())
      .to.be.eql([
        {text: 'Repetition(s)', value: 'reps'},
        {text: 'Second(s)', value: 'sec'},
        {text: 'Km', value: 'Km'},
        {text: 'Kg', value: 'Kg'}
      ])
  })
})
