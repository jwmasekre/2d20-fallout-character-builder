<script lang="ts">
	import { skills, special, skillPrettyMap } from '$lib/constants.ts';
	import { getStaggeredBonus } from '$lib/funcs.ts';


	import type { FullCharacter } from '$lib/server/types.ts';

    let newCharacter:FullCharacter, currentPage:string, hasCompanion:boolean, companion = $props();

    //TODO: write to newCharacter

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

    //checking all four of these to trigger recalc on a change of any of them
    newCharacter!.maxCarryWeight = $derived.by(() => {
        if (newCharacter!.traits.length !== 0 || newCharacter!.perks.length !== 0) {
            let strongBack = 0;
            if (newCharacter!.perks.filter(cperk => cperk.perk === 91).length > 0) {
                strongBack = newCharacter!.perks.find(cperk => cperk.perk === 91).ranks * 25;
            }
            switch (true) {
                case [4,19,20,23].some(trait => newCharacter!.traits.find(ctrait => ctrait.trait === trait)):
                    return 150;
                case newCharacter!.traits.filter(ctrait => ctrait.trait === 18).length >= 1:
                    return 225;
                case newCharacter!.traits.filter(ctrait => ctrait.trait === 9).length >= 1:
                    return 150 + (5 * newCharacter!.special.strength) + strongBack;
                default:
                    return 150 + (10 * newCharacter!.special.strength) + strongBack;
            }
        } else return 0;
    });

    //damage resistance calculation
    //poison
    newCharacter!.poisonDR = $derived.by(() => {
        switch (true) {
            //immune
            case [3,4,18,19,20,21,23,25].some(trait => newCharacter!.traits.filter(ctrait => ctrait.trait === trait)):
                return 99;
            //snakeeater perk
            case newCharacter!.perks.filter(cperk => cperk.perk === 87).length > 0:
                return newCharacter!.perks.find(cperk => cperk.perk === 87).ranks * 2;
            default:
                return 0;
        }
    });
    newCharacter!.baseDR.rdDR = $derived.by(() => {
        switch (true) {
            //immune
            case [2,3,4,18,19,20,21,23,25].some(trait => newCharacter!.traits.filter(ctrait => ctrait.trait === trait)):
                return 99;
            //child of atom trait and rad resistance perk
            case newCharacter!.traits.filter(ctrait => ctrait.trait === 22).length > 0 || newCharacter!.perks.filter(cperk => cperk.perk === 73).length > 0:
                return newCharacter!.traits.filter(ctrait => ctrait.trait === 22).length + (newCharacter!.perks.filter(cperk => cperk.perk === 73).length === 1 ? newCharacter!.perks.find(cperk => cperk.perk === 73).ranks : 0)
            default:
                return 0;
        }
    });
    //physical (based on perks)
    newCharacter!.baseDR.phDR = $derived.by(() => {
        const barbarian = newCharacter!.perks.filter(cperk => cperk.perk === 8).length > 0 ? getStaggeredBonus(newCharacter!.special.strength) : 0;
        const toughness = newCharacter!.perks.filter(cperk => cperk.perk === 94).length > 0 ? newCharacter!.perks.find(cperk => cperk.perk === 94).ranks : 0;
        const evasive = newCharacter!.perks.filter(cperk => cperk.perk === 167).length > 0 ? getStaggeredBonus(newCharacter!.special.agility) : 0;
        return barbarian + toughness + evasive;
    });
    //energy (based on perks)
    newCharacter!.baseDR.enDR = $derived.by(() => {
        const refractor = newCharacter!.perks.filter(cperk => cperk.perk === 74).length > 0 ? newCharacter!.perks.find(cperk => cperk.perk === 74).ranks : 0;
        const evasive = newCharacter!.perks.filter(cperk => cperk.perk === 167).length > 0 ? getStaggeredBonus(newCharacter!.special.agility) : 0;
        return refractor + evasive;
    });

    //defense
    newCharacter!.defense = $derived(newCharacter!.special.agility >= 9 ? 2 : 1);

    //initiative
    newCharacter!.initiative = $derived(newCharacter!.special.perception + newCharacter!.special.agility);

    //max health adjustments
    //calculate and add health for life giver perk
    newCharacter!.maxHP = $derived(newCharacter!.special.endurance + newCharacter!.special.luck + (newCharacter!.perks.filter(cperk => cperk.perk === 51).length > 0 ? newCharacter!.perks.find(cperk => cperk.perk === 51).ranks : 0) * newCharacter!.special.endurance);
    //will help us determine if we need to report different health at night for nocturnal fortitude perk
    let isNocturnal = $derived(newCharacter!.perks.filter(cperk => cperk.perk === 111).length > 0);

    //melee damage modifier calculation
    newCharacter!.meleeModifiers.base = $derived(getStaggeredBonus(newCharacter!.special.strength) + newCharacter!.traits.filter(ctrait => ctrait.trait === 8 || ctrait.trait === 23).length);
    //will help us determine if we need to report different modifier for unarmed via iron fist perk
    newCharacter!.meleeModifiers.unarmed = $derived(newCharacter!.perks.filter(cperk => cperk.perk === 46).length > 0 ? {active: true, modifier: 1} : {active: false, modifier: 0})
    //will help us determine if we need to report different modifier for sneak attacks via ninja
    newCharacter!.meleeModifiers.sneak = $derived(newCharacter!.perks.filter(cperk => cperk.perk === 61).length > 0 ? {active: true, modifier: 2} : {active: false, modifier: 0})

    //luck points
    //max luck points are luck or minus one for gifted trait
    newCharacter!.maxLuckPts = $derived(newCharacter!.special.luck - (newCharacter!.traits.filter(ctrait => ctrait.trait === 7).length > 0 ? 1 : 0));
    
    hasCompanion = $derived(newCharacter!.perks.filter(cperk => cperk.perk === 28 || cperk.perk === 105).length > 0);

    /* not messing with companions yet
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
    */

</script>


<div class={`page ${currentPage! === 'stats' ? 'page-active' : 'page-leave'}`}>

    <h1>Stats</h1>
    <div class="character" style={hasCompanion ? "display:inline-block;margin-right:1rem" : "display:block"}>
        {#if hasCompanion}<h3>{newCharacter!.characterName}</h3>{/if}
        <div class="character-stats">
            <p><strong>Carry Weight</strong>: {newCharacter!.maxCarryWeight}</p>
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
                        <td>{newCharacter!.baseDR.phDR}</td>
                        <td>{newCharacter!.baseDR.enDR}</td>
                        <td>{newCharacter!.baseDR.rdDR === 99 ? "immune" : newCharacter!.baseDR.rdDR}</td>
                        <td>{newCharacter!.poisonDR === 99 ? "immune" : newCharacter!.poisonDR}</td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Defense</strong>: {newCharacter!.defense}</p>
            <p><strong>Initiative</strong>: {newCharacter!.initiative}</p>
            <p><strong>Health</strong>: {newCharacter!.maxHP}{#if isNocturnal} ({newCharacter!.maxHP + newCharacter!.special.endurance} at night){/if}</p>
            <p><strong>Melee Damage</strong>: +{newCharacter!.meleeModifiers.base}CD{#if newCharacter!.meleeModifiers.unarmed.active} (+{newCharacter!.meleeModifiers.unarmed.modifier}CD unarmed) {/if}{#if newCharacter!.meleeModifiers.sneak.active} (+{newCharacter!.meleeModifiers.sneak.modifier}CD sneak attacks){/if}{#if newCharacter!.meleeModifiers.unarmed.active && newCharacter!.meleeModifiers.sneak.active} (+{newCharacter!.meleeModifiers.unarmed.modifier + newCharacter!.meleeModifiers.sneak.modifier}CD unarmed sneak attacks){/if}</p>
            <p><strong>Luck Points</strong>: {newCharacter!.maxLuckPts}</p>
        </div>
        <div class="character-special" style={!hasCompanion ? "display:inline-block;margin-right:1rem" : "display:block"}>
            <h2>SPECIAL</h2>
            {#each special as stat}
                <div>
                    <strong>{stat.toUpperCase()}</strong>: {newCharacter!.special[stat]}
                </div>
            {/each}
        </div>
        <div class="character-skills">
            <h2>Skills</h2>
            <ul>
                {#each skills as skill}
                    {#if newCharacter!.skills[skillPrettyMap[skill]].total > 0}
                        <li>
                            {newCharacter!.skills[skillPrettyMap[skill]].total} {skill} {newCharacter!.skills[skillPrettyMap[skill]].tagged ? '(Tag)' : ''}
                        </li>
                    {/if}
                {/each}
            </ul>
            <ul>
                {#each newCharacter!.perks as perk}
                    <li>{perk.perkName}</li>
                {/each}
            </ul>
        </div>
    </div>
    <!--
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
    -->
</div>
