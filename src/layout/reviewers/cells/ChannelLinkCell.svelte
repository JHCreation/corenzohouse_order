<script lang="ts">
    let props= $props()
    // $inspect(props)
</script>

<div class="">
{#if props?.valueFormatted }
    {#each Object.keys(props?.valueFormatted) as channelName}
        {#each props.valueFormatted[channelName] as link}
        <div class="text-ellipsis overflow-hidden leading-[1.2]" title={link.value}>
            <a href={link.value} target="_blank" class=" hover:underline hover:text-rose-500 text-emerald-400">
                {link.value}
            </a>
        </div>
        {/each}
    {/each}
{/if}

</div>

