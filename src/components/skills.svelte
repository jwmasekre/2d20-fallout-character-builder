<script lang="ts">

	import { skills, skillPrettyMap } from '$lib/constants.ts';
	import type { FullCharacter, SkillStat } from '$lib/server/types.ts';

    let newCharacter:FullCharacter, currentPage:string = $props();

/*

 d%%SP  .SS    SS.  .SS  SS.     SS.      d%%SP  
d%S'    S%S    S&S  S%S  S%S     S%S     d%S'    
S%|     S%S    d*S  S%S  S%S     S%S     S%|     
S&S     S&S   .S*S  S&S  S&S     S&S     S&S     
Y&Ss    S&S_sdSSS   S&S  S&S     S&S     Y&Ss    
`S&&S   S&S~YSSY%b  S&S  S&S     S&S     `S&&S   
  `S*S  S&S    `S%  S&S  S&S     S&S       `S*S  
   l*S  S*S     S%  S*S  S*b     S*b        l*S  
  .S*P  S*S     S&  S*S  S*S.    S*S.      .S*P  
sSS*S   S*S     S&  S*S   SSSbs   SSSbs  sSS*S   
YSS'    S*S     SS  S*S    YSSP    YSSP  YSS'    
        SP          SP                           
        Y           Y                            

*/



    let extraTagCount = $derived.by(() => {
        switch (true) {
            case [1,2,5,11,12,21,24].some(trait => newCharacter!.traits.filter(ctrait => ctrait.trait === trait)):
                return 1;
            case newCharacter!.traits.filter(ctrait => ctrait.trait === 13).length > 0:
                return 2;
            default:
                return 0;
        }
    });
    let extraTagOptions:SkillStat[] = $derived.by(() => {
        switch (true) {
            case [1,24].some(trait => newCharacter!.traits.filter(ctrait => ctrait.trait === trait)):
                return ["Energy Weapons", "Repair", "Science"];
            case newCharacter!.traits.filter(ctrait => ctrait.trait === 12).length > 0:
                return ['Small Guns', 'Energy Weapons'];
            case newCharacter!.traits.filter(ctrait => ctrait.trait === 13).length > 0:
                return ['Speech', 'Medicine', 'Repair', 'Science', 'Barter'];
            case [5,11,21].some(trait => newCharacter!.traits.filter(ctrait => ctrait.trait === trait)):
                return skills;
            case newCharacter!.ghoul:
                return ['Survival'];
            default:
                return [];
        }
    });
    let extraTags:SkillStat[] = [];
    let forcedTags:SkillStat | '' = $derived(newCharacter!.ghoul ? 'Survival' : '');
    $effect(() => {
        if (forcedTags !== '') newCharacter!.skills[skillPrettyMap[forcedTags]].tagged = true;
    });
    let forbiddenTags = $derived(newCharacter!.traits.filter(ctrait => ctrait.trait === 27).length > 0 ? 'Science' : '');
    let limitedSkill = $derived.by(() => {
        switch (true) {
            case newCharacter!.traits.filter(ctrait => ctrait.trait === 13).length > 0:
                return ['Athletics', 'Big Guns', 'Energy Weapons', 'Explosives', 'Lockpick', 'Melee Weapons', 'Pilot', 'Small Guns', 'Sneak', 'Survival', 'Throwing', 'Unarmed'];
            case [3,25].some(trait => newCharacter!.traits.filter(ctrait => ctrait.trait === trait)):
                return skills;
            default:
                return [];
        }
    });
    let maxSkillRanks = $derived(9 + newCharacter!.special.intelligence + newCharacter!.lvl - 1);
    let totalSkillRanks = $derived(Object.values(newCharacter!.skills).reduce((total, item) => total + item.ranks, 0));
    $effect(() => {
        for (const skill of skills) {
            newCharacter!.skills[skillPrettyMap[skill]].total = newCharacter!.skills[skillPrettyMap[skill]].ranks + (newCharacter!.skills[skillPrettyMap[skill]].tagged ? 2 : 0);
        }
    });
    let totalTagged = $derived(Object.values(newCharacter!.skills).reduce((total, item) => total + (item.tagged ? 1 : 0), 0));
    let maxSkillRank = $derived((newCharacter!.lvl > 3 ? (newCharacter!.lvl < 7 ? newCharacter!.lvl : 6) : 3));
    let maxSkillRankLimited = $derived(Math.min(maxSkillRank,4));


</script>

<div class={`page ${currentPage! === 'skills' ? 'page-active' : 'page-leave'}`}>

    <h1>Skills</h1>
    <p>Remaining Skill Points: {maxSkillRanks - totalSkillRanks}</p>
    <p>Tag Skills: {totalTagged}/{3+extraTagCount}</p>
    {#if extraTagCount > 0}
        <h3>Extra Tag Skills ({extraTags.length}/{extraTagCount})</h3>
        {#each extraTagOptions as skill}
            <label>
                <input 
                    type="checkbox"
                    bind:checked={newCharacter![skillPrettyMap[skill]].tagged}
                    on:change={() => newCharacter![skillPrettyMap[skill]].tagged ? (!extraTags.includes(skill) ? extraTags = extraTags.concat(skill) : extraTags = extraTags) : extraTags = extraTags.filter(item => item !== skill)}
                    disabled={extraTags.length >= extraTagCount && !(extraTags.includes(skill))}
                />
                {skill}
            </label>
        {/each}
        <h3>Standard Tag Skills and Points</h3>
    {:else}
        <h3>Tag Skills and Points</h3> 
    {/if}

    <div class="skill-list">
        {#each skills as skill, index}
            <div class="skill-item" key={index}>
                <div>{skill} ({limitedSkill.includes(skill) ? maxSkillRankLimited : maxSkillRank})</div>
                <input
                    type="number"
                    class="skill-input"
                    bind:value={newCharacter!.skills[skillPrettyMap[skill]].ranks}
                    min="0"
                    max={(limitedSkill.includes(skill) ? maxSkillRankLimited : maxSkillRank) - (newCharacter!.skills[skillPrettyMap[skill]].tagged ? 2 : 0)}
                />
                <input
                    type="checkbox"
                    class="tag-skill-checkbox"
                    bind:checked={newCharacter!.skills[skillPrettyMap[skill]].tagged}
                    disabled={forbiddenTags === skill || extraTags.includes(skill) || extraTags.length < extraTagCount || (newCharacter!.skills[skillPrettyMap[skill]].ranks > ((limitedSkill.includes(skill) ? maxSkillRankLimited : maxSkillRank) - (newCharacter!.skills[skillPrettyMap[skill]].tagged ? 2 : 0))) || (!(newCharacter!.skills[skillPrettyMap[skill]].tagged) && (totalTagged >= (3 + extraTagCount)))}
                />
                <span
                    class:forced-tag={forcedTags === skill}
                    class:forbidden-tag={forbiddenTags === skill}
                >
                    Tag Skill
                </span>
            </div>
        {/each}
    </div>
</div>