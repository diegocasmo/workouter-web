import React from 'react'
import {Link} from 'react-router-dom'
import {Duration} from '../../Time/Duration'
const moment = require('moment')

export const SessionItem = ({session}) => (
  <Link
    className='list-group-item'
    to={`/sessions/${session.id}`}>
    <span className='wkr-session-item__name'>{session.name}</span>&nbsp;-
    (<div style={{display: 'inline-block'}}>
      <Duration start={session.startedAt} stop={session.finishedAt}/>
    </div>)&nbsp;-&nbsp;
    <span className='wkr-session-item__time-ago'>{moment(session.finishedAt).fromNow()}</span>
  </Link>
)
