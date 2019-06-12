import React, {useEffect} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {fetchSessions, fetchClear} from '../state/session/session-action-creators'
import {getSessions, canLoadMore} from '../state/session/session-selectors'
import {Loading} from '../components/Loading'
import {SessionListHeader} from '../components/Session/List/Header'
import {SessionList} from '../components/Session/List/List'
import InfiniteScroll from 'react-infinite-scroller'

export const Sessions = ({
  canLoadMore,
  sessions,
  fetchSessions,
  fetchClear
}) => {

  // Clear fetched sessions on component unmount
  useEffect(() => {
    return () => { fetchClear() }
  }, [fetchClear])

  return (
    <div>
      <SessionListHeader/>
      <InfiniteScroll
        pageStart={-1}
        loadMore={fetchSessions}
        hasMore={canLoadMore}
        loader={<Loading key={0}/>}> {/* Must include a key in the loader component to avoid
                                      <InfiniteScroll/> warning about unique key prop */}
        <SessionList sessions={sessions}/>
      </InfiniteScroll>
    </div>
  )
}

const mapStateToProps = state => ({
  canLoadMore: canLoadMore(state),
  sessions: getSessions(state)
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({fetchSessions, fetchClear}, dispatch)
)

export const SessionsFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(Sessions)
