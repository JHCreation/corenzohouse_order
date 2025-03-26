<script lang="ts">
	import "./app.css";
	import { Router, Link, Route, useLocation } from "svelte-routing";
	import Loading from "./components/ui/Loading.svelte";
	import Home from "./routes/Home.svelte";
	import Orders from "./routes/Orders.svelte";
	import Nav from "./layout/Nav.svelte";
	import QrGenerate from "./routes/QrGenerate.svelte";
    import queryString from "query-string";
    import Reviewers from "./routes/Reviewers.svelte";
	// console.log(subscribeToNotifications)
	let url= '';
	let loading= $state(false)
	/* async function fetchGroups() {
		const qry= queryString.stringify({
			// tid: ['1', '2', 4],
			status: 'use'
		})
		
	    const res= await fetch(`${import.meta.env.VITE_CORENZO_URL}/order-groups?${qry}`)
		console.log(await res.json())
	}
	fetchGroups() */

	
</script>

<main>
  
  <Router {url} 
	viewtransition={(r:any) => {
		console.log(r, history, window.location, window.location.pathname, 'routing')
		const regex = /^\/menus\/wine(\/.*)?$/;
		// const regex = /^\/menus\/wine\/.*$/;
		
		if( 
			// r.direction == 'in' || 
			r.direction == 'out' 
			&& !regex.test(window.location.pathname) 
		) {
			loading= true
			setTimeout(e=> loading= false, 300)
		}
		return {}
		// return { duration: 500, easing: cubicIn, css: (t) => `scale:${t};transform-origin:center center;` }
		// return { fn: fade, duration: 500 }
	}}
>
	<Nav />

  	{#if loading}
	<div class="w-full min-h-[calc(100dvh-61px)] flex items-center justify-center">
		<div class="w-24">
			<Loading />
		</div>
	</div>
	{/if}

	{#if !loading}
		<Route path="/"><Home /></Route>
		<Route path="/orders"><Orders /></Route>
		<Route path="/qr-generate"><QrGenerate /></Route>
		<Route path="/reviewers"><Reviewers /></Route>
	{/if}


</Router>
</main>
