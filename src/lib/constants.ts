import type { FullCharacter, SkillPrettyMap, SkillStat, SpecialGifted, SpecialStat } from './server/types.js'

export const arrays = {
    Balanced: [6,6,6,6,6,5,5],
    Focused: [8,7,6,6,5,4,4],
    Specialized: [9,8,5,5,5,4,4]
};
export const skills:SkillStat[] = [
    'Athletics', 'Barter', 'Big Guns', 'Energy Weapons', 'Explosives', 'Lockpick', 'Medicine', 'Melee Weapons', 'Pilot', 'Repair', 'Science', 'Small Guns', 'Sneak', 'Speech', 'Survival', 'Throwing', 'Unarmed'
];

export const skillPrettyMap:SkillPrettyMap = {
    'Athletics': 'athletics',
    'Barter': 'barter',
	'Big Guns': 'bigGuns',
	'Energy Weapons': 'energyWeapons',
	'Explosives': 'explosives',
	'Lockpick': 'lockpick',
	'Medicine': 'medicine',
	'Melee Weapons': 'meleeWeapons',
	'Pilot': 'pilot',
	'Repair': 'repair',
	'Science': 'science',
	'Small Guns': 'smallGuns',
	'Sneak': 'sneak',
	'Speech': 'speech',
	'Survival': 'survival',
	'Throwing': 'throwing',
	'Unarmed': 'unarmed'
}

export const special:SpecialStat[] = [
    'strength', 'perception', 'endurance', 'charisma', 'intelligence', 'agility', 'luck'
]
export const blankSpecialGifted:SpecialGifted = {
    strength: false,
    perception: false,
    endurance: false,
    charisma: false,
    intelligence: false,
    agility: false,
    luck: false
}
export const pages = ['origin','special','skills','perks','stats','equipment','review','character'];
/* not sure why this one is here...
export const SPECIAL_FIELDS = ['strength', 'perception', 'endurance', 'charisma', 'intelligence', 'agility', 'luck'] as const;
*/
export const blankCharacter: FullCharacter = {
    player: 0,
    playerName: '',
    character: 0,
    characterName: '',
    xp: 0,
    lvl: 1,
    origin: 0,
    originName: '',
    originDesc: '',
    ghoul: false,
    superMutant: false,
    robot: false,
    luckPts: 0,
    maxLuckPts: 0,
    currHP: 0,
    maxHP: 0,
    radPts: 0,
    maxRadPts: 0,
    body: {
        head: {
            active: false,
            stats: {
                hp: 0,
                inj: 0,
                phDR: 0,
                enDR: 0,
                rdDR: 0,
            },
        },
        lArm: {
            active: false,
            stats: {
                hp: 0,
                inj: 0,
                phDR: 0,
                enDR: 0,
                rdDR: 0,
            },
        },
        rArm: {
            active: false,
            stats: {
                hp: 0,
                inj: 0,
                phDR: 0,
                enDR: 0,
                rdDR: 0,
            },
        },
        lLeg: {
            active: false,
            stats: {
                hp: 0,
                inj: 0,
                phDR: 0,
                enDR: 0,
                rdDR: 0,
            },
        },
        rLeg: {
            active: false,
            stats: {
                hp: 0,
                inj: 0,
                phDR: 0,
                enDR: 0,
                rdDR: 0,
            },
        },
        torso: {
            active: false,
            stats: {
                hp: 0,
                inj: 0,
                phDR: 0,
                enDR: 0,
                rdDR: 0,
            },
        },
        optics: {
            active: false,
            stats: {
                hp: 0,
                inj: 0,
                phDR: 0,
                enDR: 0,
                rdDR: 0,
            },
        },
        arm1: {
            active: false,
            stats: {
                hp: 0,
                inj: 0,
                phDR: 0,
                enDR: 0,
                rdDR: 0,
            },
        },
        arm2: {
            active: false,
            stats: {
                hp: 0,
                inj: 0,
                phDR: 0,
                enDR: 0,
                rdDR: 0,
            },
        },
        arm3: {
            active: false,
            stats: {
                hp: 0,
                inj: 0,
                phDR: 0,
                enDR: 0,
                rdDR: 0,
            },
        },
        thruster: {
            active: false,
            stats: {
                hp: 0,
                inj: 0,
                phDR: 0,
                enDR: 0,
                rdDR: 0,
            },
        },
        wheel: {
            active: false,
            stats: {
                hp: 0,
                inj: 0,
                phDR: 0,
                enDR: 0,
                rdDR: 0,
            },
        },
    },
    poisonDR: 0,
    caps: 0,
    hunger: 0,
    thirst: 0,
    sleep: 0,
    exposure: 0,
    party: 0,
    special: {
        strength: 5,
        perception: 5,
        endurance: 5,
        charisma: 5,
        intelligence: 5,
        agility: 5,
        luck: 5,
    },
    skills: {
        athletics: {
            ranks: 0,
            tagged: false,
            total: 0,
        },
        barter: {
            ranks: 0,
            tagged: false,
            total: 0,
        },
        bigGuns: {
            ranks: 0,
            tagged: false,
            total: 0,
        },
        energyWeapons: {
            ranks: 0,
            tagged: false,
            total: 0,
        },
        explosives: {
            ranks: 0,
            tagged: false,
            total: 0,
        },
        lockpick: {
            ranks: 0,
            tagged: false,
            total: 0,
        },
        medicine: {
            ranks: 0,
            tagged: false,
            total: 0,
        },
        meleeWeapons: {
            ranks: 0,
            tagged: false,
            total: 0,
        },
        pilot: {
            ranks: 0,
            tagged: false,
            total: 0,
        },
        repair: {
            ranks: 0,
            tagged: false,
            total: 0,
        },
        science: {
            ranks: 0,
            tagged: false,
            total: 0,
        },
        smallGuns: {
            ranks: 0,
            tagged: false,
            total: 0,
        },
        sneak: {
            ranks: 0,
            tagged: false,
            total: 0,
        },
        speech: {
            ranks: 0,
            tagged: false,
            total: 0,
        },
        survival: {
            ranks: 0,
            tagged: false,
            total: 0,
        },
        throwing: {
            ranks: 0,
            tagged: false,
            total: 0,
        },
        unarmed: {
            ranks: 0,
            tagged: false,
            total: 0,
        },
    },
    perks: [],
    traits: [],
    addictions: [],
    diseases: [],
    recipes: [],
    readBooks: [],
    weapons: [],
    apparel: [],
    ammo: [],
    consumables: [],
    gear: [],
    powerArmorFrames: [],
    robotModules: [],
    miscStuff: [''],
    notes: [''],
}

