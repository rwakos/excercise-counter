class Countdown {
  constructor(
    timeExcercise = 0,
    timeRest = 0,
    loops = 0,
    inExcercise = false,
    playing = true
  ) {
    this.inExcercise = inExcercise;
    this.timeRest = timeRest;
    this.timeExcercise = timeExcercise;
    this.playing = playing;
    this.loops = loops;
    this.audio = new Audio("/media/counter.mp3");
    this.audio.volume = 0.05;
    this.phases = loops * 2; //Since we have rest and excercise per loop
    this.counterAudioTime = 1;
    this.mainAudio = new Audio("/media/the-song.mp3");
    this.mainAudio.loop = true;
    this.mainAudio.volume = 0.05;
  }

  getNextInterval() {
    let nextInterval = this.inExcercise ? this.timeRest : this.timeExcercise;
    nextInterval = (nextInterval - this.counterAudioTime) * 1000;
    this.inExcercise = !this.inExcercise;
    return nextInterval;
  }

  startExcercise() {
    this.mainAudio.play();
    this.startCountdown();
  }

  startCountdown() {
    if (this.phases == 0 || !this.playing) {
      this.stopPlaying();
      return;
    }
    this.audio.play();
    this.phases--;
    setTimeout(() => this.finishedPlayingCountdown(), this.getNextInterval());
  }

  finishedPlayingCountdown() {
    if (this.audio.ended) {
      this.startCountdown();
      return;
    }
    setTimeout(() => this.finishedPlayingCountdown(), 1000);
  }

  stopPlaying() {
    this.playing = false;
    this.audio.pause();
    this.mainAudio.pause();
  }
}

export default Countdown;
