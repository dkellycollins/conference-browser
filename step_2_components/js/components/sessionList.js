
/**
 * "React-like" approach where the component is re-rendered when the properties change.
 */

class SessionList extends HTMLElement {

  _sessions = [];

  constructor() {
    super();

    this.connectedCallback = this.connectedCallback.bind(this);
    this.setSessions = this.setSessions.bind(this);
    this.render = this.render.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  setSessions(value) {
    this._sessions = value;
    this.render();
  }

  render() {
    this.innerHTML = '';

    const container = this.appendChild(document.createElement('div'));
    container.setAttribute('class', 'flex-col');

    for (const session of this._sessions) {
      const card = container.appendChild(document.createElement('app-card'));
      card.setAttribute('title', session.title);
      card.setAttribute('description', session.description);
      card.setAttribute('footer', `${session.speaker}, ${session.date}`);
    }
  }
}

customElements.define('app-session-list', SessionList);