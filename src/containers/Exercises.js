import React, {useEffect} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {fetchExercises, deleteExercise} from '../state/exercise/exercise-action-creators'
import {getExercises, isLoading} from '../state/exercise/exercise-selectors'
import {Loading} from '../components/Loading'
import {ExerciseList} from '../components/ExerciseList/ExerciseList'

export const Exercises = ({exercises, isLoading, fetchExercises, deleteExercise}) => {
  useEffect(() => { fetchExercises() }, [])

  return (
    <>
      <h1>Exercises</h1>
      {isLoading
        ? <Loading/>
        : exercises && <ExerciseList
            handleDeleteExercise={deleteExercise}
            exercises={exercises}/>}
    </>
  )
}

const mapStateToProps = state => ({
  exercises: getExercises(state),
  isLoading: isLoading(state)
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({fetchExercises, deleteExercise}, dispatch)
)

export const ExercisesFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(Exercises)
