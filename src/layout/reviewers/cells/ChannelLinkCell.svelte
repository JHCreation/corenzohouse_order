<script lang="ts">
    let props= $props()
    // $inspect(props)
</script>

<div class="">
{#if props?.valueFormatted }
    {#each Object.keys(props?.valueFormatted) as channelName}
        {#each props.valueFormatted[channelName] as link}
            {@const regex = /https?:\/\/[^\s\/]+(?:\.[^\s\/]+)*\/[a-zA-Z0-9-_]+/g}
            {@const linkUrl= link.value.match(regex) || link.value}
            <div class="text-ellipsis overflow-hidden leading-[1.2]" title={linkUrl}>
                <a href={linkUrl} target="_blank" class=" hover:underline hover:text-rose-500 text-emerald-400">
                    {linkUrl}
                </a>
            </div>
        {/each}
    {/each}
{/if}

</div>

