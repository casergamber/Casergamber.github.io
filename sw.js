self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

let pauseTimer = null;

self.addEventListener('message', event => {
  const data = event.data;
  if (!data) return;

  if (data.type === 'PAUSE_START') {
    if (pauseTimer) clearTimeout(pauseTimer);
    pauseTimer = setTimeout(async () => {
      pauseTimer = null;
      const clients = await self.clients.matchAll({ includeUncontrolled: true, type: 'window' });
      // Notify all open tabs to update UI
      clients.forEach(c => c.postMessage({ type: 'PAUSE_DONE' }));
      // Always show notification (works when app is in background)
      try {
        await self.registration.showNotification('Pause vorbei! 💪', {
          body: 'Zeit für den nächsten Satz.',
          vibrate: [300, 100, 300, 100, 300],
          tag: 'gym-pause',
          renotify: true,
          silent: false
        });
      } catch (e) {}
    }, data.delay);

  } else if (data.type === 'PAUSE_CANCEL') {
    if (pauseTimer) {
      clearTimeout(pauseTimer);
      pauseTimer = null;
    }
  }
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
      if (clients.length > 0) return clients[0].focus();
      return self.clients.openWindow('./GYM.html');
    })
  );
});
