<script lang="ts">
import { onMount } from "svelte";


    let hour = 11;
    let minute = 59;
    let second = 0;
    let ampm = 'PM';

    function format(num: number) {
        if (num.toString().length === 1) {
            return `0${num}`;
        }

        return num.toString();
    }

    onMount(() => {
        setInterval(() => {
            if (second >= 9) second = -1;
            second += 1;
        }, 1000);
    })

    $: h = format(hour);
    $: m = format(minute);
    $: s = format(second);
</script>

<div>
    {h} : {m} : {s} {ampm}
</div>


<style>
    div {
        padding: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        font-size: 3rem;
    }
</style>