import { db } from '$lib/server/db/index.js';
import { characters } from '$lib/server/db/schema.js';

await db.insert(characters).values([
    {
        name: "ally",
        level: 1,
        xp: 0,
        origin: "vault-dweller",
        isGhoul: false,
        isRobot: false,
        isSynth: false,
        hasDogmeat: false,
        traits: [
            "vault-kid"
        ],
        specialStats: {
            strength: 5,
            perception: 5,
            endurance: 6,
            charisma: 5,
            intelligence: 8,
            agility: 6,
            luck: 5
        },
        skillStats: {
            athletics: 3,
            barter: 2,
            bigGuns: 0,
            energyWeapons: 0,
            explosives: 0,
            lockpick: 0,
            medicine: 3,
            meleeWeapons: 1,
            pilot: 1,
            repair: 2,
            science: 1,
            smallGuns: 3,
            sneak: 3,
            speech: 2,
            survival: 3,
            throwing: 1,
            unarmed: 0
        },
        tagSkills: {
            athletics: true,
            barter: false,
            bigGuns: false,
            energyWeapons: false,
            explosives: false,
            lockpick: false,
            medicine: true,
            meleeWeapons: false,
            pilot: false,
            repair: true,
            science: false,
            smallGuns: false,
            sneak: false,
            speech: false,
            survival: true,
            throwing: false,
            unarmed: false
        },
        perks: [
            "hunter"
        ],
        stats: {
            healthCurrent: 11,
            healthMax: 11,
            luckPoints: 5,
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
                energy: 1,
                poison: 0,
                radiation: 2
            },
            drLArm: {
                physical: 0,
                energy: 1,
                poison: 0,
                radiation: 2
            },
            drRArm: {
                physical: 0,
                energy: 1,
                poison: 0,
                radiation: 2
            },
            drLLeg: {
                physical: 0,
                energy: 1,
                poison: 0,
                radiation: 2
            },
            drRLeg: {
                physical: 0,
                energy: 1,
                poison: 0,
                radiation: 2
            },
            defense: 1,
            initiative: 11,
            meleeDamage: 0,
            carryWeight: 200
        },
        background: "resident",
        weapons: [
            "switchblade",
            "10mm-pistol"
        ],
        weaponMods: [],
        apparel: [
            {
                "vault-jumpsuit": true
            },
            {
                "casual-clothing": false
            }
        ],
        armorMods: [],
        robotModules: [],
        ammo: [
            {
                "10mm": 11
            }
        ],
        consumables: [
            {
                "canteen-purified-water": 1
            },
            {
                "purified-water": 2
            },
            {
                "iguana-stick": 1
            },
            {
                "stimpak": 3
            },
            {
                "first-aid": 1
            },
            {
                "buffout": 1
            }
        ],
        gear: [
            {
                "pip-boy": 1
            },
            {
                "multi-tool": 1
            }
        ],
        junk: {
            common: 0,
            uncommon: 0,
            rare: 0
        },
        caps: 10,
        fatigue: {
            total: 0,
            hunger: 0,
            thirst: 0,
            sleep: 0,
            exposure: 0,
            disease: []
        }
    },
    {
        name: "josh",
        level: 1,
        xp: 0,
        origin: "vault-dweller",
        isGhoul: false,
        isRobot: false,
        isSynth: false,
        hasDogmeat: false,
        traits: [
            "vault-kid"
        ],
        specialStats: {
            strength: 4,
            perception: 5,
            endurance: 5,
            charisma: 6,
            intelligence: 8,
            agility: 5,
            luck: 7
        },
        skillStats: {
            athletics: 2,
            barter: 1,
            bigGuns: 0,
            energyWeapons: 0,
            explosives: 1,
            lockpick: 1,
            medicine: 2,
            meleeWeapons: 1,
            pilot: 0,
            repair: 3,
            science: 3,
            smallGuns: 2,
            sneak: 2,
            speech: 3,
            survival: 3,
            throwing: 1,
            unarmed: 0
        },
        tagSkills: {
            athletics: false,
            barter: false,
            bigGuns: false,
            energyWeapons: false,
            explosives: false,
            lockpick: false,
            medicine: false,
            meleeWeapons: false,
            pilot: false,
            repair: true,
            science: true,
            smallGuns: false,
            sneak: false,
            speech: true,
            survival: true,
            throwing: false,
            unarmed: false
        },
        perks: [
            "hacker"
        ],
        stats: {
            healthCurrent: 12,
            healthMax: 12,
            luckPoints: 7,
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
                energy: 1,
                poison: 0,
                radiation: 2
            },
            drLArm: {
                physical: 0,
                energy: 1,
                poison: 0,
                radiation: 2
            },
            drRArm: {
                physical: 0,
                energy: 1,
                poison: 0,
                radiation: 2
            },
            drLLeg: {
                physical: 0,
                energy: 1,
                poison: 0,
                radiation: 2
            },
            drRLeg: {
                physical: 0,
                energy: 1,
                poison: 0,
                radiation: 2
            },
            defense: 1,
            initiative: 10,
            meleeDamage: 0,
            carryWeight: 190
        },
        background: "resident",
        weapons: [
            "switchblade",
            "10mm-pistol"
        ],
        weaponMods: [],
        apparel: [
            {
                "vault-jumpsuit": true
            },
            {
                "lab-coat": true
            },
            {
                "formal-hat": false
            },
            {
                "formal-clothing": false
            }
        ],
        armorMods: [],
        robotModules: [],
        ammo: [
            {
                "10mm": 11
            }
        ],
        consumables: [
            {
                "canteen-purified-water": 1
            },
            {
                "purified-water": 2
            },
            {
                "iguana-stick": 1
            },
            {
                "stimpak": 2
            },
            {
                "mentats": 1
            }
        ],
        gear: [
            {
                "pip-boy": 1
            },
            {
                "multi-tool": 1
            }
        ],
        junk: {
            common: 0,
            uncommon: 0,
            rare: 0
        },
        caps: 10,
        fatigue: {
            total: 0,
            hunger: 0,
            thirst: 0,
            sleep: 0,
            exposure: 0,
            disease: []
        }
    }
]);
console.log('seeded characters');
process.exit();