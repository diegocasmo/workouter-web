import React from 'react'
import {SessionItem} from './Item'

export const SessionList = ({sessions}) => (
  sessions.length > 0
    ? <div className='list-group list-group-flush'>
        {sessions.map((x,i) => <SessionItem key={i} session={x}/>)}
      </div>
    : <p className='text-center m-0 pt-3'>There are no sessions to show</p>
)
