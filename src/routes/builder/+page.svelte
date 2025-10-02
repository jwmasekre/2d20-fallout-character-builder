<script lang="ts">
    // custom types are all stored in src/lib/server/types.ts
    // for some reason +page.svelte files do not like src/lib/types.ts
    import type { FullCharacter, OriginWithTraits, perktype, BackgroundEquipment, Pages, SpecialArray, SpecialGifted } from '$lib/server/types.ts'
    // functions that have to be available across all pages
    import { resetCharacter } from '$lib/funcs.ts';

    // retrieves data from the db for origins, traits, and perks
    let { data }: {
        data: {
            groupedOrigins: Record<string, OriginWithTraits[]>;
            sourcebookMap: Record<string, string>;
            allPerks: perktype[];
        };
    } = $props();

    // build all the stateful variables to be available to all the components
    let newCharacter: FullCharacter = $state(resetCharacter());
    let currentPage = $state("");
    let visitedPages: Pages[] = $state([]);
    let selectedOrigin: string = $state('');
    let selectedOriginData: OriginWithTraits | undefined = $state();
    let giftedSelected:SpecialGifted = $state(blankSpecialGifted);
    let remainingSpecialPoints = $state(0);
    let remainingSkillRanks = $state(0);
    let hasCompanion: boolean = $state(false);
    let companion = $state({
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
    });
    let backgroundEquipment: BackgroundEquipment = $state(undefined);
    let selectedBackgroundIndex: number | null = $state(null);
    let equipmentValidity = $state({
        weapons: false,
        apparel: false,
        consume: false,
        robot: false
    })

    // import all the components
    import Nav from '../../components/nav.svelte';
    import Save from '../../components/save.svelte';
    import Origin from '../../components/origin.svelte';
    import Special from '../../components/special.svelte';
    import Skills from '../../components/skills.svelte';
    import Perks from '../../components/perks.svelte';
    import Stats from '../../components/stats.svelte';
    import Equipment from '../../components/equipment.svelte';
    import Review from '../../components/review.svelte';
	import { blankSpecialGifted } from '$lib/constants.ts';
    
</script>

<Nav newCharacter={newCharacter} currentPage={currentPage} visitedPages={visitedPages} selectedOriginData={selectedOriginData}giftedSelected={giftedSelected} remainingSpecialPoints={remainingSpecialPoints} remainingSkillRanks={remainingSkillRanks} equipmentValidity={equipmentValidity}/>

<Save newCharacter={newCharacter}/>

<Origin newCharacter={newCharacter} groupedOrigins={data.groupedOrigins} sourcebookMap={data.sourcebookMap} currentPage={currentPage} selectedBackgroundIndex={selectedBackgroundIndex} backgroundEquipment={backgroundEquipment} visitedPages={visitedPages} selectedOrigin={selectedOrigin} selectedOriginData={selectedOriginData}/>

<Special newCharacter={newCharacter} currentPage={currentPage} giftedSelected={giftedSelected} remainingSpecialPoints={remainingSpecialPoints}/>

<Skills newCharacter={newCharacter} currentPage={currentPage} remainingSkillRanks={remainingSkillRanks}/>

<Perks newCharacter={newCharacter} currentPage={currentPage} allPerks={data.allPerks} hasCompanion={hasCompanion}/>

<Stats newCharacter={newCharacter} currentPage={currentPage} hasCompanion={hasCompanion} companion={companion}/>

<Equipment newCharacter={newCharacter} currentPage={currentPage} equipmentValidity={equipmentValidity}/>

<Review newCharacter={newCharacter} currentPage={currentPage} backgroundEquipment={backgroundEquipment}/>
