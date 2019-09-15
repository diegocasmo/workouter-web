import React from 'react'
import { WorkoutSetup } from './Setup'
import { WorkoutExerciseList } from './ExerciseList'
import { WorkoutActions } from './Actions'

export const WorkoutView = ({ workout, deleteWorkout }) => (
  <>
    <WorkoutSetup {...workout} />
    <WorkoutExerciseList {...workout} />
    <WorkoutActions workout={workout} handleDeleteWorkout={deleteWorkout} />
  </>
)
