<script lang="ts">
	import { dockIconLocations } from './lib/Dock';
    import { scale } from "svelte/transition";
    import { closeWindow, focusWindow } from "./lib/Window";

    export let id: string;
    export let title: string;
    export let windowIcon: string;
    export let zindex: number = 0;
    export let closeOnly: boolean;
    export let scrollbar: boolean;

    export let initLeft: number;
    export let initTop: number;
    export let initWidth: number;
    export let initHeight: number;

    let left = initLeft;
    let top = initTop;
    let width = initWidth;
    let height = initHeight;

    export let closed: boolean = false;
    export let minimized: boolean = false;
    let moving = false;
    let maximized = false;
    let lastBeforeMaximized = { l: left, t: top, w: width, h: height };

    let initialOffset: { x: number; y: number };
    let wasMoving = false;

    function onMouseDown() {
        if(maximized) return;
        moving = true;
    }
    
    function onMouseDownShift(e: PointerEvent) {
        if(e.shiftKey) moving = true; initialOffset = { x: e.offsetX, y: e.offsetY }
    }

    let initialPos: { x: number; y: number };
    let initialRect: {
        width: number;
        height: number;
        left: number;
        top: number;
    } = {
        width,
        height,
        left,
        top,
    };

    async function onMouseMove(e: PointerEvent) {
        if (moving) {
            // this code was only rewritten cuz e.movementX/Y was missing undocumented in safari on iOS
            if(!wasMoving) {
                initialOffset = { x: e.offsetX, y: e.offsetY };
                wasMoving = true;
            }
            left = e.pageX - initialOffset.x
            const topNew = e.pageY - initialOffset.y
            top = topNew > 35 ? topNew : 35;
        } else {
            wasMoving = false
        }

        if (resizing) {
            let delta: number;
            if (direction.match("top")) {
                delta = initialPos.y - e.pageY;
                top = e.pageY > 35 ? initialRect.top - delta : 35;
                height = e.pageY > 35 ? initialRect.height + delta : initialRect.height + initialRect.top - 35;
            }
            if (direction.match("bottom")) {
                delta = e.pageY - initialPos.y;
                height = initialRect.height + delta;
            }
            if (direction.match("left")) {
                delta = initialPos.x - e.pageX;
                width = initialRect.width + delta;
                left = initialRect.left - delta;
            }
            if (direction.match("right")) {
                delta = e.pageX - initialPos.x;
                width = initialRect.width + delta;
            }
        }
    }

    function onMouseUp() {
        moving = false;
        if (resizing) {
            resizing = false;
        }
    }

    let resizing = false;
    let direction:
        | "top"
        | "left"
        | "right"
        | "bottom"
        | "top-right"
        | "top-left"
        | "bottom-left"
        | "bottom-right"
        | null = null;

    function onResize(event: PointerEvent) {
        if (direction == null) return;
        resizing = true;
        initialPos = { x: event.pageX, y: event.pageY };
        initialRect = {
            width,
            height,
            left,
            top,
        };
    }

    let maximizeAnimation = false;

    function onMaximize() {
        if (!maximized) {
            lastBeforeMaximized = {
                l: left,
                t: top,
                w: width,
                h: height,
            };

            maximized = true;
            maximizeAnimation = true;
            top = 20;
            left = 0;
            width = Math.max(
                document.body.scrollWidth,
                document.body.offsetWidth
            );
            height = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight
            );
        } else {
            maximized = false;
            top = lastBeforeMaximized.t;
            left = lastBeforeMaximized.l;
            width = lastBeforeMaximized.w;
            height = lastBeforeMaximized.h;
            setTimeout(() => {maximizeAnimation = false;}, 500)
        }
    }
    let dockIconLocation = {x: 0, y: 0};

    function onMinimize(id: string) {
        const location = dockIconLocations.get().filter(l => l.id === id)[0];
        dockIconLocation = {x: Math.floor(location.x - location.width / 2 - (width/2) + 100 - left), y: Math.floor(location.y - location.height / 2 - (height/2) + 100 - top)};

        console.log("location: ", dockIconLocation);
        minimized = true;
    }
</script>

<!-- <p>
    {id}
    top: {top}; left: {left}; width: {width}; height: {height}; x: {initialPos?.x};
    y: {initialPos?.y};
</p>
<p>resizing: {resizing}; direction: {direction}; moving: {moving};</p> -->
{#if !closed}
    <div
        class="window-{id} {maximized ? 'max' : ''} {maximizeAnimation ? 'max-animation' : ''} {minimized ? 'minimized' : ''}"
        id="window-{id}"
        style="left: {left}px; top: {top}px; width: {width}px; height: {height}px; z-index: {zindex}; --dock-icon-location-x: {dockIconLocation.x}px; --dock-icon-location-y: {dockIconLocation.y}px;"
        transition:scale
        on:pointerdown={(e) => {focusWindow(id); onMouseDownShift(e)}}
    >
        <div class="title draggable" on:pointerdown={onMouseDown}>
            {#if windowIcon}
                <img src={windowIcon} alt="icon" />
            {/if}
            <p>{title}</p>
            <div class="action">
                <p
                    class="action-button close"
                    on:click={() => closeWindow(id)}
                    on:pointerdown={() => closeWindow(id)}
                    on:keydown={() => closeWindow(id)}
                />
                {#if !closeOnly}
                    <p
                        class="action-button maximize"
                        on:click={onMaximize}
                        on:pointerdown={onMaximize}
                        on:keydown={onMaximize}
                    />
                    <p class="action-button minimize"
                        on:click={() => onMinimize(id)}
                        on:pointerdown={() => onMinimize(id)}
                        on:keydown={() => onMinimize(id)}
                    />
                {/if}
            </div>
        </div>
        <div
            class="content"
            style={scrollbar ? "overflow: scroll;" : "overflow: hidden;"}
        >
            <slot />
        </div>
        <div
            class="grabber right"
            on:pointerenter={() => (direction = "right")}
            on:pointerleave={() => {
                if (!resizing) direction = null;
            }}
            on:pointerdown={onResize}
        />
        <div
            class="grabber left"
            on:pointerenter={() => (direction = "left")}
            on:pointerleave={() => {
                if (!resizing) direction = null;
            }}
            on:pointerdown={onResize}
        />
        <div
            class="grabber top"
            on:pointerenter={() => (direction = "top")}
            on:pointerleave={() => {
                if (!resizing) direction = null;
            }}
            on:pointerdown={onResize}
        />
        <div
            class="grabber bottom"
            on:pointerenter={() => (direction = "bottom")}
            on:pointerleave={() => {
                if (!resizing) direction = null;
            }}
            on:pointerdown={onResize}
        />
        <div
            class="grabber top-left"
            on:pointerenter={() => (direction = "top-left")}
            on:pointerleave={() => {
                if (!resizing) direction = null;
            }}
            on:pointerdown={onResize}
        />
        <div
            class="grabber top-right"
            on:pointerenter={() => (direction = "top-right")}
            on:pointerleave={() => {
                if (!resizing) direction = null;
            }}
            on:pointerdown={onResize}
        />
        <div
            class="grabber bottom-left"
            on:pointerenter={() => (direction = "bottom-left")}
            on:pointerleave={() => {
                if (!resizing) direction = null;
            }}
            on:pointerdown={onResize}
        />
        <div
            class="grabber bottom-right"
            on:pointerenter={() => (direction = "bottom-right")}
            on:pointerleave={() => {
                if (!resizing) direction = null;
            }}
            on:pointerdown={onResize}
        />
    </div>
{/if}
<svelte:window on:pointermove={onMouseMove} on:pointerup={onMouseUp} on:pointercancel={() => console.log("cancel")}/>

<style lang="scss">
    [class^="window"] {
        user-select: none;
        -webkit-user-select: none;
        display: flex;
        flex-direction: column;
        font-family: var(--window-font);
        border-radius: var(--window-rounding);
        box-shadow: 0px 6.4px 13.8px rgba(0, 0, 0, 0.02),
            0px 12.9px 24.1px rgba(0, 0, 0, 0.028),
            0px 20px 31.6px rgba(0, 0, 0, 0.035),
            0px 29.5px 38px rgba(0, 0, 0, 0.042),
            0px 46.4px 46.9px rgba(0, 0, 0, 0.05),
            0px 100px 80px rgba(0, 0, 0, 0.07);

        &:not(.content) {
            overflow: hidden;
        }
        touch-action: none;
        background: var(--window-title-background);
        backdrop-filter: blur(var(--window-blur-radius));
        -webkit-backdrop-filter: blur(var(--window-blur-radius));
        transition: transform 500ms, opacity 500ms;
    }
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--window-title-padding);

        img {
            width: var(--window-icon-size);
            height: var(--window-icon-size);
        }
        p {
            margin: 0;
        }

        .action {
            display: flex;
            flex-direction: row-reverse;
            gap: 8px;
        }

        .action-button {
            width: 16px;
            height: 16px;
            border-radius: 50%;
        }

        .close {
            background-color: var(--window-close-color);
            &:hover {
                background-color: var(--window-close-color-hover);
            }
        }

        .maximize {
            background-color: var(--window-maximize-color);
            &:hover {
                background-color: var(--window-maximize-color-hover);
            }
        }

        .minimize {
            background-color: var(--window-minimize-color);
            &:hover {
                background-color: var(--window-minimize-color-hover);
            }
        }
    }

    @media (max-width: 1366px) {
        .title {
            padding: 5px;
        }
    }

    .content {
        margin: 0;
        // background-color: var(--window-content-background);
        height: 100%;
        touch-action: none;
        position: relative;
    }

    :global(.grabber) {
        position: absolute;
        box-sizing: border-box;
        opacity: 0;
    }

    :global(.grabber.right) {
        width: 10px;
        height: 100%;
        background: red;
        right: -5px;
        cursor: col-resize;
    }

    :global(.grabber.left) {
        width: 10px;
        height: 100%;
        background: blue;
        left: -5px;
        cursor: col-resize;
    }

    :global(.grabber.top) {
        height: 10px;
        width: 100%;
        background: green;
        top: -5px;
        cursor: row-resize;
    }

    :global(.grabber.bottom) {
        height: 10px;
        width: 100%;
        background: orange;
        bottom: -5px;
        cursor: row-resize;
    }

    :global(.grabber.top-left) {
        height: 20px;
        width: 20px;
        background: orange;
        top: -10px;
        left: -10px;
        cursor: nw-resize;
        border-radius: 100%;
    }

    :global(.grabber.top-right) {
        height: 20px;
        width: 20px;
        background: orange;
        top: -10px;
        right: -10px;
        cursor: ne-resize;
        border-radius: 100%;
    }

    :global(.grabber.bottom-left) {
        height: 20px;
        width: 20px;
        background: green;
        bottom: -10px;
        left: -10px;
        cursor: sw-resize;
        border-radius: 100%;
    }

    :global(.grabber.bottom-right) {
        height: 20px;
        width: 20px;
        background: green;
        bottom: -10px;
        right: -10px;
        cursor: se-resize;
        border-radius: 100%;
    }

    .max {
        border-radius: 0;
    }

    .max-animation {
        transition: top 500ms, left 500ms, width 500ms, height 500ms, border-radius 500ms;
    }

    @keyframes minimize {
        from {
            transform: translate(0, 0);
        }
        to {
            
        }
    }
    .minimized {
        transform: translate(var(--dock-icon-location-x), var(--dock-icon-location-y)) scale(0.1);
        opacity: 0;
    }
</style>
