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
            <p class="close" on:click={onClose} on:keydown={onClose}></p>
            <p class="maximize"></p>
            <p class="minimize"></p>
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
        display: flex;
        flex-direction: column;
        font-family: 'Inter', sans-serif;
        border-radius: 22px;
        overflow: hidden;
    }
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        background: rgba($color: #FFF, $alpha: 0.5);
        backdrop-filter: blur(10px);
        padding: 16px;

        p {
            margin: 0;
        }

        .action {
            display: flex;
            flex-direction: row-reverse;
            gap: 8px;
        }

        .close {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background-color: red;
            cursor: pointer;
            &:hover {
                background-color: rgb(255, 62, 62);
            }
        }

        .maximize {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background-color: greenyellow;
            cursor: pointer;
            &:hover {
                background-color: rgb(208, 255, 138);
            }
        }

        .minimize {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background-color: yellow;
            cursor: pointer;
            &:hover {
                background-color: rgb(255, 255, 80);
            }
        }

    }

    .content {
        margin: 0;
        background-color: white;
    }
</style>
