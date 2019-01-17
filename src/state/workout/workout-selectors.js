import {REQUEST_STATUS} from '../utils/request-status'

export const getWorkouts = ({workouts}) => (Object.keys(workouts.items).map((k) => workouts.items[k]))
export const getWorkout = ({workouts}, id) => (workouts.items[id])
export const isLoading = ({workouts}) => (workouts.status === REQUEST_STATUS.GET)
