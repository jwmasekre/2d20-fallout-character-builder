<script lang="ts">

	import { skills, skillPrettyMap } from '$lib/constants.ts';
	import type { FullCharacter, SkillStat } from '$lib/server/types.ts';

    let newCharacter:FullCharacter, currentPage:string, selectedTraits:string[] = $props();

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

/*
Testing a new way to handle this page
This includes doing more direct read/write to the newCharacter object, rather than having proxy objects to read/write to
W̶e̶ ̶l̶o̶s̶e̶ ̶s̶o̶m̶e̶ ̶v̶i̶s̶i̶b̶i̶l̶i̶t̶y̶ ̶o̶n̶ ̶e̶x̶t̶r̶a̶ ̶t̶a̶g̶s̶ ̶v̶s̶ ̶s̶t̶a̶n̶d̶a̶r̶d̶,̶ ̶b̶u̶t̶ ̶I̶ ̶d̶o̶n̶'̶t̶ ̶t̶h̶i̶n̶k̶ ̶t̶h̶a̶t̶'̶l̶l̶ ̶b̶e̶ ̶s̶u̶p̶e̶r̶ ̶v̶a̶l̶u̶a̶b̶l̶e̶
We'll need some way to track it but it'll be more straightforward
*/

    let extraTagCount = $derived.by(() => {
        switch (true) {
            case (['1', '2', '5', '11', '12', '21', '24'].some(trait => selectedTraits.includes(trait))):
                return 1;
            case (selectedTraits.includes('13')):
                return 2;
            default:
                return 0;
        }
    });
    let extraTagOptions:SkillStat[] = $derived.by(() => {
        switch (true) {
            case (['1', '24'].some(trait => selectedTraits.includes(trait))):
                return ["Energy Weapons", "Repair", "Science"];
            case (selectedTraits.includes('12')):
                return ['Small Guns', 'Energy Weapons'];
            case (selectedTraits.includes('13')):
                return ['Speech', 'Medicine', 'Repair', 'Science', 'Barter'];
            case (['5', '11', '21'].some(trait => selectedTraits.includes(trait))):
                return skills;
            case (selectedTraits.includes('2')):
                return ['Survival'];
            default:
                return [];
        }
    });
    let extraTags:SkillStat[] = [];
    let forcedTags:SkillStat | '' = $derived(selectedTraits.includes('2') ? 'Survival' : '');
    $effect(() => {
        if (forcedTags !== '') newCharacter!.skills[skillPrettyMap[forcedTags]].tagged = true;
    });
    let forbiddenTags = $derived(selectedTraits.includes('27') ? 'Science' : '');
    let limitedSkill = $derived.by(() => {
        switch (true) {
            case (selectedTraits.includes('13')):
                return ['Athletics', 'Big Guns', 'Energy Weapons', 'Explosives', 'Lockpick', 'Melee Weapons', 'Pilot', 'Small Guns', 'Sneak', 'Survival', 'Throwing', 'Unarmed'];
            case (['3', '25'].some(trait => selectedTraits.includes(trait))):
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