<script lang="ts">
	import NavProjects from "$lib/components/nav-projects.svelte";
	import TeamSwitcher from "$lib/components/team-switcher.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { onMount, type ComponentProps } from "svelte";
    import { menuData } from "./menu-data";
    import Button from "~/lib/components/ui/button/button.svelte";
    import { Link } from "svelte-routing";
    import NavMain from "./nav-main.svelte";
    import NavUser from "./nav-user.svelte";

	let {
		ref = $bindable(null),
		collapsible = "icon",
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();
	
	onMount(()=> {
		console.log('app sidebar on mount!')
	})
</script>

<Sidebar.Root {collapsible} {...restProps}>
	<Sidebar.Header>
		<!-- <TeamSwitcher teams={data.teams} /> -->
		<Sidebar.MenuButton
			size="lg"
			class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
		>
			{#snippet child({ props })}
				<Link to="/" {...props}>
					<div
						class="bg-white text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
					>
						<!-- <img src={Emblem} alt="logo" class=""> -->
						<!-- <GalleryVerticalEndIcon class="size-4" /> -->

					</div>
					<div class="flex flex-col gap-0.5 leading-none">
						<span class="font-bold">코렌초 오더</span>
					</div>
				</Link>
			{/snippet}
		</Sidebar.MenuButton>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={menuData.navMain} />
		<!-- <NavProjects projects={data.projects} /> -->
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={menuData.user} userMenu={menuData.userMenu} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
