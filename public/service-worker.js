const CACHE_NAME = 'corenzo-order-cache-v1.0.1'; // 캐시 이름에 버전 명시 (매 배포마다 변경 권장)
const urlsToCache = [
  // '/',
  // '/index.html',
  // '/styles/main.css',
  // '/scripts/main.js',
  // // 기타 캐시할 정적 자원들...
];

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing new version:', CACHE_NAME);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // 이 코드가 중요! 새 서비스 워커가 설치되자마자 즉시 활성화되도록 합니다.
        // 이전 버전의 서비스 워커가 여전히 활성 상태여도 대기 없이 바로 제어권을 넘겨받을 수 있습니다.
        self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Cache addAll failed', error);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating new version:', CACHE_NAME);
  event.waitUntil(
    // 이전 버전의 캐시를 정리하는 로직 (선택 사항이지만 권장)
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // 이 코드가 중요! 활성화된 서비스 워커가 즉시 모든 클라이언트(탭)를 제어하도록 합니다.
      // 페이지 새로고침 없이도 새 서비스 워커가 바로 적용될 수 있습니다.
      return clients.claim();
    })
  );
});



self.addEventListener('push', (event) => {
  const data = event.data.json();
  const { title, tid, prod, total, id, push }= data
  console.log('push!!!!', data)
  const cont= prod.map(item=>{
    const optText= item?.option ? ` [${item?.option}]`:  ''
    return `[${item.key}] ${item.name}${optText} ${item.price}원 - ${item.qty}개`
  })
  cont.push(`금액: ${total}원`)


  if( push ) {
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
    
  }

  console.log('Sounds On down')
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
    .then(clients => {
        console.log('clients event start!!!', clients, push)
        if (clients.length > 0) {
          if( push ) {
            clients[0].postMessage({ type: "play-sound" });
            // clients[0].postMessage({ type: "order-refresh" });
          }
          if( !push ) {
            clients[0].postMessage({ type: "order-refresh" });
          }
            
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