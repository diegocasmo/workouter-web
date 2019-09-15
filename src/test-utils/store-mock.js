import { REQUEST_STATUS } from '../state/utils/request-status'

export const reducers = {
  errors: [],
  sessions: {
    perPage: 12,
    hasMore: true,
    items: {},
    status: REQUEST_STATUS.NONE,
  },
  workouts: {
    perPage: 12,
    hasMore: true,
    items: {},
    status: REQUEST_STATUS.NONE,
  },
  exercises: {
    perPage: 12,
    hasMore: true,
    items: {},
    status: REQUEST_STATUS.NONE,
  },
}
