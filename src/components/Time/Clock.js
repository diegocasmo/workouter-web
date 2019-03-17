import React, {useState} from 'react'
import {useInterval} from '../../hooks/effects/interval'
import {Duration} from './Duration'
const moment = require('moment')

export function Clock ({startedAt}) {
  const [now, setNow] = useState(moment())
  useInterval(_ => setNow(moment()), 1000)
  return <Duration start={startedAt} stop={now}/>
}
