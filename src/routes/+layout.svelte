<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import ThemeSelector from '$lib/ThemeSelector.svelte';
	import { page } from '$app/state';
	
	let { children } = $props();
	
	onMount(() => {
		const savedTheme = localStorage.getItem('theme');
	
		if (savedTheme) {
			document.body.className = `theme-${savedTheme}`;
		}
	});
</script>

<header style="display:flex;justify-content:center;align-content:center;">
	<div class="theme-select" style="position:absolute;right:0;top:0">
		<ThemeSelector />
	</div>
	{#if page.url.pathname === '/builder'}
	<button type="submit" name="action" value="saveCharacter" class="saveButton">Save Character</button>
	{/if}
	<nav style="position:absolute;left:0;align-content:center;">
		<a href="/" class="button">🏠</a>
		<a href="/about" class="button">ℹ️</a>
	</nav>
</header>

<main>
	{@render children()}
</main>
