import { newWindow } from "../../../src/lib/Window";
import Notz from "./Notz.svelte";
// yes but we want it to just click await import("") i see, but it's much better to just use this instead
newWindow({
    title: "Notz!",
    dockIcon: "/notz.png",
    com: Notz
})