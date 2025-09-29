export type BodyPart = {
    active: boolean;
    stats: {
        hp: number;
        inj: number;
        phDR: number;
        enDR: number;
        rdDR: number;
    } | null;
}

export type SpecialStat = 'strength' | 'perception' | 'endurance' | 'charisma' | 'intelligence' | 'agility' | 'luck'

export type SpecialStats = {
    strength: number;
    perception: number;
    endurance: number;
    charisma: number;
    intelligence: number;
    agility: number;
    luck: number;
}

export type SpecialGifted = {
    strength: boolean;
    perception: boolean;
    endurance: boolean;
    charisma: boolean;
    intelligence: boolean;
    agility: boolean;
    luck: boolean;
}

export type SkillStatBlock = {
    ranks: number;
    tagged: boolean;
    total: number;
}

export type SkillStat = 'Athletics' | 'Barter' | 'Big Guns' | 'Energy Weapons' | 'Explosives' | 'Lockpick' | 'Medicine' | 'Melee Weapons' | 'Pilot' | 'Repair' | 'Science' | 'Small Guns' | 'Sneak' | 'Speech' | 'Survival' | 'Throwing' | 'Unarmed'

export type SkillPrettyMap = {
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

export type SkillStats = {
    athletics: SkillStatBlock;
    barter: SkillStatBlock;
    bigGuns: SkillStatBlock;
    energyWeapons: SkillStatBlock;
    explosives: SkillStatBlock;
    lockpick: SkillStatBlock;
    medicine: SkillStatBlock;
    meleeWeapons: SkillStatBlock;
    pilot: SkillStatBlock;
    repair: SkillStatBlock;
    science: SkillStatBlock;
    smallGuns: SkillStatBlock;
    sneak: SkillStatBlock;
    speech: SkillStatBlock;
    survival: SkillStatBlock;
    throwing: SkillStatBlock;
    unarmed: SkillStatBlock;
}

export type CharPerk = {
    perk: number;
    perkName: string;
    perkDescription: [string];
    ranks: number;
}

export type CharTrait = {
    trait: number;
    traitName: string;
    traitDescription: string;
}

export type CharRecipe = {
    item: number;
    itemName: string;
    itemType: "apparel" | "chems" | "cooking" | "pArmor" | "rArmor" | "rMods" | "weapon";
    complexity: number;
    common: number;
    uncommon: number;
    rare: number;
}

export type CharBook = {
    book: number;
    bookName: string;
    bookPerk: string;
}

export type CharWeaponMod = {
    available: boolean;
    installed: {
        mod: number;
        modName: string;
        modEffect: [string];
        modWeight: number;
        modCost: number;
    } | null;
}

export type CharWeaponMods = {
    Receiver: CharWeaponMod;
    Barrel: CharWeaponMod;
    Stock: CharWeaponMod;
    Grip: CharWeaponMod;
    Magazine: CharWeaponMod;
    Sights: CharWeaponMod;
    Muzzle: CharWeaponMod;
    Capacitors: CharWeaponMod;
    Dish: CharWeaponMod;
    Fuel: CharWeaponMod;
    Tank: CharWeaponMod;
    Nozzle: CharWeaponMod;
    Blade: CharWeaponMod;
    Blunt: CharWeaponMod;
    Frame: CharWeaponMod;
}

export type CharAmmo = {
    ammo: number;
    ammoName: string;
    quantity: number;
}

export type Legendary = {
    isLegendary: boolean;
    legendary: {
        name: string;
        effect: string;
    } | null;
}

export type CharWeapon = {
    weapon: number;
    prefix: [string];
    name: string;
    skill: string;
    targetNum: number;
    tagged: boolean;
    dmg: number;
    effects: [string];
    effectDescriptions: [string];
    type: "Physical" | "Energy" | "Physical/Energy" | "Radiation";
    rate: number;
    range: "R" | "C" | "M" | "L" | "X";
    qualities: [string];
    qualityDescriptions: [string];
    ammo: [CharAmmo];
    weight: number;
    cost: number;
    rarity: number;
    mods: CharWeaponMods;
    legendary: Legendary;
}

export type CharApparelMod = {
    available: boolean;
    installed: {
        mod: number;
        modName: string;
        modPhDR: number;
        modEnDR: number;
        modRdDR: number;
        modEffect: [string];
        modWeight: number;
        modCost: number;
    } | null;
}

export type CharApparelMods = {
    weave: CharApparelMod;
    material: CharApparelMod;
    upgrade: CharApparelMod;
    jumpsuit: CharApparelMod;
}

export type CharApparel = {
    apparel: number;
    prefix: string | null;
    name: string;
    type: "clothing" | "outfit" | "headgear" | "armor" | "robot armor";
    covers: {
        head: boolean;
        lArm: boolean;
        rArm: boolean;
        lLeg: boolean;
        rLeg: boolean;
        torso: boolean;
        optics: boolean;
        arm1: boolean;
        arm2: boolean;
        arm3: boolean;
        thruster: boolean;
        wheel: boolean;
    }
    equipped: boolean;
    phDR: number;
    enDR: number;
    rdDR: number;
    effect: [string];
    weight: number;
    cost: number;
    rarity: number;
    mods: CharApparelMods;
    legendary: Legendary;
}

export type CharConsumable = {
    consumable: number;
    consumableName: string;
    type: "Chem" | "Food" | "Beverage" | "Other" | "Publication";
    heals: number;
    effect: [string];
    rads: number;
    weight: number;
    cost: number;
    rarity: number;
    duration: "I" | "B" | "L";
    addiction: number;
    quantity: number;
}

export type CharGear = {
    gear: number;
    gearName: string;
    effect: [string];
    weight: number;
    cost: number;
    rarity: number;
    quantity: number;
}

export type CharPAMod = {
    available: boolean;
    installed: {
        mod: number;
        modName: string;
        modPhDR: number;
        modEnDR: number;
        modRdDR: number;
        modHP: number;
        modEffect: [string];
        modWeight: number;
        modCost: number;
    } | null;
}

export type CharPAMods = {
    upgrade: CharPAMod;
    system: CharPAMod;
    plating: CharPAMod;
}

export type PAPart = {
    equipped: boolean;
    part: number;
    partName: string;
    phDR: number;
    enDR: number;
    rdDR: number;
    effect: [string];
    weight: number;
    cost: number;
    currHP: number;
    maxHP: number;
    mods: CharPAMods;
}

export type CharPAFrame = {
    equipped: boolean;
    location: string;
    parts: {
        head: [PAPart];
        lArm: [PAPart];
        rArm: [PAPart];
        lLeg: [PAPart];
        rLeg: [PAPart];
        torso: [PAPart];
    }
}

export type CharRMod = {
    equipped: boolean;
    rmod: number;
    rmodName: string;
    effect: [string];
    weight: number;
    cost: number;
    rarity: number;
}

export type Addiction = {
    consumable: number;
    consumableName: string;
}
export type Disease = {
    disease: number;
    diseaseName: string;
    effect: [string];
}

export type FullCharacter = {
	[x: string]: {};
    player: number;
    playerName: string;
    character: number;
    characterName: string;
    xp: number;
    lvl: number;
    origin: number;
    originName: string;
    originDesc: string;
    ghoul: boolean;
    superMutant: 'super mutant' | 'nightkin' | false;
    robot: boolean;
    luckPts: number;
    maxLuckPts: number;
    currHP: number;
    maxHP: number;
    radPts: number;
    maxRadPts: number;
    body: {
        head: BodyPart;
        lArm: BodyPart;
        rArm: BodyPart;
        lLeg: BodyPart;
        rLeg: BodyPart;
        torso: BodyPart;
        optics: BodyPart;
        arm1: BodyPart;
        arm2: BodyPart;
        arm3: BodyPart;
        thruster: BodyPart;
        wheel: BodyPart;
    }
    poisonDR: number;
    caps: number;
    hunger: number;
    thirst: number;
    sleep: number;
    exposure: number;
    party: number;
    special: SpecialStats;
    skills: SkillStats;
    perks: [CharPerk] | [];
    traits: [CharTrait] | [];
    addictions: [Addiction] | [];
    diseases: [Disease] | [];
    recipes: [CharRecipe] | [];
    readBooks: [CharBook] | [];
    weapons: [CharWeapon] | [];
    apparel: [CharApparel] | [];
    ammo: [CharAmmo] | [];
    consumables: [CharConsumable] | [];
    gear: [CharGear] | [];
    powerArmorFrames: [CharPAFrame] | [];
    robotModules: [CharRMod] | [];
    miscStuff: [string];
    notes: [string];
}

export type Trait = {
    id: number;
    name: string;
    description: string;
};
export type OriginWithTraits = {
    id: number;
    name: string;
    description: string;
    canGhoul: boolean;
    sourcebookId: number;
    traits: Trait[];
};
export type perktype = {
    id: number;
    name: string;
    description: string;
    ranks: number;
    rankRange: number;
    levelReq: number;
    reqs: string[];
    limits: string[];
    sourcebookId: number;
}

export type BackgroundStuff = {
    caps: number;
    misc: string;
    trinket: number;
    food: number;
    forage: number;
    bev: number;
    chem: number;
    ammo: number;
    aid: number;
    odd: number;
    outcast: number;
    junk: number;
} | {}

export type Weapon = {
    ammo: number;
    cost: number;
    dam: string;
    dtype: string;
    id: number;
    name: string;
    range: string;
    rarity: number;
    rate: number;
    sourcebookId: number;
    type: number;
    wgt: number;
}

export type WeaponMod = {
    id: number;
    name: string;
    prefix: string;
    effects: string[];
    slot: number;
    wgt: number;
    cost: number;
}

export type BackgroundWeapon = {
    id: number;
    backgroundId: number;
    weaponId: number;
    modId: number | number[];
    altId: number;
    weapon: Weapon;
    mod: WeaponMod | WeaponMod[];
}

export type Ammo = {
    id: number;
    name: string;
    rarity: number;
    rollQuantity: string;
    wgt: number;
    sourcebookId: number;
}

export type BackgroundAmmo = {
    id: number;
    bgWeaponId: number;
    ammoId: number;
    quantity: string;
    ammo: Ammo;
}

export type Apparel = {
    id: number;
    name: string;
    type: number;
    dog: boolean;
    physDr: number;
    enrgDr: number;
    radsDr: number;
    eff: string[];
    wgt: number;
    cost: number;
    rarity: number;
    base_health: number;
    sourcebookId: number;
}

export type ApparelType = {
    id: number;
    name: string;
}

export type BackgroundApparel = {
    id: number;
    backgroundId: number;
    apparelId: number;
    altId: number;
    apparel: Apparel;
    covers: string[];
    type: ApparelType;
}

export type Consumable = {
    id: number;
    name: string;
    type: number;
    heals: number;
    eff: string[];
    rads: number;
    wgt: number;
    cost: number;
    rarity: number;
    duration: string;
    addiction: string;
    sourcebookId: number;
}

export type BackgroundConsumable = {
    id: number;
    backgroundId: number;
    consumableId: number;
    altId: number;
    consumable: Consumable;
}

export type Gear = {
    id: number;
    name: string;
    eff: string[];
    cost: number;
    rarity: number;
    wgt: number;
    sourcebookId: number;
}

export type BackgroundGear = {
    id: number;
    backgroundId: number;
    gearId: number;
    gear: Gear;
}

export type RobotModule = {
    id: number;
    name: string;
    eff: string[];
    wgt: number;
    cost: number;
    rarity: number;
    sourcebookId: number;
}

export type BackgroundRobotModule = {
    id: number;
    backgroundId: number;
    robotModuleId: number;
    altId: number;
    robotModule: RobotModule;
}


export type BackgroundEquipment = {
    weapons: BackgroundWeapon[];
    ammo: BackgroundAmmo[];
    apparel: BackgroundApparel[];
    consumables: BackgroundConsumable[];
    gear: BackgroundGear[];
    robotModules: BackgroundRobotModule[];
    groupWeapons: GroupWeapons;
    groupApparel: GroupApparel;
    groupConsumables: GroupConsumables;
    groupRobotModules: GroupRobotModules;
} | undefined

export type Background = {
    id: number;
    name: string;
    originId: number;
    caps: number;
    misc: string;
    trinket: number;
    food: number;
    forage: number;
    bev: number;
    chem: number;
    ammo: number;
    aid: number;
    odd: number;
    outcast: number;
    junk: number;
    sourcebookId: number;
}

export type GroupWeapons = (BackgroundWeapon | BackgroundWeapon[])[][];
export type GroupApparel = (boolean | BackgroundApparel | BackgroundApparel[] | (BackgroundApparel | BackgroundApparel[])[][])[];
export type GroupConsumables = (BackgroundConsumable | BackgroundConsumable[])[][];
export type GroupRobotModules = (BackgroundRobotModule | BackgroundRobotModule[])[][];

export type limbDr = {
    phys: number;
    enrg: number;
    rads: number;
}

export type stdDr = {
    head: limbDr;
    larm: limbDr;
    rarm: limbDr;
    body: limbDr;
    lleg: limbDr;
    rleg: limbDr;
}
export type handyDr = {
    optics: limbDr;
    arm1: limbDr;
    arm2: limbDr;
    arm3: limbDr;
    body: limbDr;
    thruster: limbDr;
}
export type securDr = {
    head: limbDr;
    larm: limbDr;
    rarm: limbDr;
    body: limbDr;
    wheel: limbDr;
}