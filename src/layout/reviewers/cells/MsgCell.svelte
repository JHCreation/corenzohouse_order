<script lang="ts">
    import { msgClick } from "../AgReviewers.svelte";

    // import { msgClick } from "../AgReviewers.svelte";
    msgClick
    let props= $props()
    $inspect(props)
</script>

<div class="">
    <button onclick={$msgClick(props.value)}>
        {props.value}
    </button>

</div>

