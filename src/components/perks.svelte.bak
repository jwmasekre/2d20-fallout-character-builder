<script lang="ts">

	import type { FullCharacter, perktype } from '$lib/server/types.ts';

    let newCharacter:FullCharacter, currentPage:string, selectedTraits:string[], allPerks:perktype[], selectedPerks:string[] = $props();

    //TODO: should probably be writing these to the character, would probably clean up a lot

/*

 .S_sSSs      sSSs   .S_sSSs     .S    S.     sSSs  
.SS~YS%%b    d%%SP  .SS~YS%%b   .SS    SS.   d%%SP  
S%S   `S%b  d%S'    S%S   `S%b  S%S    S&S  d%S'    
S%S    S%S  S%S     S%S    S%S  S%S    d*S  S%|     
S%S    d*S  S&S     S%S    d*S  S&S   .S*S  S&S     
S&S   .S*S  S&S_Ss  S&S   .S*S  S&S_sdSSS   Y&Ss    
S&S_sdSSS   S&S~SP  S&S_sdSSS   S&S~YSSY%b  `S&&S   
S&S~YSSY    S&S     S&S~YSY%b   S&S    `S%    `S*S  
S*S         S*b     S*S   `S%b  S*S     S%     l*S  
S*S         S*S.    S*S    S%S  S*S     S&    .S*P  
S*S          SSSbs  S*S    S&S  S*S     S&  sSS*S   
S*S           YSSP  S*S    SSS  S*S     SS  YSS'    
SP                  SP          SP                  
Y                   Y           Y                   

*/

    let showEligibleOnly = false;
    let maxPerks = $derived(newCharacter.lvl + (selectedTraits.includes('10') ? 1 : 0));
    let perkPointsRemaining = $derived(maxPerks - selectedPerks.length);
    let specialFilters = {
        X: true,
        S: true,
        P: true,
        E: true,
        C: true,
        I: true,
        A: true,
        L: true
    };
    //let special = Object.keys(specialStats)

    function getSpecialRequirementTypes(perk:perktype) {
        const statReqs = (perk.reqs || []).filter(r => r.includes(':'));
        const keys = statReqs.map(req => req.split(': ')[0].toLowerCase());
        if (keys.length === 0) return ['X'];

        return keys.map(key => {
            switch (key) {
                case 'strength': return 'S';
                case 'perception': return 'P';
                case 'endurance': return 'E';
                case 'charisma': return 'C';
                case 'intelligence': return 'I';
                case 'agility': return 'A';
                case 'luck': return 'L';
                default: return '';
            }
        });
    }

    let hasReadRequiredBook = false; //once more character tables are built i'll work this one out

    function isEligibleForPerk(perk:perktype) {
        //has perk already
        if (selectedPerks.includes(perk.id.toString())) {
            let ranks = getRanks(perk.id.toString())
            if (ranks === perk.ranks) {
                return false;
            //doesn't meet lvl req for next rank
            } else if (newCharacter.lvl <= perk.levelReq + (ranks*perk.rankRange)) {
                return false;
            }
        }
        //level requirement
        if (newCharacter.lvl < perk.levelReq) {
            return false;
        }
        //special requirement
        for (const req of perk.reqs || []) {
            if (req.includes(':')) {
                const [stat, value] = req.split(':').map(s => s.trim());
                const statValue = newCharacter.special[stat];
                if (statValue === undefined || statValue < parseInt(value)) {
                    return false;
                }
            }
        }
        //book requirement
        if ((perk.reqs || []).includes("book") && !hasReadRequiredBook) {
            return false;
        }
        //other limiters
        for (const limit of perk.limits || []) {
            const lower = limit.toLowerCase();
            if (lower.includes("daring nature") && selectedPerks.includes('25')) {
                return false;
            }
            if (lower.includes("cautious nature") && selectedPerks.includes('18')) {
                return false;
            }
            if (lower.includes("robot") && ['4','18','19','20','21','23'].some(robotId => selectedTraits.includes(robotId))) {
                return false;
            }
            if (lower.includes("ghoul") && selectedTraits.includes('2')) {
                return false;
            }
            if (lower.includes("rads") && ['2','3','4','18','19','20','21','23','25'].some(robotId => selectedTraits.includes(robotId))) {
                return false;
            }
            if (lower.includes("companion") && hasCompanion) {
                return false;
            }
        }
        return true;
    }

    $: filteredPerks = allPerks.filter(perk => {
        const specialReq = getSpecialRequirementTypes(perk);
        if (!specialReq.some(req => specialFilters[req])) return false;
        if (showEligibleOnly && !isEligibleForPerk(perk)) return false;

        return true;
    })

    function getPerkStatus(perk: perktype): string {
        const ranksTaken = getRanks(perk.id.toString());
        const maxRanks = perk.ranks;
        const available = isEligibleForPerk(perk);

        if (ranksTaken === maxRanks) {
            return "perk-taken";
        }
        if (available && ranksTaken > 0) {
            return "rank-available";
        }
        if (available && ranksTaken === 0) {
            return "perk-available";
        }
        return "perk-unavailable";
    }

    function addPerk(perkId: string) {
        selectedPerks = [...selectedPerks, perkId];
    }

    function removePerk(perkId: string) {
        const index = selectedPerks.indexOf(perkId);
        if (index !== -1) {
            selectedPerks = [
                ...selectedPerks.slice(0, index),
                ...selectedPerks.slice(index + 1)
            ];
        }
    }

    function getRanks(perkId: string) {
        return selectedPerks.filter(id => id === perkId).length;
    }

    let isPerksValid = false;

</script>



<div class={`page ${currentPage === 'perks' ? 'page-active' : 'page-leave'}`}>

    <h1>Perks</h1>
    <p>Perks: {maxPerks - perkPointsRemaining}/{maxPerks}</p>

    <label>
        <input
            type="checkbox"
            bind:checked={showEligibleOnly}
        />
        Show only perks {newCharacter.characterName} can take
    </label>

    <div>
        {#each Object.entries(specialFilters) as [key, value]}
        <label>
            <input
                type="checkbox"
                bind:checked={specialFilters[key]}
            />
            {key}
        </label>
        {/each}
    </div>

    <div class="perk-list">
        {#each filteredPerks as perk (perk.id)}
            <div class={` ${getPerkStatus(perk)}`}>
                <h4>{perk.name} {"✭".repeat(getRanks(perk.id.toString())) + "✩".repeat(perk.ranks-getRanks(perk.id.toString()))}</h4>
                <p><b>Lvl:</b> {perk.levelReq} | <b>Ranks:</b> {perk.ranks}</p>
                <pre>{perk.description.replace(/\\n/g, "\n")}</pre>
                <p><b>Requires:</b> {#if perk.reqs.length > 0}{#each perk.reqs as req}/{req}/{/each}{:else} None{/if} | <b>Limits:</b> {#if perk.limits.length > 0}{perk.limits}{:else} None{/if}</p>
                <div class="perk-buttons">
                    <button
                        disabled={(selectedPerks.length >= maxPerks) || selectedPerks.includes(perk.id.toString())}
                        on:click={() => addPerk(perk.id.toString())}
                    >
                        Take Perk
                    </button>
                    <button
                        disabled={!selectedPerks.includes(perk.id.toString()) || (selectedPerks.filter(id => id === perk.id.toString()).length > 1)}
                        on:click={() => removePerk(perk.id.toString())}
                        >
                        Drop Perk
                    </button>
                </div>
                <div class="perk-buttons">
                    <button
                        disabled={(selectedPerks.length >= maxPerks) || (selectedPerks.filter(id => id === perk.id.toString()).length === 0) || (selectedPerks.filter(id => id === perk.id.toString()).length === perk.ranks)}
                        on:click={() => selectedPerks = [...selectedPerks, perk.id.toString()]}
                    >
                        Add Rank
                    </button>
                    <button
                        disabled={!(selectedPerks.filter(id => id === perk.id.toString()).length > 1)}
                        on:click={() => selectedPerks = [
                            ...selectedPerks.slice(0, selectedPerks.indexOf(perk.id.toString())),
                            ...selectedPerks.slice(selectedPerks.indexOf(perk.id.toString()) + 1)
                        ]}
                    >
                        Drop Rank
                    </button>
                </div>
            </div>
        {/each}
    </div>


</div>
