<script lang="ts">

    import { arrays, blankCharacter, blankSpecialGifted } from '$lib/constants.ts';
	import type { FullCharacter, SpecialStat } from '$lib/server/types.ts';

    let newCharacter:FullCharacter, currentPage:string, selectedArray = $props();

/*

"font": https://patorjk.com/software/taag/#p=display&h=0&f=AMC%20AAA01&t=ORIGIN

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

    let traitIds = $derived(newCharacter.traits.map(obj => obj[trait]));
    let isGifted = $derived(traitIds.includes('7'));

    let giftedSelected = blankSpecialGifted;
    let giftedCount = $derived(Object.values(giftedSelected).filter(Boolean).length);

    function getStatMax(stat:SpecialStat) {
        if (newCharacter.superMutant) {
            if (['intelligence','charisma'].includes(stat)) {
                return 6 + (newCharacter.superMutant === 'super mutant' ? 0 : 2);
            }
        }
        return 10;
    }

    function getDisplayStat(stat:SpecialStat, value:number) {
        let mod = 0;
        if (newCharacter.superMutant) {
            if (['strength', 'endurance'].includes(stat)) mod += 2;
        }
        if (isGifted && giftedSelected[stat]) mod += 1;
        return value + mod;
    }

    let specialPoints = 40;
    let remainingSpecialPoints:number;
    let customArray = blankCharacter.special;
    let balancedArray = blankCharacter.special;
    let focusedArray = blankCharacter.special;
    let specializedArray = blankCharacter.special;
    $effect(() => {
        switch (selectedArray) {
            case 'Custom':
                remainingSpecialPoints = specialPoints - Object.values(customArray).reduce((acc,val) => acc + val, 0); break;
            case 'Balanced':
                remainingSpecialPoints = specialPoints - Object.values(balancedArray).reduce((acc,val) => acc + val, 0); break;
            case 'Focused':
                remainingSpecialPoints = specialPoints - Object.values(focusedArray).reduce((acc,val) => acc + val, 0); break;
            case 'Specialized':
                remainingSpecialPoints = specialPoints - Object.values(specializedArray).reduce((acc,val) => acc + val, 0); break;
            default:
                remainingSpecialPoints = specialPoints;
        }
    });

    function handleStatChange(stat:SpecialStat, value:string) {
        const parsedValue = parseInt(value);
        if (!isNaN(parsedValue)) {
            switch (selectedArray) {
                case 'Custom':
                    customArray[stat] = parsedValue; break;
                case 'Balanced':
                    balancedArray[stat] = parsedValue; break;
                case 'Focused':
                    focusedArray[stat] = parsedValue; break;
                case 'Specialized':
                    specializedArray[stat] = parsedValue; break;
                default:
                    break;
            }
        }
    }

    $effect(() => {
        switch (selectedArray) {
            case 'Custom':
                newCharacter.special = customArray; break;
            case 'Balanced':
                newCharacter.special = balancedArray; break;
            case 'Focused':
                newCharacter.special = focusedArray; break;
            case 'Specialized':
                newCharacter.special = specializedArray; break;
            default:
                break;
        }
        if (isGifted) {
            for (const stat of Object.entries(newCharacter.special)) {
                newCharacter.special[stat[0]] = getDisplayStat(stat[0],stat[1]);
            }
        }
    });

</script>

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
    <!--<select id="array-select" bind:value={selectedArray} on:change={updateArray}>-->
    <select id="array-select" bind:value={selectedArray}>
        <option hidden disabled selected value="">Select SPECIAL array</option>
        <option value="Balanced">Balanced (6,6,6,6,6,5,5)</option>
        <option value="Focused">Focused (8,7,6,6,5,4,4)</option>
        <option value="Specialized">Specialized (9,8,5,5,5,4,4)</option>
        <option value="Custom">Custom</option>
    </select>
    
    <p>Remaining Points: {remainingSpecialPoints}</p>

    {#if selectedArray === 'Custom'}
        {#each Object.keys(customArray) as stat}
            <label for={stat}>{stat.toUpperCase()}: </label>
            <input
                type="number"
                id={stat}
                bind:value={customArray[stat]}
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
    {:else if selectedArray === 'Balanced'}
        {#each Object.keys(balancedArray) as stat}
            <div>
                <label for={stat}>{stat.toUpperCase()}:</label>
                <select
                    bind:value={balancedArray[stat]}
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
                <span>→ {getDisplayStat(stat, balancedArray[stat])}</span>
            </div>
        {/each}
    {:else if selectedArray === 'Focused'}
        {#each Object.keys(focusedArray) as stat}
            <div>
                <label for={stat}>{stat.toUpperCase()}:</label>
                <select
                    bind:value={focusedArray[stat]}
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
                <span>→ {getDisplayStat(stat, focusedArray[stat])}</span>
            </div>
        {/each}
    {:else if selectedArray === 'Specialized'}
        {#each Object.keys(specializedArray) as stat}
            <div>
                <label for={stat}>{stat.toUpperCase()}:</label>
                <select
                    bind:value={specializedArray[stat]}
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
                <span>→ {getDisplayStat(stat, specializedArray[stat])}</span>
            </div>
        {/each}
    {/if}
</div>
