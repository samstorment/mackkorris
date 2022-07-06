
<form method="post">
	<h2>Log In</h2>

	<div>
		<label for="email">Email</label>
		<input type="email" id="email" name="email" required>
	</div>

	<div>
		<label for="password">Password</label>
		<input type="password" id="password" name="password" required>
	</div>

	<button type="submit">Log In</button>
</form>

<style>
	form {
		margin: 0 auto;
		width: 100%;
		max-width: 500px;
		padding: 1em;
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	h2 {
		text-align: center;
	}

	div {
		display: flex;
		flex-direction: column;
	}

	button {
		border: 2px solid black;
		padding: .25em 0;
	}
</style>