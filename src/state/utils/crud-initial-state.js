/**
 * Reducer state format:
 * items: { Map of resources to be accessed as a list, id, or cuid
 *   1: {
 *     id: 1,
 *     _meta: { Additional info added by the client to handle resource updates
 *       isBusy: false,
 *       errors: {} Rails-like map of errors with attributes as key
 *     }
 *   }
 * },
 * isBusy: false, True if a resource(s) is being fetch
 * errorMsg: null Error message text if an error occurred while fetching
 * }
 */
export const initialState = {
  items: {},
  isBusy: false,
  errorMsg: null
}
