// List of supported units used to measure the quantity attribute of a
// workout's exercise (i.e. Burpees 12 Repetition(s), or Running 5 Km)
export const UNITS = {
  REPS: { text: 'Repetition(s)', value: 'repetition' },
  SECONDS: { text: 'Second(s)', value: 'second' },
  KM: { text: 'Km', value: 'Km' },
  KG: { text: 'Kg', value: 'Kg' },
}

// Return all defined UNITS as an array
export const getUnits = () => {
  return Object.keys(UNITS).map(k => UNITS[k])
}

// Return a unit of measurement from a measurement's value
export const getUnitFromUnitValue = value =>
  UNITS[Object.keys(UNITS).find(k => UNITS[k].value === value)]
