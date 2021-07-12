import { NavigationService } from '../services/navigationService.js';
import { NotificationService } from '../services/notificationService.js';
import { SessionsService } from '../services/sessionsService.js';

class SessionDetails extends HTMLElement {

  static observedAttributes = ['session-id'];

  get sessionId() {
    return this.getAttribute('session-id');
  }
  set sessionId(value) {
    return this.setAttribute('session-id', value);
  } 

  _sessionsService = null;
  _navigationService = null;
  _notificationService = null;
  _session = null;

  constructor() {
    super();

    this._sessionService = new SessionsService();
    this._navigationService = new NavigationService();
    this._notificationService = new NotificationService();

    this.connectedCallback = this.connectedCallback.bind(this);
    this.attributeChangedCallback = this.attributeChangedCallback.bind(this);
    this.render = this.render.bind(this);
    this.navigateToSessions = this.navigateToSessionList.bind(this);
    this.showReminder = this.showReminder.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch(name) {
      case 'session-id': {
        this._session = await this._sessionService.getSession(newValue);
      } break;
    }

    this.render();
  }

  render() {
    this.innerHTML = '';

    const container = this.appendChild(document.createElement('div'));
    container.setAttribute('class', 'flex-col');

    const actionsContainer = container.appendChild(document.createElement('div'));
    actionsContainer.setAttribute('class', 'flex-row');

    const backButton = actionsContainer.appendChild(document.createElement('button'));
    backButton.addEventListener('click', this.navigateToSessionList);
    backButton.textContent = '< All Sessions';

    if (!!this._session) {
      const sessionContainer = container.appendChild(document.createElement('div'));
    
      const sessionCard = sessionContainer.appendChild(document.createElement('app-card'));
      sessionCard.setAttribute('title', this._session.title);
      sessionCard.setAttribute('description', this._session.description);
      sessionCard.setAttribute('footer', `${this._session.speaker}, ${this._session.date}`);

      const checkInContainer = container.appendChild(document.createElement('div'));
      checkInContainer.appendChild(document.createElement('app-check-in-button'));

      const notificationContainer = container.appendChild(document.createElement('div'));
      const notificationButton = notificationContainer.appendChild(document.createElement('button'));
      notificationButton.setAttribute('type', 'button');
      notificationButton.textContent = 'Set reminder';
      notificationButton.addEventListener('click', this.showReminder);
    }
  }

  navigateToSessionList() {
    history.pushState(null, null, '/home');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  async showReminder() {
    await this._notificationService.enable();
    this._notificationService.show('Session is starting!');
  }
}

customElements.define('app-session-details', SessionDetails);