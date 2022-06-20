import { writable } from "svelte/store"

const tab = {
    src: '',
    text: '',
    open: false,
    focussed: false,
    minimized: false
}

const defaultTabs = [
    {
        ...tab,
        open: true,
        src: '/ie.png',
        text: 'Internet Explorer'
    },
    {
        ...tab,
        src: '/notepad.png', 
        text: 'untitled - Notepad',
    }
]


export const tabs = writable([...defaultTabs]);