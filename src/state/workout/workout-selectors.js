// TODO: Test

// GET workouts
export const getWorkouts = ({workouts}) => (workouts.items.list)
export const areWorkoutsLoading = ({workouts}) => (workouts.items.isLoading)
export const hasWorkoutsError = ({workouts}) => (workouts.items.errorMsg ? true : false)
