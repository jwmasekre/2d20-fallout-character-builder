<script>
    let charName = '';
    let level = 1;
    let selectedOrigin = 'brotherhood-initiate';
    import {
        PUBLIC_coreOrigins,
        PUBLIC_settlerOrigins,
        PUBLIC_atomOrigins,
        PUBLIC_wandererOrigins
    } from '$env/static/public';
    $: coreOrigins = JSON.parse(PUBLIC_coreOrigins);
    $: settlerOrigins = JSON.parse(PUBLIC_settlerOrigins);
    $: atomOrigins = JSON.parse(PUBLIC_atomOrigins);
    $: wandererOrigins = JSON.parse(PUBLIC_wandererOrigins);
    $: originData = { ...coreOrigins, ...settlerOrigins, ...atomOrigins, ...wandererOrigins };
    let isGhoul = false;
    let selectedTraits = [];
    let traitDescriptions = [];

    function handleTraitSelection(event) {
        const selected = Array.from(event.target.selectedOptions).map(option => option.value);

        if (selected.length <= 2) {
            selectedTraits = selected;
            traitDescriptions = selected.map(trait => getAllTraitsForOrigin(selectedOrigin)[trait]);
        }
    }

    function getAllTraitsForOrigin(origin) {
        let allTraits = { ...originData[origin].trait.traits };

        if (originData[origin].trait.alternates) {
            originData[origin].trait.alternates.forEach(alternate => {
                const alternateTraits = originData[alternate]?.trait?.traits;
                if (alternateTraits) {
                    allTraits = { ...allTraits, ...alternateTraits };
                }
            });
        }
        return allTraits;
    }

    $: isOriginValid = charName && level && selectedOrigin && (selectedTraits.length === 2 || !originData[selectedOrigin].trait.description.includes('Choose 2, or 1 and a perk:'));
</script>

<h1>Origin</h1>
<label for="char-name">Name: </label>
<input type="text" id="char-name" bind:value={charName} title="char-name">
<label for="level-select">Level: </label>
<input type="number" min="1" bind:value={level} id="level-select" title="level-select">
<label for="origin-select">Origin: </label>
<select name="origin-select" id="origin-select" bind:value={selectedOrigin} title="origin-select" class="origin-select">
    <optgroup label="Core">
        {#each Object.keys(coreOrigins) as origin}
            <option value={origin}>{coreOrigins[origin].prettyname}</option>
        {/each}
    </optgroup>
    <optgroup label="Settlers">
        {#each Object.keys(settlerOrigins) as origin}
            <option value={origin}>{settlerOrigins[origin].prettyname}</option>
        {/each}
    </optgroup>
    <optgroup label="Winter of Atom">
        {#each Object.keys(atomOrigins) as origin}
            <option value={origin}>{atomOrigins[origin].prettyname}</option>
        {/each}
    </optgroup>
    <optgroup label="Wanderers">
        {#each Object.keys(wandererOrigins) as origin}
            <option value={origin}>{wandererOrigins[origin].prettyname}</option>
        {/each}
    </optgroup>
</select>

<pre>{originData[selectedOrigin].description}</pre>

{#if originData[selectedOrigin].trait.canGhoul === true}
    <label for="is-ghoul">Ghoul: </label>
    <input type="checkbox" id="is-ghoul" name="is-ghoul" bind:checked={isGhoul}>
{/if}

<h3>Trait:</h3>

{#if isGhoul === true}
    <p>{originData['ghoul'].trait.name}</p>
    <pre>{originData['ghoul'].trait.description}</pre>
{:else}
    <p>{originData[selectedOrigin].trait.name}</p>
    <pre>{originData[selectedOrigin].trait.description}</pre>

    <div style="display:inline-block">
        {#if originData[selectedOrigin].trait.description === 'Choose 2, or 1 and a perk:'}
            <select multiple on:change={handleTraitSelection} style="height:11.5em">
                {#each Object.keys(getAllTraitsForOrigin(selectedOrigin)) as trait}
                    <option value={trait}>{trait}</option>
                {/each}
            </select>
        {/if}
    </div>
{/if}

{#if selectedTraits.length > 0}
    <div style="display:inline-block">
        {#each selectedTraits as trait, index}
            <div key={index}>
                <h4>{trait}</h4>
                <pre>{traitDescriptions[index]}</pre>
            </div>
        {/each}
    </div>
{/if}

