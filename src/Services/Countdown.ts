import { Moment } from 'moment'
import RemainingCalculator from '../Objects/RemainingCalculator'

class Countdown {
    private timerRemaining: RemainingCalculator;
    private interval?: number|null;
    private incrementorInterval: Function;
    private finishedInterval: Function;

    constructor (countdownEnd: Moment) {
      this.timerRemaining = new RemainingCalculator(countdownEnd)
    }

    start (incrementorInterval: Function, finishedInterval: Function) {
      this.incrementorInterval = incrementorInterval
      this.finishedInterval = finishedInterval
      this.interval = window.setInterval(this.increment(), 1000)
    }

    increment () {
      return () => {
        this.incrementorInterval(this.timerRemaining)

        if (this.timerRemaining.getSecondsRemaining() <= 0) {
          window.clearInterval(this.interval)
          this.finishedInterval()
        }
      }
    }
}

export default Countdown
