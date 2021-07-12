import './components/addSessionForm.js';
import './components/card.js';
import './components/checkInButton.js';
import './components/home.js';
import './components/router.js';
import './components/sessionDetails.js';
import './components/sessionList.js';
import './app.js';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./workers/notification.js', {scope: './'})
    .then((reg) => {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch((error) => {
      // registration failed
      console.log('Registration failed with ' + error);
    });
}