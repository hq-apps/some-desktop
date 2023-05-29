import { store, type Store } from "./store";

export interface contextMenuItem {
    name: string,
    onClick?: () => void,
    displayText?: string
}

export let menuItems: Store<Array<contextMenuItem>> = store([]);
export let pos: Store<Object> = store({x: 0, y: 0});
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

    //if (browser.h - pos.get().y < menu.h) pos.y = pos.y - menu.h;
    //if (browser.w - pos.get().x < menu.w) pos.x = pos.x - menu.w;
}