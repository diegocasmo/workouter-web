// List of supported units used to measure the quantity attribute of a
// workout's exercise (i.e. Burpees 12 Repetition(s), or Running 5 Km)
export const UNITS = {
  REPS: {text: 'Repetition(s)', value: 'reps'},
  SECONDS: {text: 'Second(s)', value: 'sec'},
  KM: {text: 'Km', value: 'Km'},
  KG: {text: 'Kg', value: 'Kg'}
}

// Return all defined UNITS as an array
export function getUnits() {
  return Object.keys(UNITS).map((k) => UNITS[k])
}
