import React from 'react'
import {Link} from 'react-router-dom'
import {Duration} from '../../Time/Duration'
import './Item.css'
const moment = require('moment')

export const SessionItem = ({session}) => (
  <Link
    className='wkr-session-item list-group-item d-flex justify-content-between align-items-center'
    to={`/sessions/${session.id}`}>
    <span>
      <span className='wkr-session-item__name'>
        {session.name}
      </span>&nbsp;
      <span>
        (<Duration
          className='d-inline'
          start={session.startedAt}
          stop={session.finishedAt}/>)
      </span>
    </span>
    <span className='wkr-session-item__time-ago badge badge-pill'>{moment(session.finishedAt).fromNow()}</span>
  </Link>
)
