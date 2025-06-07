<script lang="ts">
    import { enhance } from '$app/forms';

    let characterId = null;
    let saveResult;
    $: if (saveResult?.data?.success && saveResult.data.characterId) {
        characterId = saveResult.data.characterId
    }

    // ORIGIN PAGE
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
    $: selectedOriginData = allOrigins.find(o => o.id.toString() === selectedOrigin.toString());
    $: ghoulOrigin = allOrigins.find(o => o.name?.toLowerCase() === 'ghoul');
    $: traitCount = selectedOriginData?.traits?.length ?? 0;
    $: if (selectedOriginData && traitCount === 1) {
        selectedTraits = [selectedOriginData.traits[0].id.toString()];
    }
    $: traitDescriptions = selectedTraits.map(id => {
        const trait = selectedOriginData?.traits.find(t => t.id.toString() === id.toString());
        return trait?.description ?? '';
    })
    $: traitPerk = selectedTraits.includes('10');
    $: if (selectedOriginData && !(selectedOriginData.canGhoul)) {
        isGhoul = false;
    }

    let isOriginValid = false;
    $: isOriginValid = (
        charName.trim().length > 0 &&
        level > 0 &&
        selectedOrigin &&
        (
            traitCount <= 1 ||
            selectedTraits.length == 2
        )
    )

    // SPECIAL PAGE
    $: isSuperMutant = selectedTraits.includes('3');
    $: isNightkin = selectedTraits.includes('25');
    $: isGifted = selectedTraits.includes('7');

    $: giftedSelected = {};
    $: giftedCount = Object.values(giftedSelected).filter(Boolean).length;

    function getStatMax(stat) {
        if (isSuperMutant || isNightkin) {
            if (['intelligence','charisma'].includes(stat)) {
                return 6 + (isSuperMutant ? 0 : 2);
            }
        }
        return 10;
    }

    function getDisplayStat(stat, value) {
        let mod = 0;
        if (isSuperMutant || isNightkin) {
            if (['strength', 'endurance'].includes(stat)) mod += 2;
        }
        if (isGifted && giftedSelected[stat]) mod += 1;
        return value + mod;
    }

    $: remainingSpecialPoints = specialPoints
        + (isGifted ? giftedCount : 0)
        - Object.values(customStats).reduce((acc,val) => acc + val, 0);
    
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

    $: isSpecialValid =
        Object.entries(selectedArray === 'Custom' ? customStats : specialStats)
            .every(([key, val]) => val >= 4 && val <= getStatMax(key)) &&
        remainingSpecialPoints === 0 &&
        (!isGifted || giftedCount === 2);

    // SKILLS PAGE
    const skills = [
        'Athletics', 'Barter', 'Big Guns', 'Energy Weapons', 'Explosives', 'Lockpick', 'Medicine', 'Melee Weapons', 'Pilot', 'Repair', 'Science', 'Small Guns', 'Sneak', 'Speech', 'Survival', 'Throwing', 'Unarmed'
    ];
    let skillPoints = {};
    skills.forEach(skill => {
        skillPoints[skill] = 0;
    });
    let extraTagSkills = 0;
    let forcedTagSkills = '';
    let forbiddenTagSkills = '';
    let tagSkillGroups = skills;
    let maxSkillCap = (level > 3 ? (level < 7 ? level : 6) : 3);
    let limitedSkills = [];
    let limitedSkillCap = 4;
    let baseTagSkills = 3;
    let totalTagSkillsAllowed = 3;
    $: if (selectedTraits.includes('1') || selectedTraits.includes('24')) {
        extraTagSkills = 1;
        tagSkillGroups = ["Energy Weapons", "Repair", "Science"];
    } else if (selectedTraits.includes('12')) {
        extraTagSkills = 1;
        tagSkillGroups = ['Small Guns', 'Energy Weapons'];
    } else if (selectedTraits.includes('13')) {
        extraTagSkills = 2;
        tagSkillGroups = ['Speech', 'Medicine', 'Repair', 'Science', 'Barter'];
        limitedSkills = ['Athletics', 'Big Guns', 'Energy Weapons', 'Explosives', 'Lockpick', 'Melee Weapons', 'Pilot', 'Small Guns', 'Sneak', 'Survival', 'Throwing', 'Unarmed']
    } else if (selectedTraits.includes('5') || selectedTraits.includes('11')) {
        extraTagSkills = 1;
    } else {
        extraTagSkills = 0;
        tagSkillGroups = skills;
        limitedSkills = [];
    }

    $: if (selectedTraits.includes('2')) {
        baseTagSkills = 4;
        forcedTagSkills = 'Survival';
        if (!tagSkills['Survival']) {
            tagSkills['Survival'] = true;
            toggleTagSkill('Survival');
        }
    } else {
        baseTagSkills = 3;
        forcedTagSkills = '';
        if (tagSkills['Survival']) {
            tagSkills['Survival'] = false;
            toggleTagSkill('Survival');
        }
    }

    $: if (selectedTraits.includes('3') || selectedTraits.includes('25')) {
        maxSkillCap = (level > 3 ? 4 : 3);
    } else {
        maxSkillCap = (level > 3 ? (level < 7 ? level : 6) : 3);
    }        

    $: if (selectedTraits.includes('27')) {
        forbiddenTagSkills = 'Science';
    } else {
        forbiddenTagSkills = '';
    }
    $: totalTagSkillsAllowed = baseTagSkills + extraTagSkills;

    /*$: skills.forEach(skill => {
        if (forcedTagSkills === skill && !tagSkills[skill]) {
            toggleTagSkill(skill);
        }
        if (forbiddenTagSkills === skill && tagSkills[skill]) {
            toggleTagSkill(skill);
        }
    });*/
    
    let tagSkills = {};
    function handleSkillPointChange(skill, value) {
        const parsedValue = parseInt(value);
        if (!isNaN(parsedValue)) {
            let maxPoints = limitedSkills.includes(skill) ? limitedSkillCap : maxSkillCap;
            if (parsedValue <= maxPoints) {
                skillPoints[skill] = parsedValue;
                skillPointsRemaining = 9 + specialStats.intelligence + Object.values(tagSkills).filter(Boolean).length - Object.values(skillPoints).reduce((acc, val) => acc + val, 0);
            }
        }
    }
    let skillPointsRemaining = 9 + specialStats.intelligence + Object.values(tagSkills).filter(Boolean).length - Object.values(skillPoints).reduce((acc, val) => acc + val, 0);


    function toggleTagSkill(skill) {
        if (skillPoints[skill] === maxSkillCap) {
            skillPoints[skill] += -2;
        }
        skillPoints[skill] += tagSkills[skill] ? 2 : -2;
        skillPointsRemaining += tagSkills[skill] ? 2 : -2;
    }

    $: skillPointsRemaining = 9 + specialStats.intelligence + Object.values(tagSkills).filter(Boolean).length*2 - Object.values(skillPoints).reduce((acc, val) => acc + val, 0);

    let isSkillsValid = false;

    $: isSkillsValid = (
        skillPointsRemaining === 0 &&
        Object.entries(skillPoints).every(([skillPoints, points]) => 
            points <= (tagSkills[skill] ? 6 : maxSkillCap)
        ) && 
        Object.values(tagSkills).filter(Boolean).length === totalTagSkillsAllowed &&
        !(forbiddenTagSkills === 'Science') || !tagSkills['Science']
    );


    // PERKS PAGE
    let ownedPerks = {};
    let showOnlyAvailablePerks = true;
    let perkPointsRemaining = level - Object.values(ownedPerks).reduce((acc, val) => acc + val, 0);
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

    /*
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
    */

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
    
</script>

<style>
    .page {
        position: absolute;
        top: 12vh;
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
    .forced-tag {
        font-weight: bold;
        color: green;
    }
    .forbidden-tag {
        text-decoration: line-through;
        color: gray;
    }
    input[type=checkbox][disabled] {
        filter: invert(25%);
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

<!-- save button -->
<!-- save button -->
<!-- save button -->
<!-- save button -->
<!-- save button -->

<form method="POST" use:enhance={(res) => { res.then(r => saveResult = r); }}>
    <!-- origin fields -->
    <input type="hidden" name="originId" value={selectedOriginData?.id} />
    <input type="hidden" name="isGhoul" value={isGhoul ? 'on' : ''} />
    <input type="hidden" name="charName" value={charName} />
    <input type="hidden" name="level" value={level} />
    <input type="hidden" name="characterId" value={characterId ?? ''} />
    {#each selectedTraits as trait}
        <input type="hidden" name="selectedTraits" value={trait} />
    {/each}
    <!-- special fields -->
    {#if isSpecialValid}
        <input type="hidden" name="specialValid" value="true" />
        {#each Object.keys(specialStats) as stat}
            <input
                type="hidden"
                name={stat}
                value={selectedArray == 'Custom' ? customStats[stat] : specialStats[stat]}
            />
        {/each}
    {/if}
    <!-- skill fields -->
    {#if isSkillsValid}
        {#each Object.entries(skillPoints) as [skill, value]}
            <input type="hidden" name={`skillPoints[${skill}]`} value={value} />
        {/each}
        {#each Object.entries(tagSkills) as [skill, isTagged]}
            <input type="hidden" name={`tagSkills[${skill}]`} value={isTagged ? 'on' : ''} />
        {/each}
    {/if}

    <button type="submit" name="action" value="saveCharacter" class="saveButton">Save Character</button>
</form>

{#if saveResult?.data?.success}
    <p>Character saved with ID {saveResult.data.characterId}</p>
{:else if saveResult?.data?.error}
    <p>Error: {saveResult.data.error}</p>
{/if}

<!--ORIGIN-->
<!--ORIGIN-->
<!--ORIGIN-->
<!--ORIGIN-->
<!--ORIGIN-->

<div class={`page ${currentPage === 'origin' ? 'page-origin' : 'page-leave'}`}>
    <h1>Origin</h1>
    <label for="char-name">Name: </label>
    <input type="text" id="char-name" bind:value={charName} title="char-name">
    <label for="level-select">Level: </label>
    <input type="number" min="1" bind:value={level} id="level-select" title="level-select">
    <label for="origin-select">Origin: </label>
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
        <pre>{selectedOriginData.description.replace(/\\n/g, "\n")}</pre>
        {#if selectedOriginData.canGhoul}
            <label for="is-ghoul">Ghoul: </label>
            <input type="checkbox" id="is-ghoul" name="is-ghoul" bind:checked={isGhoul}>
        {/if}

        <h3>Trait:</h3>
    {/if}

    {#if isGhoul === true && ghoulOrigin}
        <h4>{ghoulOrigin.traits[0]?.name}</h4>
        <pre>{ghoulOrigin.traits[0]?.description}</pre>
    {:else if selectedOriginData}
        {#if traitCount > 1}
            <div style="display:inline-block">
                <select multiple bind:value={selectedTraits} style="height:11.5em">
                    {#each selectedOriginData.traits as trait}
                        <option value={trait.id.toString()}>{trait.name}</option>
                    {/each}
                </select>
            </div>
        {/if}
    {/if}

    {#if traitDescriptions.length > 0 && !isGhoul}
        <div style="display:inline-block">
            {#each selectedTraits as traitId, index}
                {#if selectedOriginData}
                    {#each selectedOriginData.traits as trait}
                        {#if trait.id.toString() === traitId.toString()}
                            <div>
                                <h4>{trait.name}</h4>
                                <pre>{trait.description.replace(/\\n/g, "\n")}</pre>
                            </div>
                        {/if}
                    {/each}
                {/if}
            {/each}
        </div>
    {/if}

    <button disabled={!isOriginValid} on:click={goToSpecialPage}>Special</button>
</div>


<!--SPECIAL-->
<!--SPECIAL-->
<!--SPECIAL-->
<!--SPECIAL-->
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
                    max={getStatMax(stat)}
                    on:input={(e) => handleStatChange(stat, e.target.value)}
                />
                {#if isGifted}
                    <input
                        type="checkbox"
                        bind:checked={giftedSelected[stat]}
                        disabled={(!giftedSelected[stat] && giftedCount >=2) || customStats[stat] === 10}
                        on:change={() => {
                            giftedSelected = { ...giftedSelected };
                        }}
                    />
                {/if}
                <span style="margin-right:1em;">→ {getDisplayStat(stat, customStats[stat])}</span>
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
                    {#if isGifted}
                        <input
                            type="checkbox"
                            bind:checked={giftedSelected[stat]}
                            disabled={!giftedSelected[stat] && giftedCount >= 2}
                            on:change={() => {
                                giftedSelected = { ...giftedSelected };
                            }}
                        />
                    {/if}
                    <span>→ {getDisplayStat(stat, specialStats[stat])}</span>
                </div>
            {/each}
        </div>
    {/if}

    <button disabled={!isSpecialValid} on:click={goToSkillsPage}>Skills</button>
</div>

<!--SKILLS-->
<!--SKILLS-->
<!--SKILLS-->
<!--SKILLS-->
<!--SKILLS-->

<div class={`page ${currentPage === 'skills' ? 'page-skills' : 'page-leave'}`}>
    <button on:click={goBackSpecialPage}>Special</button>

    <h1>Skills</h1>
    <p>Remaining Skill Points: {skillPointsRemaining}</p>
    <p>Tag Skills: {Object.values(tagSkills).filter(Boolean).length}/{totalTagSkillsAllowed}</p>

    <div class="skill-list">
        {#each skills as skill, index}
            <div class="skill-item" key={index}>
                <div>{skill}</div>
                <input
                    type="number"
                    class="skill-input"
                    bind:value={skillPoints[skill]}
                    min="0"
                    max={(tagSkills[skill] ? 6 :maxSkillCap)}
                    on:input={(e) => handleSkillPointChange(skill, e.target.value)}
                />
                <input
                    type="checkbox"
                    class="tag-skill-checkbox"
                    bind:checked={tagSkills[skill]}
                    on:change={() => toggleTagSkill(skill)}
                    disabled={
                        (!tagSkills[skill] && Object.values(tagSkills).filter(Boolean).length >= baseTagSkills) || forcedTagSkills === skill
                    }
                />
                {#if extraTagSkills > 0 && tagSkillGroups.includes(skill)}

                    <input
                        type="checkbox"
                        class="extra-tag-skill-checkbox"
                        bind:checked={tagSkills[skill]}
                        on:change={() => toggleTagSkill(skill)}
                        disabled={
                            (!tagSkills[skill] && (Object.values(tagSkills).filter(Boolean).length >= totalTagSkillsAllowed || Object.values(tagSkills).filter(Boolean).length < baseTagSkills))
                        }
                    />
                {/if}
                <span
                    class:forced-tag={forcedTagSkills === skill}
                    class:forbidden-tag={forbiddenTagSkills === skill}
                >
                    Tag Skill
                </span>
            </div>
        {/each}
    </div>
    <button disabled={!isSkillsValid} on:click={goToPerksPage}>Perks</button>
</div>

<!---PERKS-->
<!---PERKS-->
<!---PERKS-->
<!---PERKS-->
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

    <!--
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
    -->

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