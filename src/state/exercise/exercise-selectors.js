// TODO: Test

// GET exercises
export const getExercises = ({exercises}) => (exercises.getItems.list)
export const areExercisesLoading = ({exercises}) => (exercises.getItems.isLoading)
export const hasExercisesError = ({exercises}) => (exercises.getItems.errorMsg ? true : false)

// Get (active) exercise
export const getActiveExercise = ({exercises}) => (exercises.getItem.attrs)
export const isActiveExerciseLoading = ({exercises}) => (exercises.getItem.isLoading)
export const hasActiveExerciseError = ({exercises}) => (exercises.getItem.errorMsg ? true : false)

// Create exercise
export const getNewExercise = ({exercises}) => (exercises.postItem.attrs)
export const isNewExerciseSubmitting = ({exercises}) => (exercises.postItem.isLoading)
export const getNewExerciseErrors = ({exercises}) => (exercises.postItem.errors.errors)

// Update exercise
export const isUpdateExerciseSubmitting = ({exercises}) => (exercises.putItem.isLoading)
export const getUpdateExerciseErrors = ({exercises}) => (exercises.putItem.errors.errors)
