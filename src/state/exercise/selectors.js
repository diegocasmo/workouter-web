import { REQUEST_STATUS } from '../utils/request-status'

export const getExercises = ({ exercises }) =>
  Object.entries(exercises.items)
    .map(x => x[1])
    // Sort exercises by case-insensitive ascending name
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

export const getExercise = ({ exercises }, id) => exercises.items[id]
export const isLoading = ({ exercises }) =>
  exercises.status === REQUEST_STATUS.GET
export const canLoadMore = ({ exercises }) =>
  exercises.hasMore && !isLoading({ exercises })
