<script lang="ts">
    import db from '$lib/db';
    import { user } from '$lib/stores/user';

    export let username: string;
    export let display_name: string;
    export let website: string;
    export let avatar_url: string;
</script>

<div>{username}</div>
<div>{display_name}</div>
<div>{website}</div>
<img src={avatar_url} alt="avatar">


<style>
    img {
        max-width: 200px;
        border-radius: 50%;
    }
</style>