// TODO: Test
export const getMeasurements = ({measurements}) => (measurements.items.list)

export const areMeasurementsLoading = ({measurements}) => (measurements.items.isLoading)

export const hasMeasurementsError = ({measurements}) => (measurements.items.errorMsg ? true : false)
