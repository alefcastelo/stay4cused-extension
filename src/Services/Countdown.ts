import moment, { Moment } from 'moment'
import Storage from './Storage'

class Countdown {
    static readonly MINUTE: number = 60
    static readonly COUNTDOWN_MIN_TIMER: number = 5
    static readonly COUNTDOWN_MAX_TIMER: number = 120
    static readonly COUNTDOWN_DEFAULT_TIMER: number = 25
    static readonly COUNTDOWN_TIME_INCREMENTO_DECREMENTO: number = 5

    private minutes: number
    private countdownTo: Moment|null;
    private interval?: number|null;
    private incrementorInterval: Function;
    private finishedInterval: Function;

    constructor (minutes?: number) {
      this.minutes = minutes ?? Countdown.COUNTDOWN_DEFAULT_TIMER
      this.countdownTo = Storage.get('countdown', null, (value) => moment(value))
    }

    run (incrementorInterval: Function, finishedInterval: Function) {
      this.countdownTo = this.countdownTo ?? this.createCountdownTo()
      Storage.set('countdown', this.countdownTo.toISOString())
      this.incrementorInterval = incrementorInterval
      this.finishedInterval = finishedInterval
      this.interval = window.setInterval(this.increment(), 1000)
    }

    private createCountdownTo(): Moment {
      return moment().add(this.minutes, 'm')
    }

    getSecondsRemaining (): number {
      return this.countdownTo.diff(new Date(), 'seconds')
    }

    increment () {
      return () => {
        this.incrementorInterval(this.getSecondsRemaining())

        if (this.canFinish()) {
          this.finish()
        }
      }
    }

    isRunning (): boolean {
      if (this.countdownTo === null) {
        return false
      }

      return this.getSecondsRemaining() > 1
    }

    finish (): void {
      Storage.remove('countdown')
      window.clearInterval(this.interval)
      this.finishedInterval()
    }

    canFinish (): boolean {
      return this.getSecondsRemaining() <= 1
    }
}

export default Countdown
