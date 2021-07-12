import { NavigationService } from "../services/navigationService.js";

class SessionList extends HTMLElement {

  _navigationService = null;
  _sessions = [];

  constructor() {
    super();

    this._navigationService = new NavigationService();

    this.connectedCallback = this.connectedCallback.bind(this);
    this.setSessions = this.setSessions.bind(this);
    this.render = this.render.bind(this);
  }

  setSessions(value) {
    this._sessions = value;
    this.render();
  }

  connectedCallback() {
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
      card.addEventListener('click', () => this._navigationService.goToSessionDetails(session.id));
    }
  }
}

customElements.define('app-session-list', SessionList);