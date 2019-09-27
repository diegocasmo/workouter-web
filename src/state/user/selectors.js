import { REQUEST_STATUS } from '../utils/request-status'

export const getUser = ({ user }) => user.user
export const isLoading = ({ user }) => user.status === REQUEST_STATUS.POST
