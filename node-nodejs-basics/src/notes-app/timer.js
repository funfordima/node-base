import { EventEmitter } from 'events';

class Timer extends EventEmitter {
  constructor(total, interval) {
    super();
    this.total = total;
    this.interval = interval;
    this.ticks = 0;
  }

  _tick() {
    this.ticks += 1;

    if (this.ticks <= this.total) {
      this.emit('tick', this.ticks);
    } else {
      this.end();
    }
  }

  start() {
    this.intervalId = setInterval(() => this._tick(), this.interval);
  }

  end() {
    clearInterval(this.intervalId);
    this.emit('end');
  }
}

const timer = new Timer(10, 500);

timer.once('start', () => console.log('Timer has been started'));
timer.on('tick', (tick) => console.log(tick));
timer.once('end', () => console.log('End'));

timer.start();
