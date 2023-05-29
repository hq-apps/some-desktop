<script>
    import { fade } from "svelte/transition";
    import { appArray } from "./lib/Apps"
    import { showContextMenu } from "./lib/ContextMenu";
    import { pinApp } from "./lib/Apps";

    export let visible = false;

    function hide() {
        visible = false;
    }

    function failLoad() {
        alert("error loading app")
    }
</script>

{#if visible}
    <div id="launcher-bg" on:click={hide} on:keyup={hide} transition:fade={{duration: 200}}>
        <div id="launcher">
            <h1>App laucnher</h1>
            <ul class="apps">
            {#each $appArray as app, i}
                <li class="app" on:click={app.run || failLoad} on:keyup={app.run} on:contextmenu|preventDefault|stopPropagation={e => showContextMenu(e, [{name: "item", onClick: () => pinApp(i), displayText: "Pin"}])}>
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
        background: url("/wallpaper.jpg");
        background-size: cover;
        z-index: 99999;
    }

    #launcher {
        backdrop-filter: blur(24px);
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: "Inter", sans-serif;
    }

    .apps {
        list-style-type: none;
        width: 90%;
        height: 90%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 8px;

        .app {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            img {
                max-width: 120px;
                width: 100%;
                aspect-ratio: 1/1;
                border-radius: 40%;
            }
        }
    }
</style>
