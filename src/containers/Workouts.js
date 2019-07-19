import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchWorkouts, fetchClear} from '../state/workout/action-creators'
import {getWorkouts, canLoadMore} from '../state/workout/selectors'
import {Loading} from '../components/Loading'
import {Header} from '../components/UI/Header'
import {WorkoutList} from '../components/Workout/List/List'
import InfiniteScroll from 'react-infinite-scroller'

export const Workouts = ({
  hasMore,
  canLoadMore,
  workouts,
  fetchWorkouts,
  fetchClear
}) => {

  // Clear fetched workouts on component unmount
  useEffect(() => {
    return () => { fetchClear() }
  }, [fetchClear])

  return (
    <div>
      <Header>
        <div className='d-flex h-100'>
          <p className='h2 align-self-center m-0 mr-auto'>Workouts</p>
          <Link
            to='/workouts/new'
            className='btn btn-primary align-self-center'>
            New Workout
          </Link>
        </div>
      </Header>
      <InfiniteScroll
        pageStart={-1}
        loadMore={fetchWorkouts}
        hasMore={canLoadMore}
        loader={<Loading key={0}/>}> {/* Must include a key in the loader component to avoid
                                      <InfiniteScroll/> warning about unique key prop */}
        <WorkoutList
          hasMore={hasMore}
          workouts={workouts}/>
      </InfiniteScroll>
    </div>
  )
}

const mapStateToProps = state => ({
  hasMore: state.workouts.hasMore,
  canLoadMore: canLoadMore(state),
  workouts: getWorkouts(state)
})

const mapDispatchToProps = {fetchWorkouts, fetchClear}

export const WorkoutsFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(Workouts)
