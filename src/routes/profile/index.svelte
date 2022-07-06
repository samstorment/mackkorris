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
</script>

<Head title="Profile" />

<div id="page">
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
            <input id="username" bind:value={user.profile.username} >
        </div>

        <div class="form-row">
            <label for="displayName">Display Name</label>
            <input id="displayName" bind:value={user.profile.display_name} >
        </div>

        <div class="form-row">
            <label for="bio">Bio</label>
            <textarea id="bio" bind:value={profile.bio}></textarea>
        </div>

    </form>

</div>


<style>
    #page {
        padding: 1em;
        max-width: 600px;
        width: 100%;
        margin: 0 auto;
    }

    img {
        max-width: 200px;
        border-radius: 50%;
        align-self: center;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    .form-row {
        display: flex;
        flex-direction: column;
    }
</style>