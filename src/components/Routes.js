import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {WorkoutsFromStore} from '../containers/Workouts'
import {Workout} from '../containers/Workout'
import {NewWorkoutFromStore} from '../containers/NewWorkout'
import {ExercisesFromStore} from '../containers/Exercises'
import {NewExerciseFromStore} from '../containers/NewExercise'
import {UpdateExerciseFromStore} from '../containers/UpdateExercise'

export const Routes = () => (
  <Switch>
    <Route exact path="/(|workouts)" component={WorkoutsFromStore}/>
    <Route exact path="/workouts/new" component={NewWorkoutFromStore}/>
    <Route exact path="/workouts/:id" component={Workout}/>
    <Route exact path="/exercises" component={ExercisesFromStore}/>
    <Route exact path="/exercises/new" component={NewExerciseFromStore}/>
    <Route exact path="/exercises/update/:exerciseId" component={UpdateExerciseFromStore}/>
  </Switch>
)
