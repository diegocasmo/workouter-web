import {REQUEST_STATUS} from '../utils/request-status'

export const getSessions = ({sessions}) => Object.keys(sessions.items).map((k) => sessions.items[k])
export const isLoadingSessions = ({sessions}) => sessions.status === REQUEST_STATUS.GET
