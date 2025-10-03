<script lang="ts">

	import type { Apparel, BackgroundEquipment, FullCharacter, perktype } from '$lib/server/types.ts';

    let newCharacter:FullCharacter, currentPage:string, selectedTraits:string[], backgroundEquipment:BackgroundEquipment = $props();

    //TODO: this needs a total rebuild, i'm pretty sure
    
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

    $effect(() => {
        if (newCharacter!.robot) {
            for (const part of Object.keys(newCharacter!.body)) {
                if (newCharacter!.body[part].active) {
                    newCharacter!.body[part].phDR = 2;
                    newCharacter!.body[part].enDR = 2;
                }
            }
            for (const rarmor of newCharacter!.apparel) {
                if (rarmor.type === 'robot armor') {
                    for (const cover of Object.keys(rarmor.covers)) {
                        if (newCharacter!.body[cover].active) {
                            newCharacter!.body[cover].phDR = rarmor.phDR;
                            newCharacter!.body[cover].enDR = rarmor.enDR;
                        }
                    }
                }
            }
        } else {
            let outfit = {
                phDR: 0,
                enDR: 0,
                rdDR: 0
            };
            let clothing = {
                phDR: 0,
                enDR: 0,
                rdDR: 0
            }
            //need to not equip stuff right away on the equipment screen
            for (const apparel of newCharacter!.apparel) {
                switch (apparel.type) {
                    case 'outfit':
                        if (apparel.phDR > outfit.phDR) {
                            outfit.phDR = apparel.phDR;
                        } else {
                            const aIndex = newCharacter!.apparel.findIndex(app => app === apparel)
                            newCharacter!.apparel[aIndex].equipped = false;
                        }
                        break;
                    case 'clothing'
                }
            }
        }
    })

    let charDr: stdDr | handyDr | securDr;
    let bodyParts:string[] = [];



    //max(clothing(arms,legs,torso),armor)
    //outfit replaces clothing and armor
    //robots have standard unless otherwise stated
    let equippedApparel = {};
    function calculateDr() {
        console.log("equipped apparel changed:",JSON.stringify(equippedApparel));
        for (const part of bodyParts) {
            newCharacter.robot ? charDr[part].phys = 2 : charDr[part].phys = 0, charDr[part].enrg = 0, charDr[part].rads = 0;
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

    $effect(() => {
        if (backgroundEquipment) {
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
    });

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
                    if (newCharacter.robot) {
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

    $effect(() => {
        if (allSelectedApparelIds) {
            console.log("selected apparel changed:", JSON.stringify(selectedApparel));
            equipApparelItem();
        }
    });

</script>


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