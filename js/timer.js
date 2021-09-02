class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.daysSpan = document.querySelector(`${selector} [data-value="days"]`);
    this.hoursSpan = document.querySelector(`${selector} [data-value="hours"]`);
    this.minsSpan = document.querySelector(`${selector} [data-value="mins"]`);
    this.secsSpan = document.querySelector(`${selector} [data-value="secs"]`);
  }
  getUnits(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    return { days, hours, mins, secs };
  }
  updateTimer(time) {
    const { days, hours, mins, secs } = this.getUnits(time);
    this.daysSpan.textContent = this.onPad(days);
    this.hoursSpan.textContent = this.onPad(hours);
    this.minsSpan.textContent = this.onPad(mins);
    this.secsSpan.textContent = this.onPad(secs);
  }
  onPad(value) {
    return String(value).padStart(2, 0);
  }
  start() {
    let displayTime = this.targetDate - Date.now();
    if (displayTime <= 0) {
      return;
    }
    this.updateTimer(displayTime);
    let stopInterval = setTimeout(() => {
      console.log(this);
      this.start();
    }, 1000);
    if (displayTime < 0) {
      clearTimeout(stopInterval);
    }
  }
}
const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Sep 8, 2022'),
});
timer.start();
