<script>
    import { fade } from "svelte/transition";
    import { appArray } from "./lib/Apps"
    import { showContextMenu } from "./lib/ContextMenu";
    import { pinApp, unpinApp } from "./lib/Apps";

    export let visible = false;

    function hide() {
        visible = false;
    }

    function failLoad() {
        alert("error loading app")
    }

    function togglePin(id) {
        if(appArray.get()[id].pinned) unpinApp(id)
        else pinApp(id)
    }
</script>

{#if visible}
    <div id="launcher-bg" on:click={hide} on:keyup={hide} transition:fade={{duration: 200}}>
        <div id="launcher">
            <h1>App laucnher</h1>
            <ul class="apps">
            {#each $appArray as app, i}
                <li class="app" on:click={app.run || failLoad} on:keyup={app.run} on:contextmenu|preventDefault|stopPropagation={e => showContextMenu(e, [{name: "item", onClick: () => togglePin(i), displayText: app.pinned ? "Unpin" : "Pin"}])}>
                    <img src={app.logo} alt="">
                    <p>{ app.name }</p>
                </li>
            {/each}
            </ul>
        </div>
    </div>
{/if}

<style lang="scss">
    #launcher-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: var(--launcher-wallpaper);
        background-size: cover;
        z-index: 99999;
    }

    #launcher {
        backdrop-filter: blur(var(--launcher-blur-radius));
        -webkit-backdrop-filter: blur(var(--launcher-blur-radius));
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: var(--launcher-font);
        background: var(--launcher-background);
    }

    .apps {
        list-style-type: none;
        width: 90%;
        height: 90%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(auto-fill, 160px);
        gap: 8px;

        .app {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            img {
                max-width: var(--launcher-icon-size);
                width: 100%;
                aspect-ratio: 1/1;
                border-radius: var(--launcher-icon-rounding);
            }
        }
    }
</style>
