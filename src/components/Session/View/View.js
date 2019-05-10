import React from 'react'
import {WorkoutSetup} from '../../Workout/View/Setup'
import {WorkoutExerciseList} from '../../Workout/View/ExerciseList'
import {SessionStatistics} from './Statistics'

export const SessionView = ({session}) => (
  <>
    <SessionStatistics session={session}/>
    <WorkoutSetup {...session}/>
    <WorkoutExerciseList {...session}/>
  </>
)
