<script lang="ts">
  import { RotateCw, ScrollText, House, QrCode, Ellipsis } from 'lucide-svelte';
  import { Link } from 'svelte-routing';

  import Button from '~/lib/components/ui/button/button.svelte';
  import WrapNav from './WrapNav.svelte';
    import { getOrders } from './orders/orders.svelte';

  let drawerOpen= $state(false)
  const onClose= ()=> {
    drawerOpen= false
  }
</script>

<WrapNav drawerOpen={drawerOpen} onClose={onClose}>
<div class="w-full fixed bottom-0 left-0 z-10">
  <div class="w-full bg-green-900 pt-4 pb-6 px-2 ">
    <div class="w-full max-w-screen-md mx-auto grid grid-cols-5 place-items-center">
      <Link to={'/'}>
        <House size={20} color="white" />
      </Link>
      <Link to={'/orders'}>
        <ScrollText size={20} color="white" />
      </Link>
      <Link to={'/qr-generate'}>
        <QrCode size={20} color="white" />
      </Link>
      <button onclick={e=>getOrders()}>
        <RotateCw size={20} color="white" />
      </button>
      <Button variant="ghost" onclick={e=> drawerOpen= true} class="hover:bg-inherit" >
        <Ellipsis size={20} color="white" />
      </Button>
      <!-- <RotateCw size={20} color="white" /> -->
      
    </div>
    <!-- <button onclick={e=>location.reload()} class="text-white text-sm font-bold">새로고침</button> -->
  </div>

  
</div>
</WrapNav>