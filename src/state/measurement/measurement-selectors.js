// TODO: Test and better names
export const getAll = ({measurements}) => (
  Object.keys(measurements.items).map((k) => measurements.items[k])
);

export const isLoading = ({measurements}) => (
  measurements.isBusy
)

export const hasError = ({measurements}) => (
  measurements.errorMsg ? true : false
)
