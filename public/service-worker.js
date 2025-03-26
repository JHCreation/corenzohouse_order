

self.addEventListener('push', (event) => {
  const data = event.data.json();
  const { title, tid, prod, total, id }= data
  // console.log(data, 'push--!')
  const cont= prod.map(item=>
    `[${item.key}] ${item.name} ${item.price}원 - ${item.qty}개`
  )
  cont.push(`금액: ${total}원`)


  event.waitUntil(
    self.registration.showNotification(`${tid}번 ${title}`, {
      // body: `${data[0].key}\n${data[0].name}\n${data[0].price}\n`,
      body: `${cont.join(',\n')}`,
      icon: '/img/logo/logo.svg',
      data: {
        url: `/orders`
      },
    })
  );

  console.log('Sounds On down')
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
    .then(clients => {
        console.log(clients)
        if (clients.length > 0) {
            clients[0].postMessage({ type: "play-sound" });
            // clients[0].focus();  
        } 
        /* else {
            clients.openWindow(event.notification.data.url);
        } */
    })
  );
  
});


self.addEventListener('notificationclick', function(event) {
  const clickAction = event.notification.data.url;
  if (clickAction) {
    event.notification.close();
    event.waitUntil(clients.openWindow(clickAction));
  }
});