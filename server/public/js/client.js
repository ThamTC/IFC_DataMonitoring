const publicVapidKey = 'BKte0dCciyye8IGC5nVI7TTSjKnGx3FozDPL_BmKNiqTphp1v0SLHWJFqhrRp-arMarR2VIUwbyJgs2UmiUzTF0';

if ('serviceWorker' in navigator) {
  console.log('Registering service worker');

  run().catch(error => console.error(error));
}else{
    console.log('service worker not support');
}

async function run() {
  console.log("check exist of register")
  const existedRegister = await navigator.serviceWorker.getRegistrations()
  console.log("existeds:", existedRegister)
  console.log('Registering service worker');
  const registration = await navigator.serviceWorker.
    register('/js/worker.js');
  console.log('Registered service worker');

  console.log('Registering push');
  const subscription = await registration.pushManager.
    subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
  console.log('Registered push');

  console.log('Sending push');
  await fetch('/api/webpush/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
  console.log('Sent push');
}

// Boilerplate borrowed from https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}