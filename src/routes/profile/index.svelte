<script lang="ts" context="module">
    import type User from '$lib/models/User';

    export async function load({ session }) {
        if (!session.user) {
            return {
                status: 302,
                redirect: '/'
            }
        }
        
        let user: Zod.infer<typeof User> = session.user;

        return {
            props: {
                user
            }
        }
    }
</script>

<script lang="ts">
    import Head from '$lib/components/Head.svelte';
    import { session } from '$app/stores';
    import { Profile } from '$lib/models/User';

    export let user: Zod.infer<typeof User>;

    let profile = {
        username: user.profile?.username ?? '',
        display_name: user.profile?.display_name ?? ''
    }
</script>

<Head title="Profile" />

<form on:submit|preventDefault={() => 0}>

    {#if user.profile?.avatar_url}
        <img src={user.profile.avatar_url} alt="Profile Picture">
    {/if}

    <div class="form-row">
        <label for="email">Email</label>
        <input type="email" id="email" value={user.email} disabled>
    </div>

    <div class="form-row">
        <label for="username">Username</label>
        <input id="username" bind:value={profile.username} >
    </div>

    <div class="form-row">
        <label for="displayName">Display Name</label>
        <input id="displayName" bind:value={profile.display_name} >
    </div>

</form>


<style>
    img {
        max-width: 200px;
        border-radius: 50%;
    }

    form {
        display: grid;
        gap: 1em;
        margin: 1em auto;
        width: 500px;
    }

    .form-row {
        display: grid;
    }
</style>