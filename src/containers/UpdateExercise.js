import React, {useEffect} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateExercise} from '../api/exercise'
import {getExercise} from '../state/exercise/exercise-action-creators'
import {getExercise as getExerciseSelector, isLoading} from '../state/exercise/exercise-selectors'
import {Loading} from '../components/Loading'
import {ExerciseForm} from '../components/ExerciseForm'

export function UpdateExercise ({
  history,
  exerciseId,
  exercise,
  isLoading,
  updateExercise,
  getExercise
}) {
  useEffect(() => { getExercise(exerciseId) }, [])

  return (
    <>
      <h1>Update Exercise</h1>
      {isLoading
        ? <Loading/>
        : exercise && <ExerciseForm
            submitText='Update'
            history={history}
            redirectTo='/exercises'
            handleSubmit={(attrs) => updateExercise({...exercise, ...attrs})}
            exercise={exercise}/>}
    </>
  )
}

const mapStateToProps = (state, {match, history}) => {
  const exerciseId = Number(match.params.exerciseId)
  return {
    history,
    exerciseId,
    exercise: getExerciseSelector(state, exerciseId),
    isLoading: isLoading(state),
    updateExercise: updateExercise
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({getExercise}, dispatch)
)

export const UpdateExerciseFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(UpdateExercise)
