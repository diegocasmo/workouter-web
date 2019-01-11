// TODO: Test
export const getMeasurements = ({measurements}) => (
  Object.keys(measurements.items).map((k) => measurements.items[k])
)

export const hasMeasurements = ({measurements}) => (
  Object.keys(measurements.items).length > 0
)

export const areMeasurementsLoading = ({measurements}) => (measurements.isBusy)

export const hasMeasurementsError = ({measurements}) => (measurements.errorMsg ? true : false)
