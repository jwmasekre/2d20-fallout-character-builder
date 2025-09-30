<script lang="ts">
	import { getStaggeredBonus } from '$lib/funcs.ts';


	import type { FullCharacter, perktype } from '$lib/server/types.ts';

    let newCharacter:FullCharacter, currentPage:string, selectedTraits:string[], allPerks:perktype[], selectedPerks:string[], hasCompanion:boolean, companion = $props();

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

    //carry weight calculation
    let carryWeight: number;
    //checking all four of these to trigger recalc on a change of any of them
    $effect(() => {
        if (selectedTraits.length !== 0 || selectedPerks.length !== 0 || newCharacter.special) {
        //mister handy, robobrain, securitron, and assaultron have flat carry weights
        if (selectedTraits.includes('4') || selectedTraits.includes('19') || selectedTraits.includes('20') || selectedTraits.includes('23')) carryWeight = 150;
        //protectrons are even bulkier
        else if (selectedTraits.includes('18')) carryWeight = 225;
        //small frame halves str bonus to carry weight
        else if (selectedTraits.includes('9')) carryWeight = 150 + 5 * newCharacter.special.strength
        //default calculation
        else carryWeight = 150 + 10 * newCharacter.special.strength;
        //strong back adds 25 per rank to non-robots
        carryWeight += newCharacter.robot ? 0 : selectedPerks.filter(p => p === '91').length * 25;
        }
    });

    //damage resistance calculation
    let baseDr = {
        phys: 0,
        enrg: 0,
        rads: 0,
        pois: 0
    }
    //checking all four of these to trigger recalc on a change of any of them
    $effect(() => {
        if (selectedTraits.length !== 0 || selectedPerks.length !== 0 || newCharacter.special) {
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
                baseDr.phys += getStaggeredBonus(newCharacter.special.strength);
            }
            //add dr for toughness perk
            baseDr.phys += selectedPerks.filter(p => p === '94').length;

            //energy
            //add dr for refractor perk
            baseDr.enrg += selectedPerks.filter(p => p === '74').length;

            //evasive adding to physical and energy like melee damage
            if (selectedPerks.includes('167')) {
                const bonus = getStaggeredBonus(newCharacter.special.agility);
                baseDr.phys += bonus;
                baseDr.enrg += bonus;
            }
        }
    });
    
    //defense
    let defense = $derived(newCharacter.special.agility >= 9 ? 2 : 1);

    //initiative
    let initiative = $derived(newCharacter.special.perception + newCharacter.special.agility);

    //max health adjustments
    //calculate and add health for life giver perk
    let maxHealth = $derived(newCharacter.special.endurance + newCharacter.special.luck + selectedPerks.filter(p => p === '51').length * newCharacter.special.endurance);
    //will help us determine if we need to report different health at night for nocturnal fortitude perk
    let isNocturnal = $derived(selectedPerks.includes('111'));

    //melee damage modifier calculation
    let meleeDamage = 0;
    let unarmedBonus = false;
    let sneakBonus = false;
    //checking all four of these to trigger recalc on a change of any of them
    $effect(() => {
        if (selectedTraits.length > 0 || selectedPerks.length > 0 || newCharacter.special) {
            //base calculation
            meleeDamage = getStaggeredBonus(newCharacter.special.strength)
            //heavy handed and assaultron traits
            if (selectedTraits.includes('8') || selectedTraits.includes('23')) meleeDamage += 1;
            //will help us determine if we need to report different modifier for unarmed via iron fist perk
            unarmedBonus = selectedPerks.includes('46');
            //will help us determine if we need to report different modifier for sneak attacks via ninja
            sneakBonus = selectedPerks.includes('61');
        }
    });

    //luck points
    //max luck points are luck or minus one for gifted trait
    let maxLuckPoints = $derived(newCharacter.special.luck - selectedTraits.filter(t => t === '7').length);
    
    hasCompanion = $derived((selectedPerks.includes('28') || selectedPerks.includes('105')));

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

</script>


<div class={`page ${currentPage === 'stats' ? 'page-active' : 'page-leave'}`}>

    <h1>Stats</h1>
    <div class="character" style={hasCompanion ? "display:inline-block;margin-right:1rem" : "display:block"}>
        {#if hasCompanion}<h3>{newCharacter.characterName}</h3>{/if}
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
            <p><strong>Health</strong>: {maxHealth}{#if isNocturnal} ({maxHealth + newCharacter.special.endurance} at night){/if}</p>
            <p><strong>Melee Damage</strong>: +{meleeDamage}CD{#if unarmedBonus} (+{meleeDamage + 1}CD unarmed) {/if}{#if sneakBonus} (+{meleeDamage + 2}CD sneak attacks){/if}{#if unarmedBonus && sneakBonus} (+{meleeDamage + 3}CD unarmed sneak attacks){/if}</p>
            <p><strong>Luck Points</strong>: {maxLuckPoints}</p>
        </div>
        <div class="character-special" style={!hasCompanion ? "display:inline-block;margin-right:1rem" : "display:block"}>
            <h2>SPECIAL</h2>
            {#each ['strength', 'perception', 'endurance', 'charisma', 'intelligence', 'agility', 'luck'] as stat}
                <div>
                    <strong>{stat.toUpperCase()}</strong>: {newCharacter.special[stat]}
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
