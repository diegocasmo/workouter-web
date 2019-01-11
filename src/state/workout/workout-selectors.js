// TODO: Test
export const getWorkouts = ({workouts}) => (workouts.items.list)

export const areWorkoutsLoading = ({workouts}) => (workouts.isLoading)

export const hasWorkoutsError = ({workouts}) => (workouts.errorMsg ? true : false)
