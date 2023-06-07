<script lang="ts">
	import Launcher from './Launcher.svelte';
    import Window from "./Window.svelte";
    import Dock from "./Dock.svelte";
    import Panel from "./Panel.svelte";
    import ContextMenu from "./ContextMenu.svelte";
    import Saffari from './apps/Saffari.svelte';
    import Notz from './apps/Notz.svelte';
    import Settings from './apps/Settings.svelte';
    import { arrayOfWindows, currentWindow, newWindow } from "./lib/Window";
    import { launcherVisible } from './lib/Launcher';
    import { showContextMenu, type contextMenuItem } from './lib/ContextMenu';

    setTimeout(() => {
        newWindow({title: "Welcome", dockIcon: "/fallback.png"});
        // setTimeout(() => {
        //     newWindow({
        //         dockIcon: "/notz.png",
        //         title: "EPIK",
        //         com: Welcome2,
        //     });
        // }, 300);
    }, 2000);
    function launchSaffari() {
        newWindow({
            title: "Saffari",
            com: Saffari,
            dockIcon: "/notz.png",
            width: 1060,
            height: 600,
        });
    }
    async function launchNotz() {
        newWindow({
            title: "Notz",
            com: Notz,
            dockIcon: "/notz.png",
            width: 320,
            height: 600,
        });
    }
    async function launcher() {
        launcherVisible.set(true)
    }
    function setting() {
        newWindow({
            title: "setingz",
            com: Settings,
            dockIcon: "/notz.png",
            width: 200,
            height: 300,
        });
    }
    let desktopMenuItems: Array<contextMenuItem> = [
        {
            name: "addItem",
            onClick: launchSaffari,
            displayText: "Saffari",
        },
        {
            name: "addItem",
            onClick: launchNotz,
            displayText: "Notz",
        },
        {
            name: "hr",
        },
        {
            name: "trash",
            onClick: setting,
            displayText: "AAAAAAAAA",
        },
        {
            name: "AppsLauncher",
            onClick: launcher,
            displayText: "AppsLauncher",
        },
    ];
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

<Launcher bind:visible={$launcherVisible}/>

<svelte:body on:contextmenu|preventDefault={e => showContextMenu(e, desktopMenuItems)} />