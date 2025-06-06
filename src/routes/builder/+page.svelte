<script lang="ts">
    let charName = '';
    let level = 1;

    type Trait = {
        id: number;
        name: string;
        description: string;
    };

    type OriginWithTraits = {
        id: number;
        name: string;
        description: string;
        canGhoul: boolean;
        sourcebookId: number;
        traits: Trait[];
    };

    export let data: {
        groupedOrigins: Record<string, OriginWithTraits[]>;
        sourcebookMap: Record<string, string>;
    };
    let selectedOrigin: string = '';
    let isGhoul = false;
    let selectedTraits: string[] = [];
    let traitDescriptions: string[] = [];

    $: allOrigins = Object.values(data.groupedOrigins).flat();
    $: selectedOriginData = allOrigins.find(o => o.id.toString() === selectedOrigin);
    $: ghoulOrigin = allOrigins.find(o => o.name?.toLowerCase() === 'ghoul');

    function handleTraitSelection(event: Event) {
        const selectEl = event.target as HTMLSelectElement;
        selectedTraits = Array.from(selectEl.selectedOptions).map(opt => opt.value);
        traitDescriptions = selectedTraits.map(name => {
            const trait = selectedOriginData?.traits.find(t => t.name === name);
            return trait?.description ?? '';
        });
    }

    let isOriginValid = false;

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

    let skillPoints = {};
    let skillPointsRemaining = 9 + specialStats.intelligence - Object.values(skillPoints).reduce((acc, val) => acc + val, 0);
    const skills = [
        'Athletics', 'Barter', 'Big Guns', 'Energy Weapons', 'Explosives', 'Lockpick', 'Medicine', 'Melee Weapons', 'Pilot', 'Repair', 'Science', 'Small Guns', 'Sneak', 'Speech', 'Survival', 'Throwing', 'Unarmed'
    ];
    skills.forEach(skill => {
        skillPoints[skill] = 0;
    });
    let tagSkills = {};
    let isSkillsValid = false;

    let ownedPerks = {};
    let showOnlyAvailablePerks = true;
    let perkPointsRemaining = level - Object.values(ownedPerks).reduce((acc, val) => acc + val, 0);
    const corePerks = JSON.parse(PUBLIC_corePerks);
    const settlerPerks = JSON.parse(PUBLIC_settlerPerks);
    const wandererPerks = JSON.parse(PUBLIC_wandererPerks);
    const perks = { ...corePerks, ...settlerPerks, ...wandererPerks }
    let selectedSPECIAL = {
        X: true,
        S: true,
        P: true,
        E: true,
        C: true,
        I: true,
        A: true,
        L: true
    };
    let isPerksValid = false;
    
    let isEquipmentValid = false;

    let currentPage = 'origin';

    function navigateTo(page) {
        currentPage = page;
        if (page = 'special') {
            updateArray();
        }
    }

    function goToSpecialPage() {
        if (isOriginValid) {
            navigateTo('special')
        }
    }
    function goToSkillsPage() {
        if (isSpecialValid) {
            navigateTo('skills')
        }
    }
    function goToPerksPage() {
        navigateTo('perks')
    }
    function goToStatsPage() {
        navigateTo('stats')
    }
    function goToEquipmentPage() {
        navigateTo('skills')
    }
    function goToCharacterSheet() {
        if (isEquipmentValid) {
            navigateTo('skills')
        }
    }

    function goBackOriginPage() {
        navigateTo('origin');
    }
    function goBackSpecialPage() {
        navigateTo('special')
    }
    function goBackSkillsPage() {
        navigateTo('origin');
    }
    function goBackPerksPage() {
        navigateTo('special')
    }
    function goBackStatsPage() {
        navigateTo('origin');
    }
    function goBackEquipmentPage() {
        navigateTo('special')
    }
    
    /*
    function handleTraitSelection(event) {
        const selected = Array.from(event.target.selectedOptions).map(option => option.value);

        if (selected.length <= 2) {
            selectedTraits = selected;
            traitDescriptions = selected.map(trait => getAllTraitsForOrigin(selectedOrigin)[trait]);
        }
    }
    */

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
    
    function handleSkillPointChange(skill, value) {
        const parsedValue = parseInt(value);
        if (!isNaN(parsedValue)) {
            let maxPoints = Math.min(level, 6);
            if (tagSkills[skill]) {
                maxPoints = 6;
            }
            if (parsedValue <= maxPoints) {
                skillPoints[skill] = parsedValue;
                skillPointsRemaining = 9 + specialStats.intelligence - Object.values(skillPoints).reduce((acc, val) => acc + val, 0);
            }
        }
    }

    function toggleTagSkill(skill) {
        if (tagSkills[skill]) {
            skillPoints[skill] += 2;
        } else {
            skillPoints[skill] -=2;
        }
        skillPointsRemaining = 9 + specialStats.intelligence - Object.values(skillPoints).reduce((acc, val) => acc + val, 0);
    }

    $: skillPointsRemaining = 9 + specialStats.intelligence - Object.values(skillPoints).reduce((acc, val) => acc + val, 0);


    console.log(perks)


    function isPerkAvailable(perk) {
        let levelReqMet = level >= perk.minlevel;
        let statReqMet = Object.keys(perk.statReq).every(stat => specialStats[stat] >= perk.statReq[stat]);
        let alreadyPurchased = ownedPerks[perk.name] && ownedPerks[perk.name] >= perk.ranks;

        return levelReqMet && statReqMet && !alreadyPurchased;
    }

    function handlePerkSelection(perk) {
        if (isPerkAvailable(perk) && perkPointsRemaining > 0) {
            if (!selectedPerks.includes(perk)) {
                selectedPerk.push(perk);
                ownedPerks[perk.name] = (ownedPerks[perk.name] || 0) + 1
                perkPointsRemaining -= 1
            }
        }
    }

    function togglePerkDescription(perk) {
        perk.showDescription = !perk.showDescription;
    }

    $: filteredPerks = Object.values(perks).filter(perk => {
        let meetsSpecialReq = selectedSPECIAL[perk.specialreq] || perk.specialreq === 'X';
        return meetsSpecialReq && (!showOnlyAvailablePerks || isPerkAvailable(perk));
    });

    //console.log(filteredPerks);
</script>

<style>
    .page {
        position: absolute;
        top: 5.5vh;
        left: 0;
        width: 100%;
        height: 100vh;
        transition: transform 0.5s ease-in-out;
    }
    .page-origin {
        transform: translateY(0);
    }
    .page-special {
        transform: translateY(0);
    }
    .page-skills {
        transform: translateY(0);
    }
    .page-perks {
        transform: translateY(0);
    }
    .page-stats {
        transform: translateY(0);
    }
    .page-equipment {
        transform: translateY(0);
    }
    .page-charactersheet {
        transform: translateY(0);
    }
    .page-enter {
        transform: translateY(0);
    }
    .page-leave {
        transform: translateY(-100%);
    }
    .page.hidden {
        visibility: hidden;
    }

    .skills-page {
        margin-top: 2em;
    }
    .skill-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 1rem;
        margin-top: 1rem;
    }
    .skill-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .skill-input {
        width: 50px;
        text-align: center;
    }
    .tag-skill-checkbox {
        margin-left: 0.5rem;
    }

    .perk-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 1rem;
        margin-top: 1rem;
    }
    .perk-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .perk-description {
        margin-top: 10px;
        font-size: 0.9rem;
    }
    .perk-checkbox {
        margin-left: 1rem;
    }
    .perk-description-box {
        display: none;
    }
    .perk-description-box.show {
        display: block;
    }
</style>

<!--ORIGIN-->

<div class={`page ${currentPage === 'origin' ? 'page-origin' : 'page-leave'}`}>
    <h1>Origin</h1>
    <label for="char-name">Name: </label>
    <input type="text" id="char-name" bind:value={charName} title="char-name">
    <label for="level-select">Level: </label>
    <input type="number" min="1" bind:value={level} id="level-select" title="level-select">
    <label for="origin-select">Origin: </label>
    <!--
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
    -->
    <select name="origin-select" id="origin-select" bind:value={selectedOrigin} class="origin-select">
        {#each Object.entries(data.groupedOrigins) as [sourcebookId, origins]}
            <optgroup label={data.sourcebookMap[sourcebookId]}>
                {#each origins as origin}
                    <option value={origin.id}>{origin.name}</option>
                {/each}
            </optgroup>
        {/each}
    </select>

    {#if selectedOriginData}
        <pre>{selectedOriginData.description}</pre>

        {#if selectedOriginData.canGhoul}
            <label for="is-ghoul">Ghoul: </label>
            <input type="checkbox" id="is-ghoul" name="is-ghoul" bind:checked={isGhoul}>
        {/if}
    {/if}

    <h3>Trait:</h3>

    <!--
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
    -->

    {#if isGhoul === true && ghoulOrigin}
        <p>{ghoulOrigin.traits[0]?.name}</p>
        <pre>{ghoulOrigin.traits[0]?.description}</pre>
    {:else if selectedOriginData}
        <p>{selectedOriginData.traits[0]?.name}</p>
        <pre>{selectedOriginData.traits[0]?.description}</pre>

        {#if selectedOriginData.traits[0]?.description === 'Choose 2, or 1 and a perk:'}
            <div style="display:inline-block">
                <select multiple on:change={handleTraitSelection} style="height:11.5em">
                    {#each selectedOriginData.traits as trait}
                        <option value={trait.name}>{trait.name}</option>
                    {/each}
                </select>
            </div>
        {/if}
    {/if}

    {#if selectedTraits.length > 0}
        <div style="display:inline-block">
            {#each selectedTraits as trait, index}
                <div>
                    <h4>{trait}</h4>
                    <pre>{traitDescriptions[index]}</pre>
                </div>
            {/each}
        </div>
    {/if}

    <button disabled={!isOriginValid} on:click={goToSpecialPage}>Special</button>
</div>


<!--SPECIAL-->

<div class={`page ${currentPage === 'special' ? 'page-special' : 'page-leave'}`}>
    <button on:click={goBackOriginPage}>Origin</button>

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

    <button disabled={!isSpecialValid} on:click={goToSkillsPage}>Skills</button>
</div>

<!--SKILLS-->

<div class={`page ${currentPage === 'skills' ? 'page-skills' : 'page-leave'}`}>
    <button on:click={goBackSpecialPage}>Special</button>

    <h1>Skills</h1>
    <p>Remaining Skill Points: {skillPointsRemaining}</p>

    <div class="skill-list">
        {#each skills as skill, index}
            <div class="skill-item" key={index}>
                <div>{skill}</div>
                <input
                    type="number"
                    class="skill-input"
                    bind:value={skillPoints[skill]}
                    min="0"
                    max={level < 3 ? 3 : Math.min(level, 6)}
                    on:input={(e) => handleSkillPointChange(skill, e.target.value)}
                />
                <input
                    type="checkbox"
                    class="tag-skill-checkbox"
                    bind:checked={tagSkills[skill]}
                    on:change={() => toggleTagSkill(skill)}
                    disabled={Object.values(tagSkills).filter(value => value === true).length >= 3 && tagSkills[skill] === false}
                />
                <span>Tag Skill</span>
            </div>
        {/each}
    </div>
    <button disabled={skillPointsRemaining !== 0} on:click={goToPerksPage}>Perks</button>
</div>

<!---PERKS-->

<div class={`page ${currentPage === 'perks' ? 'page-perks' : 'page-leave'}`}>
    <button on:click={goBackSkillsPage}>Skills</button>
    <h1>Perks</h1>
    <p>Remaining Perks: {perkPointsRemaining}</p>

    <label>
        <input
            type="checkbox"
            bind:checked={showOnlyAvailablePerks}
        />
        Show only perks I can take
    </label>

    <div>
        {#each ['X', 'S', 'P', 'E', 'C', 'I', 'A', 'L'] as special}
        <label>
            <input
                type="checkbox"
                bind:checked={selectedSPECIAL[special]}
            />
            {special}
        </label>
        {/each}
    </div>

    <div class="perk-list">
        {#each filteredPerks as perk, index}
            <div class="perk-item" key={index}>
                <div>
                    <label>
                        <input type="checkbox" 
                            class="perk-checkbox"
                            disabled={!isPerkAvailable(perk) || perkPointsRemaining <= 0}
                            on:change={() => handlePerkSelection(perk)}
                        />
                        {perk.name}
                    </label>
                </div>
                <button on:click={() => togglePerkDescription(perk)}>Show Description</button>
            </div>

            {#if perk.showDescription}
                <div class="perk-description-box show">
                    <p><strong>Level Requirement:</strong> {perk.minLevel}</p>
                    <p><strong>Ranks:</strong> {perk.ranks}</p>
                    <p><strong>Stat Requirements:</strong> {JSON.stringify(perk.statReq)}</p>
                    <p><strong>Description:</strong> {perk.description}</p>
                </div>
            {/if}
        {/each}
    </div>

    <button disabled={perkPointsRemaining !== 0} on:click={goToStatsPage}>Stats</button>
</div>

<!--STATS-->

<div class={`page ${currentPage === 'stats' ? 'page-stats' : 'page-leave'}`}>
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
    <button on:click={goToEquipmentPage}>Stats</button>
</div>