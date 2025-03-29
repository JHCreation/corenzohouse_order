<script lang="ts" module>
  export const orderStatusKeys = {
      이용중: 'use',
      결제완료: 'paid'
  } as const

  export const orderGroupStatusKeys = {
      'use': '이용중',
      'paid': '결제완료'
  } as const
  export type OrderGroupStatus= typeof orderStatusKeys[keyof typeof orderStatusKeys]
  // export type OrderGroupStatus= keyof typeof orderGroupStatusKeys;

  const statusUse= orderStatusKeys['이용중']
  const statusPaid= orderStatusKeys['결제완료']

  const viewTypes= {
    리스트: 'list',
    테이블: 'table'
  } as const
  const listType= viewTypes['리스트']
  const tableType= viewTypes['테이블']
  // type ViewType= typeof listType | typeof tableType;
  type ViewType= typeof viewTypes[keyof typeof viewTypes];

  type PutParam= {
    id: string
    status: OrderGroupStatus
  }
  
</script>

<script lang="ts">
    import dayjs from 'dayjs'
    import 'dayjs/locale/ko'
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import OrdersTable from './OrdersTable.svelte';
    import qs from 'query-string';
    import queryString from 'query-string';
    import { navigate, useLocation } from 'svelte-routing';
    import _ from 'lodash';
    import * as RadioGroup from "$lib/components/ui/radio-group/index.js";
    import { getOrders, orderList, orderGroup } from './orders.svelte';
    // import type { OrderGroupStatus } from './orders';

  
  dayjs.locale('ko')
  const location= useLocation()
  let type= $state<ViewType>(queryString.parse($location.search).type as ViewType || listType)
  let status= $state<OrderGroupStatus|'all'>(queryString.parse($location.search).status as OrderGroupStatus || statusUse)

  let { group, list }= $derived<any>({ group: $orderGroup, list: $orderList })
  
  let filterGroup= $derived(_.filter(group, group => {
    if( status == 'all' ) return true
    return group.status == status
  }))
  let joinList= $derived<any>( _.map( filterGroup, group=> {
    return {
      ...group,
      order: _.filter(list, { order_id: group.order_id })
    }
  }))

  let joinGroup= $derived<any>( _.filter( list, list=> _.find(filterGroup, { order_id: list.order_id })))
  
  getOrders()
  /* const fetchOrderList= async ()=> {
    function getSaleDate() {
      const now= dayjs().format('HH:mm')
      const overTodayTime= now <= '06:00' && now >= '00:00'
      const saleDate= overTodayTime ? dayjs().subtract(1, 'day') : dayjs()
      // const saleDate= dayjs().subtract(1, 'day') 
      return saleDate
    }
    const param:{ status?: OrderGroupStatus, sale_date: string }= {
			// tid: ['1', '2', 4],
			// status: 'use' ,
      sale_date: getSaleDate().format('YYYY-MM-DD')
		}
    const qry= queryString.stringify(param)
		
    const res= await fetch(`${import.meta.env.VITE_CORENZO_URL}/order-groups?${qry}`)
    const result= await res.json()
    
    group= result?.group
    list= result?.list && result?.list.map(item=> {
      let content
      try {
        content= JSON.parse(item.content)
      } catch (error) {
        console.log(error)
        content= item.content
      }
      return {
        ...item, 
        content
      }
    })
  }
  fetchOrderList() */


  const fetchPaid= async (params:PutParam) => {
    const res= await fetch(`${import.meta.env.VITE_CORENZO_URL}/order-group/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({status: params.status})
    })
    const result= await res.json()
    console.log(result)
    if( result.status == 'success' ) {
      getOrders()
    }
    return result
  }

  let currentQuery = queryString.parse(window.location.search);
  const makeNewParams= (key, value)=> {
    const newParams = { [key]: value }
    const updatedQuery = { ...currentQuery, ...newParams }
    const newQueryString = queryString.stringify(updatedQuery)
    const linkDetail= `${$location.pathname}?${newQueryString}`
    return linkDetail
  }
  const handleLink= (key, value)=>{
    const link= makeNewParams(key, value)
    navigate(link, { preserveScroll: true })
  }

  $inspect('조인리스트', joinGroup)

</script>

{#snippet radio(key, value)}
  <div class="flex items-center space-x-1 cursor-pointer">
    <RadioGroup.Item value={key} id={key}/>
    <label for={key} class="cursor-pointer">{value}</label>
  </div>
{/snippet}

<div class="w-full px-2 pt-20 pb-24">

  <Tabs.Root value={type} >
    <div class="max-w-screen-md mx-auto flex items-center justify-between">
      <Tabs.List class="max-w-[400px]">
        <Tabs.Trigger 
          value={listType}
          onclick={e=>handleLink('type',listType)}  
        >전체</Tabs.Trigger>
        <Tabs.Trigger 
          value={tableType}
          onclick={e=>handleLink('type',tableType)}  
        >테이블</Tabs.Trigger>
      </Tabs.List>

      <div class="">
        <RadioGroup.Root bind:value={status} class="flex gap-4" onValueChange={value=> handleLink('status', value)}>
          
          {@render radio('all', '전체' )}
          
          {#each Object.keys(orderGroupStatusKeys) as key}
            {@const value= orderGroupStatusKeys[key]}
            {@render radio(key, value)}
            
          {/each}
          
        </RadioGroup.Root>
      </div>
    </div>



    <Tabs.Content value="list">
      {#if joinGroup && joinGroup?.length > 0 }
        
        <div class="grid w-full max-w-screen-md mx-auto">
          {#each joinGroup as item}
            {@const { content, create_date }= item}
            <div class="border border-slate-300 rounded-md my-2 p-3">
              <p class="">{ content.tid }번 테이블</p>
              <span class="text-xs">{dayjs(create_date).format('YYYY-MM-DD HH:mm:ss (dd)')}</span>
              <div class="">
                <ul class="text-sm">
                  {#each content.prod as prod}
                    {@const { key, name, price, qty, option  }= prod}
                    <li class="">
                      <span class="">[{key}]</span>
                      <span class="">{name}</span>
                      {#if option}
                      <span class="text-rose-500 font-bold">[{option}]</span>
                      {/if}
                      <span class="font-bold">{price}원</span>
      
                      <span class="">- {qty}개</span>
                    </li>
                  {/each}
                </ul>
                
              </div>
              <p class="border-t mt-1.5 pt-1.5">{content.total}원</p>
            </div>
            
          {/each}
        </div>
      {:else}
        <div class="w-full max-w-screen-md mx-auto">주문건이 없습니다.</div>
      {/if}
  
    </Tabs.Content>
    <Tabs.Content value="table">
      <OrdersTable list={list} joinList={joinList} fetchPaid={fetchPaid} fetchInit={getOrders}/>
    </Tabs.Content>
  </Tabs.Root>

</div>