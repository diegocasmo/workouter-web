import React from 'react'
import {Duration} from '../../Clock/Duration'
import {RoundsCompleted} from './RoundsCompleted'
import {WorkoutSetup} from '../../Workout/View/Setup'
import {WorkoutExerciseList} from '../../Workout/View/ExerciseList'

export const SessionView = ({session}) => (
  <>
    <RoundsCompleted rounds={session.rounds} roundsCompleted={session.roundsCompleted}/>
    <Duration start={session.startedAt} stop={session.finishedAt}/>
    <WorkoutSetup {...session}/>
    <WorkoutExerciseList {...session}/>
  </>
)
