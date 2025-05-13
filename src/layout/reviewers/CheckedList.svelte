<script lang="ts">
    import Loading from "~/components/ui/Loading.svelte";
    import Button from "~/lib/components/ui/button/button.svelte";
    import { sendSMS } from "./sms";

    let { checkedList }= $props()

    let loading= $state(false)
    const setLoading= (status)=> loading=status
    const handleClick= (e)=> {
        console.log(checkedList)
        if( checkedList.length == 0 ) return alert('선택되지 않음')
        const go= confirm('보낼까요?')
        if( !go ) return
        loading= true
        sendSMS(checkedList, setLoading)
    }
//     const makeMsg= (param)=> {
//         return `${param.name}님, 안녕하세요.
// 와인바 '코렌초하우스' 입니다. 저희 서비스에 관심 가지고 신청해 주셔서 감사드립니다!
// 이번 리뷰어(체험단)에 선정되셨습니다.

// 저희 매장에 방문해 주셔서 준비된 와인과 푸드를 체험해 주시고 정성스런 리뷰를 작성 부탁드립니다.
// 금,토,익일 휴일,월(휴무) 제외한 영업시간내 인원 제한 없이 가능합니다.

// 네이버, 캐치테이블 예약으로 일정을 확정하시고(메모에 "리뷰어" 기재), 변동사항이 있을시 별도 연락을 드려 조정하도록 하겠습니다. 더 궁금하신 사항은 언제든 문의 주시기 바랍니다.
// 감사합니다.

// [네이버] https://naver.me/xKEUzEjM
// [캐치테이블] https://app.catchtable.co.kr/ct/shop/corenzohouse`
//     }
    

</script>

<div class="h-full overflow-y-auto min-w-40 p-2 border mr-2 rounded-md">
    <div class="sticky top-0">
        <Button
            onclick={handleClick}
            variant="outline" size='sm' class="w-full text-2xs px-3 py-1 h-auto"
        >클릭</Button>  
    </div>
    {#if loading}
     <div class="flex items-center justify-center min-h-48">
         <div class="w-24 ">
            <Loading />
        </div>
     </div>
    {/if}
    {#if !loading}
        {#each checkedList as checked}
            <p class="">{checked.name}</p>
        {/each}
    {/if}
    
</div>