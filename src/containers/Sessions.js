import React, {useEffect} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {fetchSessions, fetchClear} from '../state/session/action-creators'
import {getSessions, canLoadMore} from '../state/session/selectors'
import {Loading} from '../components/Loading'
import {Header} from '../components/UI/Header'
import {SessionList} from '../components/Session/List/List'
import InfiniteScroll from 'react-infinite-scroller'

export const Sessions = ({
  hasMore,
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
      <Header>
        <div className='d-flex h-100'>
          <p className='h2 align-self-center m-0 mr-auto'>Sessions</p>
        </div>
      </Header>
      <InfiniteScroll
        pageStart={-1}
        loadMore={fetchSessions}
        hasMore={canLoadMore}
        loader={<Loading key={0}/>}> {/* Must include a key in the loader component to avoid
                                      <InfiniteScroll/> warning about unique key prop */}
        <SessionList
          hasMore={hasMore}
          sessions={sessions}/>
      </InfiniteScroll>
    </div>
  )
}

const mapStateToProps = state => ({
  hasMore: state.sessions.hasMore,
  canLoadMore: canLoadMore(state),
  sessions: getSessions(state)
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({fetchSessions, fetchClear}, dispatch)
)

export const SessionsFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(Sessions)
