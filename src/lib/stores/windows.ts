import Clock from "$lib/components/Clock.svelte";
import type { SvelteComponentTyped } from "svelte";
import { writable } from "svelte/store";

interface Window {
    title: string,
    open: boolean,
    focus: boolean,
    minimized: boolean,
    full: boolean,
    child: typeof SvelteComponentTyped,
    x: number,
    y: number,
    width: number,
    height: number,
}

const window: Window = {
    title: '',
    open: true,
    focus: false,
    minimized: false,
    full: false,
    child: Clock,
    x: 90,
    y: 90,
    width: 200,
    height: 250,
}

export const windows = writable([
    { ...window, title: "Clock" }
])