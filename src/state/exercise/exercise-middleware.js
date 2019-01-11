// TODO: Test
import {EXERCISE} from './exercise-actions'
import {createMiddleware} from '../utils/create-middleware'

export const exerciseMiddleware = createMiddleware([
  {
    action: EXERCISE.CREATE_SUCCESS,
    afterHandler: (storeAPI, action) => {
      window.location.href = '/exercises'
    }
  }
])
