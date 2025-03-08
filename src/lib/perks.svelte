<script>
    let ownedPerks = {};
    let showOnlyAvailablePerks = true;
    let perkPointsRemaining = level - Object.values(ownedPerks).reduce((acc, val) => acc + val, 0);
    import {
        PUBLIC_corePerks,
        PUBLIC_settlerPerks,
        PUBLIC_wandererPerks
    } from '$env/static/public';
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

    console.log(filteredPerks);
</script>

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

