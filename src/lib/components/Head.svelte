<script lang="ts">
    import { title as tit } from '$lib/stores/title';

    export let title = "Mack Korris";
    export let description = "A guy who copies and edits";
    export let permalink = "https://www.instagram.com/nogood_sharks/?hl=en";

    $tit = title;
</script>

<svelte:head>
        
    <!-- Global Metadata -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <!-- <link rel="icon" type="image/x-icon" href="/favicon.ico" /> -->

    <!-- Primary Meta Tags -->
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={permalink} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content="https://mackkorris.vercel.app/social.png" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={permalink} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content="https://mackkorris.vercel.app/social.png" />

    <slot />
</svelte:head>