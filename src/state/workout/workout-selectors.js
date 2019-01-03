// TODO: Test
export const getWorkouts = ({workouts}) => (
  Object.keys(workouts.items).map((k) => workouts.items[k])
);

export const areWorkoutsLoading = ({workouts}) => (workouts.isBusy)

export const hasWorkoutsError = ({workouts}) => (workouts.errorMsg ? true : false)
