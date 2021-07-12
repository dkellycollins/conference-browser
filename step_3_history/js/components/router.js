
class Router extends HTMLElement {

  get defaultRoute() {
    return this.getAttribute('default-route');
  }
  set defaultRoute(value) {
    this.setAttribute('default-route', value);
  }

  _routes = {};

  constructor() {
    super();

    this.onPopState = this.renderRoute.bind(this);

    window.addEventListener('popstate', () => this.renderRoute());
  }

  renderRoute() {
    console.log('Navigating to', window.location);

    const routeToShow = window.location.pathname.split('/')[1] || this.defaultRoute;
    const routeElements = this.querySelectorAll('[route]');
    for (const routeElement of routeElements) {
      if (routeElement.getAttribute('route') === routeToShow) {
        routeElement.setAttribute('style', 'display: block;');
        for(const [key, value] of this.getRouteData()) {
          routeElement.setAttribute(key, value);
        }
      }
      else {
        routeElement.setAttribute('style', 'display: none;');

      }
    }
  }

  getRouteData() {
    var query = window.location.search.substring(1);
    if (!query) {
      return [];
    }

    return query.split('&').map(param => {
      const [key, value] = param.split('=');
      return [decodeURIComponent(key), decodeURIComponent(value)];
    });
  }
}

customElements.define('app-router', Router);