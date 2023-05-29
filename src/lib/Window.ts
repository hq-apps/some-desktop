import type { SvelteComponent } from "svelte";
import Welcome from "../contents/Welcome.svelte";
import { store, type Store } from "./store";

export interface WindowProperties {
    id: string;
    title: string;
    windowIcon: string;
    dockIcon: string;
    com: typeof SvelteComponent;
    zindex: number;
    closeOnly: boolean;
    left: number;
    top: number;
    width: number;
    height: number;
    scrollBar: boolean;
    closed?: boolean;
}

export interface WindowOption {
    title: string;
    windowIcon?: string;
    dockIcon: string;
    closeOnly?: boolean;
    com?: typeof SvelteComponent;
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    scrollBar?: boolean;
}

export let arrayOfWindows: Store<Array<WindowProperties>> = store([]);
export let currentZ: Store<number> = store(10);
export let currentWindow: Store<WindowProperties | null> = store(null);

export function newWindow(opt?: WindowOption) {
    const id =
        Date.now().toString() +
        (Math.random() * 1000).toString(4).slice(0, 4);
    arrayOfWindows.update(v => {
        let z = currentZ.get()
        z++
        currentZ.set(z)
        return [
            ...v,
            {
                id,
                com: opt?.com || Welcome,
                zindex: z,
                dockIcon: opt?.dockIcon || "/fallback.png",
                title: opt?.title || "Sample Title",
                windowIcon: opt?.windowIcon || "/fallback.png",
                closeOnly: !opt?.closeOnly ? false : opt.closeOnly,
                width: opt?.width || 500,
                height: opt?.height || 500,
                top: opt?.top || screen.height / 2 - (opt?.height || 500) / 2,
                left: opt?.left || screen.width / 2 - (opt?.width || 500) / 2,
                scrollBar: opt?.scrollBar == undefined ? true : opt?.scrollBar,
            },
        ];
    })
    currentWindow.set(arrayOfWindows.get().at(-1))
}

export function closeWindow(id: string) {
    arrayOfWindows.update(u => {
        for (let i = 0; i < u.length; i++) {
            const e = u[i];
            if (e.id == id) {
                u[i].closed = true
            }
        }
        return u
    })
    setTimeout(() => {
        arrayOfWindows.update(u => {
            if (u.every(e => e.closed)) {
                u = []
            }
            return u
        })
    }, 300)
}

export function focusWindow(id: string) {
    arrayOfWindows.update(u => {
        for (let i = 0; i < u.length; i++) {
            const elm = u[i];
            if (elm.id == id) {
                let z = currentZ.get()
                z++
                currentZ.set(z)
                currentWindow.set(elm);
                u[i].zindex = z;
            }
        }
        return u;
    })
}