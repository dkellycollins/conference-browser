import { LocationService } from "../services/locationService.js";

class CheckInButton extends HTMLElement {

  _locationService = null;
  _currentLocation = null;

  constructor() {
    super();

    this._locationService = new LocationService();

    this.connectedCallback = this.connectedCallback.bind(this);
    this.render = this.render.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = '';

    const container = this.appendChild(document.createElement('div'));
    container.setAttribute('class', 'flex-row');

    const button = container.appendChild(document.createElement('button'));
    button.setAttribute("type",  "button");
    button.addEventListener('click', this.handleClick);
    button.textContent = 'Check In!';

    if (!!this._currentLocation) {
      const locationText = container.appendChild(document.createElement('span'));
      locationText.setAttribute('class', 'flex-start');
      locationText.textContent = `Checked in at [${this._currentLocation.latitude}, ${this._currentLocation.longitude}]`;
    }
  }

  async handleClick() {
    this._currentLocation = await this._locationService.getCurrentPosition();
    this.render();
  }
}

customElements.define('app-check-in-button', CheckInButton);