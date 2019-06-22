import React, {useEffect} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateExercise} from '../api/exercise'
import {getExercise} from '../state/exercise/exercise-action-creators'
import {getExercise as getExerciseSelector, isLoading} from '../state/exercise/exercise-selectors'
import {Loading} from '../components/Loading'
import {Header} from '../components/UI/Header'
import {ExerciseForm} from '../components/Exercise/Form/Form'

export const UpdateExercise = ({
  history,
  exerciseId,
  exercise,
  isLoading,
  updateExercise,
  getExercise
}) => {
  useEffect(
    () => { getExercise(exerciseId) },
    [getExercise, exerciseId]
  )

  return (
    <>
      <Header>
        <div className='d-flex h-100'>
          <p className='h2 align-self-center m-0 mr-auto'>Update Exercise</p>
        </div>
      </Header>
      <div className='container pt-4'>
        {isLoading
          ? <Loading/>
          : exercise && <ExerciseForm
              submitText='Update'
              history={history}
              redirectTo='/exercises'
              handleSubmit={(attrs) => updateExercise({...exercise, ...attrs})}
              exercise={exercise}/>}
      </div>
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
