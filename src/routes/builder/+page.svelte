<script lang="ts">
    import { enhance } from '$app/forms';
	import { resolveRoute } from '$app/paths';
    import { onMount } from 'svelte';

    let characterId = null;
    let saveResult;
    $: if (saveResult?.data?.success && saveResult.data.characterId) {
        characterId = saveResult.data.characterId
    }

    type Trait = {
        id: number;
        name: string;
        description: string;
    };
    type OriginWithTraits = {
        id: number;
        name: string;
        description: string;
        canGhoul: boolean;
        sourcebookId: number;
        traits: Trait[];
    };
    type perktype = {
        id: number;
        name: string;
        description: string;
        ranks: number;
        rankRange: number;
        levelReq: number;
        reqs: string[];
        limits: string[];
        sourcebookId: number;
    }

    export let data: {
        groupedOrigins: Record<string, OriginWithTraits[]>;
        sourcebookMap: Record<string, string>;
        allPerks: perktype;
        //backgrounds;
    };

/**
"font": https://patorjk.com/software/taag/#p=display&h=0&f=AMC%20AAA01&t=ORIGIN

  sSSs_sSSs     .S_sSSs     .S    sSSSSs   .S   .S_sSSs    
 d%%SP~YS%%b   .SS~YS%%b   .SS   d%%%%SP  .SS  .SS~YS%%b   
d%S'     `S%b  S%S   `S%b  S%S  d%S'      S%S  S%S   `S%b  
S%S       S%S  S%S    S%S  S%S  S%S       S%S  S%S    S%S  
S&S       S&S  S%S    d*S  S&S  S&S       S&S  S%S    S&S  
S&S       S&S  S&S   .S*S  S&S  S&S       S&S  S&S    S&S  
S&S       S&S  S&S_sdSSS   S&S  S&S       S&S  S&S    S&S  
S&S       S&S  S&S~YSY%b   S&S  S&S sSSs  S&S  S&S    S&S  
S*b       d*S  S*S   `S%b  S*S  S*b `S%%  S*S  S*S    S*S  
S*S.     .S*S  S*S    S%S  S*S  S*S   S%  S*S  S*S    S*S  
 SSSbs_sdSSS   S*S    S&S  S*S   SS_sSSS  S*S  S*S    S*S  
  YSSP~YSSY    S*S    SSS  S*S    Y~YSSY  S*S  S*S    SSS  
               SP          SP             SP   SP          
               Y           Y              Y    Y           
                                                           
*/


    let charName = '';
    let level = 1;

    let selectedOrigin: string = '';
    let isGhoul = false;
    let selectedTraits: string[] = [];
    let traitDescriptions: string[] = [];

    $: allOrigins = Object.values(data.groupedOrigins).flat();
    $: selectedOriginData = allOrigins.find(o => o.id.toString() === selectedOrigin.toString());
    $: ghoulOrigin = allOrigins.find(o => o.name?.toLowerCase() === 'ghoul');
    $: traitCount = selectedOriginData?.traits?.length ?? 0;
    $: if (selectedOriginData && traitCount === 1) {
        selectedTraits = [selectedOriginData.traits[0].id.toString()];
    }
    $: traitDescriptions = selectedTraits.map(id => {
        const trait = selectedOriginData?.traits.find(t => t.id.toString() === id.toString());
        return trait?.description ?? '';
    })
    $: if (selectedOriginData && !(selectedOriginData.canGhoul)) {
        isGhoul = false;
    }

    let isOriginValid = false;
    $: isOriginValid = (
        charName.trim().length > 0 &&
        level > 0 &&
        selectedOrigin &&
        (
            traitCount <= 1 ||
            selectedTraits.length == 2
        )
    )

/*

  sSSs   .S_sSSs      sSSs    sSSs   .S   .S_SSSs    S.      
 d%%SP  .SS~YS%%b    d%%SP   d%%SP  .SS  .SS~SSSSS   SS.     
d%S'    S%S   `S%b  d%S'    d%S'    S%S  S%S   SSSS  S%S     
S%|     S%S    S%S  S%S     S%S     S%S  S%S    S%S  S%S     
S&S     S%S    d*S  S&S     S&S     S&S  S%S SSSS%S  S&S     
Y&Ss    S&S   .S*S  S&S_Ss  S&S     S&S  S&S  SSS%S  S&S     
`S&&S   S&S_sdSSS   S&S~SP  S&S     S&S  S&S    S&S  S&S     
  `S*S  S&S~YSSY    S&S     S&S     S&S  S&S    S&S  S&S     
   l*S  S*S         S*b     S*b     S*S  S*S    S&S  S*b     
  .S*P  S*S         S*S.    S*S.    S*S  S*S    S*S  S*S.    
sSS*S   S*S          SSSbs   SSSbs  S*S  S*S    S*S   SSSbs  
YSS'    S*S           YSSP    YSSP  S*S  SSS    S*S    YSSP  
        SP                          SP          SP           
        Y                           Y           Y            

*/


    $: isSuperMutant = selectedTraits.includes('3');
    $: isNightkin = selectedTraits.includes('25');
    $: isGifted = selectedTraits.includes('7');

    $: giftedSelected = {};
    $: giftedCount = Object.values(giftedSelected).filter(Boolean).length;

    function getStatMax(stat) {
        if (isSuperMutant || isNightkin) {
            if (['intelligence','charisma'].includes(stat)) {
                return 6 + (isSuperMutant ? 0 : 2);
            }
        }
        return 10;
    }

    function getDisplayStat(stat, value) {
        let mod = 0;
        if (isSuperMutant || isNightkin) {
            if (['strength', 'endurance'].includes(stat)) mod += 2;
        }
        if (isGifted && giftedSelected[stat]) mod += 1;
        return value + mod;
    }

    $: remainingSpecialPoints = specialPoints
        - (selectedArray === 'Custom' ? Object.values(customStats).reduce((acc,val) => acc + val, 0) : Object.values(specialStats).reduce((acc,val) => acc + val, 0));
    
    let specialPoints = 40;
    let specialStats = {
        strength: 5,
        perception: 5,
        endurance: 5,
        charisma: 5,
        intelligence: 5,
        agility: 5,
        luck: 5
    };
    let selectedArray = 'Balanced';
    let customStats = {
        strength: 5,
        perception: 5,
        endurance: 5,
        charisma: 5,
        intelligence: 5,
        agility: 5,
        luck: 5
    };
    const arrays = {
        Balanced: [6,6,6,6,6,5,5],
        Focused: [8,7,6,6,5,4,4],
        Specialized: [9,8,5,5,5,4,4]
    };
    let isSpecialValid = false;

    function updateArray() {
        if (selectedArray === 'Custom') {
            remainingSpecialPoints = specialPoints - Object.values(customStats).reduce((acc, val) => acc + val, 0);
        } else {
            const selected = arrays[selectedArray];
            Object.keys(specialStats).forEach((key, index) => {
                specialStats[key] = selected[index];
            });

            remainingSpecialPoints = specialPoints - selected.reduce((acc, val) => acc + val, 0);
        }
    }

    function handleStatChange(stat, value) {
        const parsedValue = parseInt(value);
        if (!isNaN(parsedValue)) {
            if (selectedArray === 'Custom') {
                customStats[stat] = parsedValue;
            } else {
                specialStats[stat] = parsedValue;
            }
        }
    }

    $: isSpecialValid =
        Object.entries(selectedArray === 'Custom' ? customStats : specialStats)
            .every(([key, val]) => val >= 4 && (isGifted && giftedSelected[key] ? val < getStatMax(key) : val <= getStatMax(key))) &&
        remainingSpecialPoints === 0 &&
        (!isGifted || giftedCount === 2);

/*

  sSSs   .S    S.    .S  S.      S.        sSSs  
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
        
    const skills = [
        'Athletics', 'Barter', 'Big Guns', 'Energy Weapons', 'Explosives', 'Lockpick', 'Medicine', 'Melee Weapons', 'Pilot', 'Repair', 'Science', 'Small Guns', 'Sneak', 'Speech', 'Survival', 'Throwing', 'Unarmed'
    ];
    let skillPoints = {};
    skills.forEach(skill => {
        skillPoints[skill] = 0;
    });
    let extraTagSkills = 0;
    let extraTagSkillSelections = {};
    let baseTagSkillSelections = {};
    let forcedTagSkills = '';
    let forbiddenTagSkills = '';
    let extraTagSkillOptions = skills;
    let maxSkillCap = (level > 3 ? (level < 7 ? level : 6) : 3);
    let limitedSkills = [];
    let limitedSkillCap = 4;
    let baseTagSkills = 3;
    let totalTagSkillsAllowed = 3;
    let currentTraits = selectedTraits;
    $: if (currentTraits != selectedTraits) {
        skills.forEach(skill => {
            skillPoints[skill] = 0;
        });
        extraTagSkills = 0;
        extraTagSkillSelections = {};
        baseTagSkillSelections = {};
        forcedTagSkills = '';
        forbiddenTagSkills = '';
        extraTagSkillOptions = skills;
        limitedSkills = [];
        limitedSkillCap = 4;
        baseTagSkills = 3;
        totalTagSkillsAllowed = 3;
        currentTraits = selectedTraits;
    }
    $: if (selectedTraits.includes('1') || selectedTraits.includes('24')) {
        extraTagSkills = 1;
        extraTagSkillOptions = ["Energy Weapons", "Repair", "Science"];
    } else if (selectedTraits.includes('12')) {
        extraTagSkills = 1;
        extraTagSkillOptions = ['Small Guns', 'Energy Weapons'];
    } else if (selectedTraits.includes('13')) {
        extraTagSkills = 2;
        extraTagSkillOptions = ['Speech', 'Medicine', 'Repair', 'Science', 'Barter'];
        limitedSkills = ['Athletics', 'Big Guns', 'Energy Weapons', 'Explosives', 'Lockpick', 'Melee Weapons', 'Pilot', 'Small Guns', 'Sneak', 'Survival', 'Throwing', 'Unarmed']
    } else if (selectedTraits.includes('5') || selectedTraits.includes('11') || selectedTraits.includes('21')) {
        extraTagSkills = 1;
    } else if (selectedTraits.includes('2')) {
        extraTagSkills = 1;
        extraTagSkillOptions = ['Survival'];
        forcedTagSkills = 'Survival';
        extraTagSkillSelections['Survival'] = true;
        toggleTagSkill('Survival');
    } else if (selectedTraits.includes('3') || selectedTraits.includes('25')) {
        limitedSkills = ['Athletics', 'Big Guns', 'Energy Weapons', 'Explosives', 'Lockpick', 'Melee Weapons', 'Pilot', 'Small Guns', 'Sneak', 'Survival', 'Throwing', 'Unarmed']
    }       

    $: if (selectedTraits.includes('27')) {
        forbiddenTagSkills = 'Science';
    } else {
        forbiddenTagSkills = '';
    }
    $: totalTagSkillsAllowed = baseTagSkills + extraTagSkills;
  
    let tagSkills = {};
    function handleSkillPointChange(skill, value) {
        const parsedValue = parseInt(value);
        if (!isNaN(parsedValue)) {
            let maxPoints = limitedSkills.includes(skill) ? limitedSkillCap : maxSkillCap;
            if (parsedValue <= maxPoints) {
                skillPoints[skill] = parsedValue;
            }
            if (tagSkills[skill] && parsedValue < 2) {
                skillPoints[skill] = 2
            }
        }
    }
    let skillPointsRemaining = 9 + specialStats.intelligence + Object.values(tagSkills).filter(Boolean).length - Object.values(skillPoints).reduce((acc, val) => acc + val, 0);
    $: tagSkills = {
        ...extraTagSkillSelections,
        ...baseTagSkillSelections
    }

    function toggleTagSkill(skill,base) {
        if (skillPoints[skill] >= maxSkillCap) {
            skillPoints[skill] += -2;
        }
        if (base) {
            skillPoints[skill] += baseTagSkillSelections[skill] ? 2 : -2;
            skillPointsRemaining += baseTagSkillSelections[skill] ? 2 : -2;
        } else {
            skillPoints[skill] += extraTagSkillSelections[skill] ? 2 : -2;
            skillPointsRemaining += extraTagSkillSelections[skill] ? 2 : -2;
        }
    }

    $: skillPointsRemaining = 9 + specialStats.intelligence + Object.values(tagSkills).filter(Boolean).length*2 - Object.values(skillPoints).reduce((acc, val) => acc + val, 0);

    let isSkillsValid = false;

    $: isSkillsValid = (
        skillPointsRemaining === 0 &&
        Object.entries(skillPoints).every(([skill, points]) => 
            points <= maxSkillCap
        ) && 
        Object.values(extraTagSkillSelections).filter(Boolean).length === extraTagSkills
        && Object.values(baseTagSkillSelections).filter(Boolean).length === baseTagSkills
        && (!forbiddenTagSkills || !tagSkills[forbiddenTagSkills])
    );

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

    let allPerks = data.allPerks;
    let selectedPerks: string[] = [];
    let showEligibleOnly = false;
    $: maxPerks = level + (selectedTraits.includes('10') ? 1 : 0)
    $: perkPointsRemaining = maxPerks - selectedPerks.length;
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
    let special = Object.keys(specialStats)

    function getSpecialRequirementTypes(perk) {
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
    let hasCompanion = false; //same with this one

    function isEligibleForPerk(perk) {
        //has perk already
        if (selectedPerks.includes(perk.id.toString())) {
            let ranks = getRanks(perk.id.toString())
            if (ranks === perk.ranks) {
                return false;
            //doesn't meet lvl req for next rank
            } else if (level <= perk.levelReq + (ranks*perk.rankRange)) {
                return false;
            }
        }
        //level requirement
        if (level < perk.levelReq) {
            return false;
        }
        //special requirement
        for (const req of perk.reqs || []) {
            if (req.includes(':')) {
                const [stat, value] = req.split(':').map(s => s.trim());
                const statValue = specialStats[stat];
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
    
/*

  sSSs  sdSS_SSSSSSbs   .S_SSSs    sdSS_SSSSSSbs    sSSs  
 d%%SP  YSSS~S%SSSSSP  .SS~SSSSS   YSSS~S%SSSSSP   d%%SP  
d%S'         S%S       S%S   SSSS       S%S       d%S'    
S%|          S%S       S%S    S%S       S%S       S%|     
S&S          S&S       S%S SSSS%S       S&S       S&S     
Y&Ss         S&S       S&S  SSS%S       S&S       Y&Ss    
`S&&S        S&S       S&S    S&S       S&S       `S&&S   
  `S*S       S&S       S&S    S&S       S&S         `S*S  
   l*S       S*S       S*S    S&S       S*S          l*S  
  .S*P       S*S       S*S    S*S       S*S         .S*P  
sSS*S        S*S       S*S    S*S       S*S       sSS*S   
YSS'         S*S       SSS    S*S       S*S       YSS'    
             SP               SP        SP                
             Y                Y         Y                 

*/

/*

  sSSs    sSSs_sSSs     .S       S.    .S   .S_sSSs    
 d%%SP   d%%SP~YS%%b   .SS       SS.  .SS  .SS~YS%%b   
d%S'    d%S'     `S%b  S%S       S%S  S%S  S%S   `S%b  
S%S     S%S       S%S  S%S       S%S  S%S  S%S    S%S  
S&S     S&S       S&S  S&S       S&S  S&S  S%S    d*S  
S&S_Ss  S&S       S&S  S&S       S&S  S&S  S&S   .S*S  
S&S~SP  S&S       S&S  S&S       S&S  S&S  S&S_sdSSS   
S&S     S&S       S&S  S&S       S&S  S&S  S&S~YSSY    
S*b     S*b       d*S  S*b       d*S  S*S  S*S         
S*S.    S*S.     .S*S  S*S.     .S*S  S*S  S*S         
 SSSbs   SSSbs_sdSSSS   SSSbs_sdSSS   S*S  S*S         
  YSSP    YSSP~YSSSSS    YSSP~YSSY    S*S  S*S         
                                      SP   SP          
                                      Y    Y           

*/

    let backgrounds = [];
    async function fetchBackgrounds(originId) {
        const res = await fetch(`/builder/api/backgrounds?originId=${originId}`, { method: 'GET' });
        if (!res.ok) {
            console.error('Failed to fetch backgrounds:', await res.text());
        }
        backgrounds = await res.json();
    }
    let selectedBackgroundId: string;
    $: selectedBackgroundIndex = (backgrounds.length > 0 ? parseInt(selectedBackgroundId) - backgrounds[0].id : 0);
    let backgroundEquipment;
    let newGroupWeapons: (BackgroundWeapon | BackgroundWeapon[])[][] = [];

    async function fetchBackgroundEquipment(id: string) {
        if (!id) return;
        selectedWeaponKey = [];
        selectedWeapons = [];
        const res = await fetch(`/builder/api/background-equipment?backgroundId=${id}`);
        const data = await res.json();
        backgroundEquipment = data;
        //groupedWeaponChoices = groupBackgroundWeapons(data.weapons);
        newGroupWeapons = newGroupBackgroundWeapons(data.weapons);
        //console.log('Grouped Weapon Choices',newGroupWeapons);
        
        backgroundEquipment = {
            ...data,
            newGroupWeapons
        };
    }

    type Weapon = {
        ammo: number;
        cost: number;
        dam: string;
        dtype: string;
        id: number;
        name: string;
        range: string;
        rarity: number;
        rate: number;
        sourcebookId: number;
        type: number;
        wgt: number;
    }

    type BackgroundWeapon = {
        id: number;
        backgroundId: number;
        weaponId: number;
        modId: number;
        altId: number;
        weapon: Weapon;
    }

    //quite proud of this one, handles all the logic of choices, including many for one swaps
    function newGroupBackgroundWeapons(weapons: BackgroundWeapon[]): (BackgroundWeapon | BackgroundWeapon[])[][] {
        const idMap = new Map<number, BackgroundWeapon>();
        const fwdLinks = new Map<number, number>();
        const revLinks = new Map<number, BackgroundWeapon[]>();
        const revMap = new Map<BackgroundWeapon, number>();
        const results: (BackgroundWeapon | BackgroundWeapon[])[][] = [];
        
        for (const w of weapons) {
            idMap.set(w.id, w)
            revMap.set(w, w.id)
            let id = w.id
            let alt = w.altId
            if (alt !== null) {
                if (!fwdLinks.has(id)) {
                    fwdLinks.set(id,alt);
                }
                if (!revLinks.has(alt)) {
                    revLinks.set(alt,[w]);
                } else if (!revLinks.get(alt)!.includes(w)) {
                    revLinks.get(alt)!.push(w)
                }
            } else {
                //if it doesn't have an alt, then add it as its own array, so it doesn't get grouped with others
                results.push([w]);
            }
        }

        //fwdLinks will always be >= revLinks, since we can't have more than one iteration of an id but we can have duplicate alts, which would consolidate the related ids into a set and reduce the size of the map
        // that means that if they're equal, there must not be any single weapons that replace multiple weapons
        let loops = new Map<BackgroundWeapon, BackgroundWeapon[]>();
        let flatGroup: BackgroundWeapon[][] = [];
        let clearedIds: BackgroundWeapon[] = [];
        for (const entry of fwdLinks) {
            const id: BackgroundWeapon = idMap.get(entry[0])!;
            const alt: BackgroundWeapon = idMap.get(entry[1])!;
            let idSet = false;
            if (loops.size === 0) {
                loops.set(id,[alt]);
                continue;
            }
            if (loops.has(alt) && loops.get(alt)!.includes(id)) {
                continue;
            }
            if (loops.has(alt) && !loops.get(alt)!.includes(id)) {
                loops.get(alt)!.push(id)
                continue;
            }
            for (const item of loops) {
                if (clearedIds.includes(alt)) {
                    break;
                }
                if (item[1].includes(alt)) {
                    const oldId = item[0];
                    const oldAlts = item[1];
                    oldAlts.splice(oldAlts.indexOf(alt),1);
                    loops.delete(item[0]);
                    oldAlts.push(oldId);
                    oldAlts.push(id);
                    loops.set(alt,oldAlts);
                    for (const oldAlt of oldAlts) {
                        clearedIds.push(oldAlt);
                    }
                    idSet = true;
                    break;
                }
                if (item[1].includes(id)) {
                    loops.get(item[0])!.push(alt);
                    idSet = true;
                    continue;
                }
            }
            if (!idSet) {
                loops.set(id,[alt]);
                idSet = false;
                continue;
            }
        }
        for (const group of loops) {
            const id = group[0];
            let altSet = new Set(group[1]);
            const alts = [...altSet]
            alts.push(id);
            if (fwdLinks.size === revLinks.size) {
                results.push(alts);
            } else {
                flatGroup.push(alts);
            }
        }
        if (flatGroup.length > 0) {
            const revGroup: (BackgroundWeapon | BackgroundWeapon[])[] = [];
            for (const group of flatGroup) {
                for (const alt of group) {
                    let altId: number | null = null;
                    if (revMap.has(alt)) altId = revMap.get(alt)!;
                    if (altId !== null) {
                        if (revLinks.has(altId)) {
                            revGroup.push(revLinks.get(revMap.get(alt)!)!)
                        };
                    }
                }
            }
            results.push(revGroup);    
        }
        return results;
    }

    let selectWeaponKey: string[] = [];
    let selectedWeaponKey: string[] = [];
    let selectedWeapons: BackgroundWeapon[][] = [];

    function handleWeaponSelect(key: string, index: number) {
        console.log("key/index:", key, index);
        console.log("start weapon key:");
        for (const skey of selectedWeaponKey) console.log(index,skey);
        selectedWeaponKey[index] = key;
        console.log("new weapon key:");
        for (const skey of selectedWeaponKey) console.log(index,skey);        
        const ids = key.split("-").map(Number);
        console.log("old selected weapons:")
        for (const sweap of selectedWeapons) {
            console.log(index);
            for (const sweapitem of sweap) {
                console.log(sweapitem)
            }   
        }
        selectedWeapons[index] = [];
        console.log("cleared index selected weapons:")
        for (const sweap of selectedWeapons) console.log(index,sweap);

        for (const group of backgroundEquipment.newGroupWeapons) {
            for (const item of group) {
                if (Array.isArray(item)) {
                    console.log("item is an array:");
                    for (const arritem of item) console.log(arritem);
                    if (item.every(w => ids.includes(w.id))) {
                        selectedWeapons[index].push(item);
                        console.log("new selected weapons")
                        for (const swsel of selectedWeapons) {
                            for (const switem of swsel) {
                                console.log(switem);
                            }
                        }
                        return;
                    }
                } else {
                    console.log("item is string:", item);
                    if (ids.includes(item.id)) {
                        selectedWeapons[index].push([item]);
                        console.log("new selected weapons")
                        for (const swsel of selectedWeapons) {
                            for (const switem of swsel) {
                                console.log(switem);
                            }
                        }
                        return;
                    }
                }
            }
        }
    }

    function formatWeaponName(w: BackgroundWeapon): string {
        return w.weapon.name;
    }

    function getOptionLabel(group: (BackgroundWeapon | BackgroundWeapon[])): string {
        if (Array.isArray(group)) {
            return group.map(formatWeaponName).join(" + ");
        } else {
            return formatWeaponName(group);
        }
    }

    function getOptionKey(group: (BackgroundWeapon | BackgroundWeapon[])): string {
        if (Array.isArray(group)) {
            return group.map(w => w.id).sort((a, b) => a - b).join("-");
        } else {
            return String(group.id);
        }
    }

    let allSelectedWeaponIds: string[] = [];
    $: if (selectedWeaponKey.length > 0) {
        const newWeaponKey: string[] = [];
        for (const key of selectedWeaponKey) {
            if (key.includes("-")) {
                const tempArr = key.split("-")
                for (const str of tempArr) {
                    newWeaponKey.push(str);
                }
            } else {
                newWeaponKey.push(key)
            }
        }
        allSelectedWeaponIds = newWeaponKey;
    }
    $: allSelectedWeapons = Object.values(selectedWeapons).flat();
    let selected;
    let groupId;

    let isEquipmentValid = false;
    $: if (selectedWeapons.length > 0) {
        let valid = true;
        for (const selectedWeapon of selectedWeapons) {
            if (selectedWeapon.length === 0) {
                valid = false;
            }
        }
        isEquipmentValid = valid;
    }

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


    let currentPage = 'origin';

    function navigateTo(page) {
        currentPage = page;
        if (page === 'special') {
            updateArray();
        }
    }

    function goToSpecialPage() {
        if (isOriginValid) {
            navigateTo('special')
        }
    }
    function goToSkillsPage() {
        if (isSpecialValid) {
            navigateTo('skills')
        }
    }
    function goToPerksPage() {
        navigateTo('perks')
    }
    function goToStatsPage() {
        navigateTo('stats')
    }
    function goToEquipmentPage() {
        navigateTo('equipment')
    }
    function goToCharacterSheet() {
        if (isEquipmentValid) {
            navigateTo('character')
        }
    }

    function goBackOriginPage() {
        navigateTo('origin');
    }
    function goBackSpecialPage() {
        navigateTo('special')
    }
    function goBackSkillsPage() {
        navigateTo('origin');
    }
    function goBackPerksPage() {
        navigateTo('special')
    }
    function goBackStatsPage() {
        navigateTo('stats');
    }
    function goBackEquipmentPage() {
        navigateTo('equipment')
    }
    
</script>

<!--

  sSSs    sSSs    sSSs  
 d%%SP   d%%SP   d%%SP  
d%S'    d%S'    d%S'    
S%S     S%|     S%|     
S&S     S&S     S&S     
S&S     Y&Ss    Y&Ss    
S&S     `S&&S   `S&&S   
S&S       `S*S    `S*S  
S*b        l*S     l*S  
S*S.      .S*P    .S*P  
 SSSbs  sSS*S   sSS*S   
  YSSP  YSS'    YSS'    

-->

<style>
    .page {
        position: absolute;
        top: 12vh;
        left: 0;
        width: 100%;
        height: 88vh;
        transition: transform 0.5s ease-in-out;
    }
    .page-origin {
        transform: translateY(0);
    }
    .page-special {
        transform: translateY(0);
    }
    .page-skills {
        transform: translateY(0);
    }
    .page-perks {
        transform: translateY(0);
    }
    .page-stats {
        transform: translateY(0);
    }
    .page-equipment {
        transform: translateY(0);
    }
    .page-charactersheet {
        transform: translateY(0);
    }
    .page-enter {
        transform: translateY(0);
    }
    .page-leave {
        transform: translateY(-100vh);
    }
    .page.hidden {
        visibility: hidden;
    }

    .skills-page {
        margin-top: 2em;
    }
    .skill-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 1rem;
        margin-top: 1rem;
    }
    .skill-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .skill-input {
        width: 50px;
        text-align: center;
    }
    .tag-skill-checkbox {
        margin-left: 0.5rem;
    }
    .forced-tag {
        font-weight: bold;
        color: green;
    }
    .forbidden-tag {
        text-decoration: line-through;
        color: gray;
    }
    input[type=checkbox][disabled] {
        filter: invert(25%);
    }
    button[disabled] {
        filter: invert(25%);
    }
    .transition {
        display:block;
    }


    .perk-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
        padding: 5px;
        overflow-y: auto;
        height: 60vh;
    }
    .perk-unavailable {
        border: 1px solid #ccc;
        padding: 1rem;
        border-radius: 0.5rem;
    }
    .perk-available {
        border: 1px solid #cc2;
        padding: 1rem;
        border-radius: 0.5rem;
    }
    .perk-taken {
        border: 1px solid #2c2;
        padding: 1rem;
        border-radius: 0.5rem;
    }
    .rank-available {
        border: 1px solid #2cc;
        padding: 1rem;
        border-radius: 0.5rem;
    }

    .perk-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .perk-description {
        margin-top: 10px;
        font-size: 0.9rem;
    }
    .perk-checkbox {
        margin-left: 1rem;
    }
    .perk-description-box {
        display: none;
    }
    .perk-description-box.show {
        display: block;
    }

</style>

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

<form method="POST" use:enhance={(res) => { res.then(r => saveResult = r); }}>
    <!-- origin fields -->
    <input type="hidden" name="originId" value={selectedOriginData?.id} />
    <input type="hidden" name="isGhoul" value={isGhoul ? 'on' : ''} />
    <input type="hidden" name="charName" value={charName} />
    <input type="hidden" name="level" value={level} />
    <input type="hidden" name="characterId" value={characterId ?? ''} />
    {#each selectedTraits as trait}
        <input type="hidden" name="selectedTraits" value={trait} />
    {/each}
    <!-- special fields -->
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
    <!-- skill fields -->
    {#if isSkillsValid}
        {#each Object.entries(skillPoints) as [skill, value]}
            <input type="hidden" name={`skillPoints[${skill}]`} value={value} />
        {/each}
        {#each Object.entries(tagSkills) as [skill, isTagged]}
            <input type="hidden" name={`tagSkills[${skill}]`} value={isTagged ? 'on' : ''} />
        {/each}
    {/if}

    <button type="submit" name="action" value="saveCharacter" class="saveButton">Save Character</button>
</form>

{#if saveResult?.data?.success}
    <p>Character saved with ID {saveResult.data.characterId}</p>
{:else if saveResult?.data?.error}
    <p>Error: {saveResult.data.error}</p>
{/if}

<!--

  sSSs_sSSs     .S_sSSs     .S    sSSSSs   .S   .S_sSSs    
 d%%SP~YS%%b   .SS~YS%%b   .SS   d%%%%SP  .SS  .SS~YS%%b   
d%S'     `S%b  S%S   `S%b  S%S  d%S'      S%S  S%S   `S%b  
S%S       S%S  S%S    S%S  S%S  S%S       S%S  S%S    S%S  
S&S       S&S  S%S    d*S  S&S  S&S       S&S  S%S    S&S  
S&S       S&S  S&S   .S*S  S&S  S&S       S&S  S&S    S&S  
S&S       S&S  S&S_sdSSS   S&S  S&S       S&S  S&S    S&S  
S&S       S&S  S&S~YSY%b   S&S  S&S sSSs  S&S  S&S    S&S  
S*b       d*S  S*S   `S%b  S*S  S*b `S%%  S*S  S*S    S*S  
S*S.     .S*S  S*S    S%S  S*S  S*S   S%  S*S  S*S    S*S  
 SSSbs_sdSSS   S*S    S&S  S*S   SS_sSSS  S*S  S*S    S*S  
  YSSP~YSSY    S*S    SSS  S*S    Y~YSSY  S*S  S*S    SSS  
               SP          SP             SP   SP          
               Y           Y              Y    Y           

-->

<div class={`page ${currentPage === 'origin' ? 'page-origin' : 'page-leave'}`}>
    <h1>Origin</h1>
    <label for="char-name">Name: </label>
    <input type="text" id="char-name" bind:value={charName} title="char-name">
    <label for="level-select">Level: </label>
    <input type="number" min="1" bind:value={level} id="level-select" title="level-select">
    <label for="origin-select">Origin: </label>
    <select name="origin-select" id="origin-select" bind:value={selectedOrigin} on:change={() => fetchBackgrounds(selectedOrigin)} class="origin-select">
        {#each Object.entries(data.groupedOrigins) as [sourcebookId, origins]}
            <optgroup label={data.sourcebookMap[sourcebookId]}>
                {#each origins as origin}
                    <option value={origin.id}>{origin.name}</option>
                {/each}
            </optgroup>
        {/each}
    </select>

    {#if selectedOriginData}
        <pre>{selectedOriginData.description.replace(/\\n/g, "\n")}</pre>
        {#if selectedOriginData.canGhoul}
            <label for="is-ghoul">Ghoul: </label>
            <input type="checkbox" id="is-ghoul" name="is-ghoul" bind:checked={isGhoul}>
        {/if}

        <h3>Trait:</h3>
    {/if}

    {#if isGhoul === true && ghoulOrigin}
        <h4>{ghoulOrigin.traits[0]?.name}</h4>
        <pre>{ghoulOrigin.traits[0]?.description}</pre>
    {:else if selectedOriginData}
        {#if traitCount > 1}
            <div style="display:inline-block">
                <select multiple bind:value={selectedTraits} style="height:11.5em">
                    {#each selectedOriginData.traits as trait}
                        <option value={trait.id.toString()}>{trait.name}</option>
                    {/each}
                </select>
            </div>
        {/if}
    {/if}

    {#if traitDescriptions.length > 0 && !isGhoul}
        <div style="display:inline-block">
            {#each selectedTraits as traitId, index}
                {#if selectedOriginData}
                    {#each selectedOriginData.traits as trait}
                        {#if trait.id.toString() === traitId.toString()}
                            <div>
                                <h4>{trait.name}</h4>
                                <pre>{trait.description.replace(/\\n/g, "\n")}</pre>
                            </div>
                        {/if}
                    {/each}
                {/if}
            {/each}
        </div>
    {/if}

    <button class="transition" disabled={!isOriginValid} on:click={goToSpecialPage}>Special</button>
</div>

<!--

  sSSs   .S_sSSs      sSSs    sSSs   .S   .S_SSSs    S.      
 d%%SP  .SS~YS%%b    d%%SP   d%%SP  .SS  .SS~SSSSS   SS.     
d%S'    S%S   `S%b  d%S'    d%S'    S%S  S%S   SSSS  S%S     
S%|     S%S    S%S  S%S     S%S     S%S  S%S    S%S  S%S     
S&S     S%S    d*S  S&S     S&S     S&S  S%S SSSS%S  S&S     
Y&Ss    S&S   .S*S  S&S_Ss  S&S     S&S  S&S  SSS%S  S&S     
`S&&S   S&S_sdSSS   S&S~SP  S&S     S&S  S&S    S&S  S&S     
  `S*S  S&S~YSSY    S&S     S&S     S&S  S&S    S&S  S&S     
   l*S  S*S         S*b     S*b     S*S  S*S    S&S  S*b     
  .S*P  S*S         S*S.    S*S.    S*S  S*S    S*S  S*S.    
sSS*S   S*S          SSSbs   SSSbs  S*S  S*S    S*S   SSSbs  
YSS'    S*S           YSSP    YSSP  S*S  SSS    S*S    YSSP  
        SP                          SP          SP           
        Y                           Y           Y            

-->

<div class={`page ${currentPage === 'special' ? 'page-special' : 'page-leave'}`}>
    <button on:click={goBackOriginPage}>Origin</button>

    <h1>SPECIAL</h1>
    <label for="array-select">Array:</label>
    <select id="array-select" bind:value={selectedArray} on:change={updateArray}>
        <option value="Balanced">Balanced (6,6,6,6,6,5,5)</option>
        <option value="Focused">Focused (8,7,6,6,5,4,4)</option>
        <option value="Specialized">Specialized (9,8,5,5,5,4,4)</option>
        <option value="Custom">Custom</option>
    </select>

    {#if selectedArray === 'Custom'}
        <p>Remaining Points: {remainingSpecialPoints}</p>
        {#each Object.keys(customStats) as stat}
            <label for={stat}>{stat.toUpperCase()}: </label>
            <input
                type="number"
                id={stat}
                bind:value={customStats[stat]}
                min="4"
                max={(isGifted && giftedSelected[stat] ? getStatMax(stat) - 1 : getStatMax(stat))}
                on:input={(e) => handleStatChange(stat, e.target.value)}
            />
            {#if isGifted}
                <input
                    type="checkbox"
                    bind:checked={giftedSelected[stat]}
                    disabled={(!giftedSelected[stat] && giftedCount >=2) || customStats[stat] === 10}
                    on:change={() => {
                        giftedSelected = { ...giftedSelected };
                    }}
                />
            {/if}
            <span style="margin-right:1em;">→ {getDisplayStat(stat, customStats[stat])}</span>
        {/each}
    {:else}
        <div>
            <p>Remaining Points: {remainingSpecialPoints}</p>
            {#each Object.keys(specialStats) as stat}
                <div>
                    <label for={stat}>{stat.toUpperCase()}:</label>
                    <select
                        bind:value={specialStats[stat]}
                        on:change={(e) => handleStatChange(stat, e.target.value)}
                    >
                        {#each arrays[selectedArray] as value, index}
                            <option value={value}>{value}</option>
                        {/each}

                    </select>
                    {#if isGifted}
                        <input
                            type="checkbox"
                            bind:checked={giftedSelected[stat]}
                            disabled={!giftedSelected[stat] && giftedCount >= 2}
                            on:change={() => {
                                giftedSelected = { ...giftedSelected };
                            }}
                        />
                    {/if}
                    <span>→ {getDisplayStat(stat, specialStats[stat])}</span>
                </div>
            {/each}
        </div>
    {/if}

    <button class="transition" disabled={!isSpecialValid} on:click={goToSkillsPage}>Skills</button>
</div>

<!--

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

-->

<div class={`page ${currentPage === 'skills' ? 'page-skills' : 'page-leave'}`}>
    <button on:click={goBackSpecialPage}>Special</button>

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
                    bind:value={skillPoints[skill]}
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
    <button class="transition" disabled={!isSkillsValid} on:click={goToPerksPage}>Perks</button>
</div>

<!--

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

-->
<div class={`page ${currentPage === 'perks' ? 'page-perks' : 'page-leave'}`}>
    <button on:click={goBackSkillsPage}>Skills</button>
    <h1>Perks</h1>
    <p>Perks: {maxPerks - perkPointsRemaining}/{maxPerks}</p>

    <label>
        <input
            type="checkbox"
            bind:checked={showEligibleOnly}
        />
        Show only perks {charName} can take
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
                <div class="perk-buttons" style="display:inline-block">
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
                <div class="perk-buttons" style="display:inline-block">
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

    <button class="transition" disabled={perkPointsRemaining !== 0} on:click={goToStatsPage}>Stats</button>
</div>

<!--

  sSSs  sdSS_SSSSSSbs   .S_SSSs    sdSS_SSSSSSbs    sSSs  
 d%%SP  YSSS~S%SSSSSP  .SS~SSSSS   YSSS~S%SSSSSP   d%%SP  
d%S'         S%S       S%S   SSSS       S%S       d%S'    
S%|          S%S       S%S    S%S       S%S       S%|     
S&S          S&S       S%S SSSS%S       S&S       S&S     
Y&Ss         S&S       S&S  SSS%S       S&S       Y&Ss    
`S&&S        S&S       S&S    S&S       S&S       `S&&S   
  `S*S       S&S       S&S    S&S       S&S         `S*S  
   l*S       S*S       S*S    S&S       S*S          l*S  
  .S*P       S*S       S*S    S*S       S*S         .S*P  
sSS*S        S*S       S*S    S*S       S*S       sSS*S   
YSS'         S*S       SSS    S*S       S*S       YSS'    
             SP               SP        SP                
             Y                Y         Y                 

-->

<div class={`page ${currentPage === 'stats' ? 'page-stats' : 'page-leave'}`}>
    <button on:click={goBackPerksPage}>Perks</button>
    <h1>Stats</h1>
    <div>
        <p><strong>Carry Weight</strong>: {150 + 10 * specialStats.strength}</p>
        <p><strong>Damage Resistance</strong>: 0</p>
        <p><strong>Defense</strong>: {specialStats.agility >= 9 ? 2 : 1}</p>
        <p><strong>Initiative</strong>: {specialStats.perception + specialStats.agility}</p>
        <p><strong>Health</strong>: {specialStats.endurance + specialStats.luck}</p>
        <p><strong>Melee Damage</strong>
            {#if specialStats.strength < 7}: +0cd
            {:else if specialStats.strength <= 8}: +1cd
            {:else if specialStats.strength <= 10}: +2cd
            {:else}: +3cd
            {/if}    
        </p>
    </div>
    <div class="special-stats-row" style="display:inline-block;margin-right:1rem">
        <h2>SPECIAL</h2>
        {#each ['strength', 'perception', 'endurance', 'charisma', 'intelligence', 'agility', 'luck'] as stat}
            <div>
                <strong>{stat.toUpperCase()}</strong>: {specialStats[stat]}
            </div>
        {/each}
    </div>
    <div style="display:inline-block">
        <h2>Skills</h2>
        <ul>
            {#each Object.keys(skillPoints) as skill}
                {#if skillPoints[skill] > 0}
                    <li>
                        {skillPoints[skill]} {skill} {tagSkills[skill] ? '(Tag)' : ''}
                    </li>
                {/if}
            {/each}
        </ul>
        <ul>
            {#each Object.values(selectedPerks) as perkId}
                <li>{(allPerks.find(perk => perk.id.toString() === perkId)).name}</li>
            {/each}
        </ul>
    </div>
    <button class="transition" on:click={goToEquipmentPage}>Equipment</button>
</div>

<!--

  sSSs    sSSs_sSSs     .S       S.    .S   .S_sSSs    
 d%%SP   d%%SP~YS%%b   .SS       SS.  .SS  .SS~YS%%b   
d%S'    d%S'     `S%b  S%S       S%S  S%S  S%S   `S%b  
S%S     S%S       S%S  S%S       S%S  S%S  S%S    S%S  
S&S     S&S       S&S  S&S       S&S  S&S  S%S    d*S  
S&S_Ss  S&S       S&S  S&S       S&S  S&S  S&S   .S*S  
S&S~SP  S&S       S&S  S&S       S&S  S&S  S&S_sdSSS   
S&S     S&S       S&S  S&S       S&S  S&S  S&S~YSSY    
S*b     S*b       d*S  S*b       d*S  S*S  S*S         
S*S.    S*S.     .S*S  S*S.     .S*S  S*S  S*S         
 SSSbs   SSSbs_sdSSSS   SSSbs_sdSSS   S*S  S*S         
  YSSP    YSSP~YSSSSS    YSSP~YSSY    S*S  S*S         
                                      SP   SP          
                                      Y    Y           
-->
<div class={`page ${currentPage === 'equipment' ? 'page-equipment' : 'page-leave'}`}>
    <button on:click={goBackStatsPage}>Stats</button>
    <h1>Equipment</h1>
    <label for="background-select">Background:</label>
    <select id="background-select" bind:value={selectedBackgroundId} on:change={() => fetchBackgroundEquipment(parseInt(selectedBackgroundId))}>
        {#each backgrounds as bg}
            <option value={bg.id.toString()}>{bg.name}</option>
        {/each}
    </select>

    {#if backgroundEquipment}
        <!--{console.log("bgid:",selectedBackgroundId,"bgEquip",backgroundEquipment,"bgs",backgrounds)}-->
        <div class="equipment-list">
            <h3>Starting Equipment</h3>
            <h4>Weapons</h4>
            {#each backgroundEquipment.newGroupWeapons as group, index}
                <select id="weapon-select-{index}" bind:value={selectWeaponKey[index]} on:change={() => handleWeaponSelect(selectWeaponKey[index],index)}>
                    <option hidden disabled selected value>Weapon {index + 1}</option>
                    {#each group as choice}
                        <option value={getOptionKey(choice)}>
                            {getOptionLabel(choice)}
                        </option>
                    {/each}
                </select>
            {/each}
            <p>IDs: {allSelectedWeaponIds} - {allSelectedWeaponIds.length}</p>
            <h4>Ammo</h4>
            <ul>
                {#each backgroundEquipment.ammo as item}
                    {#if allSelectedWeaponIds.includes(item.bgWeaponId.toString())}
                        <li>{item.ammo.name} ({item.quantity})</li>
                    {/if}
                {/each}
            </ul>
            <h4>Apparel</h4>
            <ul>{#each backgroundEquipment.apparel as item}<li>{item.apparel.name}</li>{/each}</ul>
            <h4>Consumables</h4>
            <ul>{#each backgroundEquipment.consumables as item}<li>{item.consumable.name}</li>{/each}</ul>
            <h4>Gear</h4>
            <ul>{#each backgroundEquipment.gear as item}<li>{item.gear.name}</li>{/each}</ul>
            <h4>Robot Modules</h4>
            <ul>{#each backgroundEquipment.robotModules as item}<li>{item.robotModule.name}</li>{/each}</ul>
            <h4>Caps: {backgrounds[selectedBackgroundIndex].caps}</h4>
            <h4>Misc</h4>
            <p>{backgrounds[selectedBackgroundIndex].misc}</p>

            {#if (backgrounds[selectedBackgroundIndex].junk > 0 || backgrounds[selectedBackgroundIndex].trinket > 0 || backgrounds[selectedBackgroundIndex].food > 0 || backgrounds[selectedBackgroundIndex].forage > 0 || backgrounds[selectedBackgroundIndex].bev > 0 || backgrounds[selectedBackgroundIndex].chem > 0 || backgrounds[selectedBackgroundIndex].aid > 0 || backgrounds[selectedBackgroundIndex].odd > 0 || backgrounds[selectedBackgroundIndex].outcast > 0)}
                <h4>Random Loot Rolls</h4>
            {/if}
            <ul>
                {#if backgrounds[selectedBackgroundIndex].junk > 0}
                    <li>Junk: {backgrounds[selectedBackgroundIndex].junk}</li>
                {/if}
                {#if backgrounds[selectedBackgroundIndex].trinket > 0}
                    <li>Trinkets: {backgrounds[selectedBackgroundIndex].trinket}</li>
                {/if}
                {#if backgrounds[selectedBackgroundIndex].food > 0}
                    <li>Food: {backgrounds[selectedBackgroundIndex].food}</li>
                {/if}
                {#if backgrounds[selectedBackgroundIndex].forage > 0}
                    <li>Forage: {backgrounds[selectedBackgroundIndex].forage}</li>
                {/if}
                {#if backgrounds[selectedBackgroundIndex].bev > 0}
                    <li>Beverages: {backgrounds[selectedBackgroundIndex].bev}</li>
                {/if}
                {#if backgrounds[selectedBackgroundIndex].chem > 0}
                    <li>Chem: {backgrounds[selectedBackgroundIndex].chem}</li>
                {/if}
                {#if backgrounds[selectedBackgroundIndex].aid > 0}
                    <li>Aid: {backgrounds[selectedBackgroundIndex].aid}</li>
                {/if}
                {#if backgrounds[selectedBackgroundIndex].odd > 0}
                    <li>Oddities: {backgrounds[selectedBackgroundIndex].odd}</li>
                {/if}
                {#if backgrounds[selectedBackgroundIndex].outcast > 0}
                    <li>Outcast Items: {backgrounds[selectedBackgroundIndex].outcast}</li>
                {/if}
            </ul>
        </div>
    {/if}
    <button class="transition" disabled={!isEquipmentValid} on:click={goToStatsPage}>Stats</button>
</div>

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
