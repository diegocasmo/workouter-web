import React from 'react'
import {Duration} from '../../Clock/Duration'
const moment = require('moment')

export const SessionItem = ({session}) => (
  <li className='wkr-session-item'>
    <span className='wkr-session-item__name'>{session.name}</span>&nbsp;-
    (<div style={{display: 'inline-block'}}>
      <Duration start={session.startedAt} stop={session.finishedAt}/>
    </div>)&nbsp;-&nbsp;
    <span className='wkr-session-item__time-ago'>{moment(session.finishedAt).fromNow()}</span>
  </li>
)
