// TODO: Test
export const getExercises = ({exercises}) => (exercises.items.list)

export const areExercisesLoading = ({exercises}) => (exercises.items.isLoading)

export const hasExercisesError = ({exercises}) => (exercises.items.errorMsg ? true : false)

export const getNewExercise = ({exercises}) => (exercises.newItem.attrs)

export const getNewExerciseErrors = ({exercises}) => (exercises.newItem.errors.errors)
