<button on:click={goBackPerksPage}>Perks</button>
<h1>Stats</h1>

<p><strong>Carry Weight</strong>: {150 + 10 * specialStats.strength}</p>
<p><strong>Damage Resistance</strong>: 0</p>
<p><strong>Defense</strong>: {specialStats.agility >= 9 ? 2 : 1}</p>
<p><strong>Initiative</strong>: {specialStats.perception + specialStats.agility}</p>
<p><strong>Health</strong>: {specialStats.endurance + specialStats.luck}</p>
<p><strong>Melee Damage</strong>
    {#if specialStats.strength < 7}: +0cd
    {:else if specialStats.strength <= 8}: +1cd
    {:else if specialStats.strength <= 10}: +2cd
    {:else}: +3cd
    {/if}    
</p>

<div class="special-stats-row">
    {#each ['strength', 'perception', 'endurance', 'charisma', 'intelligence', 'agility', 'luck'] as stat}
        <div>
            <strong>{stat.toUpperCase()}</strong>: {specialStats[stat]}
        </div>
    {/each}
</div>

<h2>Skills</h2>
<ul>
    {#each Object.keys(skillPoints) as skill}
        {#if skillPoints[skill] > 0}
            <li>
                {skill} {tagSkills[skill] ? '(Tag)' : ''}
            </li>
        {/if}
    {/each}
</ul>
<ul>
    {#each Object.values(ownedPerks) as perk}
        <li>{perk.name}</li>
    {/each}
</ul>
