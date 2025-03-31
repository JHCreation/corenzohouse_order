
<script lang="ts">
  let { children }= $props()

  let drawerOpen= $state(false)
  const setDrawerOpen= (status)=>{
    drawerOpen= status
  }
  const onDrawerClose= ()=> {
    drawerOpen= false
  }

  import { onMount } from "svelte";
  import { Link } from "svelte-routing";
  import Loading from "~/components/ui/Loading.svelte";
  import Button from "~/lib/components/ui/button/button.svelte";
  import { checkSubscription, serviceWorkerUnregister, subscribeToNotifications, unsubscribeFromPush, serviceWorkerSound, notificationSound, notificationSoundVolume, updateVolume } from "~/utils/pushNotification";
  
  import { Slider } from "$lib/components/ui/slider/index.js";
  import * as Drawer from "$lib/components/ui/drawer/index.js";
    import NavTop from "./NavTop.svelte";


  let sw_register= $state<boolean|null>(null)
  const setSwRegister= (status)=> {
    sw_register= status
  }
  let sw_subscription= $state<boolean|null>(null)
  const setSwSubscription= (status)=> {
    sw_subscription= status
  }

  let btnRef
  onMount(()=> {
    notificationSound.set(new Audio('/notification.mp3'))
    checkSubscription(setSwSubscription)
    serviceWorkerSound()
    // enableSound()
    // serviceWorkerSound($notificationSound)
    // checkSoundInterect()
    // btnRef.click()
  })

  $effect(()=> {
    console.log('volume update', $notificationSoundVolume)
    updateVolume($notificationSoundVolume)
  })


  let onSound= $state(false)
  const setOnSound= (status)=> onSound= status 
  function enableSound() {
    const audio = new Audio('/notification.mp3'); 
    audio.play().then(() => {
      // serviceWorkerSound($notificationSound)
      onSound= true;
      console.log("소리 재생 가능");
      notificationSoundVolume.set(0.5)
      audio.pause()
      // localStorage.setItem('user-interacted', 'true');
    }).catch(error => console.error("소리 재생 실패:", error));
  }
  // function checkSoundInterect () {
  //   console.log('상호작용 체크시작')
  //   if (localStorage.getItem('user-interacted') === 'true') {
  //     console.log('상호작용 체크 있었음')
  //     // 이미 상호작용이 있었다면, 소리 재생
  //     const sound = new Audio('/notification.mp3');
  //     sound.play();
  //   } else {
  //     /* document.body.addEventListener('click', function playSound() {
  //       const sound = new Audio('/notification.mp3');
  //       sound.play();
  //       localStorage.setItem('user-interacted', 'true'); // 상호작용 상태 저장
  //       document.body.removeEventListener('click', playSound); // 이벤트 리스너 제거
  //     }); */
  //   }
  // }
  console.log($notificationSoundVolume)
  $inspect('사운드가능',onSound)

  const sountTest= ()=> {
    console.log($notificationSoundVolume)
    $notificationSound.volume = $notificationSoundVolume;
    $notificationSound.play()
  }
</script>

<NavTop 
  drawerOpen={drawerOpen}
  setDrawerOpen={setDrawerOpen}
  sw_subscription={sw_subscription} 
  enableSound={enableSound} 
  sountTest={sountTest} 
  onSound={onSound} 
  setOnSound={setOnSound}
/>
<Drawer.Root open={drawerOpen} onClose={onDrawerClose}>
  <Drawer.Content class="w-full max-w-[600px] mx-auto">
    <!-- <Drawer.Header>
      <Drawer.Title>Are you sure absolutely sure?</Drawer.Title>
      <Drawer.Description>This action cannot be undone.</Drawer.Description>
    </Drawer.Header> -->


    <div class="min- w-full">
  

      <div  class="">
        
        <!-- <div class="flex justify-center my-10">
          <Button onclick={e=>serviceWorkerUnregister()} class="bg-gray-300 text-gray-600">서비스워커 취소</Button>
        </div> -->
        
        {#if sw_subscription == null}
          <div class="w-20 mx-auto">
            <Loading />
          </div>
        {:else}
          <div class="mt-4">

            {#if sw_subscription == false}
              <div class="flex flex-col items-center">
                <div class="text-center mb-2 text-xs">알림을 받을 수 없는 상태입니다.</div>
                <Button
                  size={"sm"}
                  onclick={async ()=> {
                    sw_subscription = null
                    const res= await subscribeToNotifications(setSwSubscription)
                  }}
                  class="bg-green-500"
                >푸시알림 허용</Button>
              </div>
            {:else}
              <div class="flex flex-col items-center">
                <div class="text-center mb-2 text-xs">푸시알림 허용중</div>
                <Button
                  size={"lg"}
                    onclick={async ()=> {
                      sw_subscription = null
                    const res= await unsubscribeFromPush(setSwSubscription)
                  }}
                  class="bg-red-500"
                >푸시알림 취소</Button>
              </div>
            {/if}

          </div>
        {/if}
      </div>

      <!-- {#if sw_subscription}
        <div class="hidden md:block">
          <div class="px-4 pt-4 mt-4 border-t">
            

            
            {#if onSound}

              <div class="">
                <div class="p-4 border">
                  <p class="text-xs">알림음 볼륨</p>
                  <Slider type="single" bind:value={$notificationSoundVolume} max={1} step={.1} class="mt-4"/>
                </div>
                <div class="flex">
                  <Button 
                    size="sm"
                    onclick={e=> sountTest()}
                    class="text-xs bg-slate-600 hover:bg-slate-600 mt-1 w-full"
                  >테스트</Button>
                  <Button onclick={e=> $notificationSound.pause()}>pause</Button>
                </div>
                
              </div>
            {/if}
            {#if !onSound}
              <div class="text-center">
                <div class="text-center mb-2 text-xs">알림음을 들을 수 없는 상태.</div>
                <Button onclick={e=>enableSound()} class="bg-sky-600 text-white ">알림음 켜기</Button>
              </div>
            {/if}
          </div>
          
        </div>
      {/if} -->
      
    </div>



    <Drawer.Footer>
      <!-- <Button>Submit</Button> -->
      <Drawer.Close>
        <Button class="w-full">닫기</Button>
      </Drawer.Close>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>




{@render children()}
