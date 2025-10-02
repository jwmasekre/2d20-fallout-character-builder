<script lang="ts">

	import type { Apparel, Background, BackgroundApparel, BackgroundConsumable, BackgroundEquipment, BackgroundRobotModule, BackgroundStuff, BackgroundWeapon, FullCharacter, GroupApparel, GroupConsumables, GroupRobotModules, GroupWeapons } from '$lib/server/types.ts';
    
    import { groupBackgroundApparel, groupBackgroundConsumables, groupBackgroundRobotModules, groupBackgroundWeapons } from '$lib/equipmentGroupingFuncs.ts';
    import { getWeaponOptionLabel, getWeaponOptionKey, formatDoubleText, formatPackText, getApparelOptionLabel, getApparelOptionKey, getConsumableOptionLabel, getConsumableOptionKey, getRobotModuleOptionLabel, getRobotModuleOptionKey } from '$lib/equipmentLabelFuncs.ts'

    let newCharacter:FullCharacter, currentPage:string, equipmentValidity = $props();

    //TODO: write to newCharacter, clean up a lot of the functions (and probably effects)

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

    let backgroundStuff:BackgroundStuff;

    let selectedBackgroundId: string = "";
    let selectedBackgroundIndex: number | null;
    $effect(() => {
        if (backgrounds.length > 0) {
            selectedBackgroundIndex = parseInt(selectedBackgroundId) - backgrounds[0].id
        } else {selectedBackgroundIndex = 0}
    });
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


    let selectWeaponKey: string[] = [];
    let selectedWeaponKey: string[] = [];
    let selectedWeapons: BackgroundWeapon[][] = [];
    $effect(() => {
        if (backgroundEquipment!.groupWeapons.length > 0) {
            backgroundEquipment!.groupWeapons.forEach((group, index) => {
                if (group.length === 1) {
                    const key = getWeaponOptionKey(group[0]);
                    selectWeaponKey[index] = key;
                    handleWeaponSelect(key, index);
                }
            });
        }
    });

    function handleWeaponSelect(key: string, index: number) {
        selectedWeaponKey[index] = key;
        const ids = key.split("-").map(Number);
        selectedWeapons[index] = [];

        for (const group of backgroundEquipment!.groupWeapons) {
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
    $effect(() => {
        if ((singleDouble === "single" || singlePack === "single") && backgroundEquipment!.groupApparel) {
            selectSingle = backgroundEquipment!.groupApparel[1].id;
        } else if (singleDouble === "double") {
            singleKey = "";
        }
        if (singlePack === "pack") {
            selectPack = [];
            for (const pack of backgroundEquipment!.groupApparel[2]) {
                selectPack.push(pack.id);
            }
        }
    });
    $effect(() => {
        if (backgroundEquipment!.groupApparel?.length > 0) {
            backgroundEquipment!.groupApparel[0].forEach((group, index) => {
                if (group.length === 1) {
                    const key = getApparelOptionKey(group[0]);
                    selectApparelKey[index] = key;
                    handleApparelSelect(key, index);
                }
            });
        }
    });

    function handleApparelSelect(key: string, index: number) {
        selectedApparelKey[index] = key;
        const ids = key.split("-").map(Number);
        selectedApparel[index] = [];

        for (const group of backgroundEquipment!.groupApparel) {
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

        for (const group of backgroundEquipment!.groupApparel) {
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
            singleApparel = backgroundEquipment!.groupApparel[1];
        }
        else if (state === "pack") {
            selectSingle = ""
            singleKey = ""
            singleApparel = undefined;
            packKey = selectPack;
            packApparel = backgroundEquipment!.groupApparel[2];
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
            singleApparel = backgroundEquipment!.groupApparel[1];
        }
    }

    let selectConsumableKey: string[] = [];
    let selectedConsumableKey: string[] = [];
    let selectedConsumables: BackgroundConsumable[][] = [];
    $effect (() => {
        if (backgroundEquipment!.groupConsumables.length > 0) {
            backgroundEquipment!.groupConsumables.forEach((group, index) => {
                if (group.length === 1) {
                    const key = getConsumableOptionKey(group[0]);
                    selectConsumableKey[index] = key;
                    handleConsumableSelect(key, index);
                }
            });
        }
    });

    function handleConsumableSelect(key: string, index: number) {
        selectedConsumableKey[index] = key;
        const ids = key.split("-").map(Number);
        selectedConsumables[index] = [];

        for (const group of backgroundEquipment!.groupConsumables) {
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
    $effect(() => {
        if (backgroundEquipment!.groupRobotModules.length > 0) {
            backgroundEquipment!.groupRobotModules.forEach((group, index) => {
                if (group.length === 1) {
                    const key = getRobotModuleOptionKey(group[0]);
                    selectRobotModuleKey[index] = key;
                    handleRobotModuleSelect(key, index);
                }
            });
        }
    });

    function handleRobotModuleSelect(key: string, index: number) {
        selectedRobotModuleKey[index] = key;
        const ids = key.split("-").map(Number);
        selectedRobotModules[index] = [];

        for (const group of backgroundEquipment!.groupRobotModules) {
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

    let doubleText:string = ""
    let packText:string = ""

    let allSelectedWeaponIds: string[] = [];
    $effect(() => {
        if (selectedWeaponKey.length > 0) {
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
    });

    let allSelectedApparelIds: string[] = [];
    let allSelectedApparel:Apparel[] = [];
    $effect(() => {
        if (selectedApparelKey.length > 0 || singleKey !== "" || doubleKey.length > 0) {
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
    });
    
    let allSelectedConsumableIds: string[] = [];
    $effect(() => {
        if (selectedConsumableKey.length > 0) {
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
    });

    let allSelectedRobotModuleIds: string[] = [];
    $effect(() => {
        if (selectedRobotModuleKey.length > 0) {
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
    });

    let singleDouble: "single" | "double" | "" = "";
    let singlePack: "single" | "pack" | "" = "";

    let isWeaponSelectValid = false;
    let isApparelSelectValid = false;
    let isConsumableSelectValid = false;
    let isRobotModuleSelectValid = false;
    equipmentValidity = $derived({
        weapons: isWeaponSelectValid,
        apparel: isApparelSelectValid,
        consume: isConsumableSelectValid,
        robot: isRobotModuleSelectValid
    })
    $effect(() => {
        if (selectedWeapons.length > 0) {
            let valid = true;
            for (const selectedWeapon of selectedWeapons) {
                if (selectedWeapon.length === 0) {
                    valid = false;
                }
            }
            isWeaponSelectValid = valid;
        } else if (backgroundEquipment?.weapons.length === 0) isWeaponSelectValid = true;
    });
    $effect(() => {
        if (selectedApparel.length > 0) {
            let valid = true;
            for (const selectedItem of selectedApparel) {
                if (selectedItem.length === 0) {
                    valid = false;
                }
            }
            isApparelSelectValid = valid;
        } else if (backgroundEquipment?.apparel.length === 0) isApparelSelectValid = true;
    });
    $effect(() => {
        if (selectedConsumables.length > 0) {
            let valid = true;
            for (const selectedItem of selectedConsumables) {
                if (selectedItem.length === 0) {
                    valid = false;
                }
            }
            isConsumableSelectValid = valid;
        } else if (backgroundEquipment?.consumables.length === 0) isConsumableSelectValid = true;
    });
    $effect(() => {
        if (selectedRobotModules.length > 0) {
            let valid = true;
            for (const selectedItem of selectedRobotModules) {
                if (selectedItem.length === 0) {
                    valid = false;
                }
            }
            isRobotModuleSelectValid = valid;
        } else if (backgroundEquipment?.robotModules.length === 0) isRobotModuleSelectValid = true;
    });

</script>


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
                    {formatDoubleText(doubleText, backgroundEquipment)}
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
                    {formatPackText(packText, backgroundEquipment)}
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
