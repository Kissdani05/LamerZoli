// notification-sw.js
// Service worker alap push értesítésekhez (később bővíthető)
self.addEventListener('push', function(event) {
  const data = event.data?.json() || {};
  self.registration.showNotification(data.title || 'Gokart értesítés', {
    body: data.body || '',
    icon: '/file.svg',
    badge: '/file.svg',
    data: data.url || '/',
  });
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = event.notification.data || '/';
  event.waitUntil(clients.openWindow(url));
});
