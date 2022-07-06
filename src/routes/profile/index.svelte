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

        <div class="image-row">
            <img src={user.avatar_url ?? '/avatar.png'} alt="Profile" />
            <label for="avatar" tabindex="0">Upload</label>
            <input type="file" id="avatar" name="avatar" />
        </div>


        <div class="form-row">
            <label for="email">Email</label>
            <input type="email" id="email" value={user.email} disabled>
        </div>

        <div class="form-row">
            <label for="username">Username</label>
            <input id="username" bind:value={user.username} >
        </div>

        <div class="form-row">
            <label for="displayName">Display Name</label>
            <input id="displayName" bind:value={user.display_name} >
        </div>

        <div class="form-row">
            <label for="bio">Bio</label>
            <textarea id="bio" bind:value={user.bio}></textarea>
        </div>

        <div class="form-row">
            <label for="website">Website</label>
            <input id="website" bind:value={user.website_url} />
        </div>

        <div class="form-row">
            <label for="instagram">Instagram</label>
            <input id="instagram" bind:value={user.instagram_url} />
        </div>

        <div class="form-row">
            <label for="twitter">Twitter</label>
            <input id="twitter" bind:value={user.twitter_url} />
        </div>

        <div class="form-row">
            <label for="tiktok">TikTok</label>
            <input id="tiktok" bind:value={user.tiktok_url} />
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
        border: 2px solid lightgray;
        width: 200px;
        border-radius: 50%;
        align-self: center;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    .image-row {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1em;
    }

    .image-row label {
        border: 1px solid lightgray;
        padding: .5em 1em;
        cursor: pointer;
    }

    .image-row input {
        display: none;
    }

    .form-row {
        display: flex;
        flex-direction: column;
    }
</style>