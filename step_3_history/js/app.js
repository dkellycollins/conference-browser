
class App extends HTMLElement {

  constructor() {
    super();

    this.render = this.render.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = '';

    const appContainer = this.appendChild(document.createElement('div'));
    appContainer.setAttribute('class', 'container');

    const pageTitle = appContainer.appendChild(document.createElement('h1'));
    pageTitle.textContent = 'Nebraska.Code() Sessions';

    const router = appContainer.appendChild(document.createElement('app-router'));
    router.setAttribute('class', 'container');
    router.setAttribute('default-route', 'home');

    const homePage = router.appendChild(document.createElement('app-home'));
    homePage.setAttribute('route', 'home');

    const sessionDetailsPage = router.appendChild(document.createElement('app-session-details'));
    sessionDetailsPage.setAttribute('route', 'sessions');

    router.renderRoute();
  }
}

customElements.define('app-root', App);