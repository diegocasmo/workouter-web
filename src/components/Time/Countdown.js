import React, { useState } from 'react'
import { useInterval } from '../../hooks/effects/interval'
import { useCountdownSpeakEffect } from '../../hooks/effects/countdown-speak'
import { Duration } from './Duration'
const moment = require('moment')

export function Countdown({
  finishAt,
  onCountdownCompleted,
  extraThreshold = 0.5,
}) {
  // Add a few additional seconds to avoid skipping the countdown start
  finishAt = moment(finishAt).add(extraThreshold, 'seconds')
  const [now, setNow] = useState(moment())

  useInterval(_ => {
    const nextNow = moment()
    if (nextNow.isAfter(finishAt)) {
      onCountdownCompleted()
    } else {
      setNow(nextNow)
    }
  }, 1000)

  // Use countdown effect to "speak" seconds left in countdown
  useCountdownSpeakEffect(finishAt, now)

  return <Duration start={now} stop={finishAt} />
}
