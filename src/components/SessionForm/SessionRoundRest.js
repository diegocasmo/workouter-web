import React from 'react'
import {Countdown} from '../Countdown'

export const SessionRoundRest = ({finishAt, onRoundRestCompleted}) => (
  <Countdown
    finishAt={finishAt}
    onCountdownCompleted={onRoundRestCompleted}/>
)
