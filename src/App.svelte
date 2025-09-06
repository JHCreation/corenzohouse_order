<script lang="ts" module>
	import "./app.css";
	import { Router, Link, Route, useLocation } from "svelte-routing";

    import dayjs from "dayjs";
    import Login from "./routes/Login.svelte";
    import AuthGuard from "./components/auth/AuthGuard.svelte";
	import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query'
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools'
    import Sidebar from "./layout/nav/Sidebar.svelte";
    import { routes } from "./routes/routes";

	let url= '';
	document.addEventListener("visibilitychange", () => {
		if (document.visibilityState === "visible") {
			console.log("사용자가 페이지로 돌아왔습니다!", dayjs().format('HH:mm:ss'));
			// 페이지가 다시 보이게 되었을 때 수행할 작업
		} else if (document.visibilityState === "hidden") {
			console.log("사용자가 페이지를 떠났습니다.", dayjs().format('HH:mm:ss'));
			// 페이지가 보이지 않게 되었을 때 수행할 작업
		}
	});

	export const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: Infinity,
				// staleTime: 3000,
			},
		},
	})
</script>
  
<QueryClientProvider client={queryClient}>
  	<Router {url}>
		<Route path="/login"><Login /></Route>
		<AuthGuard>
			<Sidebar>
				{#each routes as route}
					<Route path={route.path} let:params>
						<route.component />
					</Route>
				{/each}
			</Sidebar>
		</AuthGuard>
	</Router>
	<SvelteQueryDevtools />
</QueryClientProvider>
