<script lang="ts">
    import { SvelteComponent } from "svelte";
    import Window from "./Window.svelte";
    import Welcome from "./contents/Welcome.svelte";

    let arrayOfWindows: Array<{ id: string; com: typeof SvelteComponent }> = [];
    const id = Date.now().toString();
    arrayOfWindows.push({ id, com: Welcome });

    function onUpdate(event?: { detail: { id: string } }) {
        if (!event) return;
        arrayOfWindows = arrayOfWindows.filter((m) => m.id != event.detail.id);
    }
</script>

{#each arrayOfWindows as w}
    <Window id={w.id} on:message={onUpdate}>
        <svelte:component this={w.com} prop={{}} />
    </Window>
{/each}
