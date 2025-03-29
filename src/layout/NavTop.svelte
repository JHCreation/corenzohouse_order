<script lang="ts">
    import { checkSubscription, serviceWorkerUnregister, subscribeToNotifications, unsubscribeFromPush, serviceWorkerSound, notificationSound, notificationSoundVolume, updateVolume } from "~/utils/pushNotification";
    let { drawerOpen, setDrawerOpen, sw_subscription, enableSound, sountTest, onSound, setOnSound }= $props()
    import { Bell, BellOff, Volume2, VolumeOff } from 'lucide-svelte';
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import Button from '~/lib/components/ui/button/button.svelte';
    import clsx from 'clsx';
    import Slider from '~/lib/components/ui/slider/slider.svelte';
    // let onSound= $state(false)
    let open= $state(false)
</script>


<div class="w-full fixed top-0 left-0 z-10 bg-white py-1 px-2">
    
    <div class="w-full max-w-screen-md mx-auto">
        <div class="flex justify-around items-center">
            <button onclick={e=>setDrawerOpen(true)}>
                {#if sw_subscription}
                    <Bell size={24} strokeWidth={2.5} />
                {/if}
                {#if !sw_subscription}
                    <BellOff size={24} strokeWidth={2.5} class="text-red-600" />
                {/if}
            </button>
            <!-- <Button >test</Button> -->

            <div class="">
                <DropdownMenu.Root open={open} onOpenChange={status=> open= status}>
                    <DropdownMenu.Trigger onclick={e=> open= true}>
                        <div class="">
                            {#if onSound}
                            <!-- <Button variant="ghost" size={'icon'}> -->
                                <!-- <button onclick={e=> onSound=true} class=""> -->
                                    <Volume2 size={24} strokeWidth={2.5} />
                                <!-- </button> -->
                            <!-- </Button> -->
                            {/if}
                            {#if !onSound}
                            <!-- <button onclick={e=> onSound=false} class="touch-manipulation"> -->
                                <VolumeOff size={24} strokeWidth={2.5} class="text-red-600"/>
                            <!-- </button> -->
                            {/if}
                        </div>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Group>
                            <!-- <DropdownMenu.GroupHeading>알림음</DropdownMenu.GroupHeading>
                            <DropdownMenu.Separator /> -->
                            {#if !onSound}
                                <Button
                                    size="default"
                                    class={clsx('w-full',
                                        {
                                            'bg-red-500 hover:bg-red-500': onSound,
                                        }
                                    )}
                                    onclick={e=> {
                                        // open=false
                                        setOnSound(true)
                                    }}
                                >
                                    <span class="text-xs ">
                                        <!-- {#if onSound} 끄기 {/if} -->
                                        알림음 켜기
                                    </span>
                
                                </Button>
                            {/if}
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
                                    <!-- <Button onclick={e=> $notificationSound.pause()}>pause</Button> -->
                                    </div>
                
                                </div>
                            {/if}
                
                            <!-- <DropdownMenu.Item>Profile</DropdownMenu.Item>
                            <DropdownMenu.Item>Billing</DropdownMenu.Item>
                            <DropdownMenu.Item>Team</DropdownMenu.Item>
                            <DropdownMenu.Item>Subscription</DropdownMenu.Item> -->
                        </DropdownMenu.Group>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </div>

        </div>
    </div>

    
</div>

