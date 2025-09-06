<script lang="ts">
    import { notificationSoundVolume, updateVolume, onSound, setOnSound } from "~/utils/pushNotification";
    let { drawerOpen, setDrawerOpen, sw_subscription, enableSound, sountTest}= $props()
    import { Bell, BellOff, Volume2, VolumeOff } from '@lucide/svelte';
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import clsx from 'clsx';
    import Slider from '~/lib/components/ui/slider/slider.svelte';
    import { handleLogout, setLog } from "~/components/auth/authorize.svelte";
    // let onSound= $state(false)
    let open= $state(false)
    const size= 18
</script>


<!-- <div class="w-full fixed top-0 left-0 z-10 bg-white py-1 px-2"> -->
    <!-- <div class="w-full max-w-screen-md mx-auto"> -->

        <div class="flex justify-between px-5">
            <div class="flex-1 flex justify-start items-center gap-5 md:gap-10">
                <div class="flex items-center flex-1">
                    <button onclick={e=>setDrawerOpen(true)} class="cursor-pointer">
                        {#if $sw_subscription}
                            <Bell size={size} strokeWidth={2.5} />
                        {/if}
                        {#if !$sw_subscription}
                            <BellOff size={size} strokeWidth={2.5} class="cursor-pointer text-red-600" />
                        {/if}
                    </button>
                </div>
                <!-- <Button >test</Button> -->

                <div class="flex items-center flex-1">
                    <DropdownMenu.Root open={open} onOpenChange={status=> open= status}>
                        <DropdownMenu.Trigger onclick={e=> open= true} class="cursor-pointer">
                            <div class="">
                                {#if $onSound}
                                    <Volume2 size={size} strokeWidth={2.5} />                                
                                {/if}
                                {#if !$onSound}
                                    <VolumeOff size={size} strokeWidth={2.5} class="text-red-600"/>
                                {/if}
                            </div>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            <DropdownMenu.Group>
                                <!-- <DropdownMenu.GroupHeading>알림음</DropdownMenu.GroupHeading>
                                <DropdownMenu.Separator /> -->
                                {#if !$onSound}
                                    <Button
                                        size="default"
                                        class={clsx('w-full cursor-pointer',
                                            {
                                                'bg-red-500 hover:bg-red-500': $onSound,
                                            }
                                        )}
                                        onclick={e=> {
                                            // open=false
                                            enableSound()
                                            // setOnSound(true)
                                        }}
                                    >
                                        <span class="text-xs ">
                                            <!-- {#if onSound} 끄기 {/if} -->
                                            알림음 켜기
                                        </span>
                    
                                    </Button>
                                {/if}
                                {#if $onSound}
                                    <div class="">
                                        <div class="p-4 border">
                                            <p class="text-xs">알림음 볼륨</p>
                                            <Slider type="single" bind:value={$notificationSoundVolume} max={1} step={.1} class="mt-4"/>
                                        </div>
                                        <div class="flex flex-col">
                                            <Button
                                                size="sm"
                                                onclick={e=> sountTest()}
                                                class="text-xs bg-slate-600 hover:bg-slate-600 mt-1 w-full cursor-pointer"
                                            >테스트</Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onclick={e=> {
                                                    updateVolume(0)
                                                    setOnSound(false)
                                                }}
                                                class="text-xs mt-1 w-full cursor-pointer"
                                            >알림음끄기</Button>
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
            <!-- <Button variant='destructive' class="cursor-pointer" onclick={()=> handleLogout(setLog)}>로그아웃</Button> -->
        </div>

    <!-- </div> -->
<!-- </div> -->

