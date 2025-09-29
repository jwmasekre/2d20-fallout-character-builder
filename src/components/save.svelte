<script lang="ts">

    import { resetCharacter, fetchBackgrounds } from '$lib/funcs.ts'
	import type { BackgroundEquipment, FullCharacter, OriginWithTraits } from '$lib/server/types.ts';

    let newCharacter:FullCharacter, groupedOrigins:Record<string, OriginWithTraits[]>, sourcebookMap:Record<string, string>, currentPage:string, selectedBackgroundIndex:number | null, backgroundEquipment: BackgroundEquipment, visitedPages:string[], selectedTraits:string[] = $props();

    /*
    let characterId: number | null = null;
    
    let saveResult;
    $: if (saveResult.data.success && saveResult.data.characterId) {
        characterId = saveResult.data.characterId
    }
    */

</script>


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