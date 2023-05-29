import Saffari from "./apps/Saffari.svelte"
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
        "name": "Saffari",
        "logo": "https://saffari.tk/icon.png"
    },
    {
        "name": "Saffari",
        "logo": "https://saffari.tk/icon.png"
    }
]