<script lang="ts">
    import { session } from "$app/stores";
    import { title } from "$lib/stores/title";
</script>

<header>
    <a href="/">Home</a>
    <h1>{$title}</h1>

    <div class="auth-links">
        {#if $session.user}
            <a href="/auth/signout">Sign Out</a>
            <a href="/profile">Profile</a>
        {:else}
            <a href="/login">Log In</a>
            <a href="/signup">Sign Up</a>
        {/if}
    </div>

</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .75em 1em;
        color: white;
        background-color: teal;
        text-align: center;
        border-bottom: 2px solid black;
        position: relative;
    }

    .auth-links {
        display: flex;
        gap: 1em;
    }

    h1 {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
    }
</style>