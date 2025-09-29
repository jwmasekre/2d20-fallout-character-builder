<script lang="ts">

	import { pages } from '$lib/constants.ts';
	import type { BackgroundEquipment, FullCharacter, OriginWithTraits, Pages } from '$lib/server/types.ts';
	import { onMount } from 'svelte';

    let newCharacter:FullCharacter, selectedOrigin:string, selectedTraits:string[], currentPage:Pages, visitedPages:Pages[], selectedOriginData:OriginWithTraits, selectedArray = $props();

    let traitCount = $derived(selectedOriginData?.traits?.length ?? 0);

/*

 .S_sSSs     .S_SSSs     .S    S.   
.SS~YS%%b   .SS~SSSSS   .SS    SS.  
S%S   `S%b  S%S   SSSS  S%S    S%S  
S%S    S%S  S%S    S%S  S%S    S%S  
S%S    S&S  S%S SSSS%S  S&S    S%S  
S&S    S&S  S&S  SSS%S  S&S    S&S  
S&S    S&S  S&S    S&S  S&S    S&S  
S&S    S&S  S&S    S&S  S&S    S&S  
S*S    S*S  S*S    S&S  S*b    S*S  
S*S    S*S  S*S    S*S  S*S.   S*S  
S*S    S*S  S*S    S*S   SSSbs_S*S  
S*S    SSS  SSS    S*S    YSSP~SSS  
SP                 SP               
Y                  Y                

*/

    onMount(() => {
        navigateTo("origin");
    })
    $effect(() => {
        if (pages.includes(currentPage)) {
            if (!visitedPages.includes(currentPage)) visitedPages.push(currentPage);
        }
    });

    let pastPages:Pages[] = []

    $effect(() => {
        if (pages.includes(currentPage) && (pageValid || !pageValid)) {
            pastPages = []
            let previousPage = ""
            for (const page of pages) {
                if ((isPageValid(page) || page === currentPage || isPageValid(previousPage)) && visitedPages.includes(page)) {
                    pastPages = [...pastPages,page];
                    previousPage = page;
                } else break;
            }
        }
    });

    let nextPage = $derived((pages.indexOf(currentPage) < pages.length - 1) ? pages[pages.indexOf(currentPage)+1] : "");

    function isPageValid(page:string):boolean {
        switch (page) {
            case "origin":
                return newCharacter.characterName.trim().length > 0 && newCharacter.lvl > 0 && selectedOrigin != '' && (traitCount <= 1 || selectedTraits.length == 2 || newCharacter.ghoul);
            case "special":
                return Object.entries(selectedArray === 'Custom' ? customStats : specialStats).every(([key, val]) => val >= 4 && (isGifted && giftedSelected[key] ? val < getStatMax(key) : val <= getStatMax(key))) && remainingSpecialPoints === 0 && (!isGifted || giftedCount === 2);
            case "skills":
                return (skillPointsRemaining === 0 && Object.entries(skillPoints).every(([skill, points]) => points <= maxSkillCap) && Object.values(extraTagSkillSelections).filter(Boolean).length === extraTagSkills && Object.values(baseTagSkillSelections).filter(Boolean).length === baseTagSkills && (!forbiddenTagSkills || !tagSkills[forbiddenTagSkills]));
            case "perks":
                return perkPointsRemaining === 0;
            case "stats":
                return ['stats','equipment','review'].includes(currentPage) || isPageValid("perks");
            case "equipment":
                return isWeaponSelectValid && isApparelSelectValid && isConsumableSelectValid && isRobotModuleSelectValid && selectedBackgroundId !== "";
            case "review":
                return isPageValid("equipment");
            default:
                console.error("isPageValid received an unhandled string:",page)
                return false;
        }
    }

    let pageValid = false;
    $: {
        switch (currentPage) {
            case "origin":
                pageValid = newCharacter.characterName.trim().length > 0 && newCharacter.lvl > 0 && selectedOrigin != '' && (traitCount <= 1 || selectedTraits.length == 2 || newCharacter.ghoul);
                break;
            case "special":
                pageValid = Object.entries(selectedArray === 'Custom' ? customStats : specialStats).every(([key, val]) => val >= 4 && (isGifted && giftedSelected[key] ? val < getStatMax(key) : val <= getStatMax(key))) && remainingSpecialPoints === 0 && (!isGifted || giftedCount === 2);
                break;
            case "skills":
                pageValid = skillPointsRemaining === 0 && Object.entries(skillPoints).every(([skill, points]) => points <= maxSkillCap) && Object.values(extraTagSkillSelections).filter(Boolean).length === extraTagSkills && Object.values(baseTagSkillSelections).filter(Boolean).length === baseTagSkills && (!forbiddenTagSkills || !tagSkills[forbiddenTagSkills]);
				break;
            case "perks":
                pageValid = perkPointsRemaining === 0;
				break;
            case "stats":
                pageValid = ['stats','equipment','review'].includes(currentPage) || isPageValid("perks");
				break;
            case "equipment":
                pageValid = isWeaponSelectValid && isApparelSelectValid && isConsumableSelectValid && isRobotModuleSelectValid && selectedBackgroundId !== "";
				break;
            case "review":
                pageValid = isPageValid("equipment");
				break;
            default:
                pageValid = false;
        }
    }

    function navigateTo(page:string) {
        if (pages.includes(page)) currentPage = page;
    }

</script>

<div class="reverse-block">
    {#if pastPages.length > 0}
        {#each pastPages as page}
            <button class="reverse-button" disabled={page === currentPage} on:click={() => navigateTo(page)}>{page.substring(0,1).toUpperCase()+page.substring(1)}</button>
        {/each}
    {/if}
</div>

<div class="forward-block">
    <button class="forward-button" disabled={!pageValid} on:click={() => navigateTo(nextPage)}>{nextPage.substring(0,1).toUpperCase()+nextPage.substring(1)}</button>
</div>
