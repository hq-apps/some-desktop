<script lang="ts">
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
    let moving = false;
    let maximized = false;
    let lastBeforeMaximized = { l: left, t: top, w: width, h: height };

    function onMouseDown() {
        moving = true;
    }
    
    function onMouseDownShift(e: MouseEvent) {
        if(e.shiftKey) moving = true;
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

    function onMouseMove(e: MouseEvent) {
        if (moving) {
            left += e.movementX;
            top += e.movementY;
        }

        if (resizing) {
            let delta: number;
            if (direction.match("top")) {
                delta = initialPos.y - e.pageY;
                top = initialRect.top - delta;
                height = initialRect.height + delta;
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

    function onResize(event: MouseEvent) {
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

    function onMaximize() {
        if (!maximized) {
            lastBeforeMaximized = {
                l: left,
                t: top,
                w: width,
                h: height,
            };

            maximized = true;
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
        }
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
        class="window-{id} {maximized ? 'max' : ''}"
        id="window-{id}"
        style="left: {left}px; top: {top}px; width: {width}px; height: {height}px; z-index: {zindex}"
        transition:scale
        on:mousedown={(e) => {focusWindow(id); onMouseDownShift(e)}}
    >
        <div class="title draggable" on:mousedown={onMouseDown}>
            {#if windowIcon}
                <img src={windowIcon} alt="icon" />
            {/if}
            <p>{title}</p>
            <div class="action">
                <p
                    class="action-button close"
                    on:click={() => closeWindow(id)}
                    on:keydown={() => closeWindow(id)}
                />
                {#if !closeOnly}
                    <p
                        class="action-button maximize"
                        on:click={onMaximize}
                        on:keydown={onMaximize}
                    />
                    <p class="action-button minimize" />
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
            on:mouseenter={() => (direction = "right")}
            on:mouseleave={() => {
                if (!resizing) direction = null;
            }}
            on:mousedown={onResize}
        />
        <div
            class="grabber left"
            on:mouseenter={() => (direction = "left")}
            on:mouseleave={() => {
                if (!resizing) direction = null;
            }}
            on:mousedown={onResize}
        />
        <div
            class="grabber top"
            on:mouseenter={() => (direction = "top")}
            on:mouseleave={() => {
                if (!resizing) direction = null;
            }}
            on:mousedown={onResize}
        />
        <div
            class="grabber bottom"
            on:mouseenter={() => (direction = "bottom")}
            on:mouseleave={() => {
                if (!resizing) direction = null;
            }}
            on:mousedown={onResize}
        />
        <div
            class="grabber top-left"
            on:mouseenter={() => (direction = "top-left")}
            on:mouseleave={() => {
                if (!resizing) direction = null;
            }}
            on:mousedown={onResize}
        />
        <div
            class="grabber top-right"
            on:mouseenter={() => (direction = "top-right")}
            on:mouseleave={() => {
                if (!resizing) direction = null;
            }}
            on:mousedown={onResize}
        />
        <div
            class="grabber bottom-left"
            on:mouseenter={() => (direction = "bottom-left")}
            on:mouseleave={() => {
                if (!resizing) direction = null;
            }}
            on:mousedown={onResize}
        />
        <div
            class="grabber bottom-right"
            on:mouseenter={() => (direction = "bottom-right")}
            on:mouseleave={() => {
                if (!resizing) direction = null;
            }}
            on:mousedown={onResize}
        />
    </div>
{/if}
<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style lang="scss">
    [class^="window"] {
        user-select: none;
        display: flex;
        flex-direction: column;
        font-family: "Inter", sans-serif;
        border-radius: 15px;
        box-shadow: 0px 6.4px 13.8px rgba(0, 0, 0, 0.02),
            0px 12.9px 24.1px rgba(0, 0, 0, 0.028),
            0px 20px 31.6px rgba(0, 0, 0, 0.035),
            0px 29.5px 38px rgba(0, 0, 0, 0.042),
            0px 46.4px 46.9px rgba(0, 0, 0, 0.05),
            0px 100px 80px rgba(0, 0, 0, 0.07);

        &:not(.content) {
            overflow: hidden;
        }
    }
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        background: rgba($color: #fff, $alpha: 0.5);
        backdrop-filter: blur(10px);
        padding: 10px;

        img {
            width: 24px;
            height: 24px;
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
            background-color: red;
            &:hover {
                background-color: lighten(red, 20);
            }
        }

        .maximize {
            background-color: greenyellow;
            &:hover {
                background-color: lighten(greenyellow, 20);
            }
        }

        .minimize {
            background-color: yellow;
            &:hover {
                background-color: lighten(yellow, 20);
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
        background-color: rgb(250, 238, 238);
        height: 100%;
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
</style>
