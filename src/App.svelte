<script lang="ts">
    import Window from "./Window.svelte";
    import Dock from "./Dock.svelte";
    import Panel from "./Panel.svelte";
    import ContextMenu from "./ContextMenu.svelte";
    import { arrayOfWindows, currentWindow, newWindow } from "./lib/Window";

    setTimeout(() => {
        newWindow();
        // setTimeout(() => {
        //     newWindow({
        //         dockIcon: "/notz.png",
        //         title: "EPIK",
        //         com: Welcome2,
        //     });
        // }, 300);
    }, 2000);
</script>

<Panel title={!$currentWindow?.title ? "Desktop" : $currentWindow.title} />
<ContextMenu />
{#each $arrayOfWindows as w}
    <Window
        id={w.id}
        title={w.title}
        windowIcon={w.windowIcon || null}
        zindex={w.zindex}
        closeOnly={w.closeOnly}
        initWidth={w.width}
        initHeight={w.height}
        initTop={w.top}
        initLeft={w.left}
        scrollbar={w.scrollBar}
        closed={w.closed}
    >
        <svelte:component this={w.com} prop={{}} />
    </Window>
{/each}

<Dock windows={$arrayOfWindows} focusedW={$currentWindow} />
