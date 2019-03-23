import React, {useEffect} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {fetchExercises, fetchClear, deleteExercise} from '../state/exercise/exercise-action-creators'
import {getExercises, canLoadMore} from '../state/exercise/exercise-selectors'
import {Loading} from '../components/Loading'
import {ExerciseList} from '../components/Exercise/List/List'
import InfiniteScroll from 'react-infinite-scroller'

export const Exercises = ({
  pageNum,
  canLoadMore,
  exercises,
  fetchExercises,
  fetchClear,
  deleteExercise
}) => {
  // Clear fetched exercises on component unmount
  useEffect(() => {
    return () => { fetchClear() }
  }, [])

  return (
    <>
      <h1>Exercises</h1>
      <InfiniteScroll
        loadMore={fetchExercises}
        hasMore={canLoadMore}
        loader={<Loading key={0}/>}> {/* Must include a key in the loader component to avoid
                                      <InfiniteScroll/> warning about unique key prop */}
        <ExerciseList
          exercises={exercises}
          handleDeleteExercise={deleteExercise}/>
      </InfiniteScroll>
    </>
  )
}

const mapStateToProps = state => ({
  pageNum: state.exercises.pageNum,
  canLoadMore: canLoadMore(state),
  exercises: getExercises(state)
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({fetchExercises, fetchClear, deleteExercise}, dispatch)
)

export const ExercisesFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(Exercises)
