<script lang="ts">
    import { SvelteComponent } from "svelte";
    import Window from "./Window.svelte";
    import Welcome from "./contents/Welcome.svelte";
    import Dock from "./Dock.svelte";
    import Welcome2 from "./contents/Welcome2.svelte";
    import Panel from "./Panel.svelte";
    import About from "./contents/About.svelte";
    import { writable, type Writable } from "svelte/store";

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
        scrollBar: boolean;
        closed?: boolean;
    }

    interface WindowOption {
        title: string;
        windowIcon?: string;
        dockIcon: string;
        closeOnly?: boolean;
        com?: typeof SvelteComponent;
        left?: number;
        top?: number;
        width?: number;
        height?: number;
        scrollBar?: boolean;
    }
    // I STILL DON'T UNDERSTAND
    let arrayOfWindows: Writable<Array<WindowProperties>> = writable([]);

    let currentZ = 10;
    let currentWindow: WindowProperties;

    type TypeAction = "close" | "launch" | "focus";

    function onUpdate(event?: { detail: { id: string; type: TypeAction } }) {
        if (!event) return;
        switch (event.detail.type) {
            case "close":
                console.log(event.detail.id);
                console.log($arrayOfWindows);
                const filtered = $arrayOfWindows.map((m) => {
                    if (m.id == event.detail.id) {
                        m.closed = true;
                    }
                    return m;
                });
                arrayOfWindows.set(filtered);
                if ($arrayOfWindows.every((e) => e.closed)) {
                    setTimeout(() => {
                        arrayOfWindows.set([]);
                    }, 300);
                }
                // if (arrayOfWindows. === 1) { //hellish code dont use
                //     arrayOfWindows = [];
                // } else {
                //     // do you really try to hard check this shit lmao
                //     arrayOfWindows = arrayOfWindows.filter(
                //         (m) => m.id !== event.detail.id
                //     );
                // }
                console.log($arrayOfWindows);
                break;
            case "launch":
                newWindow();
                break;
            case "focus":
                for (let i = 0; i < $arrayOfWindows.length; i++) {
                    const elm = $arrayOfWindows[i];
                    if (elm.id == event.detail.id) {
                        currentWindow = elm;
                        $arrayOfWindows[i].zindex = currentZ++;
                    }
                }
                break;
        }
    }

    function newWindow(opt?: WindowOption) {
        const id =
            Date.now().toString() +
            (Math.random() * 1000).toString(4).slice(0, 4);
        $arrayOfWindows = [
            ...$arrayOfWindows,
            {
                id,
                com: opt?.com || Welcome,
                zindex: currentZ++,
                dockIcon: opt?.dockIcon || "/notz.png",
                title: opt?.title || "Sample Title",
                windowIcon: opt?.windowIcon || "/notz.png",
                closeOnly: !opt?.closeOnly ? false : opt.closeOnly,
                width: opt?.width || 500,
                height: opt?.height || 500,
                top: opt?.top || screen.height / 2 - (opt?.height || 500) / 2,
                left: opt?.left || screen.width / 2 - (opt?.width || 500) / 2,
                scrollBar: opt?.scrollBar == undefined ? true : opt?.scrollBar,
            },
        ];
        currentWindow = $arrayOfWindows.at(-1);
    }

    function showAbout() {
        newWindow({
            com: About,
            title: "About MEC OS XXX",
            dockIcon: "//hqapps.org/icens/96.png",
            closeOnly: true,
            width: 600,
            height: 400,
        });
    }

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

<Panel
    title={!currentWindow?.title ? "Desktop" : currentWindow.title}
    on:about={showAbout}
/>

{#each $arrayOfWindows as w}
    <Window
        id={w.id}
        on:message={onUpdate}
        title={w.title}
        windowIcon={w.windowIcon || null}
        zindex={w.zindex}
        closeOnly={w.closeOnly}
        initWidth={w.width}
        initHeight={w.height}
        initTop={w.top}
        initLeft={w.left}
        scrollbar={w.scrollBar}
    >
        <svelte:component this={w.com} prop={{}} />
    </Window>
{/each}

<Dock
    windows={$arrayOfWindows}
    focusedW={currentWindow}
    on:message={onUpdate}
/>
