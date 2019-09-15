import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  fetchExercises,
  fetchClear,
  deleteExercise,
} from '../state/exercise/action-creators'
import { getExercises, canLoadMore } from '../state/exercise/selectors'
import { Loading } from '../components/Loading'
import { Header } from '../components/UI/Header'
import { ExerciseList } from '../components/Exercise/List/List'
import InfiniteScroll from 'react-infinite-scroller'

export const Exercises = ({
  hasMore,
  canLoadMore,
  exercises,
  fetchExercises,
  fetchClear,
  deleteExercise,
}) => {
  // Clear fetched exercises on component unmount
  useEffect(() => {
    return () => {
      fetchClear()
    }
  }, [fetchClear])

  return (
    <div>
      <Header>
        <div className="d-flex h-100">
          <p className="h2 align-self-center m-0 mr-auto">Exercises</p>
          <Link
            to="/exercises/new"
            className="btn btn-primary align-self-center"
          >
            New Exercise
          </Link>
        </div>
      </Header>
      <InfiniteScroll
        pageStart={-1}
        loadMore={fetchExercises}
        hasMore={canLoadMore}
        loader={<Loading key={0} />}
      >
        {' '}
        {/* Must include a key in the loader component to avoid
                                      <InfiniteScroll/> warning about unique key prop */}
        <ExerciseList
          hasMore={hasMore}
          exercises={exercises}
          handleDeleteExercise={deleteExercise}
        />
      </InfiniteScroll>
    </div>
  )
}

const mapStateToProps = state => ({
  hasMore: state.exercises.hasMore,
  canLoadMore: canLoadMore(state),
  exercises: getExercises(state),
})

const mapDispatchToProps = {
  fetchExercises,
  fetchClear,
  deleteExercise,
}

export const ExercisesFromStore = connect(
  mapStateToProps,
  mapDispatchToProps
)(Exercises)
