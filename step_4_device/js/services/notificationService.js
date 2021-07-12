
console.log('showTrigger' in Notification.prototype);

export class NotificationService {
  async enable() {
    if (Notification.permission === 'denied' || Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  }

  show(message) {
    setTimeout(() => new Notification(message), 5000);
  }
}