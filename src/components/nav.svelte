<script lang="ts">

	import { pages } from '$lib/constants.ts';
	import type { BackgroundEquipment, FullCharacter, OriginWithTraits, Pages, SpecialArray, SpecialGifted } from '$lib/server/types.ts';
    import { getStatMax } from '$lib/funcs.ts';
	import { onMount } from 'svelte';

    let newCharacter:FullCharacter, currentPage:Pages, visitedPages:Pages[], selectedOriginData:OriginWithTraits, giftedSelected:SpecialGifted, remainingSpecialPoints:number, remainingSkillRanks:number, equipmentValidity = $props();

    let traitCount = $derived(selectedOriginData!.traits.length);

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
            if (!visitedPages!.includes(currentPage)) visitedPages!.push(currentPage);
        }
    });

    let pastPages:Pages[] = []

    $effect(() => {
        if (pages.includes(currentPage) && (pageValid || !pageValid)) {
            pastPages = []
            let previousPage = ""
            for (const page of pages) {
                if ((isPageValid(page) || page === currentPage || isPageValid(previousPage)) && visitedPages!.includes(page)) {
                    pastPages = [...pastPages,page];
                    previousPage = page;
                } else break;
            }
        }
    });

    let nextPage:Pages | '' = $derived((pages.indexOf(currentPage!) < pages.length - 1) ? pages[pages.indexOf(currentPage!)+1] : '');

    function isPageValid(page:string):boolean {
        switch (page) {
            case "origin":
                return newCharacter!.characterName.trim().length > 0 && newCharacter!.lvl > 0 && newCharacter!.origin != 0 && (traitCount <= 1 || newCharacter!.traits.length === 2 || newCharacter!.ghoul);
            case "special":
                return Object.entries(newCharacter!.special).every(([key, val]) => val >= 4 && (newCharacter!.traits.filter(ctrait => ctrait.trait === 7).length > 0 && giftedSelected![key] ? val < getStatMax(key, newCharacter!) : val <= getStatMax(key, newCharacter!))) && remainingSpecialPoints! === 0 && (newCharacter!.traits.filter(ctrait => ctrait.trait === 7).length === 0 || Object.values(giftedSelected!).reduce((a, item) => a + (item ? 1 : 0), 0) === 2);
            case "skills":
                let skillsValid = true;
                let tagCount = $derived.by(() => {
                    switch (true) {
                        case [1,2,5,11,12,21,24].some(trait => newCharacter!.traits.filter(ctrait => ctrait.trait === trait)):
                            return 4;
                        case newCharacter!.traits.filter(ctrait => ctrait.trait === 13).length > 0:
                            return 5;
                        default:
                            return 3;
                    }
                });
                for (const skill of Object.values(newCharacter!.skills)) {
                    if (skill.total > Math.min(skill.max, (newCharacter!.lvl < 3 ? 3 : (newCharacter!.lvl > 6 ? 6 : newCharacter!.lvl)))) skillsValid = false;
                }
                if (remainingSkillRanks! !== 0 || Object.values(newCharacter!.skills). reduce((total, item) => total + (item.tagged ? 1 : 0), 0) !== tagCount || (newCharacter!.traits.filter(ctrait => ctrait.trait === 27).length > 0 && newCharacter!.skills.science.tagged)) skillsValid = false;
                return skillsValid;
            case "perks":
                return (newCharacter!.lvl + (newCharacter!.traits.filter(ctrait => ctrait.trait === 10).length > 0 ? 1 : 0)) - newCharacter!.perks.length === 0;
            case "stats":
                return ['stats','equipment','review'].includes(currentPage) || isPageValid("perks");
            case "equipment":
                return Object.values(equipmentValidity).reduce((a, item) => a + (item ? 1 : 0), 0) === 4;
            case "review":
                return isPageValid("equipment");
            default:
                console.error("isPageValid received an unhandled string:",page)
                return false;
        }
    }

    let pageValid = $derived(isPageValid(currentPage!))

    function navigateTo(page:Pages) {
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
