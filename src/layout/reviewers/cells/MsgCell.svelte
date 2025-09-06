<script lang="ts">
    import { msgClick } from "../AgReviewers.svelte";
    let props= $props()
</script>

<div class="">
    <button onclick={$msgClick(props.value)}>
        {props.value}
    </button>

</div>

