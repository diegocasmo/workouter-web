import {REQUEST_STATUS} from '../utils/request-status'

export const getExercises = ({exercises}) => (Object.keys(exercises.items).map((k) => exercises.items[k]))
export const getExercise = ({exercises}, id) => (exercises.items[id])
export const isLoading = ({exercises}) => (exercises.status === REQUEST_STATUS.GET)
