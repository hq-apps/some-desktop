<script lang="ts">
    export let bg: string = "var(--window-content-background)";
</script>

<main style="--bg: {bg}">
    <slot />
</main>

<style>
    main {
        width: 100%;
        min-height: 100%;
        background: var(--bg);
        margin: 0;
    }
</style>