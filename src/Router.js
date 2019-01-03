import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {WorkoutsFromStore} from './containers/Workouts'
import {Workout} from './containers/Workout'
import {Train} from './containers/Train'
import {ExercisesFromStore} from './containers/Exercises'
import {NewExerciseFromStore} from './containers/NewExercise'

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={WorkoutsFromStore}/>
        <Route exact path="/workout/:id" component={Workout}/>
        <Route exact path="/train/:workoutId" component={Train}/>
        <Route exact path="/exercises" component={ExercisesFromStore}/>
        <Route exact path="/exercises/new" component={NewExerciseFromStore}/>
      </Switch>
    </BrowserRouter>
  )
}

