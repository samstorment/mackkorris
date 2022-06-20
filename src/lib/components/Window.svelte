<script lang="ts">
    import { draggable } from "$lib/actions/draggable";
    import Button from "$lib/components/buttons/Button.svelte";

    export let title = "Untitled Window";
    export let icon: string | null = null;
    export let close: (e: MouseEvent) => any = () => null;
    export let minimize: (e: MouseEvent) => any = () => null;

    export let t: number | null = null;
    export let l: number | null = null;

    let style = '';

    if (t) style += `top: ${t}px; `;
    if (l) style += `left: ${l}px; `;

    function onClose(e: MouseEvent) {
        e.stopPropagation();
        close(e);
        console.log("close");
    }

    function onMinimize(e: MouseEvent) {
        e.stopPropagation();
        minimize(e);
    }

    console.log(style);
</script>

<div class="window" {style} use:draggable>
    <header class="window-header drag-area">
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
                style="width: 30px; height: 30px; font-size: 2rem;"
            >
                -
            </Button>
            <Button 
                frozen
                on:click={onClose}
                style="width: 30px; height: 30px; font-size: 2rem;"
            >
                &times;
            </Button>
        </div>
    </header>

    <div class="window-body">
        <slot />
    </div>
</div>

<style>
    .window {
        position: absolute;
        border: 6px double black;
        background-color: white;
        min-width: 0;
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

</style>