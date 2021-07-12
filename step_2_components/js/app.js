import { SessionsService } from "./services/sessionsService.js";

class App extends HTMLElement {

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

    const container = this.appendChild(document.createElement('div'));
    container.setAttribute('class', 'container');

    const pageTitle = container.appendChild(document.createElement('h1'));
    pageTitle.textContent = 'Nebraska.Code() Sessions';

    this._sessionList = container.appendChild(document.createElement('app-session-list'));

    container.appendChild(document.createElement('hr'));
    
    const addSessionForm = container.appendChild(document.createElement('app-add-session-form'));
    addSessionForm.addEventListener('addSession', this.onAddSession);
  }
}

customElements.define('app-root', App);