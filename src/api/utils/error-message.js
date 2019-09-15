// Helper methods used to define a validation error message
export const requiredMsg = attr => `${attr} is required`
export const numTypeMsg = attrs => `${attrs} must be a number`
export const positiveNumMsg = attr => `${attr} must be a positive number`
export const atLeastNumMsg = (attr, num) => `${attr} must be at least ${num}`
