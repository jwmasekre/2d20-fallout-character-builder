<script>
    let skillPoints = {};
    let skillPointsRemaining = 9 + specialStats.intelligence - Object.values(skillPoints).reduce((acc, val) => acc + val, 0);
    const skills = [
        'Athletics', 'Barter', 'Big Guns', 'Energy Weapons', 'Explosives', 'Lockpick', 'Medicine', 'Melee Weapons', 'Pilot', 'Repair', 'Science', 'Small Guns', 'Sneak', 'Speech', 'Survival', 'Throwing', 'Unarmed'
    ];
    skills.forEach(skill => {
        skillPoints[skill] = 0;
    });
    let tagSkills = {};
    let isSkillsValid = false;

    function handleSkillPointChange(skill, value) {
        const parsedValue = parseInt(value);
        if (!isNaN(parsedValue)) {
            let maxPoints = Math.min(level, 6);
            if (tagSkills[skill]) {
                maxPoints = 6;
            }
            if (parsedValue <= maxPoints) {
                skillPoints[skill] = parsedValue;
                skillPointsRemaining = 9 + specialStats.intelligence - Object.values(skillPoints).reduce((acc, val) => acc + val, 0);
            }
        }
    }

    function toggleTagSkill(skill) {
        if (tagSkills[skill]) {
            skillPoints[skill] += 2;
        } else {
            skillPoints[skill] -=2;
        }
        skillPointsRemaining = 9 + specialStats.intelligence - Object.values(skillPoints).reduce((acc, val) => acc + val, 0);
    }

    $: skillPointsRemaining = 9 + specialStats.intelligence - Object.values(skillPoints).reduce((acc, val) => acc + val, 0);
</script>


<h1>Skills</h1>
<p>Remaining Skill Points: {skillPointsRemaining}</p>

<div class="skill-list">
    {#each skills as skill, index}
        <div class="skill-item" key={index}>
            <div>{skill}</div>
            <input
                type="number"
                class="skill-input"
                bind:value={skillPoints[skill]}
                min="0"
                max={level < 3 ? 3 : Math.min(level, 6)}
                on:input={(e) => handleSkillPointChange(skill, e.target.value)}
            />
            <input
                type="checkbox"
                class="tag-skill-checkbox"
                bind:checked={tagSkills[skill]}
                on:change={() => toggleTagSkill(skill)}
                disabled={Object.values(tagSkills).filter(value => value === true).length >= 3 && tagSkills[skill] === false}
            />
            <span>Tag Skill</span>
        </div>
    {/each}
</div>
