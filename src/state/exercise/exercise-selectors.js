import {REQUEST_STATUS} from '../utils/request-status'

export const getExercises = ({exercises}) =>
  Object.entries(exercises.items)
    .map((x) => x[1])
    .sort((a, b) => a.name.localeCompare(b.name)) // Sort exercises by ascending name

export const getExercise = ({exercises}, id) => exercises.items[id]
export const isLoading = ({exercises}) => exercises.status === REQUEST_STATUS.GET
export const canLoadMore = ({exercises}) => exercises.hasMore && !isLoading({exercises})
