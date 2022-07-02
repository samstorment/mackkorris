<script lang="ts">
    import db from '$lib/db';

    let loading = false
    let email = '';
    let err: string;
    let message = '';
    
    async function login() {
        try {
            loading = true

            const { error, ...rest } = await db.auth.signIn({ email });

            console.log("REST", rest);

            if (error) throw error

            message = 'Check your email for a magic login link!';

        } catch (error: any) {
            err = error.error_description || error.message || 'Unknown Error';
        } finally {
            loading = false
        }
    }
</script>

<div id="page">

    <form on:submit|preventDefault={login}>
        <h1>Login</h1>
            
        <div class="form-row">
            <label for="email">Email</label>
            <input bind:value={email} id="email" type="email" required />
        </div>

        {#if err}
            <div style="color: red;">Error: {err}</div>
        {/if}
        
        <button type="submit" disabled={loading}>
            {loading ? "Loading" : "Request Magic Link"}
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