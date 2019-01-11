/**
 * CRUD reducer state format:
 * items: {
 *   list: [], // An array of resources
 *   errorMsg: null, // Error message text set if there was an error while fetching
 *   isLoading: false // True if resources are being fetch
 * },
 * newItem: {
 *   attrs: null, // The attributes of the new resource being created
 *   errors : {}, // An object of errors if there was an error while creating the resource
 *   isLoading: false // True if resource is being post
 * }
*/
export const getCRUDInitialState = () => ({
  items  : {list:    [], errorMsg: null, isLoading: false},
  newItem: {attrs: null, errors  :   {}, isLoading: false}
})
