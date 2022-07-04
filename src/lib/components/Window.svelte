<script lang="ts">
    import { draggable } from "$lib/actions/draggable";
    import { resizable } from "$lib/actions/resizable";
    import { fade, slide, scale } from "svelte/transition";
    import Button from "$lib/components/buttons/Button.svelte";
    import { onDestroy, onMount, tick } from "svelte";
    import { browser } from "$app/env";

    export let title = "Untitled Window";
    export let icon: string | null = null;
    export let close: (e: MouseEvent) => any = () => null;
    export let minimize: (e: MouseEvent) => any = () => null;

    export let x: number | undefined = undefined;
    export let y: number | undefined = undefined;
    export let width: number | undefined = undefined;
    export let height: number | undefined = undefined;

    let style = '';
    let window: HTMLDivElement;
    let full = false;
    let shrinking = false;

    let lastBox: DOMRect;

    if (x) style += `left: ${x}px; `;
    if (y) style += `top: ${y}px; `;
    if (width) style += `width: ${width}px`;
    if (height) style += `height: ${height}px`;
 

    onMount(async () => {
        lastBox = window.getBoundingClientRect();

        await tick();

        window.style.height = `${window.scrollHeight}px`;

        // lastBox = window.getBoundingClientRect();
    })

    onDestroy(() => {

        if (!browser) return;

        const box = window.getBoundingClientRect();

        // x = box.left;
        // y = box.top;
        // width = box.width;
        // height = box.height;        


    });

    function onClose(e: MouseEvent) {
        e.stopPropagation();
        close(e);
        console.log("close");
    }

    function onMinimize(e: MouseEvent) {

        console.log("MIN")

        e.stopPropagation();
        minimize(e);
    }

    function onMaximize(e: MouseEvent) {

        console.log("MAX");
        
        if (!full) growWindow();
        else shrinkWindow();
        
        full = !full;
        shrinking = !full;
    }

    function growWindow() {
        lastBox = window.getBoundingClientRect();
        window.style.top = `0`;
        window.style.left = `0`;
    }

    function shrinkWindow() {
        window.style.top = `${lastBox.y}px`;
        window.style.left = `${lastBox.x}px`;
        window.style.width = `${lastBox.width}px`;
        window.style.height = `${lastBox.height}px`;

        setTimeout(() => {
            shrinking = !shrinking;
        }, 1000);
    }
</script>

<div 
    class="window" 
    class:full
    class:shrinking
    bind:this={window} 
    {style} 
    use:draggable 
    use:resizable={{moveWhenShrunk: true}}
    transition:scale|local
    on:draggablemove={async () => full = false}
>
    <div class="resize-handle resize-nw"></div>
    <div class="resize-handle resize-ne"></div>
    <div class="resize-handle resize-sw"></div>
    <div class="resize-handle resize-se"></div>
    <div class="resize-handle resize-n"></div>
    <div class="resize-handle resize-s"></div>
    <div class="resize-handle resize-e"></div>
    <div class="resize-handle resize-w"></div>

    <header class="window-header">
        <div 
            class="window-header-left drag-area" 
            on:dblclick={onMaximize}
        >
            <div class="window-title">

                {#if icon}
                    <img src="" alt="Clock" />
                {/if}
                
                <p><b>{title}</b></p>
            </div>
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
        <!-- <pre>{JSON.stringify($tabs, null, 4)}</pre> -->
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
    }
    
    .window-body {
        flex: 1;
        background-color: lightblue;
        overflow: auto;
        display: flex;
        flex-direction: column;
    }

    .full {
       transition: all .5s ease;

       top: 0;
       left: 0;
       right: 0;
       bottom: 0;
       min-width: calc(100%);
       min-height: calc(100%);
    }

    .shrinking {
        transition: all .5s ease;
    }

    .window-header {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        background-color: teal;
        color: white;
        border-bottom: 2px solid black;
        user-select: none;
        position: sticky;
    }

    .window-header-left {
        background-color: green;
        flex: 1;
        padding: .3em;
        position: relative;
    }
    
    .window-title {
        width: min-content;
        position: sticky;
        left: 5px;
    }

    .full .window-header-left {
        left: auto;
    }

    .window-header-right {
        display: flex;
        margin-left: auto;
        align-items: center;
        gap: .2em;
        z-index: 1;
        padding-right: .2em;
    }
</style>