<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let id: string;

    export let left = screen.width / 2 - 100;
    export let top = screen.height / 2 - 100;
    let width: number = 200;
    let height: number = 300;

    let moving = false;

    function onMouseDown() {
        moving = true;
    }

    let initialPos: { x: number; y: number };
    let initialRect: {
        width: number;
        height: number;
        left: number;
        right: number;
        top: number;
        bottom: number;
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

    function onClose() {
        dispatch("message", { id });
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
        const rect = document
            .getElementById(`window-${id}`)
            .getBoundingClientRect();
        initialRect = {
            width: rect.width,
            height: rect.height,
            left: rect.left,
            right: rect.right,
            top: rect.top,
            bottom: rect.bottom,
        };
    }
</script>

<div
    class="window-{id}"
    id="window-{id}"
    style="left: {left}px; top: {top}px; width: {width}px; height: {height}px;"
>
    <div class="title draggable" on:mousedown={onMouseDown}>
        <p>EPIK</p>
        <div class="action">
            <p
                class="action-button close"
                on:click={onClose}
                on:keydown={onClose}
            />
            <p class="action-button maximize" />
            <p class="action-button minimize" />
        </div>
    </div>
    <div class="content">
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

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style lang="scss">
    [class^="window"] {
        user-select: none;
        display: flex;
        flex-direction: column;
        font-family: "Inter", sans-serif;
        border-radius: 15px;
        overflow: hidden;
    }
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        background: rgba($color: #fff, $alpha: 0.5);
        backdrop-filter: blur(10px);
        padding: 10px;

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
            cursor: pointer;
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

    .content {
        margin: 0;
        background-color: rgb(245, 228, 228);
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

    :global(.hide-grabber .grabber) {
        background: transparent !important;
        border: none !important;
    }

    :global(.grabber.selected) {
        border: solid 1px black;
    }
</style>
