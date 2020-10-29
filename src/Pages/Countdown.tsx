import React, { useEffect, useState } from 'react'
import { CountdownContainer, CountdownSVG, CountdownChooseTime } from '../Assets/Styled'
import moment, { Moment } from 'moment'
import {
  IconButton,
  makeStyles
} from '@material-ui/core'
import {
  ChevronRight as ChevronRightIcon,
  PlayArrow as PlayArrowIcon,
  ChevronLeft as ChevronLeftIcon
} from '@material-ui/icons'
import CountdownService from '../Services/Countdown'
import RemainingCalculator from '../Objects/RemainingCalculator'
import RemainingFormat from '../Utils/RemainingFormat'
import Store from '../services/storage'

const useStyles = makeStyles((theme) => ({
  startBTN: {
    position: 'absolute'
  }
}))

const Countdown: React.FC = () => {
  const MINUTE: number = 60
  const COUNTDOWN_MIN_TIMER: number = 5
  const COUNTDOWN_MAX_TIMER: number = 120
  const COUNTDOWN_DEFAULT_TIMER: number = 25
  const COUNTDOWN_TIME_INCREMENTO_DECREMENTO: number = 5

  const [defaultTimeChoose, setDefaultTimeChoose] = useState<number>(Store.get('countdownTimeChoosed', COUNTDOWN_DEFAULT_TIMER, (value) => parseInt(value)))
  const [countdownRunning, setCountdownRunning] = useState<boolean>(false)
  const [secondsRemaining, setSecondsRemaining] = useState<null|number>(null)
  const [countdownTo, setCountdownTo] = useState<null|Moment>(Store.get('countdownTo', null, (value) => moment(value)))
  const classes = useStyles()

  useEffect(() => {
    if (countdownRunning === false || countdownTo === null) {
      return
    }

    const countdown = new CountdownService(countdownTo)
    countdown.start((timerRemaining: RemainingCalculator) => {
      timerRemaining.calcRemaining()
      setSecondsRemaining(timerRemaining.getSecondsRemaining())
    }, () => {
      localStorage.removeItem('countdownTo')
      setSecondsRemaining(null)
      setCountdownTo(null)
      setCountdownRunning(false)
    })
  }, [countdownRunning])

  useEffect(() => {
    if (countdownTo === null) {
      return
    }

    handlerStartCountdown()
  }, [])

  const handlerStartCountdown = () => {
    let date = countdownTo

    if (date === null) {
      date = moment().add((defaultTimeChoose * MINUTE), 's')
      localStorage.setItem('countdownTo', date.toISOString())
      localStorage.setItem('countdownTimeChoosed', defaultTimeChoose.toString())
    }

    const timeRemaining = new RemainingCalculator(date)
    timeRemaining.calcRemaining()
    if (timeRemaining.getSecondsRemaining() <= 0) {
      localStorage.removeItem('countdownTo')
      return
    }
    setCountdownTo(date)
    setSecondsRemaining(timeRemaining.getSecondsRemaining())
    setCountdownRunning(true)
  }

  const handlerIncrementTimer = () => setDefaultTimeChoose(defaultTimeChoose >= COUNTDOWN_MAX_TIMER ? COUNTDOWN_MAX_TIMER : defaultTimeChoose + COUNTDOWN_TIME_INCREMENTO_DECREMENTO)
  const handlerDecrementTimer = () => setDefaultTimeChoose(defaultTimeChoose <= COUNTDOWN_MIN_TIMER ? COUNTDOWN_MIN_TIMER : defaultTimeChoose - COUNTDOWN_TIME_INCREMENTO_DECREMENTO)

  const calcContdownStroke = (total, remaining) => {
    const circleTotal = 565
    const remainingPercent = (remaining * 100) / total
    return circleTotal - ((circleTotal * remainingPercent) / 100)
  }

  return (
    <>
      <CountdownContainer>
        {secondsRemaining && (<h1 id="countdown-number">{RemainingFormat.getTime(secondsRemaining)}</h1>)}
        <CountdownSVG height="200" width="200">
          <circle className="circle-bg" cx="100" cy="100" r="90" strokeWidth="5" />
          <circle cx="100" cy="100" r="90" stroke="black" strokeWidth="5" style={{ strokeDashoffset: calcContdownStroke((defaultTimeChoose * MINUTE), secondsRemaining ?? (defaultTimeChoose * MINUTE)) }} />
        </CountdownSVG>
        {!secondsRemaining && (
          <IconButton color="primary" component="span" className={classes.startBTN} onClick={handlerStartCountdown}>
            <PlayArrowIcon style={{ fontSize: 64 }} color="primary" />
          </IconButton>
        )}
      </CountdownContainer>
      {!countdownRunning && (
        <CountdownChooseTime>
          <IconButton color="primary" component="span" onClick={handlerDecrementTimer}><ChevronLeftIcon color="primary" /></IconButton>
          <span className="text" >{RemainingFormat.getTime(defaultTimeChoose * MINUTE)}</span>
          <IconButton color="primary" component="span" onClick={handlerIncrementTimer}><ChevronRightIcon color="primary" /></IconButton>
        </CountdownChooseTime>
      )}
    </>
  )
}

export default Countdown
