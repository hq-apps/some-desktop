<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let id: string;

    export let left = 100;
    export let top = 100;

    let moving = false;

    function onMouseDown() {
        moving = true;
    }

    function onMouseMove(e: { movementX: number; movementY: number }) {
        if (moving) {
            left += e.movementX;
            top += e.movementY;
        }
    }

    function onMouseUp() {
        moving = false;
    }

    function onClose() {
        dispatch("message", { id });
    }
</script>

<div class="window-{id}" style="left: {left}px; top: {top}px;">
    <div class="title draggable" on:mousedown={onMouseDown}>
        <p>EPIK</p>
        <div class="action">
            <p class="close" on:click={onClose} on:keydown={onClose}>X</p>
        </div>
    </div>
    <div class="content">
        <slot />
    </div>
</div>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style lang="scss">
    [class^="window"] {
        user-select: none;
    }
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        background: rgb(131, 58, 180);
        background: linear-gradient(
            90deg,
            rgba(131, 58, 180, 1) 0%,
            rgba(253, 29, 29, 1) 50%,
            rgba(252, 176, 69, 1) 100%
        );

        p {
            margin: 0;
        }

        .close:hover {
            color: white;
            cursor: pointer;
        }
    }

    .content {
        background-color: antiquewhite;
    }
</style>
