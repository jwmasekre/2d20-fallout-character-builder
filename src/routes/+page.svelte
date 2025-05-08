<script>
    import { goto } from '$app/navigation';
</script>

<h1>Fallout</h1>

<div class="button-container">
    <button on:click={() => goto('./builder')}>New</button>
    <button on:click={() => goto('./loader')}>Load</button>
    <button on:click={() => goto('./login')}>Login</button>
    <button on:click={() => goto('./register')}>Register</button>
</div>

