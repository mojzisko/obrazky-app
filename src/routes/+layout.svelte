<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>


</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 24px;
		padding-top: 0;
		width: 100%;
		max-width: 90rem;
		margin: 0 auto;
		box-sizing: border-box;
	}


</style>
