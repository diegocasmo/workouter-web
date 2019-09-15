import { expect } from 'chai'
import { UNITS, getUnits, getUnitFromUnitValue } from '../unit'

describe('Unit', () => {
  it('UNITS', () => {
    expect(UNITS.REPS).to.be.eql({ text: 'Repetition(s)', value: 'repetition' })
    expect(UNITS.SECONDS).to.be.eql({ text: 'Second(s)', value: 'second' })
    expect(UNITS.KM).to.be.eql({ text: 'Km', value: 'Km' })
    expect(UNITS.KG).to.be.eql({ text: 'Kg', value: 'Kg' })
  })

  it('getUnits()', () => {
    expect(getUnits()).to.be.eql([
      { text: 'Repetition(s)', value: 'repetition' },
      { text: 'Second(s)', value: 'second' },
      { text: 'Km', value: 'Km' },
      { text: 'Kg', value: 'Kg' },
    ])
  })

  it('getUnitFromUnitValue()', () => {
    expect(getUnitFromUnitValue(UNITS.SECONDS.value)).to.be.eql(UNITS.SECONDS)
    expect(getUnitFromUnitValue(UNITS.KM.value)).to.be.eql(UNITS.KM)
    expect(getUnitFromUnitValue('foo bar')).to.be.equal(undefined)
  })
})
