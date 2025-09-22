<script>
    import { goto } from '$app/navigation';

</script>

<div class="home-page" style="position:absolute;top:5vh;">
    <h1>Fallout</h1>

    <div class="button-container">
        <button on:click={() => goto('./builder')}>New</button>
        <button on:click={() => goto('./loader')}>Load</button>
        <button on:click={() => goto('./login')}>Login</button>
        <button on:click={() => goto('./register')}>Register</button>
    </div>
</div>