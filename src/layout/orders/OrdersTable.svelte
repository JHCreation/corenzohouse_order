<script lang="ts">
	import dayjs from 'dayjs';
	import _ from 'lodash'
    import Button from '~/lib/components/ui/button/button.svelte';
    import { orderGroupStatusKeys, type OrderGroupStatus } from './OrdersIndex.svelte';
    import { navigate } from 'svelte-routing';
    import { deleteOrder, deleteOrderItem } from './orders.svelte';
	
    // import { orderGroupStatusKeys, orderStatusKeys } from './orders';
	
	let { list, joinList, fetchPaid, fetchInit }= $props()
	let listByTables= $derived<any>(_.groupBy(joinList, 'table_id'))
	
	// let listByTable= $derived<any>(_.groupBy(list, 'content.tid'))

	const tables= [1,2,3,4,5,6,7,8,9,10,11,12]

	$effect(()=> {
		groupPriceByType(listByTables)
	})

	const groupPriceByType= (listByTables)=> {
		const orderLists= {}
		const orderList:any[]= []
		const list= tables.map(key=> {
			// console.log(key, listByTables[key])
			if( listByTables[key] ) {
				orderLists[key]= 
				// const prodlist= 
				listByTables[key].map(orderGroup=> {
					const prd= orderGroup.order.map(order=> {
						// console.log(order, _.get(order, 'content.prod'))	
						return _.get(order, 'content.prod')
					})
					const list= _.flatten(prd)
					const group= _.groupBy(list, 'key')
					// console.log(group)
					Object.keys(group).map(key=> {
						const total= _.sumBy(group[key], (item:any) => _.toNumber(item.price.replace(/,/g, '')) ) 
						group[key]= total as any
						console.log()
					})
					return {
						order_id: orderGroup.order_id,
						priceGroup: group
					}
				})
				// orderList.push(prodlist)
			}
			
		})
		// console.log(orderLists)
		return orderLists
	}
	let listByPrice= $derived<any>(groupPriceByType(listByTables))
	// $inspect('status', listByTables, list, listByPrice)
</script>



<div class="">
	
	<div class="grid grid-cols-1 md:grid-cols-3 gap-2 max-w-screen-2xl mx-auto">
		{#each tables as key}
			<div class="border  rounded-md p-2">
				<div class="flex justify-between">
					<p class="text-lg font-extrabold">{key}번 테이블</p>
					<a href={`${import.meta.env.VITE_LOCAL_URL}?tid=${key}&nopush=1`} target="_blank" class="">
						<Button size={'sm'} class="text-xs py-2 px-4 h-auto" >추가상품</Button> 
					</a>
				</div>
				{#each listByTables[key] as orderGroup}
					{@const orderId= orderGroup.order_id}
					{@const stautsKey:OrderGroupStatus= orderGroup.status}
					{@const stautsValue= orderGroupStatusKeys[orderGroup.status]}
					<div class={`bg-gray-200 border- border-red-600 px-1 py-1 my-1 ${stautsKey == 'paid' ? 'opacity-35' : '' }`}>
						<div class="flex justify-between">
							<p class="">{stautsValue}</p>
							
						</div>
						{#each orderGroup.order as order}
							{@const { content, create_date }= order}
							<div class="border border-slate-400 py-1 px-2 my-1">
								<div class="flex items-center justify-between">
									<span class="text-xs">{dayjs(create_date).format('YYYY-MM-DD HH:mm:ss (dd)')}</span>
									<Button
										onclick={async (e)=> {
											const res= await deleteOrderItem({ key: order.key })
											if( res > 0 ) fetchInit()
										}}
										size="sm"
										class="text-2xs h-auto px-3 py-0.5 bg-rose-500"
									>
									삭제
									</Button>
								</div>
								<div class="">
									<ul class="text-xs break-keep">
										{#each content.prod as prod}
											{@const { key, name, price, qty, option  }= prod}
											<li class="">
												<span class="">[{key}]</span>
												<span class="">{name}</span>
												{#if option}
													<span class="text-red-600 font-bold">[{option}]</span>
												{/if}
												<span class="">{price}원</span>
	
												<span class="text-red-600 font-bold">{qty}개</span>
											</li>
										{/each}
									</ul>
	
								</div>
								<p class="text-cyan-600 font-bold text-xs">{content.total}원</p>
								
							</div>
						{/each}

						

						<div class="flex items-center justify-between">
							<!-- <Button size={'sm'} class="text-xs py-2 px-4 h-auto"
								onclick={e=> deleteOrder({ order_id:orderGroup.order_id })}
							>삭제</Button> -->
							{#if stautsKey != 'paid'}
								<Button size={'sm'} class="text-xs py-2 px-4 h-auto"
									onclick={e=> fetchPaid({id:orderGroup.order_id, status: 'paid'})}
								>결제</Button>
							{/if}

							{#if listByPrice}
								{@const currentOrder= listByPrice[key].find(o=> o.order_id==orderId)}
								<ul class="w-full flex flex-wrap">
									{#each Object.keys(currentOrder.priceGroup) as key}
									<li class="text-2xs leading-4 px-2">
										<span class="font-bold">[{key} 합]</span>
										<span class="font-bold text-red-700">{currentOrder.priceGroup[key].toLocaleString()}원</span>
									</li>
									{/each}
								</ul>
							{/if}
							<div class="text-red-500 text-sm font-black mx-1 text-nowrap">
								{_.sumBy(orderGroup.order, function (o:any) { 
									// console.log(_.parseInt(o.content.total.replace(/,/g, '')))
									return _.parseInt(o.content.total.replace(/,/g, ''))
								}).toLocaleString()}원
							</div>
						</div>
					</div>
	
				{/each}
			</div>
	
		{/each}
	</div>
</div>