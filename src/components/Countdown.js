import React, {useState, useEffect} from 'react'
const moment = require('moment')

export function Countdown ({finishAt, onCountdownCompleted}) {
  const [now, setNow] = useState(moment().valueOf())
  useEffect(() => {
    if(moment(now).isAfter(moment(finishAt))) {
      onCountdownCompleted()
    } else {
      const id = setInterval(() => setNow(moment().valueOf()), 1000)
      return () => clearInterval(id)
    }
  }, [now])

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
