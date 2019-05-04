import React from 'react'
const moment = require('moment')

export function Duration ({start, stop}) {
  const elapsedMs = moment.duration(stop - start, 'milliseconds')
  const hours = moment.duration(elapsedMs).hours()
  const minutes = moment.duration(elapsedMs).minutes()
  const seconds = moment.duration(elapsedMs).seconds()
  const zeroPad = (x) => x > 9 ? x : `0${x}`
  return (
    <div className='wkr-duration__container'>
      <span className='wkr-duration__hours'>{zeroPad(hours)}</span>:
      <span className='wkr-duration__minutes'>{zeroPad(minutes)}</span>:
      <span className='wkr-duration__seconds'>{zeroPad(seconds)}</span>
    </div>
  )
}
