<script lang="ts">
    let { open, setOpen, currentData }= $props()
    import {
     Button,
     buttonVariants
    } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    $inspect(open)
</script>
    
   <Dialog.Root {open} onOpenChange={setOpen}>
    
    <Dialog.Content class="sm:max-w-[425px]">
     <Dialog.Header>
      <Dialog.Title></Dialog.Title>
     </Dialog.Header>
     <div class="grid gap-4 py-4">
      {currentData.msg}
     </div>
     <Dialog.Footer>
      <Button type="submit">Save changes</Button>
     </Dialog.Footer>
    </Dialog.Content>
   </Dialog.Root>