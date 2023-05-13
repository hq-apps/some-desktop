<script lang="ts">
    let failure: boolean = false;
    let url: string = "https://swisscows.com";

    function onLoad(
        e: Event & {
            currentTarget: EventTarget & Element;
        }
    ) {
        confirm("LOADDDDDED!");
    }
</script>

<input type="text" bind:value={url} />
{#if failure}
    <p>fuck off</p>
{:else}
    <iframe
        src={url}
        title="very fun"
        on:load={onLoad}
        on:error={() => (failure = true)}
    />
{/if}

<style>
    iframe {
        width: 100%;
        height: 100%;
    }
</style>
