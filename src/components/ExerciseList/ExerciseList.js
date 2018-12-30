import React from 'react';
import {ExerciseItem} from './ExerciseItem';

export const ExerciseList = ({exercises}) => (
  <ul className="wkr-exercise-list">
    {exercises.map((e,i) => <ExerciseItem key={i} {...e}/>)}
  </ul>
)
