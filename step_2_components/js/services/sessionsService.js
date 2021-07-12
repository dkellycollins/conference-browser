
export class SessionsService {

  _sessions = null;

  constructor() { }

  async getSessions() {
    if (!this._sessions) {
      const response = await fetch('assets/sessions.json');
      this._sessions = await response.json();
    }

    return this._sessions;
  }

  async addSession(session) {
    this._sessions.push({
      ...session,
      id: Date.now()
    });
  }
}