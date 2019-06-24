import React from 'react'
import PropTypes from 'prop-types'
import {SessionItem} from './Item'

export const SessionList = ({hasMore, sessions}) => (
  hasMore || sessions.length > 0
    ? <div className='list-group list-group-flush'>
        {sessions.map((x,i) => <SessionItem key={i} session={x}/>)}
      </div>
    : <p className='text-center m-0 pt-3'>There are no sessions to show</p>
)

SessionList.propTypes = {
  hasMore: PropTypes.bool.isRequired,
  sessions: PropTypes.array.isRequired
}
