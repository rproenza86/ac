'use strict';

self.addEventListener('push', function(e) {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }

  var data = {};
  if (e.data) {
    data = e.data.json();
  }
  var message = data.message || "Here's something you might want to check out.";

  var options = {
    body: message,
    icon: 'icons/mcodcons-icon-192.png', 
    badge: 'icons/mcodcons-icon-32.png',
    image: 'icons/logo.svg',
    dir: 'auto',
    tag: 'renotify',
    renotify: true,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      subscriptionId: data.subscriptionId
    },
    actions: [
      {action: 'explore', title: 'Go to the site',
        icon: 'icons/logo.svg'},
      {action: 'close', title: 'Close the notification',
        icon: 'icons/logo.svg'},
    ]
  };

  e.waitUntil(
    clients.matchAll().then(function(c) {
      console.log(c);
      if (c.length === 0) {
        // Show notification
        self.registration.showNotification('Atomic Coders', options);
      } else {
        // Send a message to the page to update the UI
        // TODO: postMessage implementation to communicate UI and sw
        console.log('Application is already open!');
        // FIXME:For now let it pass and handle it in the notificationclick handler
        self.registration.showNotification('Atomic Coders', options);
      }
    })
  );
});

self.addEventListener('notificationclose', function(e) {
  var notification = e.notification;
  var subscriptionId = notification.data.subscriptionId;

  console.log('Closed notification: ' + subscriptionId);

  if (!e.action) {
    // Was a normal notification click
    console.log('Notification Click.');
    return;
  }

  switch (e.action) {
    case 'explore':
      console.log('User ❤️️\'s explore.');
      break;
    case 'close':
      console.log('User ❤️️\'s close.');
      break;
    default:
      console.log(`Unknown action clicked: '${e.action}'`);
      break;
  }
});

self.addEventListener('notificationclick', function(e) {

  console.log('Global Notification Click. Fired on a notification or notification action.');

  var clickedNotification = e.notification;
  var subscriptionId = clickedNotification.data.subscriptionId;
  var action = e.action;

  clickedNotification.close();
  
  // TODO: not triggered on Chrome Desktop, check is needed
  
  var options = { tag : 'renotify' };
  // If there are several open notifications originating from our app, we can close them all when the user clicks on one.
  self.registration.getNotifications(options).then(function(notifications) {
    notifications.forEach(function(notification) {
      notification.close();
    });
  });
  
  // Do something as the result of the notification click
  // const promiseChain = dispatchAnalytics();
  // event.waitUntil(promiseChain);

  e.waitUntil(
    clients.matchAll().then(function(clis) {
      var client = clis.find(function(c) {
        return c.visibilityState === 'visible';
      });
      if (client !== undefined) {
        client.navigate('services/explore' + subscriptionId);
        client.focus();
      } else {
        // there are no visible windows. Open one.
        clients.openWindow('blog/' + subscriptionId);
        notification.close();
      }
    })
  )
});