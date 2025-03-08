<script>
    let remainingSpecialPoints = 0;
    let specialPoints = 40;
    let specialStats = {
        strength: 5,
        perception: 5,
        endurance: 5,
        charisma: 5,
        intelligence: 5,
        agility: 5,
        luck: 5
    };
    let selectedArray = 'Balanced';
    let customStats = {
        strength: 5,
        perception: 5,
        endurance: 5,
        charisma: 5,
        intelligence: 5,
        agility: 5,
        luck: 5
    };
    const arrays = {
        Balanced: [6,6,6,6,6,5,5],
        Focused: [8,7,6,6,5,4,4],
        Specialized: [9,8,5,5,5,4,4]
    };
    let isSpecialValid = false;

    function updateArray() {
        if (selectedArray === 'Custom') {
            remainingSpecialPoints = specialPoints - Object.values(customStats).reduce((acc, val) => acc + val, 0);
        } else {
            const selected = arrays[selectedArray];
            Object.keys(specialStats).forEach((key, index) => {
                specialStats[key] = selected[index];
            });

            remainingSpecialPoints = specialPoints - selected.reduce((acc, val) => acc + val, 0);
        }
    }

    function handleStatChange(stat, value) {
        const parsedValue = parseInt(value);
        if (!isNaN(parsedValue)) {
            if (selectedArray === 'Custom') {
                customStats[stat] = parsedValue;
                remainingSpecialPoints = specialPoints - Object.values(customStats).reduce((acc, val) => acc + val, 0);
            } else {
                specialStats[stat] = parsedValue;
                remainingSpecialPoints = specialPoints - Object.values(specialStats).reduce((acc, val) => acc + val, 0);
            }
        }
    }

    $: isSpecialValid = Object.values(customStats).every(val => val >= 4 && val <= 10) && remainingSpecialPoints === 0;

</script>

<h1>SPECIAL</h1>
<label for="array-select">Array:</label>
<select id="array-select" bind:value={selectedArray} on:change={updateArray}>
    <option value="Balanced">Balanced (6,6,6,6,6,5,5)</option>
    <option value="Focused">Focused (8,7,6,6,5,4,4)</option>
    <option value="Specialized">Specialized (9,8,5,5,5,4,4)</option>
    <option value="Custom">Custom</option>
</select>

{#if selectedArray === 'Custom'}
    <p>Remaining Points: {remainingSpecialPoints}</p>
    {#each Object.keys(customStats) as stat}
        <label for={stat}>{stat.toUpperCase()}: </label>
        <input
            type="number"
            id={stat}
            bind:value={customStats[stat]}
            min="4"
            max="10"
            on:input={(e) => handleStatChange(stat, e.target.value)}
        />
    {/each}
{:else}
    <div>
        <p>Remaining Points: {remainingSpecialPoints}</p>
        {#each Object.keys(specialStats) as stat}
            <div>
                <label for={stat}>{stat.toUpperCase()}:</label>
                <select
                    bind:value={specialStats[stat]}
                    on:change={(e) => handleStatChange(stat, e.target.value)}
                >
                    {#each arrays[selectedArray] as value, index}
                        <option value={value}>{value}</option>
                    {/each}
                </select>
            </div>
        {/each}
    </div>
{/if}

