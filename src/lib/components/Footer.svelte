<script lang="ts">
    import { tabs } from "$lib/stores/tabs";
    import { windows } from "$lib/stores/windows";
    import Button from "./buttons/Button.svelte";

</script>

<footer>
    <Button icon="/start.png">Start</Button>

    {#each $tabs as {text, src}}
        <Button icon={src}>{text}</Button>
    {/each}

    <Button 
        icon="/clock.png"
        frozen
        inset
        style="margin-left: auto;"
        on:click={() => {
            const [ tab, ...rest ] = $windows;
            $windows = [
                { ...tab, open: !tab.open },
                ...rest
            ]
        }}
    >
        11:59 PM
    </Button>
</footer>

<style>
    footer {
        display: flex;
        padding: .25em;
        gap: .25em;
        background-color: lightgray;
    }
</style>