<script>
    import Head from "$lib/components/Head.svelte";
    import { title } from "$lib/stores/title";

    $title = 'Blog';
</script>

<Head title={$title} />

<div>Blog</div>