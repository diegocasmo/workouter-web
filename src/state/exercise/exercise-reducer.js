import {EXERCISE} from './exercise-actions'

/**
 * CRUD reducer state format:
 * getItems: {
 *   list: [], // An array of resources
 *   errorMsg: null, // Error message text set if there was an error while fetching
 *   isLoading: false // True if resources are being fetch
 * },
 * getItem: {
 *   attrs: null, // A resource
 *   errorMsg: null, // Error message text set if there was an error while getting the resource
 *   isLoading: false // True if the resource is being fetch
 * },
 * postItem: {
 *   attrs: null, // The attributes of the new resource being created
 *   errors: {}, // An object of errors if there was an error while creating the resource
 *   isLoading: false // True if resource is being POST
 * },
 * putItem: {
 *   attrs: null, // The attributes of the resource which will be updated
 *   errors: {}, // An object of errors if there was an error while updating the resource
 *   isLoading: false // True if resource is being PUT
 * },
 * deleteItem: {
 *   id: null, // The id of the resource to be deleted
 *   errors: {}, // An object of errors if there was an error while deleting the resource
 *   isLoading: false // True if resource is being DELETE
 * }
*/
export const initialState = {
  getItems  : {list:    [], errorMsg: null, isLoading: false},
  getItem   : {attrs: null, errorMsg: null, isLoading: false},
  postItem  : {attrs: null, errors  :   {}, isLoading: false},
  putItem   : {attrs: null, errors  :   {}, isLoading: false},
  deleteItem: {id:    null, errors  :   {}, isLoading: false}
}

export function exerciseReducer(state = initialState, action) {
  switch (action.type) {
    // Fetch actions
    case EXERCISE.FETCH_INIT: {
      return {
        ...state,
        getItems: {
          ...state.getItems,
          isLoading: true
        }
      }
    }
    case EXERCISE.FETCH_SUCCESS: {
      return {
        ...state,
        getItems: {
          list: state.getItems.list.concat(action.items),
          errorMsg: null,
          isLoading: false
        }
      }
    }
    case EXERCISE.FETCH_FAILURE: {
      return {
        ...state,
        getItems: {
          ...state.getItems,
          errorMsg: action.errorMsg,
          isLoading: false
        }
      }
    }
    case EXERCISE.FETCH_RESET: {
      return {
        ...state,
        getItems: initialState.getItems
      }
    }

    // Get actions
    case EXERCISE.GET_INIT: {
      return {
        ...state,
        getItem: {
          ...initialState.getItem,
          isLoading: true
        }
      }
    }
    case EXERCISE.GET_SUCCESS: {
      return {
        ...state,
        getItem: {
          attrs: action.item,
          isLoading: false,
          errorMsg: null
        }
      }
    }
    case EXERCISE.GET_FAILURE: {
      return {
        ...state,
        getItem: {
          ...state.getItem,
          errorMsg: action.errorMsg,
          isLoading: false
        }
      }
    }
    case EXERCISE.GET_RESET: {
      return {
        ...state,
        getItem: initialState.getItem
      }
    }

    // Create actions
    case EXERCISE.CREATE_INIT: {
      return {
        ...state,
        postItem: {
          attrs: action.item,
          errors: {},
          isLoading: true
        }
      }
    }
    case EXERCISE.CREATE_SUCCESS: {
      return {
        ...state,
        postItem: {
          ...state.postItem,
          errors: {},
          isLoading: false
        }
      }
    }
    case EXERCISE.CREATE_FAILURE: {
      return {
        ...state,
        postItem: {
          ...state.postItem,
          errors: action.errors,
          isLoading: false
        }
      }
    }
    case EXERCISE.CREATE_RESET: {
      return {
        ...state,
        postItem: initialState.postItem
      }
    }

    // Update actions
    case EXERCISE.UPDATE_INIT: {
      return {
        ...state,
        putItem: {
          attrs: action.item,
          errors: {},
          isLoading: true
        }
      }
    }
    case EXERCISE.UPDATE_SUCCESS: {
      return {
        ...state,
        putItem: {
          attrs: action.item,
          errors: {},
          isLoading: false
        }
      }
    }
    case EXERCISE.UPDATE_FAILURE: {
      return {
        ...state,
        putItem: {
          ...state.putItem,
          errors: action.errors,
          isLoading: false
        }
      }
    }
    case EXERCISE.UPDATE_RESET: {
      return {
        ...state,
        putItem: initialState.putItem
      }
    }

    // Delete actions
    case EXERCISE.DELETE_INIT: {
      return {
        ...state,
        deleteItem: {
          ...state.deleteItem,
          id: action.id,
          isLoading: true
        }
      }
    }
    case EXERCISE.DELETE_SUCCESS: {
      return {
        ...state,
        deleteItem: {
          id: action.id,
          errors: {},
          isLoading: false
        }
      }
    }
    case EXERCISE.DELETE_FAILURE: {
      return {
        ...state,
        deleteItem: {
          ...state.deleteItem,
          errors: action.errors,
          isLoading: false
        }
      }
    }
    case EXERCISE.DELETE_RESET: {
      return {
        ...state,
        deleteItem: initialState.deleteItem
      }
    }

    default:
      return state
  }
}
