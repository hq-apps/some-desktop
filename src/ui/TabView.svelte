<script>
    export let items = [];
    export let activeTabValue = 1;

    const handleClick = (tabValue) => () => (activeTabValue = tabValue);
</script>

<div class="tabview">
    <div class="tabs">
        <ul>
            {#each items as item}
                <li class={activeTabValue === item.value ? "active" : ""}>
                    <span
                        on:click={handleClick(item.value)}
                        on:keyup={handleClick(item.value)}>{item.label}</span
                    >
                </li>
            {/each}
        </ul>
    </div>
    {#each items as item}
        {#if activeTabValue == item.value}
            <div class="box">
                <svelte:component this={item.component} />
            </div>
        {/if}
    {/each}
</div>

<style lang="scss">
    .tabview {
        margin: 8px;
    }
    .box {
        padding-top: 8px;
        border: rgba($color: #333, $alpha: 0.3) 1px solid;
        border-radius: 8px;
    }
    .tabs {
        display: flex;
        justify-content: center;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        padding: 0;
        border-radius: 8px;
        overflow: hidden;
        margin: 0;
        margin-bottom: -15px;
        background-color: rgba($color: #fff, $alpha: 0.6);
        border: rgba($color: #333, $alpha: 0.3) 1px solid;
        border-radius: 8px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

        transition: all 250ms;
    }

    span {
        background-color: rgba($color: #fefafa, $alpha: 1);
        border: rgba($color: #333, $alpha: 0.3) 1px solid;
        display: block;
        padding: 0.5em 1em;
        cursor: pointer;
        transition: all 250ms;
        font-size: 13px;
    }

    span:hover {
        border-color: #e9ecef #e9ecef #dee2e6;
    }

    li.active > span {
        background-color: rgba($color: #fdfbfb, $alpha: 1);
        border-color: #dee2e6 #dee2e6 #fff;
    }
</style>
