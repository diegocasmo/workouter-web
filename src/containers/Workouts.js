import React, {useEffect} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {fetchWorkouts, fetchClear} from '../state/workout/workout-action-creators'
import {getWorkouts, canLoadMore} from '../state/workout/workout-selectors'
import {Loading} from '../components/Loading'
import {WorkoutList} from '../components/Workout/List/List'
import InfiniteScroll from 'react-infinite-scroller'

export const Workouts = ({
  canLoadMore,
  workouts,
  fetchWorkouts,
  fetchClear
}) => {

  // Clear fetched workouts on component unmount
  useEffect(() => {
    return () => { fetchClear() }
  }, [])

  return (
    <InfiniteScroll
      pageStart={-1}
      loadMore={fetchWorkouts}
      hasMore={canLoadMore}
      loader={<Loading key={0}/>}> {/* Must include a key in the loader component to avoid
                                    <InfiniteScroll/> warning about unique key prop */}
      <WorkoutList workouts={workouts}/>
    </InfiniteScroll>
  )
}

const mapStateToProps = state => ({
  canLoadMore: canLoadMore(state),
  workouts: getWorkouts(state)
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({fetchWorkouts, fetchClear}, dispatch)
)

export const WorkoutsFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(Workouts)
