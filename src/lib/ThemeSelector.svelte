<script>
    import { onMount } from 'svelte';

    let theme = 'capital';

    onMount(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            theme = savedTheme;
        }
        document.body.className = `theme-${theme}`;
    });

    const changeTheme = (newTheme) => {
    theme = newTheme;
    document.body.className = `theme-${theme}`;
    localStorage.setItem('theme',theme);
    };
</script>

<div>
    <label for="theme-selector">Theme: </label>
    <select id="theme-selector" bind:value={theme} on:change={() => changeTheme(theme)}>
        <option value="capital">Capital</option>
        <option value="mojave">Mojave</option>
        <option value="commonwealth">Commonwealth</option>
    </select>
</div>