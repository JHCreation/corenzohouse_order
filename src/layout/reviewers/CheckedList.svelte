<script lang="ts">
    import Loading from "~/components/ui/Loading.svelte";
    import Button from "~/lib/components/ui/button/button.svelte";
    import { sendSMS, updatesQuery } from "./sms";

    let { checkedList }= $props()

    let loading= $state(false)
    const setLoading= (status)=> loading=status
    const handleClick= (e)=> {
        console.log(checkedList)
        if (checkedList.length === 0) {
            alert('선택되지 않음')
            return
        }

        const invalid = checkedList.filter(c => !c.service)
        if (invalid.length > 0) {
            const ids = invalid.map(c => c.id ?? c.name ?? JSON.stringify(c)).join(', ')
            alert(`서비스가 없는 항목: ${ids}`)
            return
        }

        const go = confirm('각 서비스 내용을 확인해세요. 보낼까요?')
        if (!go) return

        loading = true
        sendSMS(checkedList, setLoading)
        
    }

    const handleUpdateClick = (e) => {
        if (checkedList.length === 0) {
            alert('선택되지 않음')
            return
        }

        // const invalid = checkedList.filter(c => !c.service)
        // if (invalid.length > 0) {
        //     const ids = invalid.map(c => c.id ?? c.name ?? JSON.stringify(c)).join(', ')
        //     alert(`서비스가 없는 항목: ${ids}`)
        //     return
        // }

        const go = confirm('수정할까요?')
        if (!go) return

        loading = true
        updatesQuery(checkedList, setLoading)
    }

    

</script>

<div class="w-54 h-full overflow-y-auto min-w-40 p-2 border mr-2 rounded-md">

    <div class="sticky top-0">
        <Button
            onclick={handleUpdateClick}
            variant="outline" size='sm' class="w-full text-2xs px-3 py-1 h-auto"
        >저장</Button>  
        <Button
            onclick={handleClick}
            variant="outline" size='sm' class="w-full text-2xs px-3 py-1 h-auto"
        >확정 문자 전송</Button>  
    </div>
    {#if loading}
     <div class="flex items-center justify-center min-h-48">
         <div class="w-24 ">
            <Loading />
        </div>
     </div>
    {/if}
    {#if !loading}
        <ul class="text-xs">
            {#each checkedList as checked}
                <li class="py-0.5 border-b last:border-0">
                    <div class="flex flex-wrap leading-3">
                        <span class="text-nowrap">{checked.name}</span>
                        <span class="">[{checked.service}]</span>
                    </div>
                </li>
            {/each}
        </ul>
    {/if}
    
</div>