import React from 'react'
import {Duration} from '../Clock/Duration'

export const SessionStatistics = ({session}) => (
  <Duration start={session.startedAt} stop={session.finishedAt}/>
)
