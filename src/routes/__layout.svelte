<script lang="ts">
    import Footer from '$lib/components/Footer.svelte';
    import Head from '$lib/components/Head.svelte';
    import Header from '$lib/components/Header.svelte';
    import '../styles/app.css';
    import '../styles/resizable.css';

    let u: Zod.infer<typeof User> | null;


</script>

<div id="inner-page">

    <Header />
    <main>    
        <pre>{JSON.stringify($session.user, null, 4)}</pre>
        <slot />
    </main>
    <Footer />

</div>


<style>
	#inner-page {
        flex: 1;
		display: flex;
		flex-direction: column;
		border: 2px solid black;
	}

	main {
		flex: 1;
        display: flex;
        flex-direction: column;
	}
</style>
