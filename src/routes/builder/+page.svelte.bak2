<script>
    let currentPage = 'origin';
    
    let isOriginValid = false;
    let isSpecialValid = false;

    function navigateTo(page) {
        currentPage = page;
        if (page = 'special') {
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
        navigateTo('skills')
    }
    function goToCharacterSheet() {
        navigateTo('skills')
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
        navigateTo('origin');
    }
    function goBackEquipmentPage() {
        navigateTo('special')
    }

    import Origin from '$lib/origin.svelte'
    import Special from '$lib/special.svelte'
    import Skills from '$lib/skills.svelte'
    import Perks from '$lib/perks.svelte'
    import Stats from '$lib/stats.svelte'
    import Equipment from '$lib/equipment.svelte'
    import Sheet from '$lib/sheet.svelte'
</script>

<style>
    .page {
        position: absolute;
        top: 5.5vh;
        left: 0;
        width: 100%;
        height: 100vh;
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
        transform: translateY(-100%);
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

    .perk-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 1rem;
        margin-top: 1rem;
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

<!--ORIGIN-->
<div class={`page ${currentPage === 'origin' ? 'page-origin' : 'page-leave'}`}>
    <Origin />
    <button disabled={!isOriginValid} on:click={goToSpecialPage}>Special</button>
</div>

<!--SPECIAL-->
<div class={`page ${currentPage === 'special' ? 'page-special' : 'page-leave'}`}>
    <button on:click={goBackOriginPage}>Origin</button>
    <Special />
    <button disabled={!isSpecialValid} on:click={goToSkillsPage}>Skills</button>
</div>

<!--SKILLS-->
<div class={`page ${currentPage === 'skills' ? 'page-skills' : 'page-leave'}`}>
    <button on:click={goBackSpecialPage}>Special</button>
    <Skills />
    <button disabled={skillPointsRemaining !== 0} on:click={goToPerksPage}>Perks</button>
</div>

<!---PERKS-->
<div class={`page ${currentPage === 'perks' ? 'page-perks' : 'page-leave'}`}>
    <button on:click={goBackSkillsPage}>Skills</button>
    <Perks />
    <button disabled={perkPointsRemaining !== 0} on:click={goToStatsPage}>Stats</button>
</div>

<!--STATS-->
<div class={`page ${currentPage === 'stats' ? 'page-stats' : 'page-leave'}`}>
    <button on:click={goBackPerksPage}>Perks</button>
    <Stats />
    <button on:click={goToEquipmentPage}>Stats</button>
</div>

<!--EQUIPMENT-->
<div class={`page ${currentPage === 'equipment' ? 'page-equipment' : 'page-leave'}`}>
    <Equipment />
</div>

<!--SHEET-->
<div class={`page ${currentPage === 'sheet' ? 'page-equipment' : 'page-leave'}`}>
    <Sheet />
</div>