<script lang="ts">
    import { session } from '$app/stores';
    import { post } from '$lib/util/http';
    import { goto } from '$app/navigation';

    let email = '';
    let password = '';
    export let title: 'Sign Up' | 'Log In';

    let error = '';
    let submitting = false;

    async function submit() {

        submitting = true;

        const endpoint = title === 'Sign Up' ? 'signup' : 'signin';

        console.log(endpoint);

        const { user, error: err } = await post(`/auth/${endpoint}`, {
            email, password
        });

        if (err) {
            console.log(err);

            submitting = false;
            return error = err;
        }

        $session.user = user;

        submitting = false;
        goto('/');
	};

</script>

<div id="page">

    <form on:submit|preventDefault={submit}>
        <h1>{title}</h1>
            
        <div class="form-row">
            <label for="email">Email</label>
            <input bind:value={email} id="email" type="email" name="email" required />
        </div>

        <div class="form-row">
            <label for="password">Password</label>
            <input bind:value={password} id="password" type="password" name="password" required />
        </div>

        {#if error}
            <div style="color: red;">{error}</div>
        {/if}
        
        <button type="submit" disabled={submitting}>
            Submit
        </button>
    </form>
</div>

<style>
    #page {
        flex: 1;
        width: 400px;
        display: flex;
        margin: 0 auto;
        flex-direction: column;
        justify-content: center;

    }

    #page form {
        text-align: center;
        display: grid;
        gap: 1em;
    }

    .form-row {
        display: grid;
    }

    button {
        border: 1px solid gray;
        padding: .5em;
        background-color: teal;
        color: white;
    }
</style>