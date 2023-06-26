import { store, type Store } from "./store";

export interface dockIconLocationsProps {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export let dockIconLocations: Store<Array<dockIconLocationsProps>> = store([]);