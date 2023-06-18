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
    import Saffari from "./apps/Saffari.svelte";
    import Notz from "./apps/Notz.svelte";
    import { newWindow } from "./lib/Window";
    import Settings from "./apps/Settings.svelte";
    import { launcherVisible } from "./lib/Launcher";
    import { menuItems, pos, showMenu, menu } from "./lib/ContextMenu";

    // pos is cursor position when right click occur
    //let pos = { x: 0, y: 0 };
    // menu is dimension (height and width) of context menu
    //let menu = { h: 0, w: 0 };
    // browser/window dimension (height and width)
    let browser = { h: 0, w: 0 };
    // showMenu is state of context-menu visibility
    //let showMenu = false;
    // to display some text
    let content: HTMLDivElement;

    function rightClickContextMenu(e: MouseEvent) {
        //showMenu = true;
        browser = {
            w: window.innerWidth,
            h: window.innerHeight,
        };
        /*pos = {
            x: e.clientX,
            y: e.clientY,
        };*/
        // If bottom part of context menu will be displayed
        // after right-click, then change the position of the
        // context menu. This position is controlled by `top` and `left`
        // at inline style.
        // Instead of context menu is displayed from top left of cursor position
        // when right-click occur, it will be displayed from bottom left.
        //if (browser.h - pos.y < menu.h) pos.y = pos.y - menu.h;
        //if (browser.w - pos.x < menu.w) pos.x = pos.x - menu.w;
    }
    // @ts-ignore
    function onPageClick(e) {
        // To make context menu disappear when
        // mouse is clicked outside context menu
        showMenu.set(false);
    }
    function getContextMenuDimension(node: HTMLElement) {
        // This function will get context menu dimension
        // when navigation is shown => showMenu = true
        let height = node.offsetHeight;
        let width = node.offsetWidth;
        // @ts-ignore
        menu.set({
            height: height,
            width: width,
        });
    }
</script>

{#if $showMenu}
    <nav
        use:getContextMenuDimension
        style="position: absolute; top:{$pos.y}px; left:{$pos.x}px"
    >
        <div class="navbar" id="navbar">
            <ul>
                {#each $menuItems as item}
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
    on:click={onPageClick}
/>

<style>
    * {
        padding: 0;
        margin: 0;
    }
    nav {
        z-index: 1000000000000000000000;
    }
    .navbar {
        display: inline-flex;
        width: var(--context-menu-width);
        background-color: var(--context-menu-background);
        backdrop-filter: blur(var(--context-menu-blur-radius));
        -webkit-backdrop-filter: blur(var(--context-menu-blur-radius));
        border-radius: var(--context-menu-rounding);
        overflow: hidden;
        flex-direction: column;
    }
    .navbar ul {
        margin: var(--context-menu-padding);
    }
    ul li {
        display: block;
        list-style-type: none;
        width: 1fr;
        margin-top: var(--context-menu-item-margin);
    }
    ul li:first-child {
        margin-top: 0;
    }
    ul li button {
        font-size: var(--context-menu-font-size);
        font-family: var(--context-menu-font);
        color: var(--context-menu-color);
        width: 100%;
        height: 30px;
        text-align: left;
        border: 0px;
        background-color: var(--context-menu-item-background);
        backdrop-filter: blur(var(--context-menu-item-blur-radius));
        -webkit-backdrop-filter: blur(var(--context-menu-item-blur-radius));
        border-radius: var(--context-menu-item-rounding);
        padding: var(--context-menu-item-padding);
    }
    ul li button:hover {
        color: var(--context-menu-item-hover-color);
        text-align: left;
        border-radius: var(--context-menu-item-hover-rounding);
        background-color: var(--context-menu-item-hover-background);
        backdrop-filter: blur(var(--context-menu-item-hover-blur-radius));
        -webkit-backdrop-filter: blur(var(--context-menu-item-hover-blur-radius));
        padding: var(--context-menu-item-hover-padding);
    }
    :global(ul li button.info:hover) {
        color: navy;
    }
    hr {
        background-color: var(--context-menu-spacer-background);
        backdrop-filter: blur(var(--context-menu-spacer-blur-radius));
        -webkit-backdrop-filter: blur(var(--context-menu-spacer-blur-radius));
        margin: var(--context-menu-spacer-margin);
        height: var(--context-menu-spacer-height);
        border: 0;
        border-radius: var(--context-menu-spacer-rounding);
    }
</style>
