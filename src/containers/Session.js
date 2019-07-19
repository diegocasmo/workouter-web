import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getSession} from '../state/session/action-creators'
import {getSession as getSessionSelector, isLoadingSessions} from '../state/session/selectors'
import {Loading} from '../components/Loading'
import {SessionView} from '../components/Session/View/View'

export const Session = ({sessionId, session, isLoading, getSession}) => {
  useEffect(
    () => { getSession(sessionId) },
    [getSession, sessionId]
  )

  return (
    <div className='p-3'>
      {isLoading
        ? <Loading/>
        : session && <SessionView session={session}/>}
    </div>
  )
}

const mapStateToProps = (state, {match}) => {
  const sessionId = Number(match.params.sessionId)
  return {
    sessionId,
    session: getSessionSelector(state, sessionId),
    isLoading: isLoadingSessions(state)
  }
}

const mapDispatchToProps = {getSession}

export const SessionFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(Session)
