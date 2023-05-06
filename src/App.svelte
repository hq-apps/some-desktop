<script lang="ts">
    import Window from "./Window.svelte";

    let arrayOfWindows: Array<{ id: string }> = [];
    const id = Date.now().toString();
    arrayOfWindows.push({ id });

    function onUpdate(event?: { detail: { id: string } }) {
        if (!event) return;
        arrayOfWindows = arrayOfWindows.filter((m) => m.id != event.detail.id);
    }
</script>

{#each arrayOfWindows as w}
    <Window id={w.id} on:message={onUpdate}>
        <h1>Hello world buddy</h1>
    </Window>
{/each}
