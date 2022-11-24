import { LitElement, html, css } from "lit";
import Countdown from "../utils/Countdown";

class MyListener extends LitElement {
  static styles = css`
    :host {
      font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
        Helvetica, Arial, sans-serif;
    }
  `;

  static properties = {
    playing: { type: Boolean },
    loops: { type: Number },
    timeExcercise: { type: Number },
    timeRest: { type: Number },
  };

  constructor() {
    super();
    this.playing = false;
    this.loops = 0;
    this.timeExcercise = 0;
    this.timeRest = 0;
    this.player = {};
    this.countdown = {};
  }

  showStopButton() {
    return html`
      <link rel="stylesheet" href="/css/bulma.min.css" />
      <section class="section">
        <div class="container">
          <div class="field is-grouped">
            <button
              @click=${this._stopAll}
              class="button is-danger is-fullwidth"
            >
              Stop Excercise
            </button>
          </div>
        </div>
      </section>
    `;
  }

  showForm() {
    return html`
      <div @startExcercise=${this._startExcerciseListener}><slot></slot></div>
    `;
  }

  _stopAll() {
    this.playing = false;
    this.countdown.stopPlaying();
  }

  render() {
    return !this.playing ? this.showForm() : this.showStopButton();
  }

  _startExcerciseListener(e) {
    this.loops = e.detail.loops;
    this.timeExcercise = e.detail.timeExcercise;
    this.timeRest = e.detail.timeRest;
    this.playing = e.detail.playing;

    this.countdown = new Countdown(
      this.timeExcercise,
      this.timeRest,
      this.loops,
      true,
      true
    );
    this.countdown.startExcercise();
  }
}

customElements.define("my-listener", MyListener);
