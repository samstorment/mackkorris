<script lang="ts" context="module">
    export function load({ session }) {

		if (session.user) {
			return { status: 302, redirect: `/` };
		}

		return {};
	}
</script>

<script>
    import Auth from "$lib/components/Auth.svelte";
</script>

<Auth title="Sign Up" />