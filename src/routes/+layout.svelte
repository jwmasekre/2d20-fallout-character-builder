<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import ThemeSelector from '$lib/ThemeSelector.svelte';

	onMount(() => {
		const savedTheme = localStorage.getItem('theme');

		if (savedTheme) {
			document.body.className = `theme-${savedTheme}`;
		}
	});
</script>

<header>
	<ThemeSelector />
	<nav>
		<a href="/" class="button">🏠</a>
		<a href="/about" class="button">ℹ️</a>
	</nav>
</header>

<main>
	<slot />
</main>
