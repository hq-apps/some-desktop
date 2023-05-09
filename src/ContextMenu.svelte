<!-- 
Github @dukenmarga, July 2022
Context Menu is small menu that displayed when user right-click the mouse on browser.
Think of it as a way to show Refresh option on Microsoft Windows when right-click on desktop.
Known bug:
    - If the browser loads the content for the first time, showMenu set to false.
    Hence, we cannot get menu.h and menu.y dimension, since context menu has not been available at DOM.
    The first right click will not shown properly when right-click occurs around the edge (bottom part
    and right part) of the browser.

Inspired from: Context Menu https://svelte.dev/repl/3a33725c3adb4f57b46b597f9dade0c1?version=3.25.0
-->

<script lang="ts">
    // pos is cursor position when right click occur
    let pos = { x: 0, y: 0 };
    // menu is dimension (height and width) of context menu
    let menu = { h: 0, w: 0 };
    // browser/window dimension (height and width)
    let browser = { h: 0, w: 0 };
    // showMenu is state of context-menu visibility
    let showMenu = false;
    // to display some text
    let content: HTMLDivElement;

    function rightClickContextMenu(e: MouseEvent) {
        showMenu = true;
        browser = {
            w: window.innerWidth,
            h: window.innerHeight,
        };
        pos = {
            x: e.clientX,
            y: e.clientY,
        };
        // If bottom part of context menu will be displayed
        // after right-click, then change the position of the
        // context menu. This position is controlled by `top` and `left`
        // at inline style.
        // Instead of context menu is displayed from top left of cursor position
        // when right-click occur, it will be displayed from bottom left.
        if (browser.h - pos.y < menu.h) pos.y = pos.y - menu.h;
        if (browser.w - pos.x < menu.w) pos.x = pos.x - menu.w;
    }
    // @ts-ignore
    function onPageClick(e) {
        // To make context menu disappear when
        // mouse is clicked outside context menu
        showMenu = false;
    }
    function getContextMenuDimension(node: HTMLElement) {
        // This function will get context menu dimension
        // when navigation is shown => showMenu = true
        let height = node.offsetHeight;
        let width = node.offsetWidth;
        // @ts-ignore
        menu = {
            h: height,
            w: width,
        };
    }
    function addItem() {}
    function print() {}
    function zoom() {}
    function remove() {}
    function setting() {}
    let menuItems = [
        {
            name: "addItem",
            onClick: addItem,
            displayText: "SEX",
        },
        {
            name: "emptyicons",
            onClick: addItem,
            displayText: "SEXn",
        },
        {
            name: "zoom",
            onClick: zoom,
            displayText: "EWFGRTHYJU",
        },
        {
            name: "printMenu",
            onClick: print,
            displayText: "SEEEEEEEEX",
        },
        {
            name: "hr",
        },
        {
            name: "settings",
            onClick: setting,
            displayText: "[POR]",
        },
        {
            name: "hr",
        },
        {
            name: "trash",
            onClick: remove,
            displayText: "AAAAAAAAA",
        },
    ];
</script>

<div class="content" bind:this={content}>Right click somewhere!</div>

{#if showMenu}
    <nav
        use:getContextMenuDimension
        style="position: absolute; top:{pos.y}px; left:{pos.x}px"
    >
        <div class="navbar" id="navbar">
            <ul>
                {#each menuItems as item}
                    {#if item.name == "hr"}
                        <hr />
                    {:else}
                        <li>
                            <button on:click={item.onClick}
                                >{item.displayText}</button
                            >
                        </li>
                    {/if}
                {/each}
            </ul>
        </div>
    </nav>
{/if}

<svelte:window
    on:contextmenu|preventDefault={rightClickContextMenu}
    on:click={onPageClick}
/>

<style>
    * {
        padding: 0;
        margin: 0;
    }
    .navbar {
        display: inline-flex;
        width: 170px;
        background-color: rgba(255, 255, 255, 0.589);
        backdrop-filter: blur(20px);
        border-radius: 10px;
        overflow: hidden;
        flex-direction: column;
    }
    .navbar ul {
        margin: 6px;
    }
    ul li {
        display: block;
        list-style-type: none;
        width: 1fr;
    }
    ul li button {
        font-size: 1rem;
        color: #222;
        width: 100%;
        height: 30px;
        text-align: left;
        border: 0px;
        background-color: rgba(255, 255, 255, 0.589);
        backdrop-filter: blur(20px);
        border-radius: 10px;
    }
    ul li button:hover {
        color: #000;
        text-align: left;
        border-radius: 5px;
        background-color: rgba(230, 230, 230, 0.589);
        backdrop-filter: blur(20px);
    }
    :global(ul li button.info:hover) {
        color: navy;
    }
    hr {
        background-color: rgba(255, 255, 255, 0.589);
        backdrop-filter: blur(20px);
        margin: 5px 0px;
    }
</style>
