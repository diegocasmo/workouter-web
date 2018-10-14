import React from 'react';

export const Workout = ({ match }) => {
  return (<p>Workout: {match.params.id}</p>)
}
