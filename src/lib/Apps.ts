import { store, type Store } from "./store";
import { apps } from "../apps";

interface appProperties {
    name: string,
    logo: string,
    run?: () => void,
    pinned?: boolean
}

export let appArray: Store<Array<appProperties>> = store(apps);

export function pinApp(id: number) {
    appArray.update(e => {
        e[id].pinned = true
        return e
    })

    console.log(appArray.get())
}