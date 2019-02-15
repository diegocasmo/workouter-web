import React, {useState} from 'react'
import {useInterval} from '../../hooks/effects/interval'
import {Duration} from './Duration'
const moment = require('moment')

export function Countdown ({finishAt, onCountdownCompleted, extraThreshold = 0.5}) {
  // Add a few additional seconds to avoid skipping the countdown start
  finishAt = moment(finishAt).add(extraThreshold, 'seconds')
  const [now, setNow] = useState(moment())

  useInterval(_ => {
    const nextNow = moment()
    if(nextNow.isAfter(finishAt)) {
      onCountdownCompleted()
    } else {
      setNow(nextNow)
    }
  }, 1000)

  return <Duration start={now} stop={finishAt}/>
}
