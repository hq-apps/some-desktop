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
</div>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style lang="scss">
    [class^="window"] {
        user-select: none;
        display: flex;
        flex-direction: column;
        font-family: "Inter", sans-serif;
        border-radius: 22px;
        overflow: hidden;
    }
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        background: rgba($color: #fff, $alpha: 0.5);
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

        .action-button {
            width: 25px;
            height: 25px;
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
        background-color: white;
    }
</style>
