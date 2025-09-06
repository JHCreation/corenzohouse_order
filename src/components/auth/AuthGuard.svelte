<script lang="ts">
    import { navigate, useLocation } from "svelte-routing";
    import { authorization, log, loginUrl, setLog } from "./authorize.svelte";
    import queryString from "query-string";
    const { children, gate=false }= $props()
    const location= useLocation()
    const searchParams = new URLSearchParams($location.search);
    const path= searchParams.get('referer')
    const referer= path ?? `${$location.pathname}${$location.search}`
    
    $effect(()=> {
        // console.log('라우팅 시점: ', path)
        if( $log?.state == null ) {
            authorization({log: $log, setLog});
            return
        }
        if( !$log?.is_login ) {
            if( referer == loginUrl) return navigate(loginUrl);
            const qsReferer= `?${queryString.stringify({referer})}`
            navigate(`${loginUrl}${qsReferer}`)
        }
    })
    $inspect(gate, $log)
</script>

{#if gate || $log?.is_login}
    {@render children?.()}
{/if}
