// TODO: Test?
// Helper method for creating a middleware that handles the given set of actions
export function createMiddleware(handlers) {
  return storeAPI => next => action => {
    const actionHandler = handlers.find((h) => h.action === action.type)
    // Execute custom middleware handler before the action is dispatched
    if (actionHandler && actionHandler.beforeHandler) {
      actionHandler.beforeHandler(storeAPI, action)
    }

    // Dispatch the action
    const result = next(action)

    // Execute custom middleware handler after the action is dispatched
    if (actionHandler && actionHandler.afterHandler) {
      actionHandler.afterHandler(storeAPI, action)
    }
    return result
  }
}
