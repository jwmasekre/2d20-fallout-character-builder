# 2d20-fallout-character-builder

a webapp for building and maintaining characters for modiphius' 2d20 fallout ttrpg


### work notes

```sh
npx sv create 2d20-fallout-character-builder
```

```ascii
┌  Welcome to the Svelte CLI! (v0.8.1)
│
◇  Which template would you like?
│  Svelte library
│
◇  Add TYPE checking with TypeScript?
│  Yes, using TypeScript syntax
│
◆  Project created
│
◇  What would you like to add to your project? (use arrow keys / space bar)
│  prettier, eslint, tailwindcss, sveltekit-adapter, drizzle, mdsvex, storybook
│
◇  tailwindcss: Which plugins would you like to add?
│  typography, forms
│
◇  sveltekit-adapter: Which SvelteKit adapter would you like to use?
│  auto
│
◇  drizzle: Which database would you like to use?
│  PostgreSQL
│
◇  drizzle: Which PostgreSQL client would you like to use?
│  Postgres.JS
│
◇  drizzle: Do you want to run the database locally with docker-compose?
│  Yes
│
◇  storybook: Running external command (npx storybook@latest init --skip-install --no-dev)
╭───────────────────────────────────────────────────────╮
│                                                       │
│   Adding Storybook version 8.6.12 to your project..   │
│                                                       │
╰───────────────────────────────────────────────────────╯
✔ What do you want to use Storybook for? › Documentation: MDX, auto-generated component docs, Testing: Fast browser-based component tests, watch mode
```

...

```ascii
│                                                                              │
│   Storybook was successfully installed in your project! 🎉                   │
│   Additional features: Documentation, Testing                                │
│                                                                              │
│   To run Storybook manually, run npm run storybook. CTRL+C to stop.          │
│                                                                              │
│   Wanna know more about Storybook? Check out https://storybook.js.org/       │
│   Having trouble or want to chat? Join us at https://discord.gg/storybook/   │
│                                                                              │
╰──────────────────────────────────────────────────────────────────────────────╯
│
◆  Successfully setup add-ons
│
◇  Which package manager do you want to install dependencies with?
│  npm
│
◆  Successfully installed dependencies
│
◇  Successfully formatted modified files
│
◇  Project next steps ─────────────────────────────────────────────────────╮
│                                                                          │
│  1: cd ../2d20-fallout-character-builder                                 │
│  2: git init && git add -A && git commit -m "Initial commit" (optional)  │
│  3: npm run dev -- --open                                                │
│                                                                          │
│  To close the dev server, hit Ctrl-C                                     │
│                                                                          │
│  Stuck? Visit us at https://svelte.dev/chat                              │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────╯
│
◇  Add-on next steps ──────────────────────────────────────────────────╮
│                                                                      │
│  drizzle:                                                            │
│  - You will need to set DATABASE_URL in your production environment  │
│  - Run npm run db:start to start the docker container                │
│  - Run npm run db:push to update your database schema                │
│                                                                      │
├──────────────────────────────────────────────────────────────────────╯
│
└  You're all set!
```

```sh
cd ../2d20-fallout-character-builder
npm run dev -- --open
```

```sh
sudo -u postgres -i
createdb 2d20fallout
psql 2d20fallout
```

```sql
CREATE ROLE svelte WITH LOGIN PASSWORD 'thisisonlyatest';
CREATE SCHEMA content;
SET search_path TO content;
CREATE TABLE origin_src (
    id serial primary key not null,
    oname text,
    pname text,
    odesc text,
    src text,
    traits json
);
CREATE TABLE perk_src (
    id serial primary key not null,
    pname text,
    pdesc text,
    src text,
    minlvl smallint,
    ranks smallint,
    lvlgap smallint,
    reqs text[],
    limits text[]
);
CREATE TABLE weapon_src (
    id serial primary key not null,
    wname text,
    wtype text,
    dam smallint,
    effects text[],
    dtype text,
    rate smallint,
    rng char(1),
    quals text[],
    atype int,
    mods int[],
    wgt smallint,
    cost smallint,
    rarity smallint
);
CREATE TABLE wmod_src (
    id serial primary key not null,
    mname text,
    prefix text,
    wtype text[],
    component text,
    effects text[],
    wgt smallint,
    cost smallint,
    req text[]
);
CREATE TABLE apparel_src (
    id serial primary key not null,
    aname text,
    atype text,
    pdr smallint,
    edr smallint,
    rdr smallint,
    ahealth smallint,
    rcarryweight smallint,
    reffects text,
    cover text[],
    wgt smallint,
    cost smallint,
    rarity smallint
);
CREATE TABLE amod_src (
    id serial primary key not null,
    mname text,
    atype text,
    pdr smallint,
    edr smallint,
    rdr smallint,
    effects text,
    wgt smallint,
    cost smallint,
    req text[]
);
CREATE TABLE rmod_src (
    id serial primary key not null,
    rname text,
    effects text,
    wgt smallint,
    cost smallint,
    rarity smallint,
    req text[]
);
CREATE TABLE ammo_src (
    id serial primary key not null,
    aname text,
    quant text,
    wgt smallint,
    cost smallint,
    rarity smallint,
    atype text[]
);
CREATE TABLE consumable_src (
    id serial primary key not null,
    cname text,
    ctype text,
    health smallint,
    effects text,
    duration text,
    addictive text,
    addiction text,
    radiation smallint,
    wgt smallint,
    cost smallint,
    rarity smallint
);
CREATE TABLE gear_src (
    id serial primary key not null,
    gname text,
    effects text,
    wgt smallint,
    cost smallint,
    rarity smallint
);
CREATE TYPE specialStats AS (
    strength smallint,
    perception smallint,
    endurance smallint,
    charisma smallint,
    intelligence smallint,
    agility smallint,
    luck smallint
);
CREATE TYPE skillStats AS (
    athletics smallint,
    barter smallint,
    bigGuns smallint,
    energyWeapons smallint,
    explosives smallint,
    lockpick smallint,
    medicine smallint,
    meleeWeapons smallint,
    pilot smallint,
    repair smallint,
    science smallint,
    smallGuns smallint,
    sneak smallint,
    speech smallint,
    survival smallint,
    throwing smallint,
    unarmed smallint
);
CREATE TYPE skillTags AS (
    athletics boolean,
    barter boolean,
    bigGuns boolean,
    energyWeapons boolean,
    explosives boolean,
    lockpick boolean,
    medicine boolean,
    meleeWeapons boolean,
    pilot boolean,
    repair boolean,
    science boolean,
    smallGuns boolean,
    sneak boolean,
    speech boolean,
    survival boolean,
    throwing boolean,
    unarmed boolean
);
CREATE TYPE dr AS (
    physical smallint,
    energy smallint,
    poison smallint,
    radiation smallint
);
CREATE TYPE statBlock AS (
    healthCurrent smallint,
    healthMax smallint,
    luckPoints smallint,
    drFull dr,
    drHead dr,
    drTorso dr,
    drLArm dr,
    drRArm dr,
    drLLeg dr,
    drRLeg dr,
    defense smallint,
    initiative smallint,
    meleeDamage smallint,
    carryWeight smallint,
    carryingWeight smallint
);
CREATE TYPE weapon AS (
    baseWeapon int,
    attachedMods int[],
    equipped boolean
);
CREATE TYPE weaponMod AS (
    baseMod int,
    quantity smallint
);
CREATE TYPE apparel AS (
    baseApparel int,
    attachedMods int[],
    equipped boolean
);
CREATE TYPE apparelMod AS (
    baseMod int,
    quantity smallint
);
CREATE TYPE robotModule AS (
    baseModule int,
    equipped boolean
);
CREATE TYPE ammo AS (
    baseAmmo int,
    quantity smallint
);
CREATE TYPE consumable AS (
    baseConsumable int,
    quantity smallint
);
CREATE TYPE gear AS (
    baseGear int,
    quantity smallint
);
CREATE TYPE junk AS (
    common smallint,
    uncommon smallint,
    rare smallint
);
CREATE TYPE fatigue AS (
    total smallint,
    hunger smallint,
    thirst smallint,
    sleep smallint,
    exposure smallint,
    disease text[]
);
CREATE TABLE players (
    id serial primary key not null,
    pname text unique not null
);
CREATE TABLE characters (
    id serial primary key not null,
    charname text,
    player int references players not null,
    caps int,
    lvl smallint,
    xp int,
    origin int references origin_src(id),
    ghoul boolean,
    robot boolean,
    synth boolean,
    dog boolean,
    traits text[],
    special specialStats,
    skill skillStats,
    tag skillTags,
    perks int[],
    stat statBlock,
    weapons weapon[],
    wmods weaponMod[],
    apparel apparel[],
    amods apparelMod[],
    rmods robotModule[],
    ammo ammo[],
    consumables consumable[],
    gear gear[],
    junk junk[],
    fatigue fatigue
);
GRANT INSERT ON players TO svelte;
GRANT UPDATE ON characters TO svelte;
INSERT INTO players (pname) VALUES ('josh');
INSERT INTO origin_src (oname,pname,odesc,src,traits) VALUES ('brotherhood-initiate','Brotherhood of Steel Initiate','The Brotherhood of Steel’s primary goals are the recovery and preservation of old-world tech to keep it from the wrong hands. Different chapters have different ideas on how to accomplish these goals.\n\nYou are an initiate, learning the ways of your chapter and of the wasteland.','Core','{"name": "The Chain that Binds","description": "You gain an additional Tag skill (must be Energy Weapons, Science, or Repair). You must carry out the orders of your immediate supervisors and are responsible for your subordinates.\n\nFailure to comply will result in expulsion and reclamation of gear."}'),('ghoul','Ghoul','Exposure to background radiation has mutated you into a rotting, living corpse. You no longer age, and are healed by radiation. You may be pre-war, or recently converted.\n\nYou’re civilized, meaning you haven’t turned feral (yet).','Core','{"name": "Necrotic Post-Human","description": "You’re healed by Radiation damage (1HP/3Rad, reroll heal check when resting in irradiated locations). Survival becomes a Tag skill. You’re sterile, and will face discrimination from smoothskins."}'),('super-mutant','Super Mutant','You’ve been forced to mutate via exposure to the Forced Evolutionary Virus (FEV). Mutation typically results in significantly increased strength and endurance, and significantly decreased charisma and intelligence.\n\nMost Super Mutants are openly hostile towards all others, so don’t expect warm welcomes.','Core','{"name": "Forced Evolution","description": "Your Strength and Endurance base and maximum are increased by +2. Your Intelligence and Charisma are capped at 6. You cannot have more than 4 ranks in any skill. You’re immune to Poison and Radiation. You’re sterile, and will face discrimination from non-Super Mutants."}'),('mister-handy','Mister Handy','You’re a three-armed, three-eyed, domestic robot with a thruster, typically programmed to be a butler. Your code enables self-determination.','Core','{"name": "Mister Handy Robot","description": "You have 360° vision and chemical sensors, reducing difficulty of perception tests that use sight or smell by 1. You’re immune to Poison and Radiation. You cannot use chems or benefit from food, drink, or rest. You’re unaffected by difficult terrain or obstacles. Your carry weight is 150lbs, and can only be increased with armor mods. You can only heal via repairs. You cannot Lockpick, Repair, Throw, make unarmed attacks, or manipulate objects without a Pincer arm attachment. Weapon arm attachments come with 20 rounds of ammunition for the weapon."}'),('survivor','Survivor','You and others like you have survived the apocalypse, and not under the rule of any organization.','Core','{"name": "Versitile","description": "Choose 2, or 1 and a perk:","traits": {"Educated": "You have +1 tag skill, but failing a non-tagged skill gives GM 1 AP.","Fast Shot": "If you take a second major action to make a ranged attack, it only costs 1 AP. You cannot Aim","Gifted": "Increase 2 SPECIAL by 1 each. Your maximum Luck points is LCK minus 1.","Heavy Handed": "Melee damage is +1CD. Melee and Un-armed suffer complications at 19+.","Small Frame": "You may reroll 1d20 on AGI that rely on balance/coordination. Carry weight is 150+(5*STR)lbs.","Feat": "Take an extra feat when selecting feats."}}'),('vault-dweller','Vault Dweller','Your predecessors survived the bombs by tucking away into underground vaults. You’ve been physically sheltered, but the experiments of the vault have left you psychologically impacted.\n\nIf ghoul, take ghoul trait instead.','Core','{"name": "Vault Kid","description": "Difficulty of Endurance checks to resist disease are minus 1. You get +1 Tag skill. Work with GM to determine a psychological compli-cation. Overcoming this complica-tion restores one LCK.","canGhoul": true}'),('minuteman','Commonwealth Minuteman','You’re a survivor who joined a group dedicated to protecting settlements at a minute’s notice. You’re one of the last, after the Quincy Massacre.','Settler','{"name": "United We Stand","description": "You gain Energy Weapons or Small Guns as a Tag skill. Your DR is +1 in cover, and you gain +1CD while outnumbered. Your settlements gain traders every 5 days and have a base Defense resource of 4."}'),('ncr','New California Republic','description": "You’re a citizen of one of the first nations to emerge from the war. Your upbringing in relative civilization grants you a unique perspective.','Settler','{"name": "Raised in the West","description": "Choose 2, or 1 and a perk:","traits": {"Good Natured": "Tag 2 of: Speech, Medicine, Repair, Science, Barter. Maximum of all skills not listed is 4.","Grunt": "+1CD with SMGs, combat/assault rifles, frag grenades, and combat knives. Complication range of big guns or energy weapons is +2.","Home on the Range": "Resting by campfire 6+ hours decreases difficulty to recover from injuries by 1. You cannot gain Well Rested bonus.","Trigger Discipline": "Reroll 1d20 on small guns or energy weapons checks. Reduce their fire rate by 1.","Brahmin Baron": "Brahmin feed troughs provide upkeep for 3 brahmin. Tend Crops adds +1CD brahmin milk per feed trough."},"alternates": ["survivor"],"canGhoul": true}'),('protectron','Protectron','You’re a cheap, bipedal work drone. You speak in a harsh, robotic monotone, and your initial programming does not allow for self-determination, though bugs and workarounds exist.','Settler','{"name": "Protect or Destroy","description": "Once per scene, reroll to overcome an environmental hazard. You’re immune to Poison and Radiation. You cannot benefit from chems/food/drink/rest. You can only heal via repairs. You can only have two robot mods installed at once. When making tests related to your model’s purpose, first d20 costs 0AP. Your carry weight is 225lbs and can only be increased with armor mods"}'),('robobrain','Robobrain','You’re the result of pre-war experiments to create highly-capable, obedient Soldiers. Your central processor is a human brain, wiped of its previous memories, and intended to be devoid of personality and emotion. You move on tracks, with two clawed arms and a built-in mesmetron.','Settler','{"name": "Robobrain Robot","description": "Your visual sensors can detect infrared, ignoring darkness for Perception tests. You’re immune to Poison and Radiation. You can use your mesmetron to make ranged attacks. You cannot benefit from chems/food/drink/rest. You can only heal via repairs. Your carry weight is 150lbs and can only be increased with armor mods."}'),('securitron','Securitron','You’re a private security robot designed by Robert House to protect New Vegas. You may have a custom personality, usually based on pre-war pop-culture references. You travel on a single wheel, and start with the Mk I operating system.','Settler','{"name": "Mk I Securitron","description": "You’re immune to Poison and Radiation. You cannot benefit from chems/food/drink/rest. You can only heal via repairs. You move on a single tire; difficulty on tests to remain upright or balance is increased by 1. You have opposable claws on your arms and rudimentary weapons. Your shoulder-mounted missile launchers and grenade launcher are locked behind the MkII OS. Your carry weight is 150lbs and can only be increased with armor mods."}'),('synth','Generation 3 Synth','You’re a synthetic humanoid, nearly indistinguishable from humans aside from a chip that contains your programming. You were created by the Institute for unknown reasons, and may not know you are a synth.','Atom','{"name": "More than Human","description": "You gain +1 Tag skill. You do not suffer starvation or dehydration. You do not need sleep, and can perform minor activities during rest. You are immune to Poison, Radiation, and disease. You do not age.\n\nYou have a recall code.\n\nThe difficulty of CHA tests made by you or allies against those that know you’re a synth and are usympathetic is +2. Complications either start combat or decrease settlement reputation by 1."}'),('child-of-atom','Child of Atom','You worship radiation as a member of the Church of Atom. Your deliberate exposure leads to unique abilities.','Atom','{"name": "Rad Sponge","description": "Your base Rad resistance is 1. Once per scene, you can take Radiation in someone Close’s stead. When taking Radiation (min 0), gain 1 Radiation Point (RP) (max 5). Spend RP to deal +2CD Radiation. Lose 1 RP when sleeping."}'),('assaultron','Assaultron','You’re designed for war. Fast, durable, and equipped with a powerful, deadly head-mounted laser. Humanoid, but more agile than a Protectron.','Wanderer','{"name": "Designed for the Frontline","description": "Your limbs give you a +1CD to unarmed attacks in addition to STR bonuses. You can attack with claws or the built-in head laser. You can overload your core and self-destruct (this is not repairable). You’re immune to Poison and Radiation. You cannot benefit from chems/food/drink/rest. You can only heal via repairs. Your carry weight is 150lbs and can only be increased with armor mods."}'),('brotherhood-outcast','Brotherhood of Steel Outcast','You’ve rejected the BoS for reasons that only you truly know. You agree with the mission (or parts of it), but dislike the execution. In some ways, you’re maintaining your version of the BoS’s legacy.','Wanderer','{"name": "The Chain that Breaks","description": "You gain an additional Tag skill (must be Energy Weapons, Science, or Repair). You gain +1d20 junk, and can spend 1AP 3x for +1 uncom-mon material. You can make 1 addi-tional roll on loot tables without spending AP."}'),('nightkin','Nightkin','You’re a Super Mutant that retained your intelligence in the FEV process. The Master used you as top agents, and over time you developed an addiction to Stealth Boys. You likely suffer from schizophrenia, scopophobia, multiple personality disorder, or another psychological break.','Wanderer','{"name": "Stealth Boy Addict","description": "Your Strength and Endurance base and maximum are increased by +2. Your Intelligence and Charisma are capped at 8. You cannot have more than 4 ranks in any skill. You’re immune to Poison and Radiation. You’re prone to Stealth Boy addic-tion. You’re sterile, and will face discrimination from non-Super Mutants."}'),('tribal','Tribal','You grew up outside civilization but within the folds of your tribe.','Wanderer','{"name": "Regressed","description": "Choose 2, or 1 and a perk:","traits": {"Mother Wasteland": "Spend 1 Luck to gain cryptic/mystical insight (as if 3 AP spent to Obtain Information). Complications make pre-war artifacts harder to understand.","Nomad": "Reroll 1d20 on Survival to travel, setup camp, and forage. Ignore the first complication on these tests. Barter and Speech have +1 difficulty when dealing with settlers. Cannot Tag Science.","Rite of Passage": "Roll 1CD on first Luck use in each scene; effect negates Luck spend. Spend 1 AP to assist any PC that has not gone through your rite of passage.","Tools of the Old World": "Use Survival instead of Repair or Science to repair or use pre-war tech. Complication range involving pre-war tech is increased by 2.","The Chosen One": "The first d20 purchased for tests relating to your tribe’s quest is free, and you can auto-succeed at a cost. GM gets +2 AP when your quest comes up."},"alternates": ["survivor", "ncr"],"canGhoul": true}');
INSERT INTO perk_src (pname,pdesc,src,minlvl,ranks,lvlgap,reqs,limits) VALUES ('Action Boy/Girl','Additional major action does not increase difficulty','Core','1','1','1','{}','{}'),('Adamantium Skeleton','Damage required for crit +1','Core','1','3','3','{"endurance: 7"}','{}'),('Adrenaline Rush','If HP<max, STR=10 for skills/melee','Core','1','1','1','{"strength: 7"}','{}'),('Animal Friend','1: Mammals, Lizards and Insects roll 1CD on attack; non-effect means no attack. 2: CHA+Survival(2) as major action to befriend non-Mighty/Legendary','Core','1','2','5','{"charisma: 6"}','{}'),('Aquaboy/Aquagirl','1: No more rad damage from swimming and double held breath 2: +2 difficulty to detect while underwater','Core','1','2','3','{"endurance: 5"}','{}'),('Armorer','Unlock the equivalent rank of mods.','Core','1','4','4','{"strength: 5","intelligence: 6"}','{}'),('Awareness','Aim at close range adds +1 Piercing','Core','1','1','1','{"perception: 7"}','{}'),('Barbarian','Your DR increases with Melee Damage (STR 7-8=+1, 9-10=+2, 11+=+3)','Core','4','1','1','{"strength: 7"}','{}'),('Basher','Gun bash gains Vicious','Core','1','1','1','{"strength: 6"}','{}'),('Better Criticals','When you damage, spend Luck to crit','Core','1','1','1','{"luck: 9"}','{}'),('Big Leagues','Two-handed melee gains Vicious','Core','1','1','1','{"strength: 8"}','{}'),('Black Widow/Lady Killer','Pick a gender. Against that gender, reroll 1d20 on CHA and +1CD damage.','Core','1','1','1','{"charisma: 6"}','{}'),('Blacksmith','Unlock the equivalent rank of mods.','Core','2','3','4','{"strength: 6"}','{}'),('Blitz','1: Reroll 1d20 on attack when close in and melee in one turn. 2: +1CD on that attack.','Core','1','2','3','{"agility: 9"}','{}'),('Bloody Mess','Roll 1CD when crit; effect=+1 crit.','Core','1','1','1','{"luck: 6"}','{}'),('Can Do!','Find 1 more food while scavenging.','Core','1','1','1','{"luck: 5"}','{}'),('Cap Collector','Buy/sell prices 10% more favorable.','Core','1','1','1','{"charisma: 5"}','{}'),('Cautious Nature','Reroll 1d20 when buying more d20s with AP.','Core','1','1','1','{"perception: 7"}','{"no Daring Nature perk"}'),('Center Mass','Choosing torso does not raise difficulty. Reroll 1d20.','Core','1','1','1','{"agility: 7"}','{}'),('Chem Resistant','1: -1CD to determine addiction. 2: Cannot become addicted to chems.','Core','1','2','4','{"endurance: 7"}','{}'),('Chemist','Chems you make last twice as long. Unlocks chem recipes.','Core','1','1','1','{"intelligence: 7"}','{}'),('Commando','+1CD/rank to fire rate 3+ weapon.','Core','2','2','3','{"agility: 8"}','{}'),('Comprehension','Roll 1CD to extend magazine bonus.','Core','1','1','1','{"intelligence: 6"}','{}'),('Concentrated Fire','Reroll 3CD when you spend ammo to increase damage','Core','1','1','1','{"perception: 8","agility: 6"}','{}'),('Daring Nature','Reroll 1d20 when buying more d20s with GM AP','Core','1','1','1','{"luck: 7"}','{"no Cautious Nature perk"}'),('Demolition Expert','Blast weapons gain Vicious. Unlocks explosives recipes.','Core','1','1','1','{"perception: 6","luck: 6"}','{}'),('Dodger','1: Defend difficulty -1. 2: -1AP cost to increase defense.','Core','4','2','6','{"agility: 6"}','{}'),('Dogmeat','You have a pet dog.','Core','1','1','1','{"charisma: 5"}','{}'),('Entomologist','+1 Piercing against Insects.','Core','1','1','1','{"intelligence: 7"}','{}'),('Fast Metabolism','Non-rest healing +1/rank','Core','1','3','3','{"endurance: 6"}','{"robot"}'),('Faster Healing','First d20 END+Survival to heal self is free (maximum still 5d20).','Core','1','1','1','{"endurance: 6"}','{"robot"}'),('Finesse','Reroll all CD once/combat for free','Core','1','1','1','{"agility: 9"}','{}'),('Fortune Finder','+3CDc while looting; +6CDc; +10CDc','Core','2','3','4','{"luck: 5"}','{}'),('Ghost','First d20 AGI+Sneak in dark is free (maximum still 5d20).','Core','1','1','1','{"perception: 5","agility: 6"}','{}'),('Grim Reaper’s Sprint','Roll 1CD when you kill an enemy. Add 2AP on an effect.','Core','1','1','1','{"luck: 8"}','{}'),('Gun Fu','On ranged hit, spend (Rank)AP and (Rank)Ammo to hit (Rank) targets within close range of the first target. Each takes same damage as first.','Core','1','3','5','{"agility: 10"}','{}'),('Gun Nut','Unlock the equivalent rank of mods.','Core','2','4','4','{"intelligence: 6"}','{}'),('Gunslinger','+(Rank)CD with 1H ranged fire rate 2 or less. Reroll hit location.','Core','2','2','4','{"agility: 7"}','{}'),('Hacker','-1 Difficulty to hack.','Core','1','1','1','{"intelligence: 8"}','{}'),('Healer','+(Rank) healing with First Aid.','Core','1','3','5','{"intelligence: 7"}','{}'),('Heave Ho!','Spend 1AP to increase throw range.','Core','1','1','1','{"strength: 8"}','{}'),('Hunter','Vicious against Mutated Mammals, Lizards, and Insects.','Core','1','1','1','{"endurance: 6"}','{}'),('Infiltrator','Reroll 1d20 on lockpick.','Core','1','1','1','{"perception: 8"}','{}'),('Inspirational','Max group AP +1.','Core','1','1','1','{"charisma: 8"}','{}'),('Intense Training','Increase any SPECIAL by 1.','Core','2','10','2','{}','{}'),('Iron Fist','1: +1CD unarmed damage. 2: Unarmed gains Vicious.','Core','1','2','5','{"strength: 6"}','{}'),('Junktown Jerky Vendor','CHA+Barter buy/sell difficulty -1','Core','1','1','1','{"charisma: 8"}','{}'),('Jury Rigging','Repair without components. Break on next complication (range +1).','Core','1','1','1','{}','{}'),('Laser Commander','+(Rank)CD with energy weapons.','Core','2','2','4','{"perception: 8"}','{}'),('Lead Belly','1: Reroll CD to determine rad damage from food or drink. 2: Immune to food/drink rad damage.','Core','1','2','4','{"endurance: 6"}','{}'),('Life Giver','Max Health +(END)','Core','5','5','5','{}','{}'),('Light Step','Spend AP to ignore complications for AGI tests. Reroll 1d20 on AGI+ Athletics to avoid floor traps.','Core','1','1','1','{}','{}'),('Master Thief','Difficulty to detect pickpocket +1.','Core','1','1','1','{"perception: 8","agility: 9"}','{}'),('Medic','Reroll 1d20 First Aid to treat Inj.','Core','1','1','1','{"intelligence: 8"}','{}'),('Meltdown','Kills with energy weapons cause the target to explode. Roll (Damage Rating/2)CD, (effect) creatures in close range take (total damage).','Core','1','1','1','{"perception: 10"}','{}'),('Mister Sandman','+2CD on sneak attack with silencer.','Core','1','1','1','{"agility: 9"}','{}'),('Moving Target','Sprint = +1 Defense','Core','1','1','1','{"agility: 6"}','{}'),('Mysterious Stranger','For 1 Luck Mysterious Stranger may show up during combat (refunded).','Core','1','1','1','{"luck: 7"}','{}'),('Nerd Rage!','When health<max/4, +(Rank) physical DR, energy DR, and damage.','Core','2','3','5','{"intelligence: 8"}','{}'),('Night Person','-1 difficulties due to darkness.','Core','1','1','1','{"perception: 7"}','{}'),('Ninja','Melee/Unarmed sneak attacks +2CD.','Core','1','1','1','{"agility: 8"}','{}'),('Nuclear Physicist','Rad weapons inflict +1 Rad/effect','Core','1','1','1','{"intelligence: 9"}','{}'),('Pain Train','1: Charge with Power Armor (or as a Super Mutant). Move into reach within Medium range, STR+Athletics(2) unarmed damage+prone. 2: +1CD and Stun.','Core','1','2','5','{"strength: 9","endurance: 7"}','{}'),('Paralyzing Palm','Stun when aiming unarmed attack.','Core','1','1','1','{"strength: 8"}','{}'),('Party Boy/Girl','Cannot become addicted to alcohol, and heal +2HP drinking alcohol.','Core','1','1','1','{"endurance: 6","charisma: 7"}','{}'),('Pathfinder','PER+Survival to halve travel time.','Core','1','1','1','{"perception: 6","endurance: 6"}','{}'),('Pharma Farma','Find 1 more chem while scavenging.','Core','1','1','1','{"luck: 6"}','{}'),('Pickpocket','1: Ignore first complication from AGI+Sneak to pick or plant. 2: Reroll 1d20 when picking. 3: Difficulty to pick -1.','Core','1','3','3','{"perception: 8","agility: 8"}','{}'),('Piercing Strike','Unarmed/Bladed attacks +1 Piercing.','Core','1','1','1','{"strength: 7"}','{}'),('Pyromaniac','Fire damage +(Rank)CD.','Core','2','3','4','{"endurance: 6"}','{}'),('Quick Draw','Draw weapon/item without action.','Core','1','1','1','{"agility: 6"}','{}'),('Quick Hands','2AP to double fire rate.','Core','1','1','1','{"agility: 8"}','{}'),('Rad Resistance','Rad DR +(Rank).','Core','1','2','4','{"endurance: 8"}','{}'),('Refractor','Energy DR +(Rank).','Core','1','2','4','{"perception: 6","luck: 7"}','{}'),('Ricochet','Spend Luck to send complication shot back at enemy.','Core','5','1','0','{"luck: 10"}','{}'),('Rifleman','+(Rank)CD with 2H ranged fire rate 2 or less. At 2nd Rank, +1 Piercing.','Core','2','2','4','{"agility: 7"}','{}'),('Robotics Expert','Unlock the equivalent rank of mods. 2: Difficulty to repair robots -1. 3: Can reprogram robots.','Core','2','3','4','{"intelligence: 8"}','{}'),('Science','Unlock the equivalent rank of mods.','Core','2','3','4','{"intelligence: 6"}','{}'),('Scoundrel','Ignore first complication of CHA+Speech to lie.','Core','1','1','1','{"charisma: 7"}','{}'),('Scrapper','1: Salvage uncommon materials when scrapping items. 2: Salvage rare materials.','Core','3','2','5','{}','{}'),('Scrounger','1: +3CD ammo when looting. 2: +6CD ammo. 3: +10CD ammo.','Core','1','3','5','{"luck: 6"}','{}'),('Shotgun Surgeon','Shotguns gain +1 Piercing.','Core','1','1','1','{"strength: 5","agility: 7"}','{}'),('Skilled','Add +2 or +1/+1 to skills.','Core','3','10','3','{}','{}'),('Size Matters','+(Rank)CD to Big Guns attacks.','Core','1','3','4','{"endurance: 7","agility: 6"}','{}'),('Slayer','1 Luck to crit with unarmed/melee.','Core','1','1','1','{"strength: 8"}','{}'),('Smooth Talker','Reroll 1d20 opposed Barter/Speech.','Core','1','1','1','{"charisma: 6"}','{}'),('Snakeater','Poison DR +2.','Core','1','1','1','{"endurance: 7"}','{}'),('Sniper','Aim, 2H, Accurate, specify location without increasing difficulty.','Core','1','1','1','{"perception: 8","agility: 6"}','{}'),('Solar Powered','Heal 1 Rad/hour in direct sunlight.','Core','1','1','1','{"endurance: 7"}','{}'),('Steady Aim','Reroll 2d20 on first or 1d20 on all attacks after Aim.','Core','1','1','1','{"strength: 8","agility: 7"}','{}'),('Strong Back','+25lbs carry weight.','Core','1','3','2','{"strength: 5"}','{}'),('Tag!','Pick an additional Tag skill.','Core','5','1','0','{}','{}'),('Terrifying Presence','1: Reroll 1d20 on speech to scare. 2: STR+Speech(2) to threaten enemy within Medium range. They must move away from you during next turn.','Core','3','2','5','{"strength: 6","charisma: 8"}','{}'),('Toughness','Physical DR +(rank).','Core','1','2','4','{"endurance: 6","luck: 6"}','{}'),('All Night Long','Hunger and Thirst do not progress at night; Fatigue every 2 days of starving instead of 1.','Settler','16','1','0','{}','{"Not a Robot"}'),('Ammosmith','1: Craft ammo rarity 1. 2: Craft ammo rarity 3, and dismantle ammo into 1/2 components. 3: Craft ammo rarity 5; +6-rarityCD ammo, effects double total.','Settler','2','3','4','{"intelligence: 7"}','{}'),('Bodyguards','Companions gain +1 Phys/Energy DR.','Settler','5','1','0','{"charisma: 8"}','{}'),('Community Organizer','+(Rank) manned food/defense per day +1CD Hunting, Gathering, and Scavenging.','Settler','1','3','3','{"charisma: 5","endurance: 5"}','{}'),('Contractor','1: Half materials, half happiness to build (double time to negate happiness loss). 2: Can assign unskilled to build, happiness -1. 3: Can assign person missing perk to build as long as someone has it.','Settler','2','3','4','{"charisma: 5","intelligence: 5"}','{}'),('Covert Operator','+2CD small guns/energy sneak attack.','Settler','1','1','0','{"agility: 8"}','{}'),('Enforcer','Target location with shotgun adds Debilitating.','Settler','12','1','0','{"agility: 9"}','{}'),('Green Thumb','2+2/AP foraging items.','Settler','4','1','0','{"perception: 4"}','{}'),('Gun Runner','Sprint with 1H gun, 1AP to move one additional zone.','Settler','4','1','0','{"agility: 6"}','{}'),('Happy Camper','1: If hunger is full or sated, hunger doesn’t degrade at a campfire.','Settler','3','2','4','{"charisma: 7","endurance: 6"}','{}'),('Hired Help','Gain a companion.','Settler','1','1','0','{"charisma: 7"}','{"no companion"}'),('Home Defense','1: Can craft traps, INT+Repair failure triggers trap. 2: Failure succeeds at cost.','Settler','5','2','5','{"intelligence: 6"}','{}'),('Homebody','1: Heal (END)CD after 1hr in settlement you belong to. 2: +1/Effect, END+Survival to heal injuries difficulty maximum 2.','Settler','5','2','5','{"endurance: 6"}','{}'),('Local Leader','1: Establish supply lines. 2: Build stores/crafting tables.','Settler','2','2','5','{"charisma: 6"}','{}'),('Lock and Load','Big Guns >0 fire rate +(Rank).','Settler','2','3','4','{"strength: 7"}','{}'),('Mechanical Menace/Class Freak','Pick robots or mutated humans. When they attack, roll 1CD. On non-effect, they don’t attack. Reroll 1d20 for CHA against them.','Settler','1','1','0','{"charisma: 5","intelligence: 5"}','{}'),('Nocturnal Fortitude','Max/current HP +(END) at night.','Settler','12','1','0','{"endurance: 6"}','{"Not a Robot"}'),('Pannapictagraphist','Reroll book/magazine rolls if you’ve already found the first.','Settler','1','1','0','{"luck: 5"}','{}'),('Pharmacist','RadAway heals +1+(Rank) Rad damage.','Settler','2','3','6','{"intelligence: 8"}','{}'),('Photosynthetic','Regenerate (Rank)HP/hr direct sun.','Settler','5','2','10','{"endurance: 7"}','{}'),('Quack Surgeon','Use alcohol in First Aid to heal 2HP/AP spent. Patient receives effects of beverage.','Settler','12','1','0','{"charisma: 7"}','{}'),('Rejuvenated','When full, MaxHP+2, reroll 1d20 on STR. When quenched, reroll 1d20 on END, generate 1AP each turn. Full/Quenched last twice as long.','Settler','12','1','0','{"endurance: 7"}','{"Not a Robot"}'),('Retribution','Recover 1HP and 1AP (Rank) rounds per combat encounter.','Settler','2','3','5','{"endurance: 8","luck: 8"}','{}'),('Robot Wrangler','Gain a robot companion.','Settler','1','1','0','{"intelligence: 5"}','{"no companion"}'),('Squad Maneuvers','1: Maintain hurried pace with CHA+Survival(1) for +1hr. 2: Can spend 1AP to move ally to reach when spending 1AP to move.','Settler','1','2','3','{"charisma: 7"}','{}'),('Super Duper','Roll (Rank)CD to regain (effects) components when crafting.','Settler','3','3','4','{"luck: 6"}','{}'),('Taking One for the Team','1: Take damage for ally in same zone (Rank) rounds per combat encounter on non-effect on 1CD. 2: Add (Rank)AP when DR doesn’t reduce damage completely. 3: You and ally reroll 1d20 on (Rank) attacks against target.','Settler','1','3','4','{"endurance: 7","charisma: 6"}','{}'),('Tinkerer','Reduce difficulty of repairing via first aid to INJ, +1 on self. Tinker for 1hr to +2 max HP for 24hrs or until next INJ.','Settler','1','1','0','{"endurance: 5","intelligence: 5"}','{}'),('True Friends','1: Roll (reputation)CD to avoid reputation loss on effect. 2: Roll CHA+Speech(3) to increase affinity by 2 instead of 1.','Settler','1','2','6','{"perception: 6","charisma: 6"}','{}'),('Blocker','DR +(Rank) against melee.','Wanderer','1','3','5','{"strength: 6"}','{}'),('Bullet Shield','DR +1+(Rank) when using Big Guns.','Wanderer','8','3','6','{"strength: 8"}','{}'),('Gladiator','+(Rank)CD when using 1H melee.','Wanderer','2','3','5','{"strength: 6"}','{}'),('Incisor','+(Rank) Piercing on melee.','Wanderer','2','2','9','{"strength: 6"}','{}'),('Martial Artist','Can take additional melee atk 1AP.','Wanderer','8','1','0','{"strength: 6"}','{}'),('Pack Rat','Junk weighs half as much.','Wanderer','1','1','0','{"strength: 6"}','{}'),('Scattershot','Can take another shotgun shot 1AP.','Wanderer','10','1','0','{"strength: 7"}','{}'),('Sturdy Frame','Non-power armor weight -(Rank)/4.','Wanderer','5','3','8','{"strength: 8"}','{}'),('Archer','+(Rank)CD when using (cross)bows.','Wanderer','1','3','7','{"perception: 6"}','{}'),('Bow Before Me','+1 Piercing when using (cross)bows.','Wanderer','4','1','0','{"perception: 8"}','{}'),('Butcher’s Bounty','+(Rank)CD meat when butchering.','Wanderer','3','3','5','{"perception: 8"}','{}'),('Crack Shot','1: Aim 1H ranged +1 range. 2: Add Accurate to the shot.','Wanderer','7','2','7','{"perception: 7"}','{}'),('Fire in the Hole','-1 Difficulty to throw explosives.','Wanderer','1','1','0','{"perception: 8"}','{}'),('Glow Sight','+(Rank)CD against Glowing enemies.','Wanderer','3','3','8','{"perception: 8"}','{}'),('Night Eyes','Ignore difficulty due to darkness on all checks while hiding.','Wanderer','7','1','0','{"perception: 8"}','{}'),('Cannibal','1: You may butcher humans (Diff 0). 2: You may butcher ghouls. 3: You may butcher Super Mutants.','Wanderer','1','3','0','{"endurance: 8"}','{}'),('Cola Nut','Double HP for Nuka-Cola.','Wanderer','14','1','0','{"endurance: 6"}','{"Not a Robot"}'),('Dromedary','Drinks decrease thirst by +1 step.','Wanderer','3','1','0','{"endurance: 7"}','{"Not a Robot"}'),('Fireproof','+(Rank) Energy DR (Fire or Blast).','Wanderer','7','3','7','{"endurance: 6"}','{}'),('Ghoulish','1: Heal 1HP/4Rad damage. 2: Heal 1HP/3Rad damage. 3: Heal 1HP/2Rad damage.','Wanderer','7','3','8','{"endurance: 9"}','{"Not a Ghoul or Robot"}'),('Ironclad','+(Rank) Energy/Phys DR with armor.','Wanderer','5','3','5','{"endurance: 7"}','{}'),('Natural Resistance','No disease from fumes or sleeping.','Wanderer','10','1','0','{"endurance: 7"}','{}'),('Radicool','Reroll 1d20 on STR and add 1CD to melee for every (MaxHP)/4 Rad damage you have.','Wanderer','12','1','0','{"endurance: 6"}','{"Not Immune to Rads"}'),('Revenant','+2CD on attacks after revived.','Wanderer','12','1','0','{"endurance: 8"}','{}'),('Slow Metabolizer','Food decrease hunger by +1 step.','Wanderer','5','1','0','{"endurance: 7"}','{"Not a Robot"}'),('Thirst Quencher','No disease from dirty water.','Wanderer','6','1','0','{"endurance: 7"}','{}'),('Vaccinated','No disease from claws or bites from Mammals, Lizards, or Insects.','Wanderer','16','1','0','{"endurance: 7"}','{}'),('Bloodsucker','Double healing from all blood packs and decrease thirst. 1CD for radiation from Irradiated Blood.','Wanderer','11','1','0','{"charisma: 6"}','{}'),('Responder','Wake after First Aid stabilize in combat doesn’t cost AP, heal 2*Rank HP at the start of next turn.','Wanderer','9','3','7','{"charisma: 8","intelligence: 7"}','{}'),('Field Surgeon','Heal 3HP/AP when using Stimpak with First Aid. Heal +1 Rad w/ RadAway.','Wanderer','15','1','0','{"charisma: 8","intelligence: 8"}','{}'),('Happy Go Lucky','+(Rank)LCK Points w/ first alcohol.','Wanderer','17','2','6','{"charisma: 9"}','{}'),('Healing Hands','Heal (Medicine)Rad when First Aid stabilize in combat.','Wanderer','18','1','0','{"charisma: 8","intelligence: 7"}','{}'),('Overly Generous','When Rads>=(MaxHP)/4, melee attacks become Radioactive.','Wanderer','12','1','0','{"charisma: 7"}','{"Not Immune to Rads"}'),('Spiritual Healer','1: Heal Self (Rank)HP when First Aid stabilize in combat. 2: Heal (Rank)HP next turn. 3: Heal (Rank)HP turn after.','Wanderer','6','3','9','{"charisma: 7"}','{}'),('Suppressor','1AP to suppress attacked enemy for 1 turn (-(Rank)CD damage)','Wanderer','10','3','10','{"charisma: 6"}','{}'),('Tenderizer','1AP to make vulnerable attacked enemy for 1 turn (+(Rank)CD damage).','Wanderer','8','3','10','{"charisma: 7"}','{}'),('Licensed Plumber','Pipe Weapons lose Unreliable.','Wanderer','5','1','0','{"intelligence: 6"}','{}'),('Power Patcher','Repair +1+(Rank) Power Armor HP.','Wanderer','5','3','7','{"intelligence: 6"}','{}'),('Power User','1: +3 charges in fusion cores. 2: +6 charges. 3: +10 charges.','Wanderer','10','3','10','{"intelligence: 9"}','{}'),('Stabilized','Reroll 1d20 and +1 Piercing on Big Guns while wearing Power Armor.','Wanderer','16','1','0','{"intelligence: 7"}','{}'),('Born Survivor','Auto-Stimpak (Rank)x per scene when health below (MaxHP)/4','Wanderer','3','3','8','{"agility: 8"}','{}'),('Dead Man Sprinting','+1 Zone on Sprint if <(MaxHP)/2.','Wanderer','8','1','0','{"agility: 7"}','{}'),('Escape Artist','Hide in combat if no LoS with AGI+ Sneak(#enemies in Medium Range), and Sprint doesn’t reduce difficulty to detect.','Wanderer','15','1','0','{"agility: 8"}','{}'),('Evasive','Your DR increases like Melee damage (AGI 7-8=+1, 9-10=+2, 11+=+3).','Wanderer','7','1','0','{"agility: 7"}','{}'),('Goat Legs','+(Rank)*2 DR against fall damage.','Wanderer','7','3','5','{"agility: 7"}','{}'),('Modern Renegade','Hit 1H ranged w/o aim adds +(Rank) AP, which cannot be saved.','Wanderer','8','3','5','{"agility: 7"}','{}'),('Secret Agent','Stealth Boys last +(Rank) turns.','Wanderer','7','3','5','{"agility: 9"}','{}'),('Dry Nurse','Roll 1CD on First Aid to Stabilize with Stimpak, Effect=keep Stimpak.','Wanderer','13','1','0','{"luck: 8"}','{}'),('Junk Shield','+1 Physical and Energy DR per 5 junk, max (Rank) DR.','Wanderer','1','3','8','{"luck: 7"}','{}'),('Mysterious Savior','For 1 Luck Mysterious Savior may stabilize you (refunded).','Wanderer','1','1','0','{"luck: 7"}','{}'),('Psychopath','On kill (Rank)CD, Effect=+Luck.','Wanderer','11','3','6','{"luck: 8"}','{}'),('Serendipity','If HP<(MaxHP)/3, spend 1 Luck when attacked before attack roll to make attack miss (Rank) times per scene.','Wanderer','5','3','6','{"luck: 7"}','{}'),('Storm Chaser','When rain/rad storm, heal 1HP each turn in combat, (LCK)/2HP per hour outside combat.','Wanderer','15','1','0','{"luck: 6"}','{}');
INSERT INTO ammo_src (aname,quant,wgt,cost,rarity,avariant) VALUES ('.38','10+5 CD','0','1','0','{"SWC"}'),('10mm','8+4 CD','0','2','0','{"AP","JSP","HP","P+","Surplus","Junk"}'),('.308','6+3 CD','0','3','1','{"AP","ISP","HP","Surplus","Junk"}'),('Flare','2+1 CD','0','1','1','{}'),('ShotgunShell','6+3 CD','0','3','1','{"Bean Bag","Coin Shot","Slug","Flechette","Pulse Slug","Dragon’s Breath"}'),('.45','8+4 CD','0','3','2','{"AP","JSP","HP","P+","Surplus","Junk"}'),('FlamerFuel','12+6 CD','0','1','2','{"Homemade"}'),('FusionCell','14+7 CD','0','3','2','{"Overcharged"}'),('GammaRound','4+2 CD','0','10','2','{}'),('RailwaySpike','6+3 CD','0','1','2','{}'),('SyringerAmmo','4+2 CD','0','0','2','{"Berserk","Bleed-Out","Bloatfly Larva","Endangerol","Lock Joint","Mind Cloud","Pax","Radscorpian Venom","Yellow Belly"}'),('.44Magnum','4+2 CD','0','3','3','{"SWC"}'),('.50','4+2 CD','0','4','3','{"AP","JSP","HP","Surplus","Junk","Explosive","Incendiary"}'),('5.56mm','8+4 CD','0','2','3','{"AP","JSP","HP","Surplus","Junk",".223"}'),('5mm','10x(12+6 CD)','0','1','3','{"AP","JSP","HP","Surplus","Junk"}'),('FusionCore','1','4','200','3','{}'),('Missile','2+1 CD','7','25','3','{"HE"}'),('PlasmaCartridge','10+5 CD','0','5','4','{}'),('2mmEC','6+3 CD','0','10','5','{}'),('Mini-Nuke','1+1 CD','12','100','6','{}'),('14mm','4+2 CD','0','5','4','{"AP","JSP","HP","Surplus","Junk"}'),('Alien Cell','3+1 CD','0','20','5','{}'),('9mm','10+4 CD','0','1','0','{"AP","JSP","HP","P+","Surplus","Junk"}'),('12.7mm','4+2 CD','0','4','4','{"AP","JSP","HP","Surplus","Junk"}'),('45-70 Govt','6+3 CD','0','3','1','{"SWC"}'),('40mm Grenade','5+2 CD','1','30','2','{"HE","Plasma","Pulse","Incendiary"}'),('25mm Grenade','5+4 CD','0','15','2','{"HE","Plasma","Pulse","Incendiary"}'),('.357','6+3 CD','0','2','1','{"SWC",".38"}');
INSERT INTO wmod_src (mname,prefix,wtype,component,effects,wgt,cost,req) VALUES ('Hardened','Hardened','{"smallGuns"}','Receiver','{"+1CD Dam"}','0','20','{}'),('Powerful','Powerful','{"smallGuns"}','Receiver','{"+2CD Dam"}','1','25','{"Gun Nut 1"}'),('Advanced','Advanced','{"smallGuns"}','Receiver','{"+3CD Dam","+1 Rate"}','2','35','{"Gun Nut 2"}'),('Calibrated','Calibrated','{"smallGuns"}','Receiver','{"Gain Vicious"}','0','25','{}'),('Automatic','Auto','{"smallGuns"}','Receiver','{"-1CD Dam","+2 Rate","Gain Burst","Gain Inaccurate"}','1','30','{"Gun Nut 1"}'),('Hair Trigger','Hair Trigger','{"smallGuns"}','Receiver','{"+1 Rate"}','0','20','{"Gun Nut 2"}'),('.38 Receiver','.38','{"smallGuns"}','Receiver','{"4CD Dam","Ammo = .38"}','3','20','{"Gun Nut 4"}'),('.308 Receiver','.308','{"smallGuns"}','Receiver','{"7CD Dam","Ammo = .308"}','4','40','{"Gun Nut 4"}'),('.45 Receiver','.45','{"smallGuns"}','Receiver','{"4CD Dam","+1 Rate","Ammo = .45"}','2','19','{"Gun Nut 2"}'),('.50 Receiver','.50','{"smallGuns"}','Receiver','{"8CD Dam","Gain Vicious","Ammo = .50"}','4','30','{"Gun Nut 4"}'),('Automatic Piston','Automatic','{"smallGuns"}','Receiver','{"+2 Rate","-1 Range"}','2','75','{"Gun Nut 2"}'),('12.7mm Receiver','12.7mm','{"smallGuns"}','Receiver','{"7CD Dam","Gain Vicious","Ammo = 12.7mm"}','3','50','{"Gun Nut 4"}'),('.357 Receiver','.357','{"smallGuns"}','Receiver','{"4CD Dam","Gain Vicious","Lose Piercing 1","Ammo = .357"}','0','20','{"Gun Nut 3"}'),('.45-70 Receiver','.45-70','{"smallGuns"}','Receiver','{"4CD Dam","Lose Vicious","Gain Piercing 1","Ammo = .45-70 Govt"}','4','40','{"Gun Nut 4"}'),('Snubnose','Snub-nosed','{"smallGuns"}','Barrel','{"Gain Inaccurate"}','-1','0','{}'),('Bull','Bull Barreled','{"smallGuns"}','Barrel','{"Gain Reliable"}','0','10','{"Gun Nut 3"}'),('Long','Long','{"smallGuns", "energyWeapons", "bigGuns"}','Barrel','{"Lose Close-Quarters","Lose Inaccurate","+1 Range"}','1','20','{"Gun Nut 1"}'),('Ported','Ported','{"smallGuns"}','Barrel','{"+1 Range","+1 Rate"}','1','35','{"Gun Nut 4"}'),('Vented','Vented','{"smallGuns"}','Barrel','{"+1 Range","+1 Rate","Gain Reliable"}','1','36','{"Gun Nut 4"}'),('Sawed-Off','Sawed-off','{"smallGuns"}','Barrel','{"Lose Two-Handed","Gain Close Quarters"}','-2','3','{}'),('Shielded','Shielded','{"smallGuns"}','Barrel','{"+1CD Dam"}','0','37','{"Gun Nut 3","Repair"}'),('Finned','Finned','{"smallGuns"}','Barrel','{"+1CD Dam","+1 Range"}','2','15','{"Gun Nut 2"}'),('Bracketed Short','-','{"energyWeapons"}','Barrel','{"Allows Muzzle mods"}','0','6','{}'),('Splitter','Scattergun','{"energyWeapons"}','Barrel','{"-1CD Dam","Gain Spread","Gain Inaccurate"}','1','31','{}'),('Automatic','Automatic','{"energyWeapons"}','Barrel','{"-1CD Dam","Lose Close-Quarters","+1 Range","+1 Rate"}','1','24','{"Science! 1"}'),('Bracketed Long','-','{"energyWeapons"}','Barrel','{"Lose Close-Quarters","+1 Range","Allows Muzzle mods"}','2','25','{"Science! 1"}'),('Improved','Improved','{"energyWeapons"}','Barrel','{"+1CD Dam"}','1','26','{"Science! 1"}'),('Sniper','Sniper','{"energyWeapons"}','Barrel','{"+2CD Dam","Lose Close-Quarters","+1 Range","-1 Rate"}','2','30','{"Science! 1"}'),('Flamer','Thrower','{"energyWeapons"}','Barrel','{"-2CD Dam","+2 Rate","Gain Burst","Gain Spread","Gain Inaccurate","-1 Range"}','1','35','{"Science! 2"}'),('Charging','Charging','{"bigGuns"}','Barrel','{"+4CD Dam","-3 Rate","+1 Range"}','10','357','{"Science! 4"}'),('Accelerated','High-Speed','{"bigGuns"}','Barrel','{"+1CD Dam","+1 Rate","-1 Range"}','5','45','{"Gun Nut 3"}'),('Tri-Barrel','High-Powered','{"bigGuns"}','Barrel','{"+2CD Dam","-2 Rate"}','3','75','{"Gun Nut 4"}'),('Triple','Triple Barrel','{"bigGuns"}','Barrel','{"+1 Rate"}','16','143','{"Gun Nut 2"}'),('Quad','Quad Barrel','{"bigGuns"}','Barrel','{"+2 Rate"}','20','218','{"Gun Nut 3"}'),('Large','High Capacity','{"smallGuns"}','Magazine','{"+1 Rate","Gain Unreliable"}','1','-3','{"Gun Nut 2"}'),('Quick-Eject','Quick','{"smallGuns"}','Magazine','{"Gain Reliable"}','0','8','{"Gun Nut 1"}'),('Large Quick-Eject','Quick High Capacity','{"smallGuns"}','Magazine','{"+1 Rate"}','1','23','{"Gun Nut 2"}'),('Comfort','Comfort','{"smallGuns"}','Grip','{"Lose Inaccurate"}','0','6','{}'),('Sharpshooter’s','Sharpshooter’s','{"smallGuns", "energyWeapons"}','Grip','{"Lose Inaccurate","Gain Piercing 1"}','0','10','{"Gun Nut 1"}'),('Full','-','{"smallGuns", "energyWeapons"}','Stock','{"Gain Two-Handed","Lose Inaccurate","Lose Close-Quarters"}','1','10','{}'),('Marksman’s','Marksman’s','{"smallGuns", "energyWeapons"}','Stock','{"Gain Two-Handed","Lose Inaccurate","Gain Accurate","Lose Close-Quarters"}','2','20','{"Gun Nut 2"}'),('Recoil Compensating','Recoil Compensated','{"smallGuns", "energyWeapons", "bigGuns"}','Stock','{"Gain Two-Handed","Lose Inaccurate","+1 Rate","Lose Close-Quarters"}','2','3','{"Gun Nut 3"}'),('Standard','-','{"energyWeapons"}','Stock','{"Gain Two-Handed","Lose Inaccurate","Lose Close-Quarters"}','1','10','{}'),('Reflex','Tactical','{"smallGuns", "energyWeapons", "bigGuns"}','Sight','{"May re-roll hit location die","Lose Inaccurate"}','0','14','{}'),('Short Scope','Scoped','{"smallGuns", "energyWeapons"}','Sight','{"Gain Accurate"}','1','11','{}'),('Long Scope','Scoped','{"smallGuns", "energyWeapons"}','Sight','{"Gain Accurate","+1 Range"}','1','29','{"Science! 2"}'),('Short Night Vision','Night Vision','{"smallGuns", "energyWeapons"}','Sight','{"Gain Accurate","Gain Night Vision"}','1','38','{"Science! 2"}'),('Long Night Vision','Night Vision','{"smallGuns", "energyWeapons"}','Sight','{"Gain Accurate","Gain Night Vision","+1 Range"}','1','50','{"Science! 3"}'),('Recon','Recon','{"smallGuns", "energyWeapons"}','Sight','{"Gain Accurate","Gain Recon"}','1','59','{"Science! 3"}'),('Gunner','Tactical','{"bigGuns"}','Sight','{"May re-roll hit location die","Lose Inaccurate"}','1','68','{}'),('Scope','Scoped','{"bigGuns"}','Sight','{"Gain Accurate"}','6','143','{"Gun Nut 2"}'),('Night Vision','Night Vision','{"bigGuns"}','Sight','{"Gain Accurate","Gain Night Vision"}','6','248','{"Gun Nut 4","Science! 1"}'),('Targeting Computer','Targeting','{"bigGuns"}','Sight','{"When you Aim at a target, the target does not benefit form being in cover, and the bonus for aiming applies to the next attack on any subsequent turn during the scene"}','7','293','{"Gun Nut 2","Science! 2"}'),('Bayonet','Bayoneted','{"smallGuns", "bigGuns"}','Muzzle','{"Add Bayonet weapon"}','2','10','{}'),('Compensator','Compensated','{"smallGuns"}','Muzzle','{"Lose Inaccurate"}','1','15','{"Gun Nut 1"}'),('Muzzle Break','Muzzled','{"smallGuns"}','Muzzle','{"Lose Inaccurate","+1 Rate"}','1','30','{"Gun Nut 1"}'),('Suppressor','Supressed','{"smallGuns"}','Muzzle','{"Gain Suppressed"}','2','45','{"Gun Nut 2"}'),('Beam Splitter','Scattered','{"energyWeapons"}','Muzzle','{"-1CD Dam","Gain Spread","Gain Inaccurate","-1 Rate","-1 Range"}','1','15','{"Science! 1"}'),('Beam Focuser','Focused','{"energyWeapons", "bigGuns"}','Muzzle','{"+1 Range","Gain Piercing 1"}','1','20','{"Science! 1"}'),('Gyro Compensating Lens','Targeting','{"energyWeapons"}','Muzzle','{"+1 Rate","Lose Inaccurate"}','1','25','{"Science! 1"}'),('Electric Signal Carrer Antennae','Electrified','{"energyWeapons"}','Muzzle','{"7CD Dam","Dam Type = Energy","Gain Radioactive"}','0','30','{"Science! 3"}'),('Signal Repeater','Automatic','{"energyWeapons"}','Muzzle','{"+2 Rate","Gain Burst","Lose Blast"}','0','60','{"Science! 4"}'),('Electrification Module','Electrified','{"bigGuns"}','Muzzle','{"Gain Vicious","Dam Type = Energy"}','1','70','{"Gun Nut 2","Science! 1"}'),('Ignition Module','Flaming','{"bigGuns"}','Muzzle','{"Gain Persistent(Energy)"}','1','130','{"Gun Nut 3","Science! 1"}'),('Shredder','Bayoneted Shredding','{"bigGuns"}','Muzzle','{"Add Shredder Bayonet weapon"}','5','5','{"Gun Nut 2"}'),('Stabilizer','Muzzled','{"bigGuns"}','Muzzle','{"Gain Piercing 1"}','2','60','{"Gun Nut 2"}'),('Full Capacitors','High Capacity','{"smallGuns"}','Capacitors','{"Gain Vicious"}','0','37','{"Gun Nut 3","Science! 2"}'),('Capacitor Boosting Coil','Max Capacity','{"smallGuns"}','Capacitors','{"+1CD Dam","Gain Vicious"}','2','82','{"Gun Nut 4","Science! 3"}'),('Beta Wave Tuner','Incendiary','{"energyWeapons", "bigGuns"}','Capacitors','{"Gain Persistent"}','0','30','{}'),('Boosted Capacitor','Boosted','{"energyWeapons", "bigGuns"}','Capacitors','{"+1CD Dam","-1 Rate"}','0','35','{}'),('Photon Exciter','Excited','{"energyWeapons", "bigGuns"}','Capacitors','{"Gain Vicious"}','0','30','{"Science! 1"}'),('Photon Agitator','Agitated','{"energyWeapons", "bigGuns"}','Capacitors','{"+1CD Dam","Gain Vicious"}','1','35','{"Science! 2"}'),('Three-Crank','Three-crank','{"energyWeapons"}','Capacitors','{"+1CD Dam","+1 Ammo/Atk"}','0','4','{}'),('Four-Crank','Four-crank','{"energyWeapons"}','Capacitors','{"+2CD Dam","+2 Ammo/Atk"}','1','8','{"Science! 1"}'),('Five-Crank','Five-crank','{"energyWeapons"}','Capacitors','{"+3CD Dam","+3 Ammo/Atk"}','1','12','{"Science! 2"}'),('Six-Crank','Six-crank','{"energyWeapons"}','Capacitors','{"+4CD Dam","+4 Ammo/Atk"}','2','16','{"Science! 3"}'),('Deep Dish','Long','{"energyWeapons"}','Dish','{"+1CD Dam","+1 Range"}','2','72','{"Science! 4"}'),('Napalm','Napalmer','{"bigGuns"}','Fuel','{"+1CD Dam"}','7','59','{}'),('Large','High Capacity','{"bigGuns"}','Tank','{"+1 Rate"}','3','28','{}'),('Huge','Max Capacity','{"bigGuns"}','Tank','{"+2 Rate"}','6','34','{}'),('Compression','Compressed','{"bigGuns"}','Nozzle','{"+1CD Dam"}','0','22','{}'),('Vaporization','Vaporizing','{"bigGuns"}','Nozzle','{"+1CD Dam","Gain Vicious"}','0','47','{}'),('Serrated','Serrated','{"meleeWeapons"}','Blade','{"Gain Persistent"}','0','25','{"Blacksmith 2"}'),('Electrified','Electrified','{"meleeWeapons"}','Blade','{"+1CD Dam","Dam Type = Energy"}','0','50','{"Blacksmith 2","Science! 1"}'),('Electrified Serrated','Electrified Serrated','{"meleeWeapons"}','Blade','{"+1CD Dam","Dam Type = Energy","Gain Persistent(Physical)"}','0','75','{"Blacksmith 3","Science! 1"}'),('Stun Pack','Stunning','{"meleeWeapons"}','Blade','{"+2CD Dam","Dam Type = Energy","Gain Stun"}','0','100','{"Blacksmith 3","Science! 1"}'),('Stealth','Stealth','{"meleeWeapons"}','Blade','{"+1CD Dam","Gain Persistent","+2CD Dam on Sneak Attacks"}','0','18','{"Blacksmith 2"}'),('Curved','Curved','{"meleeWeapons"}','Blade','{"+1CD Dam","Spend 2AP on successful attack to disarm opponent"}','1','15','{}'),('Extended','Extended','{"meleeWeapons"}','Blade','{"+1CD Dam","Gain Persistent"}','3','25','{"Blacksmith 3"}'),('Extra Flame Jets','Searing','{"meleeWeapons"}','Blade','{"+1CD Dam","Gain Persistent"}','1','100','{"Blacksmith 3"}'),('Extra Claw','Large','{"unarmed"}','Blade','{"+1CD Dam","Spend 2AP on successful attack to disarm opponent"}','2','22','{}'),('Barbed','Barbed','{"meleeWeapons", "unarmed"}','Blunt','{"Gain Piercing 1"}','0','5','{}'),('Spiked','Spiked','{"meleeWeapons", "unarmed"}','Blunt','{"+1CD Dam","Gain Piercing 1"}','1','7','{}'),('Sharp','Sharp','{"meleeWeapons", "unarmed"}','Blunt','{"+1CD Dam","Gain Persistent"}','1','7','{}'),('Chain-Wrapped','Chain-wrapped','{"meleeWeapons"}','Blunt','{"+2CD Dam"}','1','10','{"Blacksmith 1"}'),('Bladed','Bladed','{"meleeWeapons"}','Blunt','{"+2CD Dam","Gain Persistent"}','2','12','{"Blacksmith 2"}'),('Puncturing','Puncturing','{"meleeWeapons", "unarmed"}','Blunt','{"+2CD Dam","Gain Piercing 1"}','1','9','{"Blacksmith 1"}'),('Heavy','Weighted','{"meleeWeapons"}','Blunt','{"+2CD Dam"}','2','11','{"Blacksmith 1"}'),('Hooked','Hooked','{"meleeWeapons"}','Blunt','{"+1CD Dam","Spend 2AP on successful attack to disarm opponent"}','0','9','{}'),('Extra Heavy','Heavy','{"meleeWeapons"}','Blunt','{"+3CD Dam"}','7','22','{"Blacksmith 2"}'),('Heating Coil','Heated','{"meleeWeapons", "unarmed"}','Blunt','{"+1CD Dam","Dam Type = Energy"}','0','180','{"Blacksmith 2"}'),('Lead Lining','Lead-lined','{"unarmed"}','Blunt','{"+2CD Dam"}','1','7','{"Blacksmith 1"}'),('Overcharged','Overcharged','{"meleeWeapons"}','Blunt','{"+1CD Dam","Gain Unreliable"}','0','20','{"Science! 2"}');
```