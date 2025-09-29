<script lang="ts">

    import { resetCharacter, fetchBackgrounds } from '$lib/funcs.ts'
	import type { BackgroundEquipment, FullCharacter, OriginWithTraits } from '$lib/server/types.ts';

    let newCharacter:FullCharacter, groupedOrigins:Record<string, OriginWithTraits[]>, sourcebookMap:Record<string, string>, currentPage:string, selectedBackgroundIndex:number | null, backgroundEquipment: BackgroundEquipment, visitedPages:string[], selectedTraits:string[] = $props();

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

    //dynamically updates xp to match the minimum xp for the level that's set on the page
    $effect(() => {
        if (newCharacter.lvl > 0) newCharacter.xp = !isNaN(newCharacter.lvl) && newCharacter.lvl >= 1 ? newCharacter.lvl * (newCharacter.lvl - 1) * 50 : 0;
    });
    //set all the origin data once an origin is selected
    $effect(() => {
		if (selectedOriginData != undefined) newCharacter.origin = selectedOriginData.id, newCharacter.originName = selectedOriginData.name, newCharacter.originDesc = selectedOriginData?.description;
    });
    //set the character to not be a ghoul if the origin cannot be a ghoul
    $effect(() => {
		if (selectedOriginData && !(selectedOriginData.canGhoul)) newCharacter.ghoul = false;
    });
    
    let selectedOrigin: string = $state('');
    let traitDescriptions: string[] = $state([]);
    //when the ghoul flag is changed in the character, check if the ghoul trait needs to be set/unset
    $effect(() => {
        selectedTraits = handleGhouls(newCharacter.ghoul);
    });

    //I don't think this needs to be reactive
    //$: allOrigins = Object.values(groupedOrigins).flat();
    const allOrigins = Object.values(groupedOrigins).flat();
    //store all the information for the origin selected in the select element
    $effect(() => {
        let selectedOriginData = allOrigins.find(o => o.id.toString() === selectedOrigin.toString());
    });
    //pretty sure this doesn't need to be reactive either
    //$: ghoulOrigin = allOrigins.find(o => o.name?.toLowerCase() === 'ghoul');
    const ghoulOrigin = allOrigins.find(o => o.name?.toLowerCase() === 'ghoul');
    //when the selected origin changes, update the number of traits that the origin has
    let traitCount = $derived(selectedOriginData?.traits?.length ?? 0);

    //when the selected traits change, grabs all the descriptions for every trait that's currently selected
    $effect(() => {
        traitDescriptions = selectedTraits.map(id => {
            const trait = selectedOriginData?.traits.find(t => t.id.toString() === id.toString());
            return trait?.description ?? '';
        })
    });

    //if an origin is selected and the character is a ghoul, set the selected trait to the ghoul trait, otherwise set it to the first trait of the origin (or empty if there's no trait selected)
    function handleGhouls(ghoul:boolean):string[] {
        if (selectedOriginData) {
            return ghoul ? [ghoulOrigin!.traits[0].id.toString()] : [selectedOriginData.traits[0].id.toString()];
        } else return [];
    }

    //update the character traits when traits are selected
    $effect(() => {
		if (selectedTraits.length > 0) {
            newCharacter.traits = [];
            for (const trait of selectedTraits) {
                const traitData = {
                    trait: parseInt(trait),
                    traitName: selectedOriginData!.traits.find(t => t.id.toString() === trait.toString()).name,
                    traitDescription: selectedOriginData!.traits.find(t => t.id.toString() === trait.toString()).description
                };
                newCharacter.traits.push(traitData);
            }
        } else newCharacter.traits = [];
    });

    //there are three basic body shapes: mr handy, securitron, and everything else
    let isHandy = false;
    let isSecuritron = false;
    //every time an origin is selected, we need to clear a bunch of data
    function handleOriginSelect(origin: string) {
        //the current page needs to be set to origin, which triggers a reactive element in the nav bar
        currentPage = "origin";
        //clear out all fields for the character
        newCharacter = resetCharacter()
        //clear out any info from the background selection
        selectedBackgroundIndex = null;
        backgroundEquipment = undefined;
        //fetch the backgrounds for the new origin
        fetchBackgrounds(origin);
        //clear out the selected traits
        selectedTraits = [];
        //set the selected traits to the first trait if there's only one trait available
        if (selectedOriginData && traitCount == 1) {
            selectedTraits = [selectedOriginData.traits[0].id.toString()];
            newCharacter.traits = [{
                trait: selectedOriginData.traits[0].id,
                traitName: selectedOriginData.traits[0].name,
                traitDescription: selectedOriginData.traits[0].description,
            }]
        }
        //check the body type of the origin/trait
        if (selectedTraits.includes('4')) isHandy = true; else isHandy = false;
        if (selectedTraits.includes('20')) isSecuritron = true; else isSecuritron = false;
        //set the correct body parts as active
        setBodyParts();
        //clear out visited pages
        visitedPages = [];
        //refresh current page to ensure the variable registers as having changed
        currentPage = "";
        currentPage = "origin";
    }

    //disable and enable the appropriate body parts based on body type
    function setBodyParts() {
        if (isHandy) {
            newCharacter.body.head.active = false;
            newCharacter.body.lArm.active = false;
            newCharacter.body.rArm.active = false;
            newCharacter.body.lLeg.active = false;
            newCharacter.body.rLeg.active = false;
            newCharacter.body.torso.active = true;
            newCharacter.body.optics.active = true;
            newCharacter.body.arm1.active = true;
            newCharacter.body.arm2.active = true;
            newCharacter.body.arm3.active = true;
            newCharacter.body.thruster.active = true;
            newCharacter.body.wheel.active = false;
        } else if (isSecuritron) {
            newCharacter.body.head.active = true;
            newCharacter.body.lArm.active = true;
            newCharacter.body.rArm.active = true;
            newCharacter.body.lLeg.active = false;
            newCharacter.body.rLeg.active = false;
            newCharacter.body.torso.active = true;
            newCharacter.body.optics.active = false;
            newCharacter.body.arm1.active = false;
            newCharacter.body.arm2.active = false;
            newCharacter.body.arm3.active = false;
            newCharacter.body.thruster.active = false;
            newCharacter.body.wheel.active = true;
        } else {
            newCharacter.body.head.active = true;
            newCharacter.body.lArm.active = true;
            newCharacter.body.rArm.active = true;
            newCharacter.body.lLeg.active = true;
            newCharacter.body.rLeg.active = true;
            newCharacter.body.torso.active = true;
            newCharacter.body.optics.active = false;
            newCharacter.body.arm1.active = false;
            newCharacter.body.arm2.active = false;
            newCharacter.body.arm3.active = false;
            newCharacter.body.thruster.active = false;
            newCharacter.body.wheel.active = false;
        }
        newCharacter.apparel = [];
    }
    
    //if the origin/trait is one of the robot traits, set the robot flag to true
    $effect(() => {
		if (['4','18','19','20','23'].some(robotId => selectedTraits.includes(robotId))) newCharacter.robot = true;
    });
    //if the origin/trait is one of the super mutant traits, set the super mutant flag to the appropriate setting
    $effect(() => {
		if (['3','25'].some(superMutantId => selectedTraits.includes(superMutantId))) selectedTraits[0] === '3' ? newCharacter.superMutant = 'super mutant' : newCharacter.superMutant = 'nightkin';
    });

</script>

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
    <input type="text" id="char-name" bind:value={newCharacter.characterName} title="char-name">
    <label for="level-select">Level: </label>
    <input type="number" min="1" bind:value={newCharacter.lvl} id="level-select" title="level-select">
    <label for="origin-select">Origin: </label>
    <select name="origin-select" id="origin-select" bind:value={selectedOrigin} on:change={() => handleOriginSelect(selectedOrigin)} class="origin-select">
        {#each Object.entries(groupedOrigins) as [sourcebookId, origins]}
            <optgroup label={sourcebookMap[sourcebookId]}>
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
            <input type="checkbox" id="is-ghoul" name="is-ghoul" bind:checked={newCharacter.ghoul}>
        {/if}

        <h3>Trait:</h3>
    {/if}

    {#if newCharacter.ghoul === true && ghoulOrigin}
        <h4>{ghoulOrigin.traits[0]?.name}</h4>
        <pre>{ghoulOrigin.traits[0]?.description}</pre>
    {:else if selectedOriginData}
        {#if traitCount > 1}
            <!--  this was the old way, but multiple select kinda sucks
            <div class="multi-trait">
                <select multiple bind:value={selectedTraits} class="multi-trait-select">
                    {#each selectedOriginData.traits as trait}
                        <option value={trait.id.toString()}>{trait.name}</option>
                    {/each}
                </select>
            </div>
            -->
            <div class="multi-trait">
                {#each selectedOriginData.traits as trait}
                    <label>
                        <input 
                            type="checkbox"
                            name="traits"
                            value={trait}
                            bind:group={selectedTraits}
                        />
                        {trait}
                    </label>
                {/each}
            </div>
        {/if}
    {/if}

    {#if traitDescriptions.length > 0 && !newCharacter.ghoul}
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
