import {expect} from 'chai'
import {Factory} from 'rosie'
import {exerciseReducer, initialState} from '../exercise-reducer'
import {EXERCISE} from '../exercise-actions'

describe('Exercise Reducer', () => {

  it('should return the initial state', () => {
    expect(exerciseReducer(undefined, {}))
      .to.be.eql({
        getItems  : {list:    [], errorMsg: null, isLoading: false},
        getItem   : {attrs: null, errorMsg: null, isLoading: false},
        postItem  : {attrs: null, errors  :   {}, isLoading: false},
        putItem   : {attrs: null, errors  :   {}, isLoading: false},
        deleteItem: {id:    null, errors  :   {}, isLoading: false}
      })
  })

  describe('FETCH', () => {

    it('FETCH_INIT', () => {
      const items = Factory.buildList('exercise', 2)
      const state = {
        ...initialState,
        getItems: {
          ...initialState.getItems,
          list: items
        }
      }

      const action = {type: EXERCISE.FETCH_INIT}
      expect(exerciseReducer(state, action))
        .to.be.eql({
          ...state,
          getItems: {
            ...state.getItems,
            errorMsg: null,
            isLoading: true
          }
        })
    })

    it('FETCH_SUCCESS', () => {
      const items = Factory.buildList('exercise', 2)
      const action = {type: EXERCISE.FETCH_SUCCESS, items}
      expect(exerciseReducer(initialState, action))
        .to.be.eql({
          ...initialState,
          getItems: {
            list: initialState.getItems.list.concat(items),
            errorMsg: null,
            isLoading: false
          }
        })
    })

    it('FETCH_FAILURE', () => {
      const errorMsg = 'There was an error while fetching the exercises'
      const action = {type: EXERCISE.FETCH_FAILURE, errorMsg}
      expect(exerciseReducer(initialState, action))
        .to.be.eql({
          ...initialState,
          getItems: {
            ...initialState.getItems,
            errorMsg: errorMsg,
            isLoading: false
          }
        })
    })

    it('FETCH_RESET', () => {
      // Assume there are exercises in state
      const state = {
        ...initialState,
        getItems: {
          ...initialState.getItems,
          list: Factory.buildList('exercise', 2)
        }
      }

      // Reset such exercises
      const action = {type: EXERCISE.FETCH_RESET}
      expect(exerciseReducer(state, action))
        .to.be.eql({
          ...initialState,
          getItems: initialState.getItems
        })
    })
  })

  describe('GET', () => {

    it('GET_INIT', () => {
      const action = {type: EXERCISE.GET_INIT}
      expect(exerciseReducer(initialState, action))
        .to.be.eql({
          ...initialState,
          getItem: {
            ...initialState.getItem,
            isLoading: true
          }
        })
    })

    it('GET_SUCCESS', () => {
      // Assume reducer is in the process of getting an exercise
      const state = {
        ...initialState,
        getItem: {
          ...initialState.getItem,
          isLoading: true
        }
      }

      const attrs = Factory.build('exercise')
      const action = {type: EXERCISE.GET_SUCCESS, item: attrs}
      expect(exerciseReducer(state, action))
        .to.be.eql({
          ...initialState,
          getItem: {
            attrs,
            errorMsg: null,
            isLoading: false
          }
        })
    })

    it('GET_FAILURE', () => {
      const errorMsg = 'There was an error while fetching the exercise'
      const action = {type: EXERCISE.GET_FAILURE, errorMsg}
      expect(exerciseReducer(initialState, action))
        .to.be.eql({
          ...initialState,
          getItem: {
            ...initialState.getItem,
            errorMsg: errorMsg,
            isLoading: false
          }
        })
    })

    it('GET_RESET', () => {
      // Assume there's an exercise in state
      const state = {
        ...initialState,
        getItem: {
          ...initialState.getItem,
          attrs: Factory.build('exercise')
        }
      }

      // Reset such exercise
      const action = {type: EXERCISE.GET_RESET}
      expect(exerciseReducer(state, action))
        .to.be.eql({
          ...initialState,
          getItem: initialState.getItem
        })
    })
  })

  describe('CREATE', () => {

    it('CREATE_INIT', () => {
      const attrs = Factory.build('exercise', {}, {except: ['id']})
      const action = {type: EXERCISE.CREATE_INIT, item: attrs}
      expect(exerciseReducer(initialState, action))
        .to.be.eql({
          ...initialState,
          postItem: {
            attrs,
            errors: {},
            isLoading: true
          }
        })
    })

    it('CREATE_SUCCESS', () => {
      // Set up initial state as if an exercise is being created
      const attrs = Factory.build('exercise', {}, {except: ['id']})
      const state = {
        ...initialState,
        postItem: {
          attrs,
          errors: {},
          isLoading: true
        }
      }

      const action = {type: EXERCISE.CREATE_SUCCESS, item: attrs}
      expect(exerciseReducer(state, action))
        .to.be.eql({
          ...initialState,
          postItem: {
            attrs,
            errors: {},
            isLoading: false
          }
        })
    })

    it('CREATE_FAILURE', () => {
      // Set up initial state as if an exercise is being created
      const attrs = Factory.build('exercise', {}, {except: ['id']})
      const state = {
        ...initialState,
        postItem: {
          attrs,
          errors: {},
          isLoading: true
        }
      }

      const errors = {'name': 'Name is required'}
      const action = {type: EXERCISE.CREATE_FAILURE, errors}
      expect(exerciseReducer(state, action))
        .to.be.eql({
          ...initialState,
          postItem: {
            attrs,
            errors,
            isLoading: false
          }
        })
    })

    it('CREATE_RESET', () => {
      // Assume an exercise is going to be created
      const state = {
        ...initialState,
        postItem: {
          ...initialState.postItem,
          attrs: Factory.build('exercise', {}, {except: ['id']})
        }
      }

      // Reset such exercise
      const action = {type: EXERCISE.CREATE_RESET}
      expect(exerciseReducer(state, action))
        .to.be.eql({
          ...initialState,
          postItem: initialState.postItem
        })
    })
  })

  describe('UPDATE', () => {

    it('UPDATE_INIT', () => {
      const attrs = Factory.build('exercise')
      const action = {type: EXERCISE.UPDATE_INIT, item: attrs}
      expect(exerciseReducer(initialState, action))
        .to.be.eql({
          ...initialState,
          putItem: {
            attrs,
            errors: {},
            isLoading: true
          }
        })
    })

    it('UPDATE_SUCCESS', () => {
      // Set up initial state as if an exercise is in the processing of being update
      const prevExercise = Factory.build('exercise')
      const nextExercise = {...prevExercise, 'name': 'Foo','measurement': {'name': 'Bar'}}
      const state = {
        ...initialState,
        putItem: {
          attrs: prevExercise,
          errors: {},
          isLoading: true
        }
      }

      const action = {type: EXERCISE.UPDATE_SUCCESS, item: nextExercise}
      expect(exerciseReducer(state, action))
        .to.be.eql({
          ...initialState,
          putItem: {
            attrs: nextExercise,
            errors: {},
            isLoading: false
          }
        })
    })

    it('UPDATE_FAILURE', () => {
      // Set up initial state as if an exercise is in the process of being update
      const attrs = Factory.build('exercise')
      const state = {
        ...initialState,
        putItem: {
          attrs,
          errors: {},
          isLoading: true
        }
      }

      const errors = {'name': 'Name is required'}
      const action = {type: EXERCISE.UPDATE_FAILURE, errors}
      expect(exerciseReducer(state, action))
        .to.be.eql({
          ...initialState,
          putItem: {
            attrs,
            errors,
            isLoading: false
          }
        })
    })

    it('UPDATE_RESET', () => {
      // Assume an exercise is going to be created
      const state = {
        ...initialState,
        putItem: {
          ...initialState.putItem,
          attrs: Factory.build('exercise')
        }
      }

      // Reset such exercise
      const action = {type: EXERCISE.UPDATE_RESET}
      expect(exerciseReducer(state, action))
        .to.be.eql({
          ...initialState,
          putItem: initialState.putItem
        })
    })
  })

  describe('DELETE', () => {

    it('DELETE_INIT', () => {
      // Set up initial state as if an existing exercise is going to be deleted
      const item = Factory.build('exercise')
      const state = {
        ...initialState,
        getItems: {
          ...initialState.getItems,
          list: [item]
        }
      }

      const action = {type: EXERCISE.DELETE_INIT, id: item.id}
      expect(exerciseReducer(state, action))
        .to.be.eql({
          ...state,
          deleteItem: {
            ...initialState.deleteItem,
            id: item.id,
            isLoading: true
          }
        })
    })

    it('DELETE_SUCCESS', () => {
      // Set up initial state as if an existing exercise is in the process of being deleted
      const item = Factory.build('exercise')
      const state = {
        ...initialState,
        deleteItem: {
          ...initialState.deleteItem,
          id: item.id,
          isLoading: true
        }
      }

      const action = {type: EXERCISE.DELETE_SUCCESS, id: item.id}
      expect(exerciseReducer(state, action))
        .to.be.eql({
          ...initialState,
          deleteItem: {
            id: item.id,
            errors: {},
            isLoading: false
          }
        })
    })

    it('DELETE_FAILURE', () => {
      // Set up initial state as if an existing exercise is in the process of being deleted
      const id = -1
      const item = Factory.build('exercise')
      const state = {
        ...initialState,
        deleteItem: {
          ...initialState.deleteItem,
          id,
          isLoading: true
        }
      }
      const errors = {'id': 'The exercise id does not exist'}

      const action = {type: EXERCISE.DELETE_FAILURE, errors}
      expect(exerciseReducer(state, action))
        .to.be.eql({
          ...initialState,
          deleteItem: {
            id,
            errors,
            isLoading: false
          }
        })
    })

    it('DELETE_RESET', () => {
      // Assume an exercise was deleted
      const state = {
        ...initialState,
        deleteItem: {
          ...initialState.deleteItem,
          id: 20
        }
      }

      // Reset such exercise
      const action = {type: EXERCISE.DELETE_RESET}
      expect(exerciseReducer(state, action))
        .to.be.eql({
          ...initialState,
          deleteItem: initialState.deleteItem
        })
    })
  })
})
