import Saffari from "./apps/Saffari.svelte"
import Notz from "./apps/Notz.svelte";
import { newWindow } from "./lib/Window";

export const apps = [
    {
        "name": "Saffari",
        "logo": "https://saffari.tk/icon.png",
        "run": () => newWindow({
            title: "Saffari",
            com: Saffari,
            dockIcon: "/notz.png",
            width: 1060,
            height: 600,
        }),
    },
    {
        "name": "Notz",
        "logo": "/notz.png",
        "run": () => newWindow({
            title: "Notz",
            com: Notz,
            dockIcon: "/notz.png",
            width: 320,
            height: 600,
            tag: "notz-main",
            openOnce: true
        }),
        "windowTags": ["notz-main"]
    }
]