import { Moment } from 'moment'

class RemainingCalculator {
    private time: Moment;
    private remaining: number;

    constructor (time: Moment) {
      this.time = time
    }

    calcRemaining (): void {
      this.remaining = this.time.diff(new Date(), 'seconds')
    }

    getSecondsRemaining (): number {
      return this.remaining
    }
}

export default RemainingCalculator
