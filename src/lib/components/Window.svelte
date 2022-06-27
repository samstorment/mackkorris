<script lang="ts">
    import { draggable } from "$lib/actions/draggable";
    import { resizable } from "$lib/actions/resizable";
    import { fade, slide, scale } from "svelte/transition";
    import Button from "$lib/components/buttons/Button.svelte";
    import { onMount, tick } from "svelte";

    export let title = "Untitled Window";
    export let icon: string | null = null;
    export let close: (e: MouseEvent) => any = () => null;
    export let minimize: (e: MouseEvent) => any = () => null;

    export let t: number | null = null;
    export let l: number | null = null;

    let style = '';
    let window: HTMLDivElement;
    let header: HTMLElement;
    let full = false;
    let shrinking = false;

    let lastBox: DOMRect;

    if (t) {
        style += `top: ${t}px; `;
    }

    if (l) {
        style += `left: ${l}px; `;
    }

    onMount(async () => {
        lastBox = window.getBoundingClientRect();
        console.log("HEIGHT BEFORE", window.scrollHeight);

        await tick();

        console.log("HEIGHT AFTER", window.scrollHeight);
        window.style.height = `${window.scrollHeight}px`;


        // lastBox = window.getBoundingClientRect();
    })

    function onClose(e: MouseEvent) {
        e.stopPropagation();
        close(e);
        console.log("close");
    }

    function onMinimize(e: MouseEvent) {
        e.stopPropagation();
        minimize(e);
    }

    function onMaximize(e: MouseEvent) {
        
        if (!full) {
            growWindow();
        }
        else {
            shrinkWindow();
            
            setTimeout(() => {
                shrinking = !shrinking;
            }, 1000);
        }
        
        full = !full;
        shrinking = !full;
    }

    function growWindow() {
        lastBox = window.getBoundingClientRect();
        window.style.top = ``;
        window.style.left = ``;
    }

    function shrinkWindow() {
        window.style.top = `${lastBox.y}px`;
        window.style.left = `${lastBox.x}px`;
        window.style.width = `${lastBox.width}px`;
        window.style.height = `${lastBox.height}px`;
    }
</script>

<div 
    class="window" 
    class:full
    class:shrinking
    bind:this={window} 
    {style} 
    use:draggable 
    use:resizable 
    transition:scale|local
    on:draggablemove={() => { if (full) { shrinkWindow(); full = !full; } }}
>
    <div class="resize-handle resize-nw"></div>
    <div class="resize-handle resize-ne"></div>
    <div class="resize-handle resize-sw"></div>
    <div class="resize-handle resize-se"></div>
    <div class="resize-handle resize-n"></div>
    <div class="resize-handle resize-s"></div>
    <div class="resize-handle resize-e"></div>
    <div class="resize-handle resize-w"></div>

    <header
        class="window-header drag-area"
        on:dblclick={onMaximize}
    >
        <div class="window-header-left">

            {#if icon}
                <img src="" alt="Clock" />
            {/if}

            <p><b>{title}</b></p>
        </div>

        <div class="window-header-right">
            <Button 
                frozen
                on:click={onMinimize}
                style="width: 30px; height: 30px; font-size: 2rem; justify-content: center;"
            >
                -
            </Button>
            <Button 
                frozen
                on:click={onMaximize}
                style="width: 30px; height: 30px; font-size: 2rem; justify-content: center;"
            >
                &#9633;
            </Button>
            <Button 
                frozen
                on:click={onClose}
                style="width: 30px; height: 30px; font-size: 2rem; justify-content: center;"
            >
                &times;
            </Button>
        </div>
    </header>

    <div class="window-body">
        <pre>{JSON.stringify(lastBox, null, 4)}</pre>
        <slot />
    </div>    

</div>

<style>
    .window {
        position: absolute;
        background-color: white;
        min-width: 0;
        min-height: max-content;
        display: flex;
        flex-direction: column;
        outline: 2px solid black;
        /* overflow-y: scroll; */
        /* top: 0;
        left: 0; */

        /* width: '';
        height: ''; */
    }
    
    .window-body {
        flex: 1;
        background-color: lightblue;
        overflow: auto;
    }

    .full {
       transition: all 1s ease;

       top: 0;
       left: 0;
       right: 0;
       bottom: 0;
       min-width: calc(100%);
       min-height: calc(100%);
    }

    .shrinking {
        transition: all 1s ease;
        animation-fill-mode: backwards;
    }

    .window-header {
        display: flex;
        flex-shrink: 0;
        gap: 1em;
        align-items: center;
        background-color: teal;
        color: white;
        border-bottom: 2px solid black;
        padding: .2em;
        user-select: none;
        position: sticky;
    }

    .window-header-left {
        flex-shrink: 0;
    }

    .window-header-right {
        display: flex;
        margin-left: auto;
        align-items: center;
        gap: .2em;
    }

    .resize-handle {
        position: absolute;
        z-index: 1;
    }
    
    .resize-n,
    .resize-s {
        display: flex;
        background-color: purple;
        height: 6px;
        width: 100%;
    }
    
    .resize-w,
    .resize-e {
        width: 6px;
        background-color: orange;
        height: 100%;
    }

    .resize-n {
        cursor: n-resize;
        top: -3px;
    }

    .resize-s {
        cursor: s-resize;
        bottom: -3px;
    }
    
    .resize-e {
        cursor: e-resize;
        right: -3px;
    }

    .resize-w {
        cursor: w-resize;
        left: -3px;
    }

    .resize-nw,
    .resize-ne,
    .resize-sw,
    .resize-se {
        position: absolute;
        background-color: red;
        width: 6px;
        height: 6px;
        z-index: 2;
    }

    .resize-nw {
        top: -3px;
        left: -3px;
        cursor: nw-resize;
    }

    .resize-ne {
        top: -3px;
        right: -3px;
        cursor: ne-resize;
    }

    .resize-sw {
        bottom: -3px;
        left: -3px;
        cursor: sw-resize;
    }

    .resize-se {
        bottom: -3px;
        right: -3px;
        cursor: se-resize;
    }
</style>