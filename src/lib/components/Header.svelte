<script lang="ts">
    import { session } from "$app/stores";
    import { title } from "$lib/stores/title";
</script>

<header>
    <a href="/">Home</a>
    <h1>{$title}</h1>

    {#if $session.user}
        <a href="/profile">
            {$session.user.profile?.displayName ?? 'Profile'}
        </a>
    {:else}
        <div class="auth-links">
            <a href="login">Log In</a>
            <a href="login">Sign Up</a>
        </div>
    {/if}

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