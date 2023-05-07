<script lang="ts">
    import { SvelteComponent } from "svelte";
    import Window from "./Window.svelte";
    import Welcome from "./contents/Welcome.svelte";

    let arrayOfWindows: Array<{ id: string; com: typeof SvelteComponent }> = [];

    function onUpdate(event?: { detail: { id: string } }) {
        if (!event) return;
        arrayOfWindows = arrayOfWindows.filter((m) => m.id != event.detail.id);
    }

    function newWindow(component?: typeof SvelteComponent) {
        const id = Date.now().toString();
        arrayOfWindows = [...arrayOfWindows, { id, com: component || Welcome }];
    }

    setTimeout(() => {
        newWindow();
    }, 2000);
</script>

{#each arrayOfWindows as w}
    <Window id={w.id} on:message={onUpdate}>
        <svelte:component this={w.com} prop={{}} />
    </Window>
{/each}
