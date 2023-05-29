import { store, type Store } from "./store";

interface appProperties {
    name: string,
    logo: string,
    pinned?: boolean
}

export let apps: Store<Array<appProperties>> = store([]);