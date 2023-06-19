<script lang="ts">
    import type { SvelteComponent } from "svelte";

    interface page {
        value: number;
        displayTitle: string;
        content: typeof SvelteComponent;
        icon?: SvelteComponent;
    }

    export let title: string;
    export let pages: page[];

    let activePageValue = 1;

    const handleClick = (value: number) => () => (activePageValue = value);
</script>

<div>
    <nav>
        <h1>{ title }</h1>
        <ul>
            {#each pages as page}
                <li class={activePageValue === page.value ? "active" : ""} on:click={handleClick(page.value)} on:keyup={handleClick(page.value)}>{ page.displayTitle }</li>
            {/each}
        </ul>
    </nav>
    <main>
        {#each pages as page}
            {#if page.value === activePageValue}
                <svelte:component this={page.content} />
            {/if}
        {/each}
    </main>
</div>

<style lang="scss">
div {
    display: flex;
    flex-direction: row;
    height: 100%;
}

nav {
    width: var(--sidebar-width);
    box-sizing: border-box;
    padding: 1em;
    color: var(--sidebar-color);
}
nav ul {
    padding: 0;
}
nav li {
    list-style: none;
    padding: var(--sidebar-list-element-padding);
    margin-bottom: var(--sidebar-list-element-margin);
    border-radius: var(--sidebar-list-element-rounding);
    background-color: var(--sidebar-list-element-background);
}

nav li.active {
    background-color: var(--sidebar-list-element-background-active);
    color: var(--sidebar-list-element-color-active);
}

main {
    background-color: var(--sidebar-template-content-background);
    width: calc(100% - var(--sidebar-width));
    border-top-left-radius: var(--sidebar-template-content-rounding);
    overflow: hidden;
}
</style>