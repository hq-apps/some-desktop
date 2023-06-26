<script lang="ts">
    import { SvelteComponent } from "svelte";
    import { focusWindow } from "./lib/Window";
    import { appArray, appHasWindow } from "./lib/Apps";
    import { launcherVisible } from "./lib/Launcher";
    import { dockIconLocations, type dockIconLocationsProps } from "./lib/Dock";
    import About from "./contents/About.svelte";

    interface WindowProperties {
        id: string;
        title: string;
        windowIcon: string;
        dockIcon: string;
        com: typeof SvelteComponent;
        zindex: number;
        closeOnly: boolean;
        left: number;
        top: number;
        width: number;
        height: number;
        closed?: boolean;
    }

    export let windows: Array<WindowProperties>;

    export let focusedW: WindowProperties;

    function showLauncher() {
        launcherVisible.update(v => !v)
    }

    let dockIcons: HTMLDivElement;

    function updateIconLocations() {
        if(!dockIcons) return;
        const icons: any[] = [...dockIcons.querySelectorAll(".dock-icon")];
        dockIconLocations.set(icons.map(element => {
            const box = element.getBoundingClientRect()
            return {
                id: element.dataset.wid || null,
                x: box.x,
                y: box.y,
                width: box.width,
                height: box.height
            }
        }));
    }
    $:updateIconLocations()
    setInterval(updateIconLocations, 1000)
</script>

<div class="dock" bind:this={dockIcons}>
    <div class="dock-icon" on:click={showLauncher} on:keydown={showLauncher} style="background-color: #111;">
        <img src="/hom.svg" alt="dock" />
    </div>
    {#each $appArray as app, i}
        {#if app.pinned}
        <div class="dock-icon-wrapper">
            <div class="dock-icon" on:click={app.run} on:keydown={app.run}>
                <img src={app.logo} alt="dock" />
            </div>
        </div>
        {/if}
    {/each}
    <hr />
    {#each windows as w}
        {#if !w.closed}
        <div class="dock-icon-wrapper">
            <div
                class="dock-icon"
                data-wid={w.id}
                on:click={() => focusWindow(w.id)}
                on:keydown={() => focusWindow(w.id)}
            >
                <img src={w.dockIcon} alt="dock" />
            </div>
            {#if focusedW.id == w.id}
                <div class="ball">sex</div>
            {/if}
        </div>
        {/if}
    {/each}
</div>

<style lang="scss">
    @keyframes pop {
        from {
            scale: 0;
        }
        to {
            scale: 1;
        }
    }

    .dock {
        --icon-size: var(--dock-icon-size);
        --border-radius: var(--dock-rounding);
        --padding: var(--dock-padding);
        display: flex;
        gap: var(--padding);
        padding: var(--padding);
        background-color: var(--dock-background);
        border-radius: var(--border-radius);
        border-bottom-left-radius: var(--dock-rounding-bottom);
        border-bottom-right-radius: var(--dock-rounding-bottom);
        user-select: none;
        -webkit-user-select: none;

        .dock-icon {
            width: var(--icon-size);
            height: var(--icon-size);
            background-color: red;
            border-radius: calc(var(--border-radius) - var(--padding));
            animation: pop 250ms;
            overflow: hidden;
            transition: scale 150ms;

            &:hover {
                scale: 1.05;
            }

            &:active {
                scale: 0.95;
            }

            img {
                width: 100%;
                height: 100%;
            }
        }

        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        backdrop-filter: blur(var(--dock-blur-radius));
        -webkit-backdrop-filter: blur(var(--dock-blur-radius));
        z-index: 100000;
    }

    .dock-icon-wrapper {
        position: relative;
        padding-bottom: 5px;
    }

    .ball {
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translate(-50%);
        height: 30px;
        width: 10px;
        height: 4px;
        color: transparent;
        border-radius: 100000px;
        background-color: rgba($color: #fff, $alpha: 0.5);
    }

    @media (max-width: 1366px) {
        .dock {
            --icon-size: 64px;
            --border-radius: 30px;
            --padding: 8px;
        }
    }
</style>
