<script>
    import Head from "$lib/components/Head.svelte";
    import Window from "$lib/components/Window.svelte";
    import { windows } from "$lib/stores/windows";
    import { session } from '$app/stores';


    const links = [
        { src: '/blog.png', href: '/blog', text: 'Blog Posts'},
        { src: '/creations.png', href: '/creations', text: 'Creations'},
        { src: '/cool.png', href: '/share', text: 'Cool Stuff'},
        { src: '/photos.png', href: '/photos', text: 'Photos'},
        { src: '/music.png', href: '/music', text: 'Music'},
    ]

    let open = true;
</script>

<Head title="MacK Korris" />

{#each $windows as w}
    {#if w.open}
        <Window 
            title={w.title} 
            close={() => w.open = false}
            bind:x={w.x}
            bind:y={w.y}
        >
            <svelte:component this={w.child} />
        </Window>
    {/if}
{/each}

<div id="page">
    <section id="mack-info" aria-labelledby="mack">
        <h2 id="mack">MacK Korris</h2>
        <p>A guy who copies and edits</p>
    </section>

    <section id="links">
        <nav>
            {#each links as {src, href, text}}
                <a {href}>
                    <img {src} alt={text} />
                    <p>{text}</p>
                </a>
            {/each}
        </nav>
    </section>
</div>

<style>
    #page {
        padding: 1em;
        flex: 1;
    }

    #mack-info {
        text-align: center;
    }

    #links {
        max-width: 400px;
        margin: 0 auto;
        padding: 1em;
    }

	#links nav {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		place-content: center;
		padding: 1em;
		gap: 2em;
	}
	
	#links nav a {
		/* border: 1px solid black; */
		text-decoration: none;
		display: grid;
		place-items: center;
		text-align: center;
        padding: .25em;
	}

    #links nav a:hover,
    #links nav a:focus-within {
        outline: 1px dotted black;
    }
</style>