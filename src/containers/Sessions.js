import React, {useEffect} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {fetchSessions} from '../state/session/session-action-creators'
import {getSessions, isLoadingSessions} from '../state/session/session-selectors'
import {Loading} from '../components/Loading'
import {SessionList} from '../components/Session/List/List'

export const Sessions = ({sessions, isLoading, fetchSessions}) => {
  useEffect(() => { fetchSessions() }, [])

  return (
    isLoading
      ? <Loading/>
      : sessions && <SessionList sessions={sessions}/>
  )
}

const mapStateToProps = state => ({
  sessions: getSessions(state),
  isLoading: isLoadingSessions(state)
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({fetchSessions}, dispatch)
)

export const SessionsFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(Sessions)
