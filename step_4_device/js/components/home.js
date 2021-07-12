import { SessionsService } from '../services/sessionsService.js';

class Home extends HTMLElement {
  _sessionsService = null;
  _sessionList = null;

  constructor() {
    super();

    this._sessionsService = new SessionsService();

    this.connectedCallback = this.connectedCallback.bind(this);
    this.onAddSession = this.onAddSession.bind(this);
    this.render = this.render.bind(this);
  }

  async connectedCallback() {
    this.render();

    const sessions = await this._sessionsService.getSessions();
    this._sessionList.setSessions(sessions);
  }

  async onAddSession(event) {
    await this._sessionsService.addSession(event.detail);
    const sessions = await this._sessionsService.getSessions();
    this._sessionList.setSessions(sessions);
  }

  render() {
    this.innerHTML = '';

    this._sessionList = this.appendChild(document.createElement('app-session-list'));

    this.appendChild(document.createElement('hr'));
    
    const addSessionForm = this.appendChild(document.createElement('app-add-session-form'));
    addSessionForm.addEventListener('addSession', this.onAddSession);
  }
}

customElements.define('app-home', Home);