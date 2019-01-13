// TODO: Test

// GET workouts
export const getWorkouts = ({workouts}) => (workouts.getItems.list)
export const areWorkoutsLoading = ({workouts}) => (workouts.getItems.isLoading)
export const hasWorkoutsError = ({workouts}) => (workouts.getItems.errorMsg ? true : false)
