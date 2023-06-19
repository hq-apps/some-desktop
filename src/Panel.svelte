<script lang="ts">
    import { DateTime } from "luxon";
    import { newWindow } from "./lib/Window";
    import About from "./contents/About.svelte";

    export let title: string;

    // Sun May 05 11:38 PM
    const format = "EEE LLL MM hh:mm a";
    let date = DateTime.now().toFormat(format);

    setInterval(() => {
        date = DateTime.now().toFormat(format);
    }, 2000);

    function showAbout() {
        newWindow({
            com: About,
            title: "About MEC OS XXX",
            dockIcon: "//hqapps.org/icens/96.png",
            closeOnly: true,
            width: 675,
            height: 360,
            tag: "about-mec",
            openOnce: true
        });
    }
</script>

<div class="panel">
    <div class="panel-left">
        <p>☰</p>
        <p class="about" on:click={showAbout} on:keydown={showAbout}>
            MEC OS XXX
        </p>
        <p><span class="stronger">{title}</span></p>
    </div>
    <div class="panel-right">
        <p>{date}</p>
    </div>
</div>

<style lang="scss">
    .panel {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        background-color: var(--panel-background);
        backdrop-filter: blur(var(--panel-blur-radius));
        -webkit-backdrop-filter: blur(var(--panel-blur-radius));
        z-index: 5000;
        width: 100%;
        height: auto;
        color: var(--panel-color);
        justify-content: space-between;
        font-family: var(--panel-font);
        padding: var(--panel-padding);
        box-sizing: border-box;
        border-radius: var(--panel-rounding);
        user-select: none;
        -webkit-user-select: none;

        .panel-left,
        .panel-right {
            display: flex;
            gap: 10px;
            padding: 0 10px;
        }

        .stronger {
            font-weight: 700;
        }
    }

    @media (max-width: 1366px) {
        .panel {
            padding: 2px;
        }
    }

    .about {
        transition: 0.4s;
        &:hover {
            color: lighten(black, 20);
            cursor: pointer;
        }
    }

    p {
        margin: 0;
    }
</style>
