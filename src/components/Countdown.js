import React, {Component} from 'react'
const moment = require('moment')

export class Countdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      now: moment().valueOf()
    }
  }

  componentDidMount() {
    this.configureCountdown()
  }

  componentWillUnmount() {
    if(this.countdownId) {
      clearInterval(this.countdownId)
    }
  }

  componentDidUpdate() {
    if(moment(this.state.now).isAfter(moment(this.props.finishAt))) {
      if(this.countdownId) {
        clearInterval(this.countdownId)
      }
      this.props.onCountdownComplete()
    }
  }

  configureCountdown() {
    const millisecondsInASecond = 1000
    this.countdownId = setInterval(() => {
      this.setState({
        now: moment().valueOf()
      })
    }, millisecondsInASecond)
  }

  render() {
    const elapsedMs = moment.duration(this.props.finishAt - this.state.now, 'milliseconds')
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
}
