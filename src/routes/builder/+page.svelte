<script lang="ts">
    import { onMount } from 'svelte';
    // custom types are all stored in src/lib/server/types.ts
    // for some reason +page.svelte files do not like src/lib/types.ts
    import type { FullCharacter, OriginWithTraits, perktype, Background, BackgroundStuff, BackgroundEquipment, GroupWeapons, GroupApparel, BackgroundApparel, GroupConsumables, GroupRobotModules, Apparel, BackgroundWeapon, WeaponMod, BackgroundConsumable, BackgroundRobotModule, stdDr, handyDr, securDr } from '$lib/server/types.ts'
    // to save on space, constants are stored in src/lib/server/constants.ts and imported
    import { arrays, skills, pages } from '$lib/constants.ts';
    // functions that have to be available across all pages
    import { resetCharacter } from '$lib/funcs.ts';

    // retrieves data from the db for origins, traits, and perks
    export let data: {
        groupedOrigins: Record<string, OriginWithTraits[]>;
        sourcebookMap: Record<string, string>;
        allPerks: perktype[];
    };

    // create a new character object to build off of
    let newCharacter: FullCharacter = $state();
    let selectedTraits: string[] = $state([]);
    let selectedPerks: string[] = $state([]);
    let backgroundEquipment: BackgroundEquipment = $state(undefined);
    let selectedBackgroundIndex: number | null = $state(null);

    //set the initial character object to default
    newCharacter = resetCharacter();

    /*
    let characterId: number | null = null;
    
    let saveResult;
    $: if (saveResult.data.success && saveResult.data.characterId) {
        characterId = saveResult.data.characterId
    }
    */

    import Origin from '../../components/origin.svelte';
    import Special from '../../components/special.svelte';
    import Skills from '../../components/skills.svelte';
    import Perks from '../../components/perks.svelte';
    import Stats from '../../components/stats.svelte';
    import Equipment from '../../components/equipment.svelte';


/*

 .S_sSSs      sSSs   .S    S.    .S    sSSs   .S     S.   
.SS~YS%%b    d%%SP  .SS    SS.  .SS   d%%SP  .SS     SS.  
S%S   `S%b  d%S'    S%S    S%S  S%S  d%S'    S%S     S%S  
S%S    S%S  S%S     S%S    S%S  S%S  S%S     S%S     S%S  
S%S    d*S  S&S     S&S    S%S  S&S  S&S     S%S     S%S  
S&S   .S*S  S&S_Ss  S&S    S&S  S&S  S&S_Ss  S&S     S&S  
S&S_sdSSS   S&S~SP  S&S    S&S  S&S  S&S~SP  S&S     S&S  
S&S~YSY%b   S&S     S&S    S&S  S&S  S&S     S&S     S&S  
S*S   `S%b  S*b     S*b    S*S  S*S  S*b     S*S     S*S  
S*S    S%S  S*S.    S*S.   S*S  S*S  S*S.    S*S  .  S*S  
S*S    S&S   SSSbs   SSSbs_S*S  S*S   SSSbs  S*S_sSs_S*S  
S*S    SSS    YSSP    YSSP~SSS  S*S    YSSP  SSS~SSS~S*S  
SP                              SP                        
Y                               Y                         

*/



    let charDr: stdDr | handyDr | securDr;
    let bodyParts:string[] = [];


    let isRobot = false;
    $: if (['4','18','19','20','23'].some(robotId => selectedTraits.includes(robotId))) isRobot = true;

    //max(clothing(arms,legs,torso),armor)
    //outfit replaces clothing and armor
    //robots have standard unless otherwise stated
    let equippedApparel = {};
    function calculateDr() {
        console.log("equipped apparel changed:",JSON.stringify(equippedApparel));
        for (const part of bodyParts) {
            isRobot ? charDr[part].phys = 2 : charDr[part].phys = 0, charDr[part].enrg = 0, charDr[part].rads = 0;
        }
        if (equippedApparel.hasOwnProperty("outfit") && equippedApparel.outfit != null) {
            equippedApparel.larm = null, equippedApparel.rarm = null, equippedApparel.lleg = null, equippedApparel.rleg = null, equippedApparel.clothing = null;
            for (const part of bodyParts) {
                console.log("part:",part)
                console.log("apparel cover:", JSON.stringify(apparelCoversMap.get(equippedApparel.outfit.id)))
                console.log("equipped return:", JSON.stringify(equippedApparel[part]))
                if (apparelCoversMap.get(equippedApparel.outfit.id)?.includes(part)) charDr[part].phys = equippedApparel.outfit.physDr, charDr[part].enrg = equippedApparel.outfit.enrgDr, charDr[part].rads = equippedApparel.outfit.radsDr;
            }
        }
        if (equippedApparel.hasOwnProperty("clothing") && equippedApparel.clothing != null) {
            for (const part of bodyParts) {
                if (apparelCoversMap.get(equippedApparel.clothing.id)?.includes(part)) charDr[part].phys = equippedApparel.clothing.physDr, charDr[part].enrg = equippedApparel.clothing.enrgDr, charDr[part].rads = equippedApparel.clothing.radsDr;
            }
        }
        for (const part of bodyParts) {
            if (equippedApparel[part] != null) (charDr[part].phys = equippedApparel[part].physDr, charDr[part].enrg = equippedApparel[part].enrgDr, charDr[part].rads = equippedApparel[part].radsDr)
        }
        console.log("chardr:",JSON.stringify(charDr));
    }

    const apparelMap = new Map<number,Apparel>();
    const apparelCoversMap = new Map<number,string[]>();
    const apparelTypeMap = new Map<number,string>();

    $: if (backgroundEquipment) {
        console.log("doing apparel mapping");
        for (const apparelEntry of backgroundEquipment.apparel) {
            const apparel = apparelEntry.apparel;
            const covers = apparelEntry.covers;
            const type = apparelEntry.type;
            console.log("mapping:",JSON.stringify(apparelEntry))
            if (!apparelCoversMap.has(apparel.id)) {
                apparelCoversMap.set(apparel.id, []);
            }
            if (!apparelTypeMap.has(apparel.id)) {
                apparelTypeMap.set(apparel.id, type.name);
            }
            if (!apparelMap.has(apparel.id)) {
                apparelMap.set(apparel.id, apparel)
            }
            for (const loc of covers) {
                apparelCoversMap.get(apparel.id)!.push(loc.trim().toLowerCase().replace("left ","l").replace("right ","r").replace("torso","body"))
            }
        }
    }

    function equipApparelItem() {
        equippedApparel = {};
        for (const item of allSelectedApparelIds) {
            const id = bgApparelIdtoApparelId.get(parseInt(item))!.id
            const coverage = apparelCoversMap.get(id);
            const apparelType = apparelTypeMap.get(id);
            const apparel = apparelMap.get(id);
            console.log("equipping:", JSON.stringify(apparel));

            switch (apparelType) {
                case "Clothing":
                    equippedApparel.clothing = apparel;
                    equippedApparel.outfit = null;
                    return;
                case "Outfit":
                    equippedApparel.outfit = apparel;
                    return;
                case "Headgear":
                    if (isRobot) {
                        equippedApparel.hat = apparel;
                        return;
                    }
            }

            for (const part of coverage) {
                if (part in equippedApparel) {
                    equippedApparel[part] = apparel;
                }
            }
        }
        calculateDr();
    }

    $: if (allSelectedApparelIds) {
        console.log("selected apparel changed:", JSON.stringify(selectedApparel));
        equipApparelItem();
    }
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

    let currentPage = "";
        onMount(() => {
        navigateTo("origin");
    })
    let nextPage = "";
    let visitedPages:string[] = $state([]);
    $: if (pages.includes(currentPage)) {
        if (!visitedPages.includes(currentPage)) visitedPages.push(currentPage);
    }

    let pastPages:string[] = []

    $: if (pages.includes(currentPage) && (pageValid || !pageValid)) {
        pastPages = []
        let previousPage = ""
        for (const page of pages) {
            if ((isPageValid(page) || page === currentPage || isPageValid(previousPage)) && visitedPages.includes(page)) {
                pastPages = [...pastPages,page];
                previousPage = page;
            } else break;
        }
    }

    $: nextPage = (pages.indexOf(currentPage) < pages.length - 1) ? pages[pages.indexOf(currentPage)+1] : "";

    function isPageValid(page:string):boolean {
        switch (page) {
            case "origin":
                return charName.trim().length > 0 && newCharacter.lvl > 0 && selectedOrigin != '' && (traitCount <= 1 || selectedTraits.length == 2 || isGhoul);
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
                pageValid = charName.trim().length > 0 && newCharacter.lvl > 0 && selectedOrigin != '' && (traitCount <= 1 || selectedTraits.length == 2 || isGhoul);
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

<!--

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

-->

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

<!--

  sSSs   .S_SSSs     .S    S.     sSSs  
 d%%SP  .SS~SSSSS   .SS    SS.   d%%SP  
d%S'    S%S   SSSS  S%S    S%S  d%S'    
S%|     S%S    S%S  S%S    S%S  S%S     
S&S     S%S SSSS%S  S&S    S%S  S&S     
Y&Ss    S&S  SSS%S  S&S    S&S  S&S_Ss  
`S&&S   S&S    S&S  S&S    S&S  S&S~SP  
  `S*S  S&S    S&S  S&S    S&S  S&S     
   l*S  S*S    S&S  S*b    S*S  S*b     
  .S*P  S*S    S*S  S*S.   S*S  S*S.    
sSS*S   S*S    S*S   SSSbs_S*S   SSSbs  
YSS'    SSS    S*S    YSSP~SSS    YSSP  
               SP                       
               Y                        

-->

<!--
<form method="POST" use:enhance={(res) => { res.then(r => saveResult = r); }}>
    
    <input type="hidden" name="originId" value={selectedOriginData?.id} />
    <input type="hidden" name="isGhoul" value={isGhoul ? 'on' : ''} />
    <input type="hidden" name="charName" value={charName} />
    <input type="hidden" name="level" value={newCharacter.lvl} />
    <input type="hidden" name="characterId" value={characterId ?? ''} />
    {#each selectedTraits as trait}
        <input type="hidden" name="selectedTraits" value={trait} />
    {/each}
    
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
    
    {#if isSkillsValid}
        {#each Object.entries(skillPoints) as [skill, value]}
            <input type="hidden" name={`skillPoints[${skill}]`} value={value} />
        {/each}
        {#each Object.entries(tagSkills) as [skill, isTagged]}
            <input type="hidden" name={`tagSkills[${skill}]`} value={isTagged ? 'on' : ''} />
        {/each}
    {/if}
-->

<!--
    <div class="save-button">
        <button type="submit" name="action" value="saveCharacter" class="saveButton">Save Character</button>
    </div>
-->

<!--
</form>

{#if saveResult?.data?.success}
    <p>Character saved with ID {saveResult.data.characterId}</p>
{:else if saveResult?.data?.error}
    <p>Error: {saveResult.data.error}</p>
{/if}
-->

<Origin newCharacter={newCharacter} groupedOrigins={data.groupedOrigins} sourcebookMap={data.sourcebookMap} currentPage={currentPage} selectedBackgroundIndex={selectedBackgroundIndex} backgroundEquipment={backgroundEquipment} visitedPages={visitedPages} selectedTraits={selectedTraits}/>

<Special newCharacter={newCharacter} currentPage={currentPage}/>

<Skills newCharacter={newCharacter} currentPage={currentPage} selectedTraits={selectedTraits}/>

<Perks newCharacter={newCharacter} currentPage={currentPage} selectedTraits={selectedTraits} allPerks={data.allPerks} selectedPerks={selectedPerks}/>

<Stats newCharacter={newCharacter} currentPage={currentPage} selectedTraits={selectedTraits} selectedPerks={selectedPerks}/>

<Equipment newCharacter={newCharacter} currentPage={currentPage}/>


<!--

 .S_sSSs      sSSs   .S    S.    .S    sSSs   .S     S.   
.SS~YS%%b    d%%SP  .SS    SS.  .SS   d%%SP  .SS     SS.  
S%S   `S%b  d%S'    S%S    S%S  S%S  d%S'    S%S     S%S  
S%S    S%S  S%S     S%S    S%S  S%S  S%S     S%S     S%S  
S%S    d*S  S&S     S&S    S%S  S&S  S&S     S%S     S%S  
S&S   .S*S  S&S_Ss  S&S    S&S  S&S  S&S_Ss  S&S     S&S  
S&S_sdSSS   S&S~SP  S&S    S&S  S&S  S&S~SP  S&S     S&S  
S&S~YSY%b   S&S     S&S    S&S  S&S  S&S     S&S     S&S  
S*S   `S%b  S*b     S*b    S*S  S*S  S*b     S*S     S*S  
S*S    S%S  S*S.    S*S.   S*S  S*S  S*S.    S*S  .  S*S  
S*S    S&S   SSSbs   SSSbs_S*S  S*S   SSSbs  S*S_sSs_S*S  
S*S    SSS    YSSP    YSSP~SSS  S*S    YSSP  SSS~SSS~S*S  
SP                              SP                        
Y                               Y                         

-->

<div class={`page ${currentPage === 'review' ? 'page-active' : 'page-leave'}`}>
    {#if isPageValid('equipment')}
        <div class="review-header">
            <div class="char-name">
                <p><strong>{charName}</strong></p>
            </div>
            <div class="xp-origin">
                <p>XP: {xp}</p>
                <p>Origin: {selectedOriginData.name}</p>
            </div>
            <div class="char-lvl">
                <p>{newCharacter.lvl}</p>
            </div>
        </div>
        <div class="special-bar">
            {#each Object.entries(specialStats) as stat}
                <div class="special-spacer">
                    <div class="special-char" id="special-{stat[0][0]}"><p>{stat[0][0].toUpperCase()}</p></div>
                    <div class="special-stat" id="special-{stat[0]}">
                        <div class="special-val" id="special-{stat[0]}-val"><p>{stat[1]}</p></div>
                    </div>
                </div>
            {/each}
        </div>
        <div class="skills-stats-dr">
            <div class="skill-col">
                <div class="char-skills">
                    <table>
                        <thead>
                            <tr>
                                <th class="thead-skill" scope="col">Skill</th>
                                <th class="thead-value" scope="col">Value</th>
                                <th class="thead-tag" scope="col">Tag</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each Object.entries(skillPoints) as skill}
                                <tr>
                                    <td class="tdat-skill">{skill[0].replace("ons","")}</td>
                                    <td class="tdat-value">{skill[1]}</td>
                                    <td class="tdat-tag"><!--{#if tagSkills[skill[0]]}☑{:else}☐{/if}</td>
                                    <td>-->{#if tagSkills[skill[0]]}✅{/if}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="char-stats-dr">
                <div class="char-stats">
                    {#if selectedTraits.includes('22')}
                        <div class="char-radpts">
                            <p class="stat-val">0</p>
                            <p class="stat-label">Rad Points</p>
                        </div>
                    {/if}
                    <div class="char-hp">
                        <p class="stat-val" id="char-hp-value">{maxHealth}/{maxHealth}</p>
                        <p class="stat-label">Max Health</p>
                    </div>
                    <div class="char-def">
                        <p class="stat-val">{defense}</p>
                        <p class="stat-label">Defense</p>
                    </div>
                    <div class="char-melee">
                        <p class="stat-val">{meleeDamage}</p>
                        <p class="stat-label">Melee</p>
                    </div>
                    <div class="char-init">
                        <p class="stat-val">{initiative}</p>
                        <p class="stat-label">Init</p>
                    </div>
                    <div class="char-luckpts">
                        <p class="stat-val">{maxLuckPoints}</p>
                        <p class="stat-label">Luck</p>
                    </div>
                </div>
                <div class="char-dr-block">
                    <div class="head-block">
                        {#if isHandy}
                            <table class="dr-table" id="dr-optics">
                                <caption>Optics</caption>
                                <thead>
                                    <tr>
                                        <th class="phys-header" scope="col">Ph</th>
                                        <th class="enrg-header" scope="col">En</th>
                                        <th class="rads-header" scope="col">Rd</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="phys-data">{charDr.optics.phys}</td>
                                        <td class="enrg-data">{charDr.optics.enrg}</td>
                                        <td class="rads-data">{charDr.optics.rads}</td>
                                    </tr>
                                </tbody>
                            </table>
                        {:else}
                            <table class="dr-table" id="dr-head">
                                <caption>Head</caption>
                                <thead>
                                    <tr>
                                        <th class="phys-header" scope="col">Ph</th>
                                        <th class="enrg-header" scope="col">En</th>
                                        <th class="rads-header" scope="col">Rd</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="phys-data">{charDr.head.phys}</td>
                                        <td class="enrg-data">{charDr.head.enrg}</td>
                                        <td class="rads-data">{charDr.head.rads}</td>
                                    </tr>
                                </tbody>
                            </table>
                        {/if}
                    </div>
                    <div class="arms-block">
                        {#if isHandy}
                            <table class="dr-table" id="dr-arm1">
                                <caption>Arm 1</caption>
                                <thead>
                                    <tr>
                                        <th class="phys-header" scope="col">Ph</th>
                                        <th class="enrg-header" scope="col">En</th>
                                        <th class="rads-header" scope="col">Rd</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="phys-data">{charDr.arm1.phys}</td>
                                        <td class="enrg-data">{charDr.arm1.enrg}</td>
                                        <td class="rads-data">{charDr.arm1.rads}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="dr-table" id="dr-arm2">
                                <caption>Arm 2</caption>
                                <thead>
                                    <tr>
                                        <th class="phys-header" scope="col">Ph</th>
                                        <th class="enrg-header" scope="col">En</th>
                                        <th class="rads-header" scope="col">Rd</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="phys-data">{charDr.arm2.phys}</td>
                                        <td class="enrg-data">{charDr.arm2.enrg}</td>
                                        <td class="rads-data">{charDr.arm2.rads}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="dr-table" id="dr-arm3">
                                <caption>Arm 3</caption>
                                <thead>
                                    <tr>
                                        <th class="phys-header" scope="col">Ph</th>
                                        <th class="enrg-header" scope="col">En</th>
                                        <th class="rads-header" scope="col">Rd</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="phys-data">{charDr.arm3.phys}</td>
                                        <td class="enrg-data">{charDr.arm3.enrg}</td>
                                        <td class="rads-data">{charDr.arm3.rads}</td>
                                    </tr>
                                </tbody>
                            </table>
                        {:else}
                            <table class="dr-table" id="dr-larm">
                                <caption>Left Arm</caption>
                                <thead>
                                    <tr>
                                        <th class="phys-header" scope="col">Ph</th>
                                        <th class="enrg-header" scope="col">En</th>
                                        <th class="rads-header" scope="col">Rd</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="phys-data">{charDr.larm.phys}</td>
                                        <td class="enrg-data">{charDr.larm.enrg}</td>
                                        <td class="rads-data">{charDr.larm.rads}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="dr-table" id="dr-rarm">
                                <caption>Right Arm</caption>
                                <thead>
                                    <tr>
                                        <th class="phys-header" scope="col">Ph</th>
                                        <th class="enrg-header" scope="col">En</th>
                                        <th class="rads-header" scope="col">Rd</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="phys-data">{charDr.rarm.phys}</td>
                                        <td class="enrg-data">{charDr.rarm.enrg}</td>
                                        <td class="rads-data">{charDr.rarm.rads}</td>
                                    </tr>
                                </tbody>
                            </table>
                        {/if}
                    </div>
                    <div class="body-block">
                        <table class="dr-table" id="dr-body">
                            <caption>Body</caption>
                            <thead>
                                <tr>
                                    <th class="phys-header" scope="col">Ph</th>
                                    <th class="enrg-header" scope="col">En</th>
                                    <th class="rads-header" scope="col">Rd</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="phys-data">{charDr.body.phys}</td>
                                    <td class="enrg-data">{charDr.body.enrg}</td>
                                    <td class="rads-data">{charDr.body.rads}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="legs-block">
                        {#if isHandy}
                            <table class="dr-table" id="dr-thruster">
                                <caption>Thruster</caption>
                                <thead>
                                    <tr>
                                        <th class="phys-header" scope="col">Ph</th>
                                        <th class="enrg-header" scope="col">En</th>
                                        <th class="rads-header" scope="col">Rd</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="phys-data">{charDr.thruster.phys}</td>
                                        <td class="enrg-data">{charDr.thruster.enrg}</td>
                                        <td class="rads-data">{charDr.thruster.rads}</td>
                                    </tr>
                                </tbody>
                            </table>
                        {:else if isSecuritron}
                            <table class="dr-table" id="dr-wheel">
                                <caption>Wheel</caption>
                                <thead>
                                    <tr>
                                        <th class="phys-header" scope="col">Ph</th>
                                        <th class="enrg-header" scope="col">En</th>
                                        <th class="rads-header" scope="col">Rd</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="phys-data">{charDr.wheel.phys}</td>
                                        <td class="enrg-data">{charDr.wheel.enrg}</td>
                                        <td class="rads-data">{charDr.wheel.rads}</td>
                                    </tr>
                                </tbody>
                            </table>
                        {:else}
                            <table class="dr-table" id="dr-lleg">
                                <caption>Left Leg</caption>
                                <thead>
                                    <tr>
                                        <th class="phys-header" scope="col">Ph</th>
                                        <th class="enrg-header" scope="col">En</th>
                                        <th class="rads-header" scope="col">Rd</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="phys-data">{charDr.lleg.phys}</td>
                                        <td class="enrg-data">{charDr.lleg.enrg}</td>
                                        <td class="rads-data">{charDr.lleg.rads}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="dr-table" id="dr-rleg">
                                <caption>Right Leg</caption>
                                <thead>
                                    <tr>
                                        <th class="phys-header" scope="col">Ph</th>
                                        <th class="enrg-header" scope="col">En</th>
                                        <th class="rads-header" scope="col">Rd</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="phys-data">{charDr.rleg.phys}</td>
                                        <td class="enrg-data">{charDr.rleg.enrg}</td>
                                        <td class="rads-data">{charDr.rleg.rads}</td>
                                    </tr>
                                </tbody>
                            </table>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>