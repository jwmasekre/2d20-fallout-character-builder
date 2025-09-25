<script lang="ts">
    import { onMount } from 'svelte';
	import type { PageParentData } from '../$types.js';

    type BodyPart = {
        active: boolean;
        stats: {
            hp: number;
            inj: number;
            phDR: number;
            enDR: number;
            rdDR: number;
        } | null;
    }

    type SpecialStats = {
        strength: number;
        perception: number;
        endurance: number;
        charisma: number;
        intelligence: number;
        agility: number;
        luck: number;
    }

    type SkillStatBlock = {
        ranks: number;
        tagged: boolean;
        total: number;
    }

    type SkillStats = {
        athletics: SkillStatBlock;
        barter: SkillStatBlock;
        bigGuns: SkillStatBlock;
        energyWeapons: SkillStatBlock;
        explosives: SkillStatBlock;
        lockpick: SkillStatBlock;
        medicine: SkillStatBlock;
        meleeWeapons: SkillStatBlock;
        pilot: SkillStatBlock;
        repair: SkillStatBlock;
        science: SkillStatBlock;
        smallGuns: SkillStatBlock;
        sneak: SkillStatBlock;
        speech: SkillStatBlock;
        survival: SkillStatBlock;
        throwing: SkillStatBlock;
        unarmed: SkillStatBlock;
    }

    type CharPerk = {
        perk: number;
        perkName: string;
        perkDescription: [string];
        ranks: number;
    }

    type CharTrait = {
        trait: number;
        traitName: string;
        traitDescription: string;
        ranks: number;
    }

    type CharRecipe = {
        item: number;
        itemName: string;
        itemType: "apparel" | "chems" | "cooking" | "pArmor" | "rArmor" | "rMods" | "weapon";
        complexity: number;
        common: number;
        uncommon: number;
        rare: number;
    }

    type CharBook = {
        book: number;
        bookName: string;
        bookPerk: string;
    }

    type CharWeaponMod = {
        available: boolean;
        installed: {
            mod: number;
            modName: string;
            modEffect: [string];
            modWeight: number;
            modCost: number;
        } | null;
    }

    type CharWeaponMods = {
        Receiver: CharWeaponMod;
        Barrel: CharWeaponMod;
        Stock: CharWeaponMod;
        Grip: CharWeaponMod;
        Magazine: CharWeaponMod;
        Sights: CharWeaponMod;
        Muzzle: CharWeaponMod;
        Capacitors: CharWeaponMod;
        Dish: CharWeaponMod;
        Fuel: CharWeaponMod;
        Tank: CharWeaponMod;
        Nozzle: CharWeaponMod;
        Blade: CharWeaponMod;
        Blunt: CharWeaponMod;
        Frame: CharWeaponMod;
    }

    type CharAmmo = {
        ammo: number;
        ammoName: string;
        quantity: number;
    }

    type Legendary = {
        isLegendary: boolean;
        legendary: {
            name: string;
            effect: string;
        } | null;
    }

    type CharWeapon = {
        weapon: number;
        prefix: [string];
        name: string;
        skill: string;
        targetNum: number;
        tagged: boolean;
        dmg: number;
        effects: [string];
        effectDescriptions: [string];
        type: "Physical" | "Energy" | "Physical/Energy" | "Radiation";
        rate: number;
        range: "R" | "C" | "M" | "L" | "X";
        qualities: [string];
        qualityDescriptions: [string];
        ammo: [CharAmmo];
        weight: number;
        cost: number;
        rarity: number;
        mods: CharWeaponMods;
        legendary: Legendary;
    }

    type CharApparelMod = {
        available: boolean;
        installed: {
            mod: number;
            modName: string;
            modPhDR: number;
            modEnDR: number;
            modRdDR: number;
            modEffect: [string];
            modWeight: number;
            modCost: number;
        } | null;
    }

    type CharApparelMods = {
        weave: CharApparelMod;
        material: CharApparelMod;
        upgrade: CharApparelMod;
        jumpsuit: CharApparelMod;
    }

    type CharApparel = {
        apparel: number;
        prefix: string | null;
        name: string;
        type: "clothing" | "outfit" | "headgear" | "armor" | "robot armor";
        covers: {
            head: boolean;
            lArm: boolean;
            rArm: boolean;
            lLeg: boolean;
            rLeg: boolean;
            torso: boolean;
            optics: boolean;
            arm1: boolean;
            arm2: boolean;
            arm3: boolean;
            thruster: boolean;
            wheel: boolean;
        }
        equipped: boolean;
        phDR: number;
        enDR: number;
        rdDR: number;
        effect: [string];
        weight: number;
        cost: number;
        rarity: number;
        mods: CharApparelMods;
        legendary: Legendary;
    }

    type CharConsumable = {
        consumable: number;
        consumableName: string;
        type: "Chem" | "Food" | "Beverage" | "Other" | "Publication";
        heals: number;
        effect: [string];
        rads: number;
        weight: number;
        cost: number;
        rarity: number;
        duration: "I" | "B" | "L";
        addiction: number;
        quantity: number;
    }

    type CharGear = {
        gear: number;
        gearName: string;
        effect: [string];
        weight: number;
        cost: number;
        rarity: number;
        quantity: number;
    }

    type CharPAMod = {
        available: boolean;
        installed: {
            mod: number;
            modName: string;
            modPhDR: number;
            modEnDR: number;
            modRdDR: number;
            modHP: number;
            modEffect: [string];
            modWeight: number;
            modCost: number;
        } | null;
    }

    type CharPAMods = {
        upgrade: CharPAMod;
        system: CharPAMod;
        plating: CharPAMod;
    }

    type PAPart = {
        equipped: boolean;
        part: number;
        partName: string;
        phDR: number;
        enDR: number;
        rdDR: number;
        effect: [string];
        weight: number;
        cost: number;
        currHP: number;
        maxHP: number;
        mods: CharPAMods;
    }

    type CharPAFrame = {
        equipped: boolean;
        location: string;
        parts: {
            head: [PAPart];
            lArm: [PAPart];
            rArm: [PAPart];
            lLeg: [PAPart];
            rLeg: [PAPart];
            torso: [PAPart];
        }
    }

    type CharRMod = {
        equipped: boolean;
        rmod: number;
        rmodName: string;
        effect: [string];
        weight: number;
        cost: number;
        rarity: number;
    }

    type FullCharacter = {
        player: number;
        playerName: string;
        character: number;
        characterName: string;
        xp: number;
        lvl: number;
        origin: number;
        originName: string;
        originDesc: string;
        luckPts: number;
        maxLuckPts: number;
        currHP: number;
        maxHP: number;
        radPts: number;
        maxRadPts: number;
        body: {
            head: BodyPart;
            lArm: BodyPart;
            rArm: BodyPart;
            lLeg: BodyPart;
            rLeg: BodyPart;
            torso: BodyPart;
            optics: BodyPart;
            arm1: BodyPart;
            arm2: BodyPart;
            arm3: BodyPart;
            thruster: BodyPart;
            wheel: BodyPart;
        }
        poisonDR: number;
        caps: number;
        hunger: number;
        thirst: number;
        sleep: number;
        exposure: number;
        party: number;
        special: SpecialStats;
        skills: SkillStats;
        perks: [CharPerk];
        traits: [CharTrait];
        addictions: [number];
        diseases: [number];
        recipes: [CharRecipe];
        readBooks: [CharBook];
        weapons: [CharWeapon];
        apparel: [CharApparel];
        ammo: [CharAmmo];
        consumables: [CharConsumable];
        gear: [CharGear];
        powerArmorFrames: [CharPAFrame];
        robotModules: [CharRMod];
        miscStuff: [string];
        notes: [string];
    }

    /*
    let characterId: number | null = null;
    
    let saveResult;
    $: if (saveResult.data.success && saveResult.data.characterId) {
        characterId = saveResult.data.characterId
    }
    */

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

/*

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
    let xp = 0;
    $: if (level > 0) xp = !isNaN(level) && level >= 1 ? level * (level - 1) * 50 : 0;

    let selectedOrigin: string = '';
    let isGhoul = false;
    let selectedTraits: string[] = [];
    let traitDescriptions: string[] = [];

    $: allOrigins = Object.values(data.groupedOrigins).flat();
    $: selectedOriginData = allOrigins.find(o => o.id.toString() === selectedOrigin.toString());
    $: ghoulOrigin = allOrigins.find(o => o.name?.toLowerCase() === 'ghoul');
    $: traitCount = selectedOriginData?.traits?.length ?? 0;

    $: traitDescriptions = selectedTraits.map(id => {
        const trait = selectedOriginData?.traits.find(t => t.id.toString() === id.toString());
        return trait?.description ?? '';
    })
    $: if (selectedOriginData && !(selectedOriginData.canGhoul)) {
        isGhoul = false;
    }
    $: selectedTraits = handleGhouls(isGhoul);

    function handleGhouls(ghoul:boolean):string[] {
        if (selectedOriginData) {
            return ghoul ? [ghoulOrigin.traits[0].id.toString()] : [selectedOriginData.traits[0].id.toString()];
        } else return [];
    }

    let isHandy = false;
    let isSecuritron = false;
    function handleOriginSelect(origin: string) {
        currentPage = "origin";
        resetEquipment();
        resetPerks();
        resetSkills();        
        resetSpecial();
        selectedBackgroundIndex = null;
        backgroundEquipment = undefined;
        fetchBackgrounds(origin);
        selectedTraits = [];
        if (selectedOriginData && traitCount == 1) {
            selectedTraits = [selectedOriginData.traits[0].id.toString()];
        }
        if (selectedTraits.includes('4')) isHandy = true; else isHandy = false;
        if (selectedTraits.includes('20')) isSecuritron = true; else isSecuritron = false;
        setBodyParts();
        visitedPages = [];
        currentPage = "";
        currentPage = "origin";
    }

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

    function resetSpecial() {
        selectedArray = ""
        giftedSelected = {};
        specialStats = {
            strength: 5,
            perception: 5,
            endurance: 5,
            charisma: 5,
            intelligence: 5,
            agility: 5,
            luck: 5
        };
        customStats = {
            strength: 5,
            perception: 5,
            endurance: 5,
            charisma: 5,
            intelligence: 5,
            agility: 5,
            luck: 5
        };
    }

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
    let arrayStats = {
        strength: 5,
        perception: 5,
        endurance: 5,
        charisma: 5,
        intelligence: 5,
        agility: 5,
        luck: 5
    };
    let selectedArray = "";
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

    function updateArray() {
        if (selectedArray === 'Custom') {
            remainingSpecialPoints = specialPoints - Object.values(customStats).reduce((acc, val) => acc + val, 0);
        } else {
            const selected = arrays[selectedArray];
            Object.keys(arrayStats).forEach((key, index) => {
                arrayStats[key] = selected[index];
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
                arrayStats[stat] = parsedValue;
            }
        }
    }

    $: if (selectedArray) {
        if (selectedArray === 'Custom') specialStats = customStats;
        else specialStats = arrayStats;
        if (isGifted) for (const stat of Object.entries(specialStats)) specialStats[stat[0]] = getDisplayStat(stat[0],stat[1]);
    }

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

    function resetSkills() {
        skillPoints = {};
        skills.forEach(skill => {
              skillPoints[skill] = 0;
        });
        extraTagSkillSelections = {};
        baseTagSkillSelections = {};
    }

    $: updateExtraTagSkills(selectedTraits);
    
    function updateExtraTagSkills(traits: string[]) {
        extraTagSkills = 0;
        extraTagSkillOptions = [];
        limitedSkills = [];
        forcedTagSkills = null;
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
            toggleTagSkill('Survival');
        } else if (traits.includes('3') || traits.includes('25')) {
            limitedSkills = ['Athletics', 'Big Guns', 'Energy Weapons', 'Explosives', 'Lockpick', 'Melee Weapons', 'Pilot', 'Small Guns', 'Sneak', 'Survival', 'Throwing', 'Unarmed'];
        }
        if (selectedTraits.includes('27')) {
            forbiddenTagSkills = 'Science';
        } else {
            forbiddenTagSkills = '';
        }
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

    function resetPerks() {
        selectedPerks = [];
        showEligibleOnly = false;
    }

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
    let hasCompanion = false;
    $: hasCompanion = (selectedPerks.includes('28') || selectedPerks.includes('105'));

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

    //this calculation comes up too much to not turn into a function
    function getStaggeredBonus(stat:number):number {
        if (stat === 7 || stat === 8) return 1;
        if (stat === 9 || stat === 10) return 2;
        if (stat > 10) return 3;
        return 0;
    }

    //carry weight calculation
    let carryWeight: number;
    //checking all four of these to trigger recalc on a change of any of them
    $: if (selectedTraits.length !== 0 || selectedPerks.length !== 0 || specialStats || customStats) {
        let isRobot = false;
        //mister handy, robobrain, securitron, and assaultron have flat carry weights
        if (selectedTraits.includes('4') || selectedTraits.includes('19') || selectedTraits.includes('20') || selectedTraits.includes('23')) carryWeight = 150, isRobot = true;
        //protectrons are even bulkier
        else if (selectedTraits.includes('18')) carryWeight = 225, isRobot = true;
        //small frame halves str bonus to carry weight
        else if (selectedTraits.includes('9')) carryWeight = 150 + 5 * specialStats.strength
        //default calculation
        else carryWeight = 150 + 10 * specialStats.strength;
        //strong back adds 25 per rank to non-robots
        carryWeight += isRobot ? 0 : selectedPerks.filter(p => p === '91').length * 25;
    }

    //damage resistance calculation
    let baseDr = {
        phys: 0,
        enrg: 0,
        rads: 0,
        pois: 0
    }
    //checking all four of these to trigger recalc on a change of any of them
    $: if (selectedTraits.length !== 0 || selectedPerks.length !== 0 || specialStats) {
        //rads
        //immune to rads
        if (['2','3','4','18','19','20','21','23','25'].some(t => selectedTraits.includes(t))) baseDr.rads = 99;
        //add dr for child of atom trait and rad resistance perk
        else baseDr.rads += selectedTraits.filter(t => t === '22').length + selectedPerks.filter(p => p === '73').length;
        
        //poison
        //immune to poison
        if (['3','4','18','19','20','21','23','25'].some(t => selectedTraits.includes(t))) baseDr.rads = 99;
        //add dr for snakeeater perk
        else baseDr.pois += selectedPerks.filter(p => p === '87').length * 2;

        //physical
        //add dr like melee damage for barbarian perk
        if (selectedPerks.includes('8')) {
            baseDr.phys += getStaggeredBonus(specialStats.strength);
        }
        //add dr for toughness perk
        baseDr.phys += selectedPerks.filter(p => p === '94').length;

        //energy
        //add dr for refractor perk
        baseDr.enrg += selectedPerks.filter(p => p === '74').length;

        //evasive adding to physical and energy like melee damage
        if (selectedPerks.includes('167')) {
            const bonus = getStaggeredBonus(specialStats.agility);
            baseDr.phys += bonus;
            baseDr.enrg += bonus;
        }
    }
    
    //defense
    let defense = 0;
    $: defense = specialStats.agility >= 9 ? 2 : 1;

    //initiative
    let initiative = 0;
    $: initiative = specialStats.perception + specialStats.agility;

    //max health adjustments
    let maxHealth = 0;
    //calculate and add health for life giver perk
    $: maxHealth = specialStats.endurance + specialStats.luck + selectedPerks.filter(p => p === '51').length * specialStats.endurance;
    //will help us determine if we need to report different health at night for nocturnal fortitude perk
    $: isNocturnal = selectedPerks.includes('111');

    //melee damage modifier calculation
    let meleeDamage = 0;
    let unarmedBonus = false;
    let sneakBonus = false;
    //checking all four of these to trigger recalc on a change of any of them
    $: if (selectedTraits.length > 0 || selectedPerks.length > 0 || specialStats) {
        //base calculation
        meleeDamage = getStaggeredBonus(specialStats.strength)
        //heavy handed and assaultron traits
        if (selectedTraits.includes('8') || selectedTraits.includes('23')) meleeDamage += 1;
        //will help us determine if we need to report different modifier for unarmed via iron fist perk
        unarmedBonus = selectedPerks.includes('46');
        //will help us determine if we need to report different modifier for sneak attacks via ninja
        sneakBonus = selectedPerks.includes('61');
    }

    //luck points
    let maxLuckPoints = 0;
    //max luck points are luck or minus one for gifted trait
    $: maxLuckPoints = specialStats.luck - selectedTraits.filter(t => t === '7').length;

    //companion statblock
    let companion = {
        name: "",
        special: {} = {},
        skills: {} = {},
        hp: 0,
        def: 0,
        cw: 0,
        meleeDamage: 0,
        dr: {
            phys: 0,
            enrg: 0,
            rads: 0,
            pois: 0
        },
        weapons: [] = [],
        abilities: [] = [],
        apparel: [] = [],
        wealth: 0
    };
    let isDog = false;
    $: if (selectedPerks.length > 0 && hasCompanion) {
        isDog = selectedPerks.includes('28');
        companion.name = isDog ? "Dogmeat" : "undefined npc"
        companion.special = isDog ? {
            body: 5,
            mind: 4
        } : {
            strength: 5,
            perception: 5,
            endurance: 5,
            charisma: 5,
            intelligence: 5,
            agility: 5,
            luck: 5
        }
        companion.skills = isDog ? {
            melee: 2,
            guns: 0,
            other: 1
        } : {
            'Athletics': 0,
			'Barter': 0,
			'Big Guns': 0,
			'Energy Weapons': 0,
			'Explosives': 0,
			'Lockpick': 0,
			'Medicine': 0,
			'Melee Weapons': 0,
			'Pilot': 0,
			'Repair': 0,
			'Science': 0,
			'Small Guns': 0,
			'Sneak': 0,
			'Speech': 0,
			'Survival': 0,
			'Throwing': 0,
			'Unarmed': 0
        }
        companion.hp = isDog ? 6 : 0;
        companion.def = isDog ? 1 : 0;
        companion.cw = isDog ? 50 : 150 + 10 * companion.strength;
        companion.meleeDamage = isDog ? 1 : getStaggeredBonus(companion.special.strength);
        companion.dr = {
            phys: 0,
            enrg: 0,
            rads: 0,
            pois: 0
        }
        companion.weapons = isDog ? ["Bite: Body+Melee (TN 7) 2CD Vicious Physical"] : [];
        companion.abilities = isDog ? ["Keen Senses","Attack Dog","Companion"] : [];
        companion.wealth = 0;
    }

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

    let backgrounds: Background[] = [];
    async function fetchBackgrounds(originId:string) {
        backgrounds = [];
        const res = await fetch(`/builder/api/backgrounds?originId=${originId}`, { method: 'GET' });
        if (!res.ok) {
            console.error('Failed to fetch backgrounds:', await res.text());
        }
        backgrounds = await res.json();
    }

    let backgroundStuff: {
        caps: number;
        misc: string;
        trinket: number;
        food: number;
        forage: number;
        bev: number;
        chem: number;
        ammo: number;
        aid: number;
        odd: number;
        outcast: number;
        junk: number;
    } | {};

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

    type WeaponMod = {
        id: number;
        name: string;
        prefix: string;
        effects: string[];
        slot: number;
        wgt: number;
        cost: number;
    }

    type BackgroundWeapon = {
        id: number;
        backgroundId: number;
        weaponId: number;
        modId: number | number[];
        altId: number;
        weapon: Weapon;
        mod: WeaponMod | WeaponMod[];
    }

    type Ammo = {
        id: number;
        name: string;
        rarity: number;
        rollQuantity: string;
        wgt: number;
        sourcebookId: number;
    }

    type BackgroundAmmo = {
        id: number;
        bgWeaponId: number;
        ammoId: number;
        quantity: string;
        ammo: Ammo;
    }

    type Apparel = {
        id: number;
        name: string;
        type: number;
        dog: boolean;
        physDr: number;
        enrgDr: number;
        radsDr: number;
        eff: string[];
        wgt: number;
        cost: number;
        rarity: number;
        base_health: number;
        sourcebookId: number;
    }

    type ApparelType = {
        id: number;
        name: string;
    }

    type BackgroundApparel = {
        id: number;
        backgroundId: number;
        apparelId: number;
        altId: number;
        apparel: Apparel;
        covers: string[];
        type: ApparelType;
    }

    type Consumable = {
        id: number;
        name: string;
        type: number;
        heals: number;
        eff: string[];
        rads: number;
        wgt: number;
        cost: number;
        rarity: number;
        duration: string;
        addiction: string;
        sourcebookId: number;
    }

    type BackgroundConsumable = {
        id: number;
        backgroundId: number;
        consumableId: number;
        altId: number;
        consumable: Consumable;
    }

    type Gear = {
        id: number;
        name: string;
        eff: string[];
        cost: number;
        rarity: number;
        wgt: number;
        sourcebookId: number;
    }

    type BackgroundGear = {
        id: number;
        backgroundId: number;
        gearId: number;
        gear: Gear;
    }

    type RobotModule = {
        id: number;
        name: string;
        eff: string[];
        wgt: number;
        cost: number;
        rarity: number;
        sourcebookId: number;
    }

    type BackgroundRobotModule = {
        id: number;
        backgroundId: number;
        robotModuleId: number;
        altId: number;
        robotModule: RobotModule;
    }


    type BackgroundEquipment = {
        weapons: BackgroundWeapon[];
        ammo: BackgroundAmmo[];
        apparel: BackgroundApparel[];
        consumables: BackgroundConsumable[];
        gear: BackgroundGear[];
        robotModules: BackgroundRobotModule[];
        groupWeapons: GroupWeapons;
        groupApparel: GroupApparel;
        groupConsumables: GroupConsumables;
        groupRobotModules: GroupRobotModules;
    } | undefined

    type Background = {
        id: number;
        name: string;
        originId: number;
        caps: number;
        misc: string;
        trinket: number;
        food: number;
        forage: number;
        bev: number;
        chem: number;
        ammo: number;
        aid: number;
        odd: number;
        outcast: number;
        junk: number;
        sourcebookId: number;
    }

    type GroupWeapons = (BackgroundWeapon | BackgroundWeapon[])[][];
    type GroupApparel = (boolean | BackgroundApparel | BackgroundApparel[] | (BackgroundApparel | BackgroundApparel[])[][])[];
    type GroupConsumables = (BackgroundConsumable | BackgroundConsumable[])[][];
    type GroupRobotModules = (BackgroundRobotModule | BackgroundRobotModule[])[][];

    let selectedBackgroundId: string = "";
    let selectedBackgroundIndex: number | null;
    $: if (backgrounds.length > 0) {
        selectedBackgroundIndex = parseInt(selectedBackgroundId) - backgrounds[0].id
    } else {selectedBackgroundIndex = 0}
    let backgroundEquipment: BackgroundEquipment;
    let groupWeapons: GroupWeapons = [];
    let groupApparel: GroupApparel = [];
    //this might be the exact structure of groupApparel
    let test: [BackgroundApparel[][],BackgroundApparel,(BackgroundApparel[] | BackgroundApparel[][]),boolean] | BackgroundApparel[][][] = [];
    let groupConsumables: GroupConsumables = [];
    let groupRobotModules: GroupRobotModules = [];

    function resetEquipment() {
        selectWeaponKey = [];
        selectedWeaponKey = [];
        selectedWeapons = [];
        selectSingle = "";
        singleKey = "";
        singleApparel = undefined;
        selectDouble = [];
        doubleKey = [];
        doubleApparel = [];
        selectPack = [];
        packKey = [];
        packApparel = [];
        selectApparelKey = [];
        selectedApparelKey = [];
        selectedApparel = [];
        selectConsumableKey = [];
        selectedConsumableKey = [];
        selectedConsumables = [];
        selectRobotModuleKey = [];
        selectedRobotModuleKey = [];
        selectedRobotModules = [];
        allSelectedWeaponIds = [];
        allSelectedApparelIds = [];
        allSelectedConsumableIds = [];
        allSelectedRobotModuleIds = [];
    }

    const bgApparelIdtoApparelId = new Map<number,Apparel>();

    async function fetchBackgroundEquipment(id: string) {
        if (!id) return;
        resetEquipment();
        const res = await fetch(`/builder/api/background-equipment?backgroundId=${id}`);
        const data = await res.json();
        backgroundEquipment = data;
        groupWeapons = groupBackgroundWeapons(data.weapons);
        groupApparel = groupBackgroundApparel(data.apparel);
        groupConsumables = groupBackgroundConsumables(data.consumables)
        groupRobotModules = groupBackgroundRobotModules(data.robotModules)
        groupWeapons

        backgroundEquipment = {
            ...data,
            groupWeapons,
            groupApparel,
            groupConsumables,
            groupRobotModules
        };

        for (const apparel of data.apparel) {
            bgApparelIdtoApparelId.set(apparel.id, apparel.apparel)
        }
        console.log(selectedBackgroundIndex);
        if (selectedBackgroundIndex === null) return;
        const background = backgrounds[selectedBackgroundIndex];
        console.log(JSON.stringify(backgrounds));
        console.log(JSON.stringify(background));
        backgroundStuff = {};
        backgroundStuff = {
            caps: background.caps,
            misc: background.misc.substring(2,background.misc.length-2).split('”,”').join(', ').replace("\{\}",""),
            trinket: background.trinket,
            food: background.food,
            forage: background.forage,
            bev: background.bev,
            chem: background.chem,
            ammo: background.ammo,
            aid: background.aid,
            odd: background.odd,
            outcast: background.outcast,
            junk: background.junk
        };
        console.log(JSON.stringify(backgroundStuff));
    }

    //quite proud of this one, handles all the logic of choices, including many for one swaps
    function groupBackgroundWeapons(weapons: BackgroundWeapon[]): (BackgroundWeapon | BackgroundWeapon[])[][] {
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
        //loop cleanup, in case of out-of-order long loops that form two partial loops
        const fixedLoops:BackgroundWeapon[][] = [];
        for (const group of loops) {
            const id = group[0];
            let altSet = new Set(group[1]);
            const alts = [...altSet];
            alts.push(id)
            if (fixedLoops.length === 0) {
                fixedLoops.push(alts);
            } else {
                let isLoopMember = false;
                for (const loop of fixedLoops) {
                    for (const item of alts) {
                        if ((loop.includes(item))) {
                            isLoopMember = true;
                        }
                        if (isLoopMember) break;
                    }
                    if (isLoopMember) {
                        const fullLoop = [...loop, ...alts];
                        let loopSet = new Set(fullLoop);
                        fixedLoops[fixedLoops.indexOf(loop)] = [...loopSet];
                    }
                }
                if (!isLoopMember) {
                    fixedLoops.push(alts);
                }
            }
        }
        //check for multi-mod weapons
        const modCheck:BackgroundWeapon[][] = []
        let modGroups:number[] = [];
        for (const [gindex, group] of fixedLoops.entries()) {
            if (group.length !== 1) continue;
            if (group[0].modId === null) continue;
            if (modCheck.length === 0) {
                modCheck.push(group);
                continue;
            }
            let isMultiMod = false;
            for (const [index, check] of modCheck.entries()) {
                for (const weapon of check) {
                    if (weapon.weaponId === group[0].weaponId) {
                        modCheck[index].push(group[0]);
                        isMultiMod = true;
                        modGroups.push(gindex);
                        break;
                    }
                }
                if (isMultiMod) break;
            }
        }
        //clear non-multi-mod
        const multiMod:BackgroundWeapon[][] = []
        for (const check of modCheck) {
            if (check.length !== 0) multiMod.push(check);
        }
        //map weapons to a new, unified id
        let revId = new Map<number, number>();
        for (const [index, group] of multiMod.entries()) {
            for (const weapon of group) {
                if (!revId.has(weapon.id)) {
                    revId.set(weapon.id, index);
                }
            }
        }
        //map mods to the new id
        let modMap = new Map<number,WeaponMod>();
        let consolidatedMods = new Map<number,number[]>();
        for (const [index,group] of multiMod.entries()) {
            for (const weapon of group) {
                if (Array.isArray(weapon.modId)) continue;
                if (Array.isArray(weapon.mod)) continue;
                if (modMap.has(weapon.modId)) continue;
                modMap.set(weapon.modId,weapon.mod)
                if (!consolidatedMods.has(index)) {
                    consolidatedMods.set(index,[weapon.modId])
                } else {
                    consolidatedMods.get(index)!.push(weapon.modId)
                }
            }
        }
        //replace fixedLoops entries with the consolidated versions
        const writtenWeapons:number[] = [];
        const finalLoops:BackgroundWeapon[][] = [];
        for (const [index, group] of fixedLoops.entries()) {
            if (!modGroups.includes(index)) {
                finalLoops.push(group);
                continue;
            } else {
                let newWeapon = group[0];
                const newWeapId = revId.get(newWeapon.id)
                if (writtenWeapons.includes(newWeapId)) continue;
                const newWeapModIds = consolidatedMods.get(newWeapId);
                const newWeapMods:WeaponMod[] = []
                for (const modId of newWeapModIds) {
                    newWeapMods.push(modMap.get(modId));
                }
                newWeapon.modId = newWeapModIds;
                newWeapon.mod = newWeapMods;
                finalLoops.push([newWeapon]);
            }
        }
        for (const group of finalLoops) {
            if (fwdLinks.size === revLinks.size) {
                results.push(group);
            } else {
                flatGroup.push(group);
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

    // Apparel logic is going to function differently than weapon logic because i used a different ruleset for building the apparel table, apparently
    // this probably needs to be re-written, initial was heavily adapted from weapons since it worked for that, with logic bolted on to handle differences, but correcting for nuance has added so much more that some codes is 100% redundant or practically unused, so it needs to be cleaned up
    function groupBackgroundApparel (apparel: BackgroundApparel[]) {
        const idMap = new Map<number, BackgroundApparel>();
        const apparelIdMap = new Map<number, Apparel>();
        const fwdLinks = new Map<number, number>();
        const revLinks = new Map<number, BackgroundApparel[]>();
        const fwdLinkUniques = new Map<number, number>();
        const revLinkUniques = new Map<number, BackgroundApparel[]>();
        const revMap = new Map<BackgroundApparel, number>();
        const apparelMap = new Map<number, Apparel>();
        const revApparelMap = new Map<number, number[]>();
        let isSingleDouble = new Map<BackgroundApparel,boolean>();
        let single: BackgroundApparel | null = null;
        let double: BackgroundApparel[][] = [];
        const normalResults: (BackgroundApparel | BackgroundApparel[])[][] = [];

        for (const a of apparel) {
            const apparelId = a.apparel.id;
            if (!apparelIdMap.has(apparelId)) {
                apparelIdMap.set(apparelId,a.apparel);
            }
            idMap.set(a.id, a)
            revMap.set(a, a.id)
            let id = a.id
            let alt = a.altId
            if (alt !== null) {
                if (!fwdLinks.has(id)) {
                    fwdLinks.set(id,alt);
                }
                if (!revLinks.has(alt)) {
                    revLinks.set(alt,[a]);
                } else if (!revLinks.get(alt)!.includes(a)) {
                    revLinks.get(alt)!.push(a)
                }
            } else {
                //if it doesn't have an alt, then add it as its own array, so it doesn't get grouped with others
                normalResults.push([a]);
            }
            if (!apparelMap.has(id)) {
                apparelMap.set(id,a.apparel);
            }
            if (!revApparelMap.has(apparelId)) {
                revApparelMap.set(apparelId,[id]);
            } else if (!revApparelMap.get(apparelId)!.includes(id)) {
                revApparelMap.get(apparelId)!.push(id);
            }
        }
        
        let repeatApparel = new Map<BackgroundApparel, BackgroundApparel[]>();
        let repeatApparelAlts = new Map<BackgroundApparel, BackgroundApparel[]>();
        for (const a of revApparelMap) {
            if (a[1].length > 1) {
                for (const id of a[1]) {
                    const bgApparel = idMap.get(id);
                    const bgAppAlt = idMap.get(bgApparel!.altId)!;
                    if (repeatApparel.size === 0) {
                        isSingleDouble.set(bgApparel!,true);
                        single = bgApparel!;
                        repeatApparel.set(bgApparel!,[]);
                        repeatApparelAlts.set(bgApparel!,[bgAppAlt]);
                    } else {
                        repeatApparel.get(idMap.get(a[1][0])!)!.push(bgApparel!)
                        repeatApparelAlts.get(idMap.get(a[1][0]!)!)?.push(bgAppAlt)
                    }
                }
            } else {
                isSingleDouble.set(idMap.get(a[1][0])!,false);
            }
        }
        let flatRepeatApparel: BackgroundApparel[][] = [];
        for (const repeat of repeatApparel) {
            const repeatStore = repeat[1];
            repeatStore.push(repeat[0]);
            flatRepeatApparel.push(repeatStore);
        }

        //building maps that don't include individual items or repeat items
        for (const a of apparel) {
            const id = a.id
            const alt = a.altId
            let isRepeater = false;
            for (const repeat of flatRepeatApparel) {
                if (repeat.includes(a)) {
                    isRepeater = true;
                    break;
                }
            }
            if (isRepeater) continue;
            if (alt !== null) {
                if (!fwdLinkUniques.has(id)) {
                    fwdLinkUniques.set(id,alt);
                }
                if (!revLinkUniques.has(alt)) {
                    revLinkUniques.set(alt,[a]);
                } else if (!revLinkUniques.get(alt)!.includes(a)) {
                    revLinkUniques.get(alt)!.push(a);
                }
            }
        }
        let isSinglePack = false;
        let singlePackOption: BackgroundApparel[] = [];
        for (const repeat of flatRepeatApparel) {
            for (const id of repeat) {
                if (revLinkUniques.has(id.id)) {
                    isSinglePack = true;
                    break;
                }
            }
            if (isSinglePack) break;
        }

        let loops = new Map<BackgroundApparel, BackgroundApparel[]>();
        let flatGroup: BackgroundApparel[][] = [];
        let clearedIds: BackgroundApparel[] = [];
        for (const entry of fwdLinkUniques) {
            const id: BackgroundApparel = idMap.get(entry[0])!;
            if (repeatApparel.has(id) && isSingleDouble.has(id)) continue;
            let repeater = false;
            for (const match of repeatApparel) {
                if (match[1].includes(id) && isSingleDouble.has(match[0])) repeater = true;
            }
            if (repeater) continue;
            const alt: BackgroundApparel = idMap.get(entry[1])!;
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
        let pack: {single:BackgroundApparel,pack:BackgroundApparel[]};
        for (const group of loops) {
            const id = group[0];
            let altSet = new Set(group[1]);
            const alts = [...altSet]
            alts.push(id);
            if (fwdLinkUniques.size === revLinkUniques.size && single === null) {
                normalResults.push(alts);
            } else if (isSinglePack) {
                for (const alt of revLinkUniques)
                    for (const repeat of flatRepeatApparel) {
                        const singleId = idMap.get(alt[0])!
                        if (repeat.includes(singleId)) {
                            pack = { single: singleId, pack: alt[1] }
                        }
                    }
            } else {
                flatGroup.push(alts);
            }
        }
        if (flatGroup.length > 0 && single === null) {
            const revGroup: BackgroundApparel[][] = [];
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
            double = revGroup;
        } else double = flatGroup;
        if (isSinglePack) {
            return [normalResults, pack.single, pack.pack, isSinglePack]
        } else if (single != null && double.length > 0) {
            return [normalResults, single, double];
        }
        return [normalResults];
    }

    // consumables are mostly straightforward, but the nuka selections add complexity
    function groupBackgroundConsumables(consumables: BackgroundConsumable[]): (BackgroundConsumable | BackgroundConsumable[])[][] {
        const idMap = new Map<number, BackgroundConsumable>();
        const fwdLinks = new Map<number, number>();
        const revLinks = new Map<number, BackgroundConsumable[]>();
        const revMap = new Map<BackgroundConsumable, number>();
        const results: (BackgroundConsumable | BackgroundConsumable[])[][] = [];
        
        for (const w of consumables) {
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

        let loops = new Map<BackgroundConsumable, BackgroundConsumable[]>();
        let flatGroup: BackgroundConsumable[][] = [];
        let clearedIds: BackgroundConsumable[] = [];
        for (const entry of fwdLinks) {
            const id: BackgroundConsumable = idMap.get(entry[0])!;
            const alt: BackgroundConsumable = idMap.get(entry[1])!;
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
            for (const group of flatGroup) {
                const revGroup: (BackgroundConsumable | BackgroundConsumable[])[] = [];
                for (const alt of group) {
                    let altId: number | null = null;
                    if (revMap.has(alt)) altId = revMap.get(alt)!;
                    if (altId !== null) {
                        if (revLinks.has(altId)) {
                            revGroup.push(revLinks.get(revMap.get(alt)!)!)
                        };
                    }
                }
                results.push(revGroup);
            }
        }
        return results;
    }

    // robot modules have no complexity, just basic choices
    function groupBackgroundRobotModules(robotModules: BackgroundRobotModule[]): (BackgroundRobotModule | BackgroundRobotModule[])[][] {
        const idMap = new Map<number, BackgroundRobotModule>();
        const fwdLinks = new Map<number, number>();
        const revLinks = new Map<number, BackgroundRobotModule[]>();
        const revMap = new Map<BackgroundRobotModule, number>();
        const results: (BackgroundRobotModule | BackgroundRobotModule[])[][] = [];
        
        for (const w of robotModules) {
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

        let loops = new Map<BackgroundRobotModule, BackgroundRobotModule[]>();
        let flatGroup: BackgroundRobotModule[][] = [];
        let clearedIds: BackgroundRobotModule[] = [];
        for (const entry of fwdLinks) {
            const id: BackgroundRobotModule = idMap.get(entry[0])!;
            const alt: BackgroundRobotModule = idMap.get(entry[1])!;
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
            const revGroup: (BackgroundRobotModule | BackgroundRobotModule[])[] = [];
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
    $: if (backgroundEquipment?.groupWeapons?.length > 0) {
        backgroundEquipment.groupWeapons.forEach((group, index) => {
            if (group.length === 1) {
                const key = getWeaponOptionKey(group[0]);
                selectWeaponKey[index] = key;
                handleWeaponSelect(key, index);
            }
        });
    }

    function handleWeaponSelect(key: string, index: number) {
        selectedWeaponKey[index] = key;
        const ids = key.split("-").map(Number);
        selectedWeapons[index] = [];

        for (const group of backgroundEquipment.groupWeapons) {
            for (const item of group) {
                if (Array.isArray(item)) {
                    if (item.every(w => ids.includes(w.id))) {
                        selectedWeapons[index].push(item);
                        return;
                    }
                } else {
                    if (ids.includes(item.id)) {
                        selectedWeapons[index].push([item]);
                        return;
                    }
                }
            }
        }
    }

    let selectSingle: string = "";
    let singleKey: string = "";
    let singleApparel: BackgroundApparel | undefined;
    let selectDouble: string[] = [];
    let doubleKey: string[] = [];
    let doubleApparel: BackgroundApparel[][] = [];
    let selectPack: string[] = [];
    let packKey: string[] = [];
    let packApparel: BackgroundApparel[] = [];
    let selectApparelKey: string[] = [];
    let selectedApparelKey: string[] = [];
    let selectedApparel: BackgroundApparel[][] = [];
    $: if ((singleDouble === "single" || singlePack === "single") && backgroundEquipment.groupApparel) {
        selectSingle = backgroundEquipment.groupApparel[1].id;
    }
    $: if (singleDouble === "double") {
        singleKey = "";
    }
    $: if (singlePack === "pack") {
        selectPack = [];
        for (const pack of backgroundEquipment.groupApparel[2]) {
            selectPack.push(pack.id);
        }
    }
    $: if (backgroundEquipment?.groupApparel?.length > 0) {
        backgroundEquipment.groupApparel[0].forEach((group, index) => {
            if (group.length === 1) {
                const key = getApparelOptionKey(group[0]);
                selectApparelKey[index] = key;
                handleApparelSelect(key, index);
            }
        });
    }

    function handleApparelSelect(key: string, index: number) {
        selectedApparelKey[index] = key;
        const ids = key.split("-").map(Number);
        selectedApparel[index] = [];

        for (const group of backgroundEquipment.groupApparel) {
            for (const item of group) {
                if (Array.isArray(item)) {
                    if (item.every(w => ids.includes(w.id))) {
                        selectedApparel[index].push(item);
                        return;
                    }
                } else {
                    if (ids.includes(item.id)) {
                        selectedApparel[index].push([item]);
                        return;
                    }
                }
            }
        }
    }

    function handleDoubleSelect(key: string, index: number) {
        singleKey = "";
        selectSingle = "";
        singleApparel = undefined;
        packKey = []
        selectPack = [];
        packApparel = [];
        doubleKey[index] = key;
        const ids = key.split("-").map(Number);
        doubleApparel[index] = [];

        for (const group of backgroundEquipment.groupApparel) {
            if (Array.isArray(group)) {
                for (const item of group) {
                    if (Array.isArray(item)) {
                        if (item.every(w => ids.includes(w.id))) {
                            doubleApparel[index].push(item);
                            return;
                        }
                    } else {
                        if (ids.includes(item.id)) {
                            doubleApparel[index].push([item]);
                            return;
                        }
                    }
                }
            } else {
                if (ids.includes(group.apparel.id)) {
                    doubleApparel[index].push([group]);
                    return;
                }
            } 
        }
    }

    function handlePackSelect(state: string) {
        doubleKey = [];
        selectDouble = [];
        doubleApparel = [];
        if (state === "single") {
            packKey = [];
            packApparel = [];
            singleKey = selectSingle;
            singleApparel = backgroundEquipment.groupApparel[1];
        }
        else if (state === "pack") {
            selectSingle = ""
            singleKey = ""
            singleApparel = undefined;
            packKey = selectPack;
            packApparel = backgroundEquipment.groupApparel[2];
        } else {
            console.error("what did you do")
        }
    }

    function handleSingleSelect(state: string) {
        if (state === "single") {
            doubleKey = [];
            selectDouble = [];
            doubleApparel = [];
            packKey = [];
            selectPack = [];
            packApparel = [];
            singleKey = selectSingle;
            singleApparel = backgroundEquipment.groupApparel[1];
        }
    }

    let selectConsumableKey: string[] = [];
    let selectedConsumableKey: string[] = [];
    let selectedConsumables: BackgroundConsumable[][] = [];
    $: if (backgroundEquipment?.groupConsumables?.length > 0) {
        backgroundEquipment.groupConsumables.forEach((group, index) => {
            if (group.length === 1) {
                const key = getConsumableOptionKey(group[0]);
                selectConsumableKey[index] = key;
                handleConsumableSelect(key, index);
            }
        });
    }

    function handleConsumableSelect(key: string, index: number) {
        selectedConsumableKey[index] = key;
        const ids = key.split("-").map(Number);
        selectedConsumables[index] = [];

        for (const group of backgroundEquipment.groupConsumables) {
            for (const item of group) {
                if (Array.isArray(item)) {
                    if (item.every(w => ids.includes(w.id))) {
                        selectedConsumables[index].push(item);
                        return;
                    }
                } else {
                    if (ids.includes(item.id)) {
                        selectedConsumables[index].push([item]);
                        return;
                    }
                }
            }
        }
    }

    let selectRobotModuleKey: string[] = [];
    let selectedRobotModuleKey: string[] = [];
    let selectedRobotModules: BackgroundRobotModule[][] = [];
    $: if (backgroundEquipment?.groupRobotModules?.length > 0) {
        backgroundEquipment.groupRobotModules.forEach((group, index) => {
            if (group.length === 1) {
                const key = getRobotModuleOptionKey(group[0]);
                selectRobotModuleKey[index] = key;
                handleRobotModuleSelect(key, index);
            }
        });
    }

    function handleRobotModuleSelect(key: string, index: number) {
        selectedRobotModuleKey[index] = key;
        const ids = key.split("-").map(Number);
        selectedRobotModules[index] = [];

        for (const group of backgroundEquipment.groupRobotModules) {
            for (const item of group) {
                if (Array.isArray(item)) {
                    if (item.every(w => ids.includes(w.id))) {
                        selectedRobotModules[index].push(item);
                        return;
                    }
                } else {
                    if (ids.includes(item.id)) {
                        selectedRobotModules[index].push([item]);
                        return;
                    }
                }
            }
        }
    }

    function formatWeaponName(w: BackgroundWeapon): string {
        let weaponName:string = ""
        if (Array.isArray(w.mod)) {
            for (const mod of w.mod) {
                weaponName += mod.prefix + " "
            }
            weaponName += w.weapon.name
        } else if (w.modId !== null) {
            weaponName = w.mod.name + " " + w.weapon.name;
        } else weaponName = w.weapon.name;
        return weaponName;
    }

    function getWeaponOptionLabel(group: (BackgroundWeapon | BackgroundWeapon[])): string {
        if (Array.isArray(group)) {
            return group.map(formatWeaponName).join(" + ");
        } else {
            return formatWeaponName(group);
        }
    }

    function getWeaponOptionKey(group: (BackgroundWeapon | BackgroundWeapon[])): string {
        if (Array.isArray(group)) {
            return group.map(w => w.id).sort((a, b) => a - b).join("-");
        } else {
            return String(group.id);
        }
    }

    let doubleText:string = ""

    function formatDoubleText() {
        doubleText = ""
        for (const group of backgroundEquipment.groupApparel[2]) {
            if (doubleText !== "") {
                doubleText += " and "
            }
            doubleText += group[0].apparel.name
            doubleText += " or "
            doubleText += group[1].apparel.name
        }
    }

    let packText:string = ""

    function formatPackText() {
        packText = ""
        for (const group of backgroundEquipment.groupApparel[2]) {
            if (packText !== "") {
                packText += " and "
            }
            packText += group.apparel.name
        }
    }

    function formatApparelName(a: BackgroundApparel): string {
        return a.apparel.name;
    }

    function getApparelOptionLabel(group: (BackgroundApparel | BackgroundApparel[])): string {
        if (Array.isArray(group)) {
            return group.map(formatApparelName).join(" + ");
        } else {
            return formatApparelName(group);
        }
    }

    function getApparelOptionKey(group: (BackgroundApparel | BackgroundApparel[])): string {
        if (Array.isArray(group)) {
            return group.map(w => w.id).sort((a, b) => a - b).join("-");
        } else {
            return String(group.id);
        }
    }

    function formatConsumableName(w: BackgroundConsumable): string {
        return w.consumable.name;
    }

    function getConsumableOptionLabel(group: (BackgroundConsumable | BackgroundConsumable[])): string {
        if (Array.isArray(group)) {
            return group.map(formatConsumableName).join(" + ");
        } else {
            return formatConsumableName(group);
        }
    }

    function getConsumableOptionKey(group: (BackgroundConsumable | BackgroundConsumable[])): string {
        if (Array.isArray(group)) {
            return group.map(w => w.id).sort((a, b) => a - b).join("-");
        } else {
            return String(group.id);
        }
    }

    function formatRobotModuleName(w: BackgroundRobotModule): string {
        return w.robotModule.name;
    }

    function getRobotModuleOptionLabel(group: (BackgroundRobotModule | BackgroundRobotModule[])): string {
        if (Array.isArray(group)) {
            return group.map(formatRobotModuleName).join(" + ");
        } else {
            return formatRobotModuleName(group);
        }
    }

    function getRobotModuleOptionKey(group: (BackgroundRobotModule | BackgroundRobotModule[])): string {
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

    let allSelectedApparelIds: string[] = [];
    let allSelectedApparel:Apparel[] = [];
    $: if (selectedApparelKey.length > 0 || singleKey !== "" || doubleKey.length > 0) {
        const newApparelKey: string[] = [];
        allSelectedApparel = [];
        if (selectedApparelKey.length > 0) {
            for (const key of selectedApparelKey) {
                if (key.includes("-")) {
                    const tempArr = key.split("-")
                    for (const str of tempArr) {
                        newApparelKey.push(str);
                        allSelectedApparel.push(backgroundEquipment?.groupApparel[parseInt(str)].apparel)
                    }
                } else {
                    newApparelKey.push(key)
                }
            }
        }
        if (singleKey !== "") newApparelKey.push(singleKey);
        if (doubleKey.length > 0) {
            for (const key of doubleKey) {
                if (key.includes("-")) {
                    const tempArr = key.split("-")
                    for (const str of tempArr) {
                        newApparelKey.push(str);
                    }
                } else {
                    newApparelKey.push(key)
                }
            }
        }
        if (packKey.length > 0) {
            for (const key of packKey) {
                newApparelKey.push(key);
            }
        }
        allSelectedApparelIds = newApparelKey;
    }
    
    let allSelectedConsumableIds: string[] = [];
    $: if (selectedConsumableKey.length > 0) {
        const newConsumableKey: string[] = [];
        for (const key of selectedConsumableKey) {
            if (key.includes("-")) {
                const tempArr = key.split("-")
                for (const str of tempArr) {
                    newConsumableKey.push(str);
                }
            } else {
                newConsumableKey.push(key)
            }
        }
        allSelectedConsumableIds = newConsumableKey;
    }

    let allSelectedRobotModuleIds: string[] = [];
    $: if (selectedRobotModuleKey.length > 0) {
        const newRobotModuleKey: string[] = [];
        for (const key of selectedRobotModuleKey) {
            if (key.includes("-")) {
                const tempArr = key.split("-")
                for (const str of tempArr) {
                    newRobotModuleKey.push(str);
                }
            } else {
                newRobotModuleKey.push(key)
            }
        }
        allSelectedRobotModuleIds = newRobotModuleKey;
    }

    let singleDouble: "single" | "double" | "" = "";
    let singlePack: "single" | "pack" | "" = "";

    let isWeaponSelectValid = false;
    let isApparelSelectValid = false;
    let isConsumableSelectValid = false;
    let isRobotModuleSelectValid = false;
    $: if (selectedWeapons.length > 0) {
        let valid = true;
        for (const selectedWeapon of selectedWeapons) {
            if (selectedWeapon.length === 0) {
                valid = false;
            }
        }
        isWeaponSelectValid = valid;
    } else if (backgroundEquipment?.weapons.length === 0) isWeaponSelectValid = true;
    $: if (selectedApparel.length > 0) {
        let valid = true;
        for (const selectedItem of selectedApparel) {
            if (selectedItem.length === 0) {
                valid = false;
            }
        }
        isApparelSelectValid = valid;
    } else if (backgroundEquipment?.apparel.length === 0) isApparelSelectValid = true;
    $: if (selectedConsumables.length > 0) {
        let valid = true;
        for (const selectedItem of selectedConsumables) {
            if (selectedItem.length === 0) {
                valid = false;
            }
        }
        isConsumableSelectValid = valid;
    } else if (backgroundEquipment?.consumables.length === 0) isConsumableSelectValid = true;
    $: if (selectedRobotModules.length > 0) {
        let valid = true;
        for (const selectedItem of selectedRobotModules) {
            if (selectedItem.length === 0) {
                valid = false;
            }
        }
        isRobotModuleSelectValid = valid;
    } else if (backgroundEquipment?.robotModules.length === 0) isRobotModuleSelectValid = true;

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

type limbDr = {
    phys: number;
    enrg: number;
    rads: number;
}

type stdDr = {
    head: limbDr;
    larm: limbDr;
    rarm: limbDr;
    body: limbDr;
    lleg: limbDr;
    rleg: limbDr;
}
type handyDr = {
    optics: limbDr;
    arm1: limbDr;
    arm2: limbDr;
    arm3: limbDr;
    body: limbDr;
    thruster: limbDr;
}
type securDr = {
    head: limbDr;
    larm: limbDr;
    rarm: limbDr;
    body: limbDr;
    wheel: limbDr;
}

let charDr: stdDr | handyDr | securDr;
let bodyParts:string[] = [];



function setBodyParts() {
    if (isHandy) {
        charDr = {
            optics: {
				phys: 0,
				enrg: 0,
				rads: 0,
			},
            arm1: {
				phys: 0,
				enrg: 0,
				rads: 0,
			},
            arm2: {
				phys: 0,
				enrg: 0,
				rads: 0,
			},
            arm3: {
				phys: 0,
				enrg: 0,
				rads: 0,
			},
            body: {
				phys: 0,
				enrg: 0,
				rads: 0,
			},
            thruster: {
				phys: 0,
				enrg: 0,
				rads: 0,
			},
        }
    } else if (isSecuritron) {
        charDr = {
            head: {
				phys: 0,
				enrg: 0,
				rads: 0,
			},
            larm: {
				phys: 0,
				enrg: 0,
				rads: 0,
			},
            rarm: {
				phys: 0,
				enrg: 0,
				rads: 0,
			},
            body: {
				phys: 0,
				enrg: 0,
				rads: 0,
			},
            wheel: {
				phys: 0,
				enrg: 0,
				rads: 0,
			},
        }
    } else charDr = {
        head: {
				phys: 0,
				enrg: 0,
				rads: 0,
			},
        larm: {
				phys: 0,
				enrg: 0,
				rads: 0,
			},
        rarm: {
				phys: 0,
				enrg: 0,
				rads: 0,
			},
        body: {
				phys: 0,
				enrg: 0,
				rads: 0,
			},
        lleg: {
				phys: 0,
				enrg: 0,
				rads: 0,
			},
        rleg: {
				phys: 0,
				enrg: 0,
				rads: 0,
			},
    }
    bodyParts = Object.keys(charDr);
    console.log("bodyParts set:",JSON.stringify(bodyParts));
    equippedApparel = {};
    bodyParts.forEach(part => {
        equippedApparel[part] = null;
    });
    if (isRobot) equippedApparel.hat = null;
    else equippedApparel.clothing = null,equippedApparel.outfit = null;
}


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
    const pages = ['origin','special','skills','perks','stats','equipment','review','character'];
    onMount(() => {
        navigateTo("origin");
    })
    let nextPage = "";
    let visitedPages:string[] = [];
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
                return charName.trim().length > 0 && level > 0 && selectedOrigin != '' && (traitCount <= 1 || selectedTraits.length == 2 || isGhoul);
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
                pageValid = charName.trim().length > 0 && level > 0 && selectedOrigin != '' && (traitCount <= 1 || selectedTraits.length == 2 || isGhoul);
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
    <input type="hidden" name="level" value={level} />
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

<div class={`page ${currentPage === 'origin' ? 'page-active' : 'page-leave'}`}>
    <h1>Origin</h1>
    <label for="char-name">Name: </label>
    <input type="text" id="char-name" bind:value={charName} title="char-name">
    <label for="level-select">Level: </label>
    <input type="number" min="1" bind:value={level} id="level-select" title="level-select">
    <label for="origin-select">Origin: </label>
    <select name="origin-select" id="origin-select" bind:value={selectedOrigin} on:change={() => handleOriginSelect(selectedOrigin)} class="origin-select">
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
            <div class="multi-trait">
                <select multiple bind:value={selectedTraits} class="multi-trait-select">
                    {#each selectedOriginData.traits as trait}
                        <option value={trait.id.toString()}>{trait.name}</option>
                    {/each}
                </select>
            </div>
        {/if}
    {/if}

    {#if traitDescriptions.length > 0 && !isGhoul}
        <div class="trait-display">
            {#each selectedTraits as traitId}
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

<div class={`page ${currentPage === 'special' ? 'page-active' : 'page-leave'}`}>

    <h1>SPECIAL</h1>
    <label for="array-select">Array:</label>
    <select id="array-select" bind:value={selectedArray} on:change={updateArray}>
        <option hidden disabled selected value="">Select SPECIAL array</option>
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
            <span class="special-display">→ {getDisplayStat(stat, customStats[stat])}</span>
        {/each}
    {:else}
        <div>
            <p>Remaining Points: {remainingSpecialPoints}</p>
            {#each Object.keys(arrayStats) as stat}
                <div>
                    <label for={stat}>{stat.toUpperCase()}:</label>
                    <select
                        bind:value={arrayStats[stat]}
                        on:change={(e) => handleStatChange(stat, e.target.value)}
                    >
                        {#each arrays[selectedArray] as value, index}
                            <option disabled={value>getStatMax(stat)} value={value}>{value}</option>
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
                    <span>→ {getDisplayStat(stat, arrayStats[stat])}</span>
                </div>
            {/each}
        </div>
    {/if}


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

<div class={`page ${currentPage === 'perks' ? 'page-active' : 'page-leave'}`}>

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

<div class={`page ${currentPage === 'stats' ? 'page-active' : 'page-leave'}`}>

    <h1>Stats</h1>
    <div class="character" style={hasCompanion ? "display:inline-block;margin-right:1rem" : "display:block"}>
        {#if hasCompanion}<h3>{charName}</h3>{/if}
        <div class="character-stats">
            <p><strong>Carry Weight</strong>: {carryWeight}</p>
            <p><strong>Base Damage Resistance</strong>:</p>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Physical</th>
                        <th scope="col">Energy</th>
                        <th scope="col">Radiation</th>
                        <th scope="col">Poison</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{baseDr.phys}</td>
                        <td>{baseDr.enrg}</td>
                        <td>{baseDr.rads === 99 ? "immune" : baseDr.rads}</td>
                        <td>{baseDr.pois === 99 ? "immune" : baseDr.pois}</td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Defense</strong>: {defense}</p>
            <p><strong>Initiative</strong>: {initiative}</p>
            <p><strong>Health</strong>: {maxHealth}{#if isNocturnal} ({maxHealth + specialStats.endurance} at night){/if}</p>
            <p><strong>Melee Damage</strong>: +{meleeDamage}CD{#if unarmedBonus} (+{meleeDamage + 1}CD unarmed) {/if}{#if sneakBonus} (+{meleeDamage + 2}CD sneak attacks){/if}{#if unarmedBonus && sneakBonus} (+{meleeDamage + 3}CD unarmed sneak attacks){/if}</p>
            <p><strong>Luck Points</strong>: {maxLuckPoints}</p>
        </div>
        <div class="character-special" style={!hasCompanion ? "display:inline-block;margin-right:1rem" : "display:block"}>
            <h2>SPECIAL</h2>
            {#each ['strength', 'perception', 'endurance', 'charisma', 'intelligence', 'agility', 'luck'] as stat}
                <div>
                    <strong>{stat.toUpperCase()}</strong>: {specialStats[stat]}
                </div>
            {/each}
        </div>
        <div class="character-skills">
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
    </div>
    {#if hasCompanion}
        <div class="companion">
            <h2>Companion</h2>
            <h3>{companion.name}</h3>
            <div class="companion-attr">
                <h4>{isDog ? "Attributes" : "Special"}</h4>
                {#each Object.entries(companion.special) as stat}
                    <p><strong>{stat[0]}</strong>: {stat[1]}</p>
                {/each}
            </div>
            <div class="companion-skill">
                <h4>Skills</h4>
                {#each Object.entries(companion.skills) as skill}
                    <p><strong>{skill[0]}</strong>: {skill[1]}</p>
                {/each}
            </div>
            <div class="companion-stat">
                <h4>Stats</h4>
                <p><strong>Carry Weight</strong>: {companion.cw}</p>
                <p><strong>Base Damage Resistance</strong>:</p>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Physical</th>
                            <th scope="col">Energy</th>
                            <th scope="col">Radiation</th>
                            <th scope="col">Poison</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{companion.dr.phys}</td>
                            <td>{companion.dr.enrg}</td>
                            <td>{companion.dr.rads === 99 ? "immune" : companion.dr.rads}</td>
                            <td>{companion.dr.pois === 99 ? "immune" : companion.dr.pois}</td>
                        </tr>
                    </tbody>
                </table>
                <p><strong>Defense</strong>: {companion.def}</p>
                <p><strong>Initiative</strong>: {initiative}</p>
                <p><strong>Health</strong>: {companion.hp}</p>
                <p><strong>Melee Damage</strong>: +{companion.meleeDamage}CD</p>
            </div>
            <div class="companion-gear">
                <h4>{isDog ? "Attacks" : "Weapons"}</h4>
                {#each companion.weapons as weapon}
                    <p>{weapon}</p>
                {/each}
                {#if !isDog}
                    <h4>Apparel</h4>
                    {#each companion.apparel as apparel}
                        <p>{apparel}</p>
                    {/each}
                {/if}
                <h4>Special Abilities</h4>
                {#each companion.abilities as ability}
                    <p>{ability}</p>
                {/each}
                <h4>Wealth</h4>
                <p>{companion.wealth}</p>
            </div>
        </div>
    {/if}
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
<div class={`page ${currentPage === 'equipment' ? 'page-active' : 'page-leave'}`}>

    <h1>Equipment</h1>
    <label for="background-select">Background:</label>
    <select id="background-select" bind:value={selectedBackgroundId} on:change={() => fetchBackgroundEquipment(parseInt(selectedBackgroundId))}>
        {#each backgrounds as bg}
            <option value={bg.id.toString()}>{bg.name}</option>
        {/each}
    </select>

    {#if backgroundEquipment}
        <div class="equipment-list">
            <h3>Starting Equipment</h3>
            {#if backgroundEquipment.groupWeapons.length > 0}
                <h4>Weapons</h4>
                {#each backgroundEquipment.groupWeapons as group, index}
                    {#if group.length === 1}
                        <p>{getWeaponOptionLabel(group[0])}</p>
                    {:else}
                        <select id="weapon-select-{index}" bind:value={selectWeaponKey[index]} on:change={() => handleWeaponSelect(selectWeaponKey[index],index)}>
                            <option hidden disabled selected value>Weapon {index + 1}</option>
                            {#each group as choice}
                                <option value={getWeaponOptionKey(choice)}>{getWeaponOptionLabel(choice)}</option>
                            {/each}
                        </select>
                    {/if}
                {/each}
                <p class="id-print">IDs: {allSelectedWeaponIds} - {allSelectedWeaponIds.length}</p>
                <h4>Ammo</h4>
                <ul>
                    {#each backgroundEquipment.ammo as item}
                        {#if allSelectedWeaponIds.includes(item.bgWeaponId.toString())}
                            <li>{item.ammo.name} ({item.quantity})</li>
                        {/if}
                    {/each}
                </ul>
            {/if}
            {#if backgroundEquipment.groupApparel.length > 0}
                <h4>Apparel</h4>
                {#each backgroundEquipment.groupApparel[0] as group, index}
                    {#if group.length === 1}
                        <p>{getApparelOptionLabel(group[0])}</p>
                    {:else}
                        <select id="apparel-select-{index}" bind:value={selectApparelKey[index]} on:change={() => handleApparelSelect(selectApparelKey[index],index)}>
                            <option hidden disabled selected value="">Apparel {index + 1}</option>
                            {#each group as choice}
                                <option value={getApparelOptionKey(choice)}>{getApparelOptionLabel(choice)}</option>
                            {/each}
                        </select>
                    {/if}
                {/each}
                {#if backgroundEquipment.groupApparel.length === 3}
                    {formatDoubleText()}
                    <select id="singleDouble" bind:value={singleDouble} on:change={() => handleSingleSelect(singleDouble)}>
                        <option hidden disabled selected value="">Pick One</option>
                        <option value="single">{backgroundEquipment.groupApparel[1].apparel.name}</option>
                        <option value="double">{doubleText}</option>
                    </select>
                    {#if singleDouble === "double"}
                        {#each backgroundEquipment.groupApparel[2] as group, index}
                            <select id="double-select-{index}" bind:value={doubleKey[index]} on:change={() => handleDoubleSelect(doubleKey[index],index)}>
                                <option hidden disabled selected value="">Left or Right</option>
                                {#each group as choice}
                                    <option value={getApparelOptionKey(choice)}>{getApparelOptionLabel(choice)}</option>
                                {/each}
                            </select>
                        {/each}
                    {/if}
                {/if}
                {#if backgroundEquipment.groupApparel.length === 4}
                    {formatPackText()}
                    <select id="singlePack" bind:value={singlePack} on:change={() => handlePackSelect(singlePack)}>
                        <option hidden disabled selected value="">Pick One</option>
                        <option value="single">{backgroundEquipment.groupApparel[1].apparel.name}</option>
                        <option value="pack">{packText}</option>
                    </select>
                {/if}
                <p class="id-print">IDs: {allSelectedApparelIds} - {allSelectedApparelIds.length}</p>
            {/if}
            {#if backgroundEquipment.groupConsumables.length > 0}
                <h4>Consumables</h4>
                {#each backgroundEquipment.groupConsumables as group, index}
                    {#if group.length === 1}
                        <p>{getConsumableOptionLabel(group[0])}</p>
                    {:else}
                        <select id="Consumable-select-{index}" bind:value={selectConsumableKey[index]} on:change={() => handleConsumableSelect(selectConsumableKey[index],index)}>
                            <option hidden disabled selected value>Consumable {index + 1}</option>
                            {#each group as choice}
                                <option value={getConsumableOptionKey(choice)}>{getConsumableOptionLabel(choice)}</option>
                            {/each}
                        </select>
                    {/if}
                {/each}
                <p class="id-print">IDs: {allSelectedConsumableIds} - {allSelectedConsumableIds.length}</p>
            {/if}
            {#if backgroundEquipment.gear.length > 0}
                <h4>Gear</h4>
                {#each backgroundEquipment.gear as item}
                    <p>{item.gear.name}</p>
                {/each}
            {/if}
            {#if backgroundEquipment.groupRobotModules.length > 0}
                <h4>Robot Modules</h4>
                {#each backgroundEquipment.groupRobotModules as group, index}
                    {#if group.length === 1}
                        <p>{getRobotModuleOptionLabel(group[0])}</p>
                    {:else}
                        <select id="RobotModule-select-{index}" bind:value={selectRobotModuleKey[index]} on:change={() => handleRobotModuleSelect(selectRobotModuleKey[index],index)}>
                            <option hidden disabled selected value>RobotModule {index + 1}</option>
                            {#each group as choice}
                                <option value={getRobotModuleOptionKey(choice)}>{getRobotModuleOptionLabel(choice)}</option>
                            {/each}
                        </select>
                    {/if}
                {/each}
            <p class="id-print">IDs: {allSelectedRobotModuleIds} - {allSelectedRobotModuleIds.length}</p>
            {/if}
            {#if Object.keys(backgroundStuff).length > 0}
                <h4>Caps: {backgroundStuff.caps}</h4>
                {#if backgroundStuff.misc !== ''}
                    <h4>Misc</h4>
                    <p>{backgroundStuff.misc}</p>
                {/if}

                {#if (backgroundStuff.junk > 0 || backgroundStuff.trinket > 0 || backgroundStuff.food > 0 || backgroundStuff.forage > 0 || backgroundStuff.bev > 0 || backgroundStuff.chem > 0 || backgroundStuff.ammo > 0 || backgroundStuff.aid > 0 || backgroundStuff.odd > 0 || backgroundStuff.outcast > 0)}
                    <h4>Random Loot Rolls</h4>
                {/if}
                <ul>
                    {#if backgroundStuff.junk > 0}
                        <li>Junk: {backgroundStuff.junk}</li>
                    {/if}
                    {#if backgroundStuff.trinket > 0}
                        <li>Trinkets: {backgroundStuff.trinket}</li>
                    {/if}
                    {#if backgroundStuff.food > 0}
                        <li>Food: {backgroundStuff.food}</li>
                    {/if}
                    {#if backgroundStuff.forage > 0}
                        <li>Forage: {backgroundStuff.forage}</li>
                    {/if}
                    {#if backgroundStuff.bev > 0}
                        <li>Beverages: {backgroundStuff.bev}</li>
                    {/if}
                    {#if backgroundStuff.chem > 0}
                        <li>Chem: {backgroundStuff.chem}</li>
                    {/if}
                    {#if backgroundStuff.ammo > 0}
                        <li>Ammo: {backgroundStuff.ammo}</li>
                    {/if}
                    {#if backgroundStuff.aid > 0}
                        <li>Aid: {backgroundStuff.aid}</li>
                    {/if}
                    {#if backgroundStuff.odd > 0}
                        <li>Oddities: {backgroundStuff.odd}</li>
                    {/if}
                    {#if backgroundStuff.outcast > 0}
                        <li>Outcast Items: {backgroundStuff.outcast}</li>
                    {/if}
                </ul>
            {/if}
        </div>
    {/if}
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
                <p>{level}</p>
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