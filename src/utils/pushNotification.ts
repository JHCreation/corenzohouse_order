import { getOrders } from "~/layout/orders/orders.svelte";
import { generateShortId } from "./uid";
import {
	derived,
	fromStore,
	get,
	readable,
	readonly,
	toStore,
	writable
} from 'svelte/store';
export async function subscribeToNotifications(setSwSubscription) {
  console.log('서비스 워커 등록!')
  try {
    // 서비스 워커 등록
    
    navigator.serviceWorker.register(
      '/service-worker.js', 
      // { updateViaCache: "none" }
    );
    const registration = await navigator.serviceWorker.ready;
    console.log(registration.pushManager.subscribe)
    
    // 푸시 구독
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY // VAPID 공개키
    });
    console.log(subscription)
    // 서버에 구독 정보 전송
    const res= await fetch(`${import.meta.env.VITE_CORENZO_URL}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: generateShortId(16),
        subscription: JSON.stringify(subscription),
        endpoint: subscription.endpoint,
        status: 'use'
      })
    });
    const response= await res.json()
    console.log(response)
    if( response?.endpoint ) {
      setSwSubscription({ endpoint: response?.endpoint })
    }
    console.log(res, JSON.stringify(subscription), subscription)

    return subscription;
  } catch (error) {
    console.error('Failed to subscribe:', error);
    throw error;
  }
}


export async function checkSubscription(setSwSubscription) {
  console.log('setSwSubscription')
  if ('serviceWorker' in navigator) {
    const res= await navigator.serviceWorker.getRegistrations().then(function(registrations) {
      if (registrations.length > 0) {
        console.log('서비스워커가 이미 등록되어 있습니다.');
        // 여기서 서비스워커 관련 로직 실행
        return true
      } else {
        console.log('등록된 서비스워커가 없습니다.');
        setSwSubscription(false)
        return false;
        // 서비스워커 등록 로직 또는 대체 로직
      }
    });
    if( !res ) return
  }

  console.log('service workder check!!!!!!')
  
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    // console.log(navigator, window)
    const registration = await navigator.serviceWorker.ready;
    console.log(registration)
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      setSwSubscription(subscription)
      console.log('이미 구독 중입니다.');
      return true;
    } else {
      setSwSubscription(false)
      console.log('아직 구독하지 않았습니다.');
      return false;
    }
  } else {
    console.log('푸시 알림이 지원되지 않는 브라우저입니다.');
    return false;
  }
}



export async function unsubscribeFromPush(setSwSubscription) {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        const result = await subscription.unsubscribe();
        if (result) {
          const res= await fetch(`${import.meta.env.VITE_CORENZO_URL}/subscribe`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              endpoint: subscription.endpoint
            })
          });
          const response= await res.json()
          console.log(response)
          setSwSubscription(false)
          console.log('구독이 성공적으로 취소되었습니다.');
          // 여기에 서버에 구독 취소 정보를 전송하는 코드를 추가할 수 있습니다.
          return true;
        } else {
          console.log('구독 취소에 실패했습니다.');
          return false;
        }
      } else {
        console.log('현재 구독 중이 아닙니다.');
        return false;
      }
    } catch (error) {
      console.error('구독 취소 중 오류 발생:', error);
      return false;
    }
  } else {
    console.log('푸시 알림이 지원되지 않는 브라우저입니다.');
    return false;
  }
}


export const serviceWorkerUnregister= ()=> {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }
}


let volume= 0
export const onSound= writable(false)
export const setOnSound= (status)=> onSound.set(status)
export const notificationSound= writable<any>()
export const notificationSoundVolume= writable<any>(volume)

/* const handleMessage = (event) => {
  console.log('start sounds', event);
  if (event.data && event.data.type === "play-sound") {
    const audio = new Audio('/notification.mp3'); // 소리 파일 경로
    audio.volume = volume;
    audio.play().catch(error => console.error("message 소리 재생 실패:", error));
    getOrders();
  }
}; */
export const updateVolume= (vol)=> {
  volume= vol
  // notificationSoundVolume.set(vol)
}
export const serviceWorkerSound= ()=> {
  // navigator.serviceWorker.removeEventListener("message", (event) => handleMessage(event, volume))
  navigator.serviceWorker.addEventListener("message", (event) => {
    console.log('start sounds', event)
    const audio = new Audio('/notification.mp3'); // 소리 파일 경로

    if (event.data && event.data.type === "play-sound") {
        audio.volume= volume
        console.log(window, notificationSoundVolume, volume)
        // notificationSound.set(audio)
        // notificationSound.volume = notificationSoundVolume;
        audio.play().catch(error => {
          alert('알림음이 꺼져있습니다.')
          console.error("message 소리 재생 실패:", error)
        });
        getOrders()
    }
    if (event.data && event.data.type === "order-refresh") {
      console.log('새로고침만 작동했다')
      getOrders()
    }
  });
  
  
}

