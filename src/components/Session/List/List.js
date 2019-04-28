import React from 'react'
import {SessionItem} from './Item'

export const SessionList = ({sessions}) => (
  sessions.length > 0
    ? <ul className='list-group list-group-flush'>
        {sessions.map((x,i) => <SessionItem key={i} session={x}/>)}
      </ul>
    : <p className='text-center mt-2 mb-0'>There are no sessions to show</p>
)
