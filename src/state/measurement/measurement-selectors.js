// TODO: Test

// GET measurements
export const getMeasurements = ({measurements}) => (measurements.getItems.list)
export const areMeasurementsLoading = ({measurements}) => (measurements.getItems.isLoading)
export const hasMeasurementsError = ({measurements}) => (measurements.getItems.errorMsg ? true : false)
