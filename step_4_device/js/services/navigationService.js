
export class NavigationService {
  
  constructor() {
    this.goToHome = this.goToHome.bind(this);
    this.goToSessionDetails = this.goToSessionDetails.bind(this);
    this.goTo = this.goTo.bind(this);
  }

  goToHome() {
    this.goTo('/home');
  }

  goToSessionDetails(sessionId) {
    this.goTo(`/sessions?session-id=${sessionId}`);
  }

  goTo(url) {
    history.pushState(null, null, url);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}