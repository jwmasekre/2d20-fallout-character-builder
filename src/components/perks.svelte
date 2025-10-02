<script lang="ts">

	import type { CharPerk, FullCharacter, perktype } from '$lib/server/types.ts';

    let newCharacter:FullCharacter, currentPage:string, allPerks:perktype[], hasCompanion:boolean = $props();

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
    let maxPerks = $derived(newCharacter!.lvl + (newCharacter!.traits.filter(ctrait => ctrait.trait === 10).length > 0 ? 1 : 0));
    let perkPointsRemaining = $derived(maxPerks - newCharacter!.perks.length);
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

    function isEligibleForPerk(perk:perktype) {
        //has perk already
        if (newCharacter!.perks.find(cperk => cperk.perk === perk.id)) {
            let ranks = getRanks(perk.id)
            if (ranks === perk.ranks) {
                return false;
            //doesn't meet lvl req for next rank
            } else if (newCharacter!.lvl <= perk.levelReq + (ranks*perk.rankRange)) {
                return false;
            }
        }
        //level requirement
        if (newCharacter!.lvl < perk.levelReq) {
            return false;
        }
        //special requirement
        for (const req of perk.reqs || []) {
            if (req.includes(':')) {
                const [stat, value] = req.split(':').map(s => s.trim());
                const statValue = newCharacter!.special[stat];
                if (statValue === undefined || statValue < parseInt(value)) {
                    return false;
                }
            }
        }
        //book requirement
        if ((perk.reqs || []).includes("book")) {
        const hasReadRequiredBook = newCharacter!.readBooks.find(book => book.bookPerk === perk.name);
            if (!hasReadRequiredBook) {
                return false;
            }
        }
        //other limiters
        for (const limit of perk.limits || []) {
            const lower = limit.toLowerCase();
            if (lower.includes("daring nature") && newCharacter!.perks.find(cperk => cperk.perk === 25)) {
                return false;
            }
            if (lower.includes("cautious nature") && newCharacter!.perks.find(cperk => cperk.perk === 18)) {
                return false;
            }
            if (lower.includes("robot") && newCharacter!.robot) {
                return false;
            }
            if (lower.includes("ghoul") && newCharacter!.ghoul) {
                return false;
            }
            if (lower.includes("rads") && (newCharacter!.robot || newCharacter!.ghoul || newCharacter!.supermutant)) {
                return false;
            }
            if (lower.includes("companion") && hasCompanion) {
                return false;
            }
        }
        return true;
    }

    let filteredPerks = $derived(allPerks!.filter(perk => getSpecialRequirementTypes(perk).some(req => specialFilters[req]) && (!showEligibleOnly || isEligibleForPerk(perk))));

    function getPerkStatus(perk: perktype): string {
        const ranksTaken = getRanks(perk.id);
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

    function addPerk(perk: perktype) {
        if (newCharacter!.perks.filter(cperk => cperk.perk === perk.id)) {
            const cperkIndex = newCharacter!.perks.findIndex(cperk => cperk.perk === perk.id);
            newCharacter!.perks[cperkIndex].ranks += 1;
        } else {
            const cperk:CharPerk = {
                perk: perk.id,
                perkName: perk.name,
                perkDescription: [perk.description],
                ranks: 1
            }
            newCharacter!.perks.push(cperk);
        }
    }

    function removePerk(perk: perktype) {
        const cperkIndex = newCharacter!.perks.findIndex(cperk => cperk.perk === perk.id);
        if (newCharacter!.perks[cperkIndex].ranks > 1) {
            newCharacter!.perks[cperkIndex].ranks -= 1;
        } else {
            newCharacter!.perks.splice(cperkIndex,1);
        }
    }

    function getRanks(perkId: number) {
        return newCharacter!.perks.find(cperk => cperk.perk === perkId).ranks;
    }

    let isPerksValid = false;

</script>



<div class={`page ${currentPage! === 'perks' ? 'page-active' : 'page-leave'}`}>

    <h1>Perks</h1>
    <p>Perks: {maxPerks - perkPointsRemaining}/{maxPerks}</p>

    <label>
        <input
            type="checkbox"
            bind:checked={showEligibleOnly}
        />
        Show only perks {newCharacter!.characterName} can take
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
                <h4>{perk.name} {"✭".repeat(getRanks(perk.id)) + "✩".repeat(perk.ranks-getRanks(perk.id))}</h4>
                <p><b>Lvl:</b> {perk.levelReq} | <b>Ranks:</b> {perk.ranks}</p>
                <pre>{perk.description.replace(/\\n/g, "\n")}</pre>
                <p><b>Requires:</b> {#if perk.reqs.length > 0}{#each perk.reqs as req}/{req}/{/each}{:else} None{/if} | <b>Limits:</b> {#if perk.limits.length > 0}{perk.limits}{:else} None{/if}</p>
                <div class="perk-buttons">
                    <button
                        disabled={
                            (newCharacter!.perks.length >= maxPerks) ||
                            (newCharacter!.perks.filter(cperk => cperk.perk === perk.id).length > 0)
                        }
                        on:click={() => addPerk(perk)}
                    >
                        Take Perk
                    </button>
                    <button
                        disabled={
                            newCharacter!.perks.filter(cperk => cperk.perk === perk.id).length === 0 ||
                            (newCharacter!.perks.filter(cperk => 
                                cperk.perk === perk.id &&
                                cperk.ranks > 1
                            ).length >= 1)
                        }
                        on:click={() => removePerk(perk)}
                        >
                        Drop Perk
                    </button>
                </div>
                <div class="perk-buttons">
                    <button
                        disabled={
                            (newCharacter!.perks.length >= maxPerks) ||
                            (newCharacter!.perks.filter(cperk => cperk.perk === perk.id).length === 0) ||
                            (newCharacter!.perks.filter(cperk => 
                                cperk.perk === perk.id &&
                                cperk.ranks === perk.ranks
                            ).length >= 1)
                        }
                        on:click={() => addPerk(perk)}
                    >
                        Add Rank
                    </button>
                    <button
                        disabled={
                            (newCharacter!.perks.filter(cperk =>
                                cperk.perk === perk.id &&
                                cperk.ranks >= 1
                            ).length === 0)
                        }
                        on:click={() => removePerk(perk)}
                    >
                        Drop Rank
                    </button>
                </div>
            </div>
        {/each}
    </div>


</div>
