<script lang="ts">

	import { skills, skillPrettyMap } from '$lib/constants.ts';
	import type { FullCharacter, SkillStat } from '$lib/server/types.ts';

    let newCharacter:FullCharacter, currentPage:string, selectedTraits:string[] = $props();

// TODO: switch up tagging to just set the tagged flag to true and calculate each total accordingly

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


    let skillPoints = newCharacter.skills;
    let extraTagSkills = 0;
    let extraTagSkillSelections = {};
    let baseTagSkillSelections = {};
    let forcedTagSkills = '';
    let forbiddenTagSkills = '';
    let extraTagSkillOptions: SkillStat[] = skills;
    let maxSkillCap = $derived((newCharacter.lvl > 3 ? (newCharacter.lvl < 7 ? newCharacter.lvl : 6) : 3));
    let limitedSkills: SkillStat[] = [];
    let limitedSkillCap = 4;
    let baseTagSkills = 3;

    $effect(() => {
        updateExtraTagSkills(selectedTraits);
    });
    
    function updateExtraTagSkills(traits: string[]) {
        extraTagSkills = 0;
        extraTagSkillOptions = [];
        limitedSkills = [];
        forcedTagSkills = '';
        extraTagSkillSelections = {};

        if (traits.includes('1') || traits.includes('24')) {
            extraTagSkills = 1;
            extraTagSkillOptions = ["Energy Weapons", "Repair", "Science"];
        } else if (traits.includes('12')) {
            extraTagSkills = 1;
            extraTagSkillOptions = ['Small Guns', 'Energy Weapons'];
        } else if (traits.includes('13')) {
            extraTagSkills = 2;
            extraTagSkillOptions = ['Speech', 'Medicine', 'Repair', 'Science', 'Barter'];
            limitedSkills = ['Athletics', 'Big Guns', 'Energy Weapons', 'Explosives', 'Lockpick', 'Melee Weapons', 'Pilot', 'Small Guns', 'Sneak', 'Survival', 'Throwing', 'Unarmed'];
        } else if (traits.includes('5') || traits.includes('11') || traits.includes('21')) {
            extraTagSkills = 1;
            extraTagSkillOptions = skills;
        } else if (traits.includes('2')) {
            extraTagSkills = 1;
            extraTagSkillOptions = ['Survival'];
            forcedTagSkills = 'Survival';
            extraTagSkillSelections['Survival'] = true;
            toggleTagSkill('Survival',false);
        } else if (traits.includes('3') || traits.includes('25')) {
            limitedSkills = ['Athletics', 'Big Guns', 'Energy Weapons', 'Explosives', 'Lockpick', 'Melee Weapons', 'Pilot', 'Small Guns', 'Sneak', 'Survival', 'Throwing', 'Unarmed'];
        }
        if (selectedTraits.includes('27')) {
            forbiddenTagSkills = 'Science';
        } else {
            forbiddenTagSkills = '';
        }
    }

    let totalTagSkillsAllowed = $derived(baseTagSkills + extraTagSkills);

    function handleSkillPointChange(skill:SkillStat, value:string) {
        const parsedValue = parseInt(value);
        if (!isNaN(parsedValue)) {
            let maxPoints = limitedSkills.includes(skill) ? limitedSkillCap : maxSkillCap;
            if (parsedValue <= maxPoints) {
                skillPoints[skillPrettyMap[skill]].ranks = parsedValue;
            }
            if (tagSkills[skill] && parsedValue < 2) {
                skillPoints[skillPrettyMap[skill]].ranks = 2
            }
        }
    }
    
    let tagSkills = $derived({...extraTagSkillSelections,...baseTagSkillSelections});
    let skillPointsRemaining = $derived(9 + newCharacter.special.intelligence + Object.values(tagSkills).filter(Boolean).length - Object.values(skillPoints).reduce((acc, val) => acc + val.ranks, 0));

    function toggleTagSkill(skill:SkillStat,base:boolean) {
        if (skillPoints[skillPrettyMap[skill]].ranks >= maxSkillCap) {
            skillPoints[skillPrettyMap[skill]].ranks += -2;
        }
        if (base) {
            skillPoints[skillPrettyMap[skill]].ranks += baseTagSkillSelections[skill] ? 2 : -2;
            skillPointsRemaining += baseTagSkillSelections[skill] ? 2 : -2;
        } else {
            skillPoints[skillPrettyMap[skill]].ranks += extraTagSkillSelections[skill] ? 2 : -2;
            skillPointsRemaining += extraTagSkillSelections[skill] ? 2 : -2;
        }
    }

</script>



<div class={`page ${currentPage === 'skills' ? 'page-active' : 'page-leave'}`}>


    <h1>Skills</h1>
    <p>Remaining Skill Points: {skillPointsRemaining}</p>
    <p>Tag Skills: {Object.values(tagSkills).filter(Boolean).length}/{totalTagSkillsAllowed}</p>
    {#if extraTagSkills > 0}
        <h3>Extra Tag Skills ({Object.values(extraTagSkillSelections).filter(Boolean).length}/{extraTagSkills})</h3>
        {#each extraTagSkillOptions as skill}
            <label>
                <input 
                    type="checkbox"
                    bind:checked={extraTagSkillSelections[skill]}
                    on:change={() => toggleTagSkill(skill,false)}
                    disabled={
                        (!extraTagSkillSelections[skill] && Object.values(extraTagSkillSelections).filter(Boolean).length >= extraTagSkills)
                        || forcedTagSkills === skill
                    }
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
                <div>{skill} ({maxSkillCap})</div>
                <input
                    type="number"
                    class="skill-input"
                    bind:value={skillPoints[skillPrettyMap[skill]].ranks}
                    min="0"
                    max={maxSkillCap}
                    on:input={(e) => handleSkillPointChange(skill, e.target.value)}
                />
                <input
                    type="checkbox"
                    class="tag-skill-checkbox"
                    bind:checked={baseTagSkillSelections[skill]}
                    on:change={() => toggleTagSkill(skill,true)}
                    disabled={
                        Object.values(extraTagSkillSelections).filter(Boolean).length < extraTagSkills
                        || (!baseTagSkillSelections[skill] && Object.values(baseTagSkillSelections).filter(Boolean).length >= baseTagSkills)
                        || forcedTagSkills === skill
                        || forbiddenTagSkills === skill
                        || extraTagSkillSelections[skill]
                    }
                />
                <span
                    class:forced-tag={forcedTagSkills === skill}
                    class:forbidden-tag={forbiddenTagSkills === skill}
                >
                    Tag Skill
                </span>
            </div>
        {/each}
    </div>
</div>
