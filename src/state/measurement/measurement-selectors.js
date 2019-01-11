// TODO: Test
export const getMeasurements = ({measurements}) => (measurements.items.list)

export const areMeasurementsLoading = ({measurements}) => (measurements.isLoading)

export const hasMeasurementsError = ({measurements}) => (measurements.errorMsg ? true : false)
