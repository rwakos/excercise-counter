import { LitElement, html } from "lit";

class MyDispatcher extends LitElement {
  render() {
    return html`
      <link rel="stylesheet" href="/css/bulma.min.css" />
      <section class="section">
        <div class="container">
          <form @submit=${this._handleSubmit}>
            ${this.buildInput("loops", "Loops:")}
            ${this.buildInput("timeExcercise", "Excercise time:")}
            ${this.buildInput("timeRest", "Rest time:")}

            <div class="field is-grouped">
              <button class="button is-info is-fullwidth">
                Start Excercise
              </button>
            </div>
          </form>
        </div>
      </section>
    `;
  }

  buildInput(id, label) {
    return html`
      <div class="field">
        <label class="label">${label}</label>
        <div class="control">
          <input
            class="input is-medium"
            type="number"
            id="${id}"
            name="${id}"
          />
        </div>
      </div>
    `;
  }

  _handleSubmit(e) {
    e.preventDefault();
    const options = {
      detail: {
        loops: this.shadowRoot.querySelector("#loops").value,
        timeExcercise: this.shadowRoot.querySelector("#timeExcercise").value,
        timeRest: this.shadowRoot.querySelector("#timeRest").value,
        playing: true,
      },
      bubbles: true,
      composed: true,
    };

    this.dispatchEvent(new CustomEvent("startExcercise", options));
  }
}

customElements.define("my-dispatcher", MyDispatcher);
