<script lang="ts">
    export let icon: string | null = null;
    export let cssClass = '';
    export let type = "button";
    export let style = '';
    export let frozen = false;
    export let disabled = false;
    export let inset = false;

    if (frozen) cssClass += 'btn-static ';
    if (inset) cssClass += 'btn-inset';
</script>

<button {type} class={`btn ${cssClass}`} {style} {disabled} on:click>
    {#if icon}
        <img src={icon} alt={"Icon"} />
    {/if}
    <slot />
</button>

<style>
    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .25em;
        padding: .2em .3em;
        align-items: center;
        border-top: 3px solid white;
        border-left: 3px solid white;
        border-right: 3px solid rgb(50, 50, 50);
        border-bottom: 3px solid rgb(50, 50, 50);
        background-color: lightgray;
        color: black;
    }

    .btn:active,
    .btn-inset {
        border-top: 3px solid rgb(20, 20, 20);
        border-left: 3px solid rgb(20, 20, 20);
        border-right: 3px solid white;
        border-bottom: 3px solid white;
        
        filter: brightness(110%);
        
        box-shadow: none;
    }

    .btn:active {
        transform: translateY(2px);
    }

    img {
        max-width: 28px;
    }

    .btn-static:active {
        transform: none;
    }
</style>