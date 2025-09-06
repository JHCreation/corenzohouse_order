<script lang="ts">
	import * as Collapsible from "$lib/components/ui/collapsible/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
    import _, { keyBy } from "lodash";
    import queryString from "query-string";
    import { Link, useLocation } from "svelte-routing";
    import { cn } from "~/lib/utils";
	import { handleLogout, log, setLog } from "~/components/auth/authorize.svelte";
	const location= useLocation()
	let search= $derived(queryString.parse($location.search))

	let {
		items,
	}: {
		items: {
			title: string;
			url: string;
			// this should be `Component` after @lucide/svelte updates types
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			icon?: any;
			isActive?: boolean;
			items?: {
				title: string;
				url: string;
				searchParams?: any
			}[];
		}[];
	} = $props();

	const isSameSearch= (params)=> {
		// console.log(params)
		if( params && !_.isEmpty(params) ) {
			const res= Object.keys(params)?.some(key=> {
				return params[key] != search[key]
			})
			return !res
		}
		return true
		
	}
	$inspect(log, $location.search, _.assign(queryString.parse($location.search)) )

	const isParentActive = (item) => {
		if (!item.items) return false;
		return item.items.some((subItem) => {
			const isCurrent = subItem.url === $location.pathname;
			const sameSearch = isSameSearch(subItem?.searchParams);
			return isCurrent && sameSearch;
		});
	};

</script>
{#if $log && $log?.access_token}
<Sidebar.Group>
	<Sidebar.GroupLabel>메뉴</Sidebar.GroupLabel>
	<Sidebar.Menu>
		{#each items as item (item.title)}
			{#if !(item as any).permission  || (item as any).permission?.includes($log.usertype)} <!-- --- IGNORE --- -->
			<Collapsible.Root open={item.isActive} class="group/collapsible">
				{#snippet child({ props })}
					<Sidebar.MenuItem {...props}>
						<Collapsible.Trigger>
							{#snippet child({ props })}
								<Sidebar.MenuButton {...props} tooltipContent={item.title}
									class={cn({ 'bg-sidebar-accent': isParentActive(item) })}
								>
									{#if item.icon}
										<item.icon />
									{/if}
									<span class={cn({ 'font-bold': isParentActive(item) })}>
										{item.title}
									</span>
									<ChevronRightIcon
										class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
									/>
								</Sidebar.MenuButton>
							{/snippet}
						</Collapsible.Trigger>
						<Collapsible.Content>
							<Sidebar.MenuSub>
								{#each item.items ?? [] as subItem (subItem.title)}
									{@const searchParams=subItem?.searchParams ? `?${queryString.stringify(subItem?.searchParams)}`: ''}
									{@const isCurrent= subItem.url == $location.pathname}
									{@const sameSearch=isSameSearch(subItem?.searchParams)}
									
									<!-- {console.log(subItem.title,sameSearch)} -->
									<Sidebar.MenuSubItem>
										<Sidebar.MenuSubButton>
											{#snippet child({ props })}
												<Link to={`${subItem.url}${searchParams}`} {...props}
													class={cn({
														'font-bold': isCurrent && sameSearch
													})}
												>
													<span>{subItem.title}</span>
												</Link>
											{/snippet}
										</Sidebar.MenuSubButton>
									</Sidebar.MenuSubItem>
								{/each}
							</Sidebar.MenuSub>
						</Collapsible.Content>
					</Sidebar.MenuItem>
				{/snippet}
			</Collapsible.Root>
			{/if} <!-- --- IGNORE --- -->
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
{/if}