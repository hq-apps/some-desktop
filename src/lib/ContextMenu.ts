import { store, type Store } from "./store";

export interface contextMenuItem {
    name: string,
    onClick?: () => void,
    displayText?: string
}

export interface contextMenuPos {
    x: number,
    y: number
}

export interface contextMenuSize {
    width: number,
    height: number
}

export let menuItems: Store<Array<contextMenuItem>> = store([]);
export let pos: Store<contextMenuPos> = store({x: 0, y: 0});
export let menu: Store<contextMenuSize> = store({width: 0, height: 0});
export let showMenu: Store<boolean> = store(false);

export function showContextMenu(e: MouseEvent, options: Array<contextMenuItem>) {
    menuItems.set(options)
    pos.set({
        x: e.clientX,
        y: e.clientY,
    })
    showMenu.set(true)

    const browser = {
        w: window.innerWidth,
        h: window.innerHeight,
    };

    console.log(browser)

    const posnow = pos.get()
    const menunow = menu.get()

    if (browser.h - posnow.y < menunow.height) pos.update(p => { return { x: p.x, y: posnow.y - menunow.height } });
    if (browser.w - posnow.x < menunow.width) pos.update(p => { return { x: posnow.x - menunow.width, y: p.y } });
}