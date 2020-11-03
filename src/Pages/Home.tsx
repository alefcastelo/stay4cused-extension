import React, { useEffect, useState } from 'react'
import { CountdownContainer, CountdownSVG, CountdownChooseTime } from '../Assets/Styled'
import {
  IconButton,
  makeStyles
} from '@material-ui/core'
import {
  ChevronRight as ChevronRightIcon,
  PlayArrow as PlayArrowIcon,
  ChevronLeft as ChevronLeftIcon
} from '@material-ui/icons'
import Countdown from '../Services/Countdown'
import RemainingFormat from '../Utils/RemainingFormat'
import Storage from '../Services/Storage'

const useStyles = makeStyles((theme) => ({
  startBTN: {
    position: 'absolute'
  }
}))

const Home: React.FC = () => {
  const [defaultTimeChoose, setDefaultTimeChoose] = useState<number>(() => {
    return Storage.get('countdownTimeChoosed', Countdown.COUNTDOWN_DEFAULT_TIMER, (value) => parseInt(value))
  })

  const [countdownRunning, setCountdownRunning] = useState<boolean>(false)
  const [secondsRemaining, setSecondsRemaining] = useState<null|number>(null)

  const classes = useStyles()

  useEffect(() => {
    handlerRestartCountdown()
  }, [])

  useEffect(() => {
    Storage.set('countdownTimeChoosed', defaultTimeChoose.toString())
  }, [defaultTimeChoose])

  const handlerRemainingCountdown = (remainingSeconds: number) => {
    if (countdownRunning === false) {
      setCountdownRunning(true)
    }

    setSecondsRemaining(remainingSeconds)
  }

  const handlerCountdownStop = () => {
    setSecondsRemaining(null)
    setCountdownRunning(false)
  }

  const handlerRestartCountdown = () => {
    const countdown = new Countdown(defaultTimeChoose)
    if (countdown.isRunning()) {
      countdown.run(handlerRemainingCountdown, handlerCountdownStop)
    }
  }

  const handlerStartCountdown = () => {
    const countdown = new Countdown(defaultTimeChoose)
    countdown.run(handlerRemainingCountdown, handlerCountdownStop)
  }

  const handlerIncrementTimer = () => {
    setDefaultTimeChoose(defaultTimeChoose >= Countdown.COUNTDOWN_MAX_TIMER ? Countdown.COUNTDOWN_MAX_TIMER : defaultTimeChoose + Countdown.COUNTDOWN_TIME_INCREMENTO_DECREMENTO)
  }

  const handlerDecrementTimer = () => {
    setDefaultTimeChoose(defaultTimeChoose <= Countdown.COUNTDOWN_MIN_TIMER ? Countdown.COUNTDOWN_MIN_TIMER : defaultTimeChoose - Countdown.COUNTDOWN_TIME_INCREMENTO_DECREMENTO)
  }

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
          <circle cx="100" cy="100" r="90" stroke="black" strokeWidth="5" style={{ strokeDashoffset: calcContdownStroke((defaultTimeChoose * Countdown.MINUTE), secondsRemaining ?? (defaultTimeChoose * Countdown.MINUTE)) }} />
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
          <span className="text" >{RemainingFormat.getTime(defaultTimeChoose * Countdown.MINUTE)}</span>
          <IconButton color="primary" component="span" onClick={handlerIncrementTimer}><ChevronRightIcon color="primary" /></IconButton>
        </CountdownChooseTime>
      )}
    </>
  )
}

export default Home
