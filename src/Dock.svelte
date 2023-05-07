<script lang="ts">
    export let windows
</script>

<div class="dock">
    {#each windows as w}
    <div class="dock-icon">
        <img src="{w.dockIcon}" alt="">
    </div>
    {/each}
</div>

<style lang="scss">
    @keyframes pop {
        from {
            width: 0;
            height: 0;
        }
        to {
            width: 96px;
            height: 96px;
        }
    }

    .dock {
        display: flex;
        gap: 9px;
        padding: 9px;
        background-color: rgba($color: #FFF, $alpha: 0.5);
        border-radius: 40px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;

        .dock-icon {
            width: 96px;
            height: 96px;
            background-color: red;
            border-radius: 31px;
            animation: pop 250ms;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
            }
        }

        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        backdrop-filter: blur(12px);
    }
</style>