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
	$inspect('status', listByTables, list)
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
									<ul class="text-xs">
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
							<div class="text-red-500 text-sm font-black mx-1">
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