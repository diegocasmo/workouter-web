import React from 'react'
import {SessionItem} from './SessionItem'

export const SessionList = ({sessions}) => (
  sessions.length > 0
    ? <ul>{sessions.map((x,i) => <SessionItem key={i} session={x}/>)}</ul>
    : <p>There are no sessions to show</p>
)
