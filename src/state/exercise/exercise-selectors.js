// TODO: Test and better names
export const getAll = ({exercises}) => (
  Object.keys(exercises.items).map((k) => exercises.items[k])
);

export const isLoading = ({exercises}) => (
  exercises.isBusy
)

export const hasError = ({exercises}) => (
  exercises.errorMsg ? true : false
)
