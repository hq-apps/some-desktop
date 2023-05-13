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
            width: 600,
            height: 400,
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
        background-color: rgba(255, 255, 255, 0.555);
        backdrop-filter: blur(12px);
        z-index: 5000;
        width: 100%;
        height: auto;
        color: black;
        justify-content: space-between;
        font-family: "Inter", sans-serif;
        padding: 8px;
        box-sizing: border-box;

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
