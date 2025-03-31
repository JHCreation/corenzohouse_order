<script lang="ts">
    import { RotateCw, ScrollText, House, QrCode, Ellipsis } from 'lucide-svelte';
    import { Link } from 'svelte-routing';

    import Button from '~/lib/components/ui/button/button.svelte';
    import WrapNav from './WrapNav.svelte';
    import { getOrders } from './orders/orders.svelte';
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import NavTop from './NavTop.svelte';
    import clsx from 'clsx';
    import { twMerge } from 'tailwind-merge';
    import { cn } from '~/lib/utils';
    // import { cn } from 'tailwind-variants';

  
  let dev= Boolean(import.meta.env.VITE_DEV)
  console.log(import.meta.env.VITE_DEV, Boolean(import.meta.env.VITE_DEV))
  let linkClass= 'pt-4 pb-6 w-full h-full flex justify-center'
</script>



<WrapNav >


<div class="w-full fixed bottom-0 left-0 z-10">
  <div class="w-full bg-green-900">
    <div 
    class={cn(`w-full max-w-screen-md mx-auto grid place-items-center grid-cols-3`, 
    {
      'grid-cols-4': dev,
    }) }>
      <Link to={'/'} class={linkClass}>
        <House size={20} color="white" />
      </Link>
      <Link to={'/orders'} class={linkClass}>
        <ScrollText size={20} color="white" />
      </Link>
      {#if dev}
      <Link to={'/qr-generate'} class={linkClass}>
        <QrCode size={20} color="white" />
      </Link>
      {/if}
      <button onclick={e=>getOrders()} class={linkClass}>
        <RotateCw size={20} color="white" />
      </button>
      <!-- <Button variant="ghost" onclick={e=> drawerOpen= true} class={`hover:bg-inherit ${linkClass}`} >
        <Ellipsis size={20} color="white" />
      </Button> -->
      <!-- <RotateCw size={20} color="white" /> -->
      
    </div>
    <!-- <button onclick={e=>location.reload()} class="text-white text-sm font-bold">새로고침</button> -->
  </div>

  
</div>
</WrapNav>