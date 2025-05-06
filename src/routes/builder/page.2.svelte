<script>
    let charName = '';
    let level = 1;
    let xp = 0;
    let origin = 'brotherhood-initiate';
    let isGhoul = false;
    let isRobot = false;
    let isSynth = false;
    let hasDogmeat = false;
    let traits = [];
    let specialStats = {
        strength: 5,
        perception: 5,
        endurance: 5,
        charisma: 5,
        intelligence: 5,
        agility: 5,
        luck: 5
    };
    let skillStats = {
        athletics: 0,
        barter: 0,
        bigGuns: 0,
        energyWeapons: 0,
        explosives: 0,
        lockpick: 0,
        medicine: 0,
        meleeWeapons: 0,
        pilot: 0,
        repair: 0,
        science: 0,
        smallGuns: 0,
        sneak: 0,
        speech: 0,
        survival: 0,
        throwing: 0,
        unarmed: 0
    };
    let tagSkills = {
        athletics: false,
        barter: false,
        bigGuns: false,
        energyWeapons: false,
        explosives: false,
        lockpick: false,
        medicine: false,
        meleeWeapons: false,
        pilot: false,
        repair: false,
        science: false,
        smallGuns: false,
        sneak: false,
        speech: false,
        survival: false,
        throwing: false,
        unarmed: false
    };
    let perks = [];
    let background = '';
    let stats = {
        healthCurrent: 0,
        healthMax: 0,
        luckPoints: 0,
        drFull: {
            physical: 0,
            energy: 0,
            poison: 0,
            radiation: 0
        },
        drHead: {
            physical: 0,
            energy: 0,
            poison: 0,
            radiation: 0
        },
        drTorso: {
            physical: 0,
            energy: 0,
            poison: 0,
            radiation: 0
        },
        drLArm: {
            physical: 0,
            energy: 0,
            poison: 0,
            radiation: 0
        },
        drRArm: {
            physical: 0,
            energy: 0,
            poison: 0,
            radiation: 0
        },
        drLLeg: {
            physical: 0,
            energy: 0,
            poison: 0,
            radiation: 0
        },
        drRLeg: {
            physical: 0,
            energy: 0,
            poison: 0,
            radiation: 0
        },
        defense: 1,
        initiative: 0,
        meleeDamage: 0,
        carryWeight: 150,
        carryingWeight: 0
    }
    let weapons = [];
    let weaponMods = [];
    let apparel = [];
    let armorMods = [];
    let robotModules = [];
    let ammo = [];
    let consumables = [];
    let gear = [];
    let junk = {
        common: 0,
        uncommon: 0,
        rare: 0
    };
    let caps = [];
    let fatigue = {
        total: 0,
        hunger: 0,
        thirst: 0,
        sleep: 0,
        exposure: 0,
        disease: []
    }



</script>