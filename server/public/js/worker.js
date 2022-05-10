console.log('Loaded service worker!');
self.addEventListener('push', (e) => {
    const data = e.data.json()
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/assets/images/653273_bell_icon.png',
        // badge: 'https://cdn2.iconfinder.com/data/icons/stationary-19/100/Thumb_Tack-128.png',
        vibrate: [100, 100, 100],
        actions: [
            {
                'action': 'close', title: 'Close Notification', icon: '/assets/images/1814078_close_icon.png'
            },
            {
                'action': 'show', title: 'Go to mysite ', icon: 'https://cdn3.iconfinder.com/data/icons/show-and-hide-password/100/show_hide_password-09-128.png'
            }
        ]
    })
})
self.addEventListener('notificationclick', (event) => {
    if (event.action === 'show') {
        event.notification.close();
        clients.openWindow('http://localhost:8000/')
    }else if (event.action === 'close') {
        event.notification.close();
    }
})