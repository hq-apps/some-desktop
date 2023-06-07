import { store, type Store } from "./store";
import { apps } from "../apps";
import { arrayOfWindows } from "./Window";

interface appProperties {
    name: string,
    logo: string,
    run?: () => void,
    pinned?: boolean,
    windowTags?: string[]
}

export let appArray: Store<Array<appProperties>> = store(apps);

export function pinApp(id: number) {
    appArray.update(e => {
        e[id].pinned = true
        return e
    })

    console.log(appArray.get())
}

export function unpinApp(id: number) {
    appArray.update(e => {
        e[id].pinned = false
        return e
    })

    console.log(appArray.get())
}

export function appHasWindow(id: number) {
    let count = 0;
    const windows = arrayOfWindows.get()
    appArray.get()[id].windowTags.forEach(e => {
        windows.forEach(e2 => {
            if(e2.tag == e) count++
        })
    })
    return count
}