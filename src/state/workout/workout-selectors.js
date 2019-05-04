import {REQUEST_STATUS} from '../utils/request-status'

export const getWorkouts = ({workouts}) =>
  Object.entries(workouts.items)
    .map((x) => x[1])
    .sort((a, b) => a.name.localeCompare(b.name)) // Sort workouts by ascending name
export const getWorkout = ({workouts}, id) => (workouts.items[id])
export const isLoading = ({workouts}) => workouts.status === REQUEST_STATUS.GET
export const canLoadMore = ({workouts}) => workouts.hasMore && !isLoading({workouts})
