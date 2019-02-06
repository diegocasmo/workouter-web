import React, {useState, useEffect} from 'react'
const moment = require('moment')

export function Timer ({startedAt}) {
  const [now, setNow] = useState(moment().valueOf())
  useEffect(() => {
    const id = setInterval(() => setNow(moment().valueOf()), 1000)
    return () => clearInterval(id)
  }, [now])

  const elapsedMs = moment.duration(now - startedAt, 'milliseconds')
  const hours = moment.duration(elapsedMs).hours()
  const minutes = moment.duration(elapsedMs).minutes()
  const seconds = moment.duration(elapsedMs).seconds()
  const zeroPad = (x) => x > 9 ? x : `0${x}`
  return (
    <div className='wkr-timer'>
      <span className='wkr-timer__hours'>{zeroPad(hours)}</span>:
      <span className='wkr-timer__minutes'>{zeroPad(minutes)}</span>:
      <span className='wkr-timer__seconds'>{zeroPad(seconds)}</span>
    </div>
  )
}
