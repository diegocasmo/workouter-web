import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { HomeFromStore } from './containers/Home';
import { Workout } from './containers/Workout';
import { Train } from './containers/Train';

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomeFromStore}/>
        <Route path="/workout/:id" component={Workout}/>
        <Route path="/train/:workoutId" component={Train}/>
      </Switch>
    </BrowserRouter>
  )
};

