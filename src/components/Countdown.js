import React, {useState} from 'react'
import {useInterval} from '../hooks/effects/interval'
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

  const elapsedMs = moment.duration(finishAt - now, 'milliseconds')
  const hours = moment.duration(elapsedMs).hours()
  const minutes = moment.duration(elapsedMs).minutes()
  const seconds = moment.duration(elapsedMs).seconds()
  const zeroPad = (x) => x > 9 ? x : `0${x}`
  return (
    <div className='wkr-countdown'>
      <span className='wkr-countdown__hours'>{zeroPad(hours)}</span>:
      <span className='wkr-countdown__minutes'>{zeroPad(minutes)}</span>:
      <span className='wkr-countdown__seconds'>{zeroPad(seconds)}</span>
    </div>
  )
}
