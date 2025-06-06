import { pgTable, pgSchema, foreignKey, smallserial, smallint, boolean, text, integer, char, json } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const newContent = pgSchema("new_content");


export const npcCharacterSpecialInNewContent = newContent.table("npc_character_special", {
	id: smallserial().notNull(),
	npcCharacterId: smallint("npc_character_id"),
	strength: smallint(),
	perception: smallint(),
	endurance: smallint(),
	charisma: smallint(),
	intelligence: smallint(),
	agility: smallint(),
	luck: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.npcCharacterId],
			foreignColumns: [npcCharactersInNewContent.id],
			name: "npc_character_special_npc_character_id_fkey"
		}),
]);

export const activeNpcCharacterSpecialInNewContent = newContent.table("active_npc_character_special", {
	id: smallserial().notNull(),
	npcCharacterId: smallint("npc_character_id"),
	strength: smallint(),
	perception: smallint(),
	endurance: smallint(),
	charisma: smallint(),
	intelligence: smallint(),
	agility: smallint(),
	luck: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.npcCharacterId],
			foreignColumns: [activeNpcCharactersInNewContent.id],
			name: "active_npc_character_special_npc_character_id_fkey"
		}),
]);

export const powerarmorRecipesInNewContent = newContent.table("powerarmor_recipes", {
	id: smallserial().notNull(),
	apparelMod: smallint("apparel_mod"),
	complexity: smallint(),
	rarity: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.complexity],
			foreignColumns: [recipeMaterialsInNewContent.complexity],
			name: "powerarmor_recipes_complexity_fkey"
		}),
	foreignKey({
			columns: [table.apparelMod],
			foreignColumns: [apparelModsInNewContent.id],
			name: "powerarmor_recipes_apparel_mod_fkey"
		}),
]);

export const scavengingLocationsInNewContent = newContent.table("scavenging_locations", {
	id: smallserial().notNull(),
});

export const characterSkillsInNewContent = newContent.table("character_skills", {
	id: smallserial().notNull(),
	characterId: smallint("character_id"),
	athletics: smallint(),
	barter: smallint(),
	bigGuns: smallint(),
	energyWeapons: smallint(),
	explosives: smallint(),
	lockpick: smallint(),
	medicine: smallint(),
	meleeWeapons: smallint(),
	pilot: smallint(),
	repair: smallint(),
	science: smallint(),
	smallGuns: smallint(),
	sneak: smallint(),
	speech: smallint(),
	survival: smallint(),
	throwing: smallint(),
	unarmed: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "character_skills_character_id_fkey"
		}),
]);

export const npcCharacterSkillsInNewContent = newContent.table("npc_character_skills", {
	id: smallserial().notNull(),
	npcCharacterId: smallint("npc_character_id"),
	athletics: smallint(),
	barter: smallint(),
	bigGuns: smallint(),
	energyWeapons: smallint(),
	explosives: smallint(),
	lockpick: smallint(),
	medicine: smallint(),
	meleeWeapons: smallint(),
	pilot: smallint(),
	repair: smallint(),
	science: smallint(),
	smallGuns: smallint(),
	sneak: smallint(),
	speech: smallint(),
	survival: smallint(),
	throwing: smallint(),
	unarmed: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.npcCharacterId],
			foreignColumns: [npcCharactersInNewContent.id],
			name: "npc_character_skills_npc_character_id_fkey"
		}),
]);

export const activeNpcCharacterSkillsInNewContent = newContent.table("active_npc_character_skills", {
	id: smallserial().notNull(),
	npcCharacterId: smallint("npc_character_id"),
	athletics: smallint(),
	barter: smallint(),
	bigGuns: smallint(),
	energyWeapons: smallint(),
	explosives: smallint(),
	lockpick: smallint(),
	medicine: smallint(),
	meleeWeapons: smallint(),
	pilot: smallint(),
	repair: smallint(),
	science: smallint(),
	smallGuns: smallint(),
	sneak: smallint(),
	speech: smallint(),
	survival: smallint(),
	throwing: smallint(),
	unarmed: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.npcCharacterId],
			foreignColumns: [activeNpcCharactersInNewContent.id],
			name: "active_npc_character_skills_npc_character_id_fkey"
		}),
]);

export const characterTagsInNewContent = newContent.table("character_tags", {
	id: smallserial().notNull(),
	characterId: smallint("character_id"),
	athletics: boolean(),
	barter: boolean(),
	bigGuns: boolean(),
	energyWeapons: boolean(),
	explosives: boolean(),
	lockpick: boolean(),
	medicine: boolean(),
	meleeWeapons: boolean(),
	pilot: boolean(),
	repair: boolean(),
	science: boolean(),
	smallGuns: boolean(),
	sneak: boolean(),
	speech: boolean(),
	survival: boolean(),
	throwing: boolean(),
	unarmed: boolean(),
}, (table) => [
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "character_tags_character_id_fkey"
		}),
]);

export const characterPerksInNewContent = newContent.table("character_perks", {
	id: smallserial().notNull(),
	characterId: smallint("character_id"),
	perkId: smallint("perk_id"),
	rank: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "character_perks_character_id_fkey"
		}),
	foreignKey({
			columns: [table.perkId],
			foreignColumns: [perksInNewContent.id],
			name: "character_perks_perk_id_fkey"
		}),
]);

export const characterTraitsInNewContent = newContent.table("character_traits", {
	id: smallserial().notNull(),
	characterId: smallint("character_id"),
	traitId: smallint("trait_id"),
}, (table) => [
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "character_traits_character_id_fkey"
		}),
	foreignKey({
			columns: [table.traitId],
			foreignColumns: [traitsInNewContent.id],
			name: "character_traits_trait_id_fkey"
		}),
]);

export const characterAddictionsInNewContent = newContent.table("character_addictions", {
	id: smallserial().notNull(),
	characterId: smallint("character_id"),
	consumableId: smallint("consumable_id"),
}, (table) => [
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "character_addictions_character_id_fkey"
		}),
	foreignKey({
			columns: [table.consumableId],
			foreignColumns: [consumablesInNewContent.id],
			name: "character_addictions_consumable_id_fkey"
		}),
]);

export const sourcebooksInNewContent = newContent.table("sourcebooks", {
	id: smallserial().notNull(),
	name: text(),
});

export const encounterTablesInNewContent = newContent.table("encounter_tables", {
	id: smallserial().notNull(),
	type: text(),
	dieRoll: smallint("die_roll"),
	name: text(),
	description: text(),
});

export const charactersInNewContent = newContent.table("characters", {
	id: smallserial().notNull(),
	playerId: smallint("player_id"),
	characterName: text("character_name"),
	xp: integer(),
	origin: smallint(),
	luckPoints: smallint("luck_points"),
	currentHealth: smallint("current_health"),
	headHp: smallint("head_hp"),
	headInj: smallint("head_inj"),
	laHp: smallint("la_hp"),
	laInj: smallint("la_inj"),
	raHp: smallint("ra_hp"),
	raInj: smallint("ra_inj"),
	torsoHp: smallint("torso_hp"),
	torsoInj: smallint("torso_inj"),
	llHp: smallint("ll_hp"),
	llInj: smallint("ll_inj"),
	rlHp: smallint("rl_hp"),
	rlInj: smallint("rl_inj"),
	caps: smallint(),
	hunger: smallint(),
	thirst: smallint(),
	sleep: smallint(),
	exposure: smallint(),
	party: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.playerId],
			foreignColumns: [playersInNewContent.id],
			name: "characters_player_id_fkey"
		}),
	foreignKey({
			columns: [table.origin],
			foreignColumns: [originsInNewContent.id],
			name: "characters_origin_fkey"
		}),
	foreignKey({
			columns: [table.party],
			foreignColumns: [partiesInNewContent.id],
			name: "characters_party_fkey"
		}),
]);

export const characterSpecialInNewContent = newContent.table("character_special", {
	id: smallserial().notNull(),
	characterId: smallint("character_id"),
	strength: smallint(),
	perception: smallint(),
	endurance: smallint(),
	charisma: smallint(),
	intelligence: smallint(),
	agility: smallint(),
	luck: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "character_special_character_id_fkey"
		}),
]);

export const characterChemRecipesInNewContent = newContent.table("character_chem_recipes", {
	id: smallserial().notNull(),
	characterId: smallint("character_id"),
	chemRecipeId: smallint("chem_recipe_id"),
}, (table) => [
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "character_chem_recipes_character_id_fkey"
		}),
	foreignKey({
			columns: [table.chemRecipeId],
			foreignColumns: [chemRecipesInNewContent.id],
			name: "character_chem_recipes_chem_recipe_id_fkey"
		}),
]);

export const characterCookRecipesInNewContent = newContent.table("character_cook_recipes", {
	id: smallserial().notNull(),
	characterId: smallint("character_id"),
	cookRecipeId: smallint("cook_recipe_id"),
}, (table) => [
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "character_cook_recipes_character_id_fkey"
		}),
	foreignKey({
			columns: [table.cookRecipeId],
			foreignColumns: [cookRecipesInNewContent.id],
			name: "character_cook_recipes_cook_recipe_id_fkey"
		}),
]);

export const characterPowerarmorRecipesInNewContent = newContent.table("character_powerarmor_recipes", {
	id: smallserial().notNull(),
	characterId: smallint("character_id"),
	powerarmorRecipeId: smallint("powerarmor_recipe_id"),
}, (table) => [
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "character_powerarmor_recipes_character_id_fkey"
		}),
	foreignKey({
			columns: [table.powerarmorRecipeId],
			foreignColumns: [powerarmorRecipesInNewContent.id],
			name: "character_powerarmor_recipes_powerarmor_recipe_id_fkey"
		}),
]);

export const characterRobotArmorRecipesInNewContent = newContent.table("character_robot_armor_recipes", {
	id: smallserial().notNull(),
	characterId: smallint("character_id"),
	robotArmorRecipeId: smallint("robot_armor_recipe_id"),
}, (table) => [
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "character_robot_armor_recipes_character_id_fkey"
		}),
	foreignKey({
			columns: [table.robotArmorRecipeId],
			foreignColumns: [robotArmorRecipesInNewContent.id],
			name: "character_robot_armor_recipes_robot_armor_recipe_id_fkey"
		}),
]);

export const characterRobotModulesRecipesInNewContent = newContent.table("character_robot_modules_recipes", {
	id: smallserial().notNull(),
	characterId: smallint("character_id"),
	robotModulesRecipeId: smallint("robot_modules_recipe_id"),
}, (table) => [
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "character_robot_modules_recipes_character_id_fkey"
		}),
	foreignKey({
			columns: [table.robotModulesRecipeId],
			foreignColumns: [robotModuleRecipesInNewContent.id],
			name: "character_robot_modules_recipes_robot_modules_recipe_id_fkey"
		}),
]);

export const characterWeaponRecipesInNewContent = newContent.table("character_weapon_recipes", {
	id: smallserial().notNull(),
	characterId: smallint("character_id"),
	weaponRecipeId: smallint("weapon_recipe_id"),
}, (table) => [
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "character_weapon_recipes_character_id_fkey"
		}),
	foreignKey({
			columns: [table.weaponRecipeId],
			foreignColumns: [weaponRecipesInNewContent.id],
			name: "character_weapon_recipes_weapon_recipe_id_fkey"
		}),
]);

export const backgroundsInNewContent = newContent.table("backgrounds", {
	id: smallserial().notNull(),
	name: text(),
	originId: smallint("origin_id"),
	caps: smallint(),
	misc: text(),
	trinket: smallint(),
	food: smallint(),
	forage: smallint(),
	bev: smallint(),
	chem: smallint(),
	ammo: smallint(),
	aid: smallint(),
	odd: smallint(),
	outcast: smallint(),
	junk: smallint(),
	sourcebookId: smallint("sourcebook_id"),
}, (table) => [
	foreignKey({
			columns: [table.originId],
			foreignColumns: [originsInNewContent.id],
			name: "backgrounds_origin_id_fkey"
		}),
	foreignKey({
			columns: [table.sourcebookId],
			foreignColumns: [sourcebooksInNewContent.id],
			name: "backgrounds_sourcebook_id_fkey"
		}),
]);

export const backgroundWeaponsInNewContent = newContent.table("background_weapons", {
	id: smallserial().notNull(),
	backgroundId: smallint("background_id"),
	weaponId: smallint("weapon_id"),
	modId: smallint("mod_id"),
	altId: smallint("alt_id"),
}, (table) => [
	foreignKey({
			columns: [table.backgroundId],
			foreignColumns: [backgroundsInNewContent.id],
			name: "background_weapons_background_id_fkey"
		}),
	foreignKey({
			columns: [table.weaponId],
			foreignColumns: [weaponsInNewContent.id],
			name: "background_weapons_weapon_id_fkey"
		}),
	foreignKey({
			columns: [table.altId],
			foreignColumns: [table.id],
			name: "background_weapons_alt_id_fkey"
		}),
]);

export const backgroundApparelInNewContent = newContent.table("background_apparel", {
	id: smallserial().notNull(),
	backgroundId: smallint("background_id"),
	apparelId: smallint("apparel_id"),
	altId: smallint("alt_id"),
}, (table) => [
	foreignKey({
			columns: [table.backgroundId],
			foreignColumns: [backgroundsInNewContent.id],
			name: "background_apparel_background_id_fkey"
		}),
	foreignKey({
			columns: [table.apparelId],
			foreignColumns: [apparelInNewContent.id],
			name: "background_apparel_apparel_id_fkey"
		}),
	foreignKey({
			columns: [table.altId],
			foreignColumns: [table.id],
			name: "background_apparel_alt_id_fkey"
		}),
]);

export const originsInNewContent = newContent.table("origins", {
	id: smallserial().notNull(),
	name: text(),
	description: text(),
	canGhoul: boolean("can_ghoul"),
	sourcebookId: smallint("sourcebook_id"),
}, (table) => [
	foreignKey({
			columns: [table.sourcebookId],
			foreignColumns: [sourcebooksInNewContent.id],
			name: "origins_sourcebook_id_fkey"
		}),
]);

export const backgroundAmmoInNewContent = newContent.table("background_ammo", {
	id: smallserial().notNull(),
	ammoId: smallint("ammo_id"),
	quantity: text(),
	bgWeaponId: smallint("bg_weapon_id"),
}, (table) => [
	foreignKey({
			columns: [table.ammoId],
			foreignColumns: [ammoInNewContent.id],
			name: "background_ammo_ammo_id_fkey"
		}),
	foreignKey({
			columns: [table.bgWeaponId],
			foreignColumns: [backgroundWeaponsInNewContent.id],
			name: "background_ammo_bg_weapon_id_fkey"
		}),
]);

export const backgroundConsumablesInNewContent = newContent.table("background_consumables", {
	id: smallserial().notNull(),
	backgroundId: smallint("background_id"),
	consumableId: smallint("consumable_id"),
	altId: smallint("alt_id"),
}, (table) => [
	foreignKey({
			columns: [table.backgroundId],
			foreignColumns: [backgroundsInNewContent.id],
			name: "background_consumables_background_id_fkey"
		}),
	foreignKey({
			columns: [table.consumableId],
			foreignColumns: [consumablesInNewContent.id],
			name: "background_consumables_consumable_id_fkey"
		}),
	foreignKey({
			columns: [table.altId],
			foreignColumns: [table.id],
			name: "background_consumables_alt_id_fkey"
		}),
]);

export const backgroundGearInNewContent = newContent.table("background_gear", {
	id: smallserial().notNull(),
	backgroundId: smallint("background_id"),
	gearId: smallint("gear_id"),
}, (table) => [
	foreignKey({
			columns: [table.backgroundId],
			foreignColumns: [backgroundsInNewContent.id],
			name: "background_gear_background_id_fkey"
		}),
	foreignKey({
			columns: [table.gearId],
			foreignColumns: [gearInNewContent.id],
			name: "background_gear_gear_id_fkey"
		}),
]);

export const backgroundRobotModulesInNewContent = newContent.table("background_robot_modules", {
	id: smallserial().notNull(),
	backgroundId: smallint("background_id"),
	robotModuleId: smallint("robot_module_id"),
	altId: smallint("alt_id"),
}, (table) => [
	foreignKey({
			columns: [table.backgroundId],
			foreignColumns: [backgroundsInNewContent.id],
			name: "background_robot_modules_background_id_fkey"
		}),
	foreignKey({
			columns: [table.robotModuleId],
			foreignColumns: [robotModulesInNewContent.id],
			name: "background_robot_modules_robot_module_id_fkey"
		}),
	foreignKey({
			columns: [table.altId],
			foreignColumns: [table.id],
			name: "background_robot_modules_alt_id_fkey"
		}),
]);

export const originTraitsInNewContent = newContent.table("origin_traits", {
	id: smallserial().notNull(),
	originId: smallint("origin_id"),
	traitId: smallint("trait_id"),
}, (table) => [
	foreignKey({
			columns: [table.originId],
			foreignColumns: [originsInNewContent.id],
			name: "origin_traits_origin_id_fkey"
		}),
	foreignKey({
			columns: [table.traitId],
			foreignColumns: [traitsInNewContent.id],
			name: "origin_traits_trait_id_fkey"
		}),
]);

export const weaponEffectsInNewContent = newContent.table("weapon_effects", {
	id: smallserial().notNull(),
	weaponId: smallint("weapon_id"),
	effectId: smallint("effect_id"),
	effectVal: smallint("effect_val"),
}, (table) => [
	foreignKey({
			columns: [table.weaponId],
			foreignColumns: [weaponsInNewContent.id],
			name: "weapon_effects_weapon_id_fkey"
		}),
	foreignKey({
			columns: [table.effectId],
			foreignColumns: [damEffectsInNewContent.id],
			name: "weapon_effects_effect_id_fkey"
		}),
]);

export const weaponModPerksInNewContent = newContent.table("weapon_mod_perks", {
	id: smallserial().notNull(),
	modId: smallint("mod_id"),
	perkId: smallint("perk_id"),
	rank: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.modId],
			foreignColumns: [weaponModsInNewContent.id],
			name: "weapon_mod_perks_mod_id_fkey"
		}),
	foreignKey({
			columns: [table.perkId],
			foreignColumns: [perksInNewContent.id],
			name: "weapon_mod_perks_perk_id_fkey"
		}),
]);

export const damEffectsInNewContent = newContent.table("dam_effects", {
	id: smallserial().notNull(),
	name: text(),
	description: text(),
});

export const qualitiesInNewContent = newContent.table("qualities", {
	id: smallserial().notNull(),
	name: text(),
	description: text(),
	opposedTo: smallint("opposed_to"),
}, (table) => [
	foreignKey({
			columns: [table.opposedTo],
			foreignColumns: [table.id],
			name: "qualities_opposed_to_fkey"
		}),
]);

export const weaponsInNewContent = newContent.table("weapons", {
	id: smallserial().notNull(),
	name: text(),
	type: smallint(),
	dam: text(),
	dtype: text(),
	rate: smallint(),
	range: char({ length: 1 }),
	wgt: smallint(),
	cost: smallint(),
	rarity: smallint(),
	ammo: smallint(),
	sourcebookId: smallint("sourcebook_id"),
}, (table) => [
	foreignKey({
			columns: [table.sourcebookId],
			foreignColumns: [sourcebooksInNewContent.id],
			name: "weapons_sourcebook_id_fkey"
		}),
	foreignKey({
			columns: [table.ammo],
			foreignColumns: [ammoInNewContent.id],
			name: "weapons_ammo_fkey"
		}),
	foreignKey({
			columns: [table.type],
			foreignColumns: [skillsInNewContent.id],
			name: "weapons_type_fkey"
		}),
]);

export const weaponQualsInNewContent = newContent.table("weapon_quals", {
	id: smallserial().notNull(),
	weaponId: smallint("weapon_id"),
	qualId: smallint("qual_id"),
	qualVal: smallint("qual_val"),
}, (table) => [
	foreignKey({
			columns: [table.weaponId],
			foreignColumns: [weaponsInNewContent.id],
			name: "weapon_quals_weapon_id_fkey"
		}),
	foreignKey({
			columns: [table.qualId],
			foreignColumns: [qualitiesInNewContent.id],
			name: "weapon_quals_qual_id_fkey"
		}),
]);

export const weaponModAvailableInNewContent = newContent.table("weapon_mod_available", {
	id: smallserial().notNull(),
	weaponId: smallint("weapon_id"),
	modId: smallint("mod_id"),
}, (table) => [
	foreignKey({
			columns: [table.weaponId],
			foreignColumns: [weaponsInNewContent.id],
			name: "weapon_mod_available_weapon_id_fkey"
		}),
	foreignKey({
			columns: [table.modId],
			foreignColumns: [weaponModsInNewContent.id],
			name: "weapon_mod_available_mod_id_fkey"
		}),
]);

export const weaponSlotAvailableInNewContent = newContent.table("weapon_slot_available", {
	id: smallserial().notNull(),
	weaponId: smallint("weapon_id"),
	slotId: smallint("slot_id"),
}, (table) => [
	foreignKey({
			columns: [table.weaponId],
			foreignColumns: [weaponsInNewContent.id],
			name: "weapon_slot_available_weapon_id_fkey"
		}),
	foreignKey({
			columns: [table.slotId],
			foreignColumns: [weaponSlotsInNewContent.id],
			name: "weapon_slot_available_slot_id_fkey"
		}),
]);

export const weaponModsInNewContent = newContent.table("weapon_mods", {
	id: smallserial().notNull(),
	name: text(),
	prefix: text(),
	effects: text().array(),
	slot: smallint(),
	wgt: smallint(),
	cost: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.slot],
			foreignColumns: [weaponSlotsInNewContent.id],
			name: "weapon_mods_slot_fkey"
		}),
]);

export const weaponSlotsInNewContent = newContent.table("weapon_slots", {
	id: smallserial().notNull(),
	name: text(),
});

export const ammoVariantsInNewContent = newContent.table("ammo_variants", {
	id: smallserial().notNull(),
	variant: smallint(),
	base: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.variant],
			foreignColumns: [ammoInNewContent.id],
			name: "ammo_variants_variant_fkey"
		}),
	foreignKey({
			columns: [table.base],
			foreignColumns: [ammoInNewContent.id],
			name: "ammo_variants_base_fkey"
		}),
]);

export const apparelCoversInNewContent = newContent.table("apparel_covers", {
	id: smallserial().notNull(),
	apparelId: smallint("apparel_id"),
	locationId: smallint("location_id"),
}, (table) => [
	foreignKey({
			columns: [table.apparelId],
			foreignColumns: [apparelInNewContent.id],
			name: "apparel_covers_apparel_id_fkey"
		}),
	foreignKey({
			columns: [table.locationId],
			foreignColumns: [bodyLocationsInNewContent.id],
			name: "apparel_covers_location_id_fkey"
		}),
]);

export const apparelModAvailableInNewContent = newContent.table("apparel_mod_available", {
	id: smallserial().notNull(),
	apparelId: smallint("apparel_id"),
	modId: smallint("mod_id"),
}, (table) => [
	foreignKey({
			columns: [table.apparelId],
			foreignColumns: [apparelInNewContent.id],
			name: "apparel_mod_available_apparel_id_fkey"
		}),
	foreignKey({
			columns: [table.modId],
			foreignColumns: [apparelModsInNewContent.id],
			name: "apparel_mod_available_mod_id_fkey"
		}),
]);

export const apparelSlotsInNewContent = newContent.table("apparel_slots", {
	id: smallserial().notNull(),
	name: text(),
});

export const apparelModPerksInNewContent = newContent.table("apparel_mod_perks", {
	id: smallserial().notNull(),
	modId: smallint("mod_id"),
	perkId: smallint("perk_id"),
	rank: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.modId],
			foreignColumns: [apparelModsInNewContent.id],
			name: "apparel_mod_perks_mod_id_fkey"
		}),
	foreignKey({
			columns: [table.perkId],
			foreignColumns: [perksInNewContent.id],
			name: "apparel_mod_perks_perk_id_fkey"
		}),
]);

export const ammoInNewContent = newContent.table("ammo", {
	id: smallserial().notNull(),
	name: text(),
	rollQuantity: text("roll_quantity"),
	wgt: smallint(),
	cost: smallint(),
	rarity: smallint(),
	sourcebookId: smallint("sourcebook_id"),
}, (table) => [
	foreignKey({
			columns: [table.sourcebookId],
			foreignColumns: [sourcebooksInNewContent.id],
			name: "ammo_sourcebook_id_fkey"
		}),
]);

export const apparelInNewContent = newContent.table("apparel", {
	id: smallserial().notNull(),
	name: text(),
	type: smallint(),
	dog: boolean(),
	physDr: smallint("phys_dr"),
	enrgDr: smallint("enrg_dr"),
	radsDr: smallint("rads_dr"),
	eff: text().array(),
	wgt: smallint(),
	cost: smallint(),
	rarity: smallint(),
	baseHealth: smallint("base_health"),
	sourcebookId: smallint("sourcebook_id"),
}, (table) => [
	foreignKey({
			columns: [table.sourcebookId],
			foreignColumns: [sourcebooksInNewContent.id],
			name: "apparel_sourcebook_id_fkey"
		}),
	foreignKey({
			columns: [table.type],
			foreignColumns: [apparelTypesInNewContent.id],
			name: "apparel_type_fkey"
		}),
]);

export const apparelTypesInNewContent = newContent.table("apparel_types", {
	id: smallserial().notNull(),
	name: text(),
});

export const bodyLocationsInNewContent = newContent.table("body_locations", {
	id: smallserial().notNull(),
	name: text(),
	alternateNames: text("alternate_names").array(),
});

export const apparelSlotAvailableInNewContent = newContent.table("apparel_slot_available", {
	id: smallserial().notNull(),
	apparelId: smallint("apparel_id"),
	slotId: smallint("slot_id"),
}, (table) => [
	foreignKey({
			columns: [table.apparelId],
			foreignColumns: [apparelInNewContent.id],
			name: "apparel_slot_available_apparel_id_fkey"
		}),
	foreignKey({
			columns: [table.slotId],
			foreignColumns: [apparelSlotsInNewContent.id],
			name: "apparel_slot_available_slot_id_fkey"
		}),
]);

export const apparelModsInNewContent = newContent.table("apparel_mods", {
	id: smallserial().notNull(),
	name: text(),
	slot: smallint(),
	physDr: smallint("phys_dr"),
	enrgDr: smallint("enrg_dr"),
	radsDr: smallint("rads_dr"),
	health: smallint(),
	effects: text().array(),
	wgt: smallint(),
	cost: smallint(),
	skill: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.slot],
			foreignColumns: [apparelSlotsInNewContent.id],
			name: "apparel_mods_slot_fkey"
		}),
	foreignKey({
			columns: [table.skill],
			foreignColumns: [skillsInNewContent.id],
			name: "apparel_mods_skill_fkey"
		}),
]);

export const robotModulePerksInNewContent = newContent.table("robot_module_perks", {
	id: smallserial().notNull(),
	robotModuleId: smallint("robot_module_id"),
	perkId: smallint("perk_id"),
	rank: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.robotModuleId],
			foreignColumns: [robotModulesInNewContent.id],
			name: "robot_module_perks_robot_module_id_fkey"
		}),
	foreignKey({
			columns: [table.perkId],
			foreignColumns: [perksInNewContent.id],
			name: "robot_module_perks_perk_id_fkey"
		}),
]);

export const robotModulesInNewContent = newContent.table("robot_modules", {
	id: smallserial().notNull(),
	name: text(),
	eff: text().array(),
	wgt: smallint(),
	cost: smallint(),
	rarity: smallint(),
	sourcebookId: smallint("sourcebook_id"),
}, (table) => [
	foreignKey({
			columns: [table.sourcebookId],
			foreignColumns: [sourcebooksInNewContent.id],
			name: "robot_modules_sourcebook_id_fkey"
		}),
]);

export const consumableTypesInNewContent = newContent.table("consumable_types", {
	id: smallserial().notNull(),
	name: text(),
});

export const consumablesInNewContent = newContent.table("consumables", {
	id: smallserial().notNull(),
	name: text(),
	type: smallint(),
	heals: smallint(),
	eff: text().array(),
	rads: smallint(),
	wgt: smallint(),
	cost: smallint(),
	rarity: smallint(),
	duration: char({ length: 1 }),
	addiction: text(),
	sourcebookId: smallint("sourcebook_id"),
}, (table) => [
	foreignKey({
			columns: [table.sourcebookId],
			foreignColumns: [sourcebooksInNewContent.id],
			name: "consumables_sourcebook_id_fkey"
		}),
	foreignKey({
			columns: [table.type],
			foreignColumns: [consumableTypesInNewContent.id],
			name: "consumables_type_fkey"
		}),
]);

export const traitsInNewContent = newContent.table("traits", {
	id: smallserial().notNull(),
	name: text(),
	description: text(),
});

export const gearInNewContent = newContent.table("gear", {
	id: smallserial().notNull(),
	name: text(),
	eff: text().array(),
	wgt: smallint(),
	cost: smallint(),
	rarity: smallint(),
	sourcebookId: smallint("sourcebook_id"),
}, (table) => [
	foreignKey({
			columns: [table.sourcebookId],
			foreignColumns: [sourcebooksInNewContent.id],
			name: "gear_sourcebook_id_fkey"
		}),
]);

export const perksInNewContent = newContent.table("perks", {
	id: smallserial().notNull(),
	name: text(),
	description: text(),
	ranks: smallint(),
	rankRange: smallint("rank_range"),
	levelReq: smallint("level_req"),
	reqs: text().array(),
	limits: text().array(),
	sourcebookId: smallint("sourcebook_id"),
}, (table) => [
	foreignKey({
			columns: [table.sourcebookId],
			foreignColumns: [sourcebooksInNewContent.id],
			name: "perks_sourcebook_id_fkey"
		}),
]);

export const partiesInNewContent = newContent.table("parties", {
	id: smallserial().notNull(),
	name: text(),
	apPlayers: smallint("ap_players"),
	apGm: smallint("ap_gm"),
});

export const skillsInNewContent = newContent.table("skills", {
	id: smallserial().notNull(),
	name: text(),
	special: smallint(),
	examples: text(),
	description: text(),
}, (table) => [
	foreignKey({
			columns: [table.special],
			foreignColumns: [specialInNewContent.id],
			name: "skills_special_fkey"
		}),
]);

export const specialInNewContent = newContent.table("special", {
	id: smallserial().notNull(),
	name: text(),
	description: text(),
});

export const characterAmmoInNewContent = newContent.table("character_ammo", {
	id: smallserial().notNull(),
	ammoId: smallint("ammo_id"),
	quantity: smallint(),
	characterId: smallint("character_id"),
}, (table) => [
	foreignKey({
			columns: [table.ammoId],
			foreignColumns: [ammoInNewContent.id],
			name: "character_ammo_ammo_id_fkey"
		}),
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "character_ammo_character_id_fkey"
		}),
]);

export const characterConsumablesInNewContent = newContent.table("character_consumables", {
	id: smallserial().notNull(),
	consumableId: smallint("consumable_id"),
	quantity: smallint(),
	characterId: smallint("character_id"),
}, (table) => [
	foreignKey({
			columns: [table.consumableId],
			foreignColumns: [consumablesInNewContent.id],
			name: "character_consumables_consumable_id_fkey"
		}),
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "character_consumables_character_id_fkey"
		}),
]);

export const characterWeaponsInNewContent = newContent.table("character_weapons", {
	id: smallserial().notNull(),
	weaponId: smallint("weapon_id"),
	characterId: smallint("character_id"),
}, (table) => [
	foreignKey({
			columns: [table.weaponId],
			foreignColumns: [weaponsInNewContent.id],
			name: "character_weapons_weapon_id_fkey"
		}),
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "character_weapons_character_id_fkey"
		}),
]);

export const characterWeaponModsInNewContent = newContent.table("character_weapon_mods", {
	id: smallserial().notNull(),
	characterWeaponId: smallint("character_weapon_id"),
	modId: smallint("mod_id"),
}, (table) => [
	foreignKey({
			columns: [table.characterWeaponId],
			foreignColumns: [characterWeaponsInNewContent.id],
			name: "character_weapon_mods_character_weapon_id_fkey"
		}),
	foreignKey({
			columns: [table.modId],
			foreignColumns: [weaponModsInNewContent.id],
			name: "character_weapon_mods_mod_id_fkey"
		}),
]);

export const characterWeaponLegendaryInNewContent = newContent.table("character_weapon_legendary", {
	id: smallserial().notNull(),
	characterWeaponId: smallint("character_weapon_id"),
	legendaryId: smallint("legendary_id"),
}, (table) => [
	foreignKey({
			columns: [table.characterWeaponId],
			foreignColumns: [characterWeaponsInNewContent.id],
			name: "character_weapon_legendary_character_weapon_id_fkey"
		}),
	foreignKey({
			columns: [table.legendaryId],
			foreignColumns: [weaponLegendaryInNewContent.id],
			name: "character_weapon_legendary_legendary_id_fkey"
		}),
]);

export const weaponLegendaryInNewContent = newContent.table("weapon_legendary", {
	id: smallserial().notNull(),
	rollTable: smallint("roll_table"),
	name: text(),
	eff: text(),
	sgRoll: smallint("sg_roll"),
	ewRoll: smallint("ew_roll"),
	bgRoll: smallint("bg_roll"),
	mwRoll: smallint("mw_roll"),
	uRoll: smallint("u_roll"),
});

export const characterApparelInNewContent = newContent.table("character_apparel", {
	id: smallserial().notNull(),
	apparelId: smallint("apparel_id"),
	characterId: smallint("character_id"),
	equipped: boolean(),
	legendary: boolean(),
}, (table) => [
	foreignKey({
			columns: [table.apparelId],
			foreignColumns: [apparelInNewContent.id],
			name: "character_apparel_apparel_id_fkey"
		}),
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [playersInNewContent.id],
			name: "character_apparel_character_id_fkey"
		}),
]);

export const characterApparelModsInNewContent = newContent.table("character_apparel_mods", {
	id: smallserial().notNull(),
	characterApparelId: smallint("character_apparel_id"),
	modId: smallint("mod_id"),
}, (table) => [
	foreignKey({
			columns: [table.characterApparelId],
			foreignColumns: [characterApparelInNewContent.id],
			name: "character_apparel_mods_character_apparel_id_fkey"
		}),
	foreignKey({
			columns: [table.modId],
			foreignColumns: [apparelModsInNewContent.id],
			name: "character_apparel_mods_mod_id_fkey"
		}),
]);

export const characterArmorLegendaryInNewContent = newContent.table("character_armor_legendary", {
	id: smallserial().notNull(),
	characterApparelId: smallint("character_apparel_id"),
	legendaryId: smallint("legendary_id"),
}, (table) => [
	foreignKey({
			columns: [table.characterApparelId],
			foreignColumns: [characterApparelInNewContent.id],
			name: "character_armor_legendary_character_apparel_id_fkey"
		}),
	foreignKey({
			columns: [table.legendaryId],
			foreignColumns: [armorLegendaryInNewContent.id],
			name: "character_armor_legendary_legendary_id_fkey"
		}),
]);

export const armorLegendaryInNewContent = newContent.table("armor_legendary", {
	id: smallserial().notNull(),
	name: text(),
	eff: text(),
	headRoll: smallint("head_roll"),
	armRoll: smallint("arm_roll"),
	torsoRoll: smallint("torso_roll"),
	legRoll: smallint("leg_roll"),
});

export const characterGearInNewContent = newContent.table("character_gear", {
	id: smallserial().notNull(),
	gearId: smallint("gear_id"),
	quantity: smallint(),
	characterId: smallint("character_id"),
}, (table) => [
	foreignKey({
			columns: [table.gearId],
			foreignColumns: [gearInNewContent.id],
			name: "character_gear_gear_id_fkey"
		}),
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "character_gear_character_id_fkey"
		}),
]);

export const characterPowerarmorPiecesInNewContent = newContent.table("character_powerarmor_pieces", {
	id: smallserial().notNull(),
	pieceId: smallint("piece_id"),
	modsApplied: smallint("mods_applied").array(),
	characterId: smallint("character_id"),
}, (table) => [
	foreignKey({
			columns: [table.pieceId],
			foreignColumns: [apparelInNewContent.id],
			name: "character_powerarmor_pieces_piece_id_fkey"
		}),
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "character_powerarmor_pieces_character_id_fkey"
		}),
]);

export const characterPowerarmorPieceModsInNewContent = newContent.table("character_powerarmor_piece_mods", {
	id: smallserial().notNull(),
	pieceId: smallint("piece_id"),
	modId: smallint("mod_id"),
}, (table) => [
	foreignKey({
			columns: [table.pieceId],
			foreignColumns: [characterPowerarmorPiecesInNewContent.id],
			name: "character_powerarmor_piece_mods_piece_id_fkey"
		}),
	foreignKey({
			columns: [table.modId],
			foreignColumns: [apparelModsInNewContent.id],
			name: "character_powerarmor_piece_mods_mod_id_fkey"
		}),
]);

export const repairMaterialsInNewContent = newContent.table("repair_materials", {
	rarity: smallint().notNull(),
	common: smallint(),
	uncommon: smallint(),
	rare: smallint(),
});

export const cookRecipesInNewContent = newContent.table("cook_recipes", {
	id: smallserial().notNull(),
	consumable: smallint(),
	junkMaterials: json("junk_materials"),
	complexity: smallint(),
	rarity: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.complexity],
			foreignColumns: [recipeMaterialsInNewContent.complexity],
			name: "cook_recipes_complexity_fkey"
		}),
	foreignKey({
			columns: [table.consumable],
			foreignColumns: [consumablesInNewContent.id],
			name: "cook_recipes_consumable_fkey"
		}),
]);

export const characterPowerarmorFramesInNewContent = newContent.table("character_powerarmor_frames", {
	id: smallserial().notNull(),
	head: smallint(),
	la: smallint(),
	ra: smallint(),
	torso: smallint(),
	ll: smallint(),
	rl: smallint(),
	characterId: smallint("character_id"),
	equipped: boolean(),
	location: text(),
}, (table) => [
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "character_powerarmor_frames_character_id_fkey"
		}),
	foreignKey({
			columns: [table.head],
			foreignColumns: [characterPowerarmorPiecesInNewContent.id],
			name: "character_powerarmor_frames_head_fkey"
		}),
	foreignKey({
			columns: [table.la],
			foreignColumns: [characterPowerarmorPiecesInNewContent.id],
			name: "character_powerarmor_frames_la_fkey"
		}),
	foreignKey({
			columns: [table.ra],
			foreignColumns: [characterPowerarmorPiecesInNewContent.id],
			name: "character_powerarmor_frames_ra_fkey"
		}),
	foreignKey({
			columns: [table.torso],
			foreignColumns: [characterPowerarmorPiecesInNewContent.id],
			name: "character_powerarmor_frames_torso_fkey"
		}),
	foreignKey({
			columns: [table.ll],
			foreignColumns: [characterPowerarmorPiecesInNewContent.id],
			name: "character_powerarmor_frames_ll_fkey"
		}),
	foreignKey({
			columns: [table.rl],
			foreignColumns: [characterPowerarmorPiecesInNewContent.id],
			name: "character_powerarmor_frames_rl_fkey"
		}),
]);

export const chemRecipesInNewContent = newContent.table("chem_recipes", {
	id: smallserial().notNull(),
	consumable: smallint(),
	junkMaterials: json("junk_materials"),
	complexity: smallint(),
	rarity: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.complexity],
			foreignColumns: [recipeMaterialsInNewContent.complexity],
			name: "chem_recipes_complexity_fkey"
		}),
	foreignKey({
			columns: [table.consumable],
			foreignColumns: [consumablesInNewContent.id],
			name: "chem_recipes_consumable_fkey"
		}),
]);

export const characterRobotModulesInNewContent = newContent.table("character_robot_modules", {
	id: smallserial().notNull(),
	moduleId: smallint("module_id"),
	characterId: smallint("character_id"),
	equipped: boolean(),
}, (table) => [
	foreignKey({
			columns: [table.moduleId],
			foreignColumns: [robotModulesInNewContent.id],
			name: "character_robot_modules_module_id_fkey"
		}),
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "character_robot_modules_character_id_fkey"
		}),
]);

export const recipeMaterialsInNewContent = newContent.table("recipe_materials", {
	complexity: smallint().notNull(),
	common: smallint(),
	uncommon: smallint(),
	rare: smallint(),
});

export const chemRecipeConsumablesInNewContent = newContent.table("chem_recipe_consumables", {
	id: smallserial().notNull(),
	chemId: smallint("chem_id"),
	consumableId: smallint("consumable_id"),
}, (table) => [
	foreignKey({
			columns: [table.chemId],
			foreignColumns: [chemRecipesInNewContent.id],
			name: "chem_recipe_consumables_chem_id_fkey"
		}),
	foreignKey({
			columns: [table.consumableId],
			foreignColumns: [consumablesInNewContent.id],
			name: "chem_recipe_consumables_consumable_id_fkey"
		}),
]);

export const chemRecipePerksInNewContent = newContent.table("chem_recipe_perks", {
	id: smallserial().notNull(),
	chemId: smallint("chem_id"),
	perkId: smallint("perk_id"),
	rank: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.chemId],
			foreignColumns: [chemRecipesInNewContent.id],
			name: "chem_recipe_perks_chem_id_fkey"
		}),
	foreignKey({
			columns: [table.perkId],
			foreignColumns: [perksInNewContent.id],
			name: "chem_recipe_perks_perk_id_fkey"
		}),
]);

export const chemRecipeSkillsInNewContent = newContent.table("chem_recipe_skills", {
	id: smallserial().notNull(),
	chemId: smallint("chem_id"),
	skillId: smallint("skill_id"),
}, (table) => [
	foreignKey({
			columns: [table.chemId],
			foreignColumns: [chemRecipesInNewContent.id],
			name: "chem_recipe_skills_chem_id_fkey"
		}),
	foreignKey({
			columns: [table.skillId],
			foreignColumns: [skillsInNewContent.id],
			name: "chem_recipe_skills_skill_id_fkey"
		}),
]);

export const cookRecipeConsumablesInNewContent = newContent.table("cook_recipe_consumables", {
	id: smallserial().notNull(),
	cookId: smallint("cook_id"),
	consumableId: smallint("consumable_id"),
}, (table) => [
	foreignKey({
			columns: [table.cookId],
			foreignColumns: [cookRecipesInNewContent.id],
			name: "cook_recipe_consumables_cook_id_fkey"
		}),
	foreignKey({
			columns: [table.consumableId],
			foreignColumns: [consumablesInNewContent.id],
			name: "cook_recipe_consumables_consumable_id_fkey"
		}),
]);

export const npcCharactersInNewContent = newContent.table("npc_characters", {
	id: smallserial().notNull(),
	name: text(),
	lvl: smallint(),
	type: smallint(),
	keywords: text().array(),
	radsDr: smallint("rads_dr"),
	poisonDr: smallint("poison_dr"),
	headHp: smallint("head_hp"),
	headInj: smallint("head_inj"),
	headPhysDr: smallint("head_phys_dr"),
	headEnrgDr: smallint("head_enrg_dr"),
	laHp: smallint("la_hp"),
	laInj: smallint("la_inj"),
	laPhysDr: smallint("la_phys_dr"),
	laEnrgDr: smallint("la_enrg_dr"),
	raHp: smallint("ra_hp"),
	raInj: smallint("ra_inj"),
	raPhysDr: smallint("ra_phys_dr"),
	raEnrgDr: smallint("ra_enrg_dr"),
	torsoHp: smallint("torso_hp"),
	torsoInj: smallint("torso_inj"),
	torsoPhysDr: smallint("torso_phys_dr"),
	torsoEnrgDr: smallint("torso_enrg_dr"),
	llHp: smallint("ll_hp"),
	llInj: smallint("ll_inj"),
	llPhysDr: smallint("ll_phys_dr"),
	llEnrgDr: smallint("ll_enrg_dr"),
	rlHp: smallint("rl_hp"),
	rlInj: smallint("rl_inj"),
	rlPhysDr: smallint("rl_phys_dr"),
	rlEnrgDr: smallint("rl_enrg_dr"),
	attacks: text().array(),
	abilities: text().array(),
	caps: text(),
	inventory: text().array(),
}, (table) => [
	foreignKey({
			columns: [table.type],
			foreignColumns: [characterTypesInNewContent.id],
			name: "npc_characters_type_fkey"
		}),
]);

export const robotArmorRecipesInNewContent = newContent.table("robot_armor_recipes", {
	id: smallserial().notNull(),
	apparel: smallint(),
	complexity: smallint(),
	rarity: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.complexity],
			foreignColumns: [recipeMaterialsInNewContent.complexity],
			name: "robot_armor_recipes_complexity_fkey"
		}),
	foreignKey({
			columns: [table.apparel],
			foreignColumns: [apparelInNewContent.id],
			name: "robot_armor_recipes_apparel_fkey"
		}),
]);

export const robotModuleRecipesInNewContent = newContent.table("robot_module_recipes", {
	id: smallserial().notNull(),
	robotModule: smallint("robot_module"),
	complexity: smallint(),
	rarity: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.complexity],
			foreignColumns: [recipeMaterialsInNewContent.complexity],
			name: "robot_module_recipes_complexity_fkey"
		}),
	foreignKey({
			columns: [table.robotModule],
			foreignColumns: [robotModulesInNewContent.id],
			name: "robot_module_recipes_robot_module_fkey"
		}),
]);

export const weaponRecipesInNewContent = newContent.table("weapon_recipes", {
	id: smallserial().notNull(),
	weaponMod: smallint("weapon_mod"),
	complexity: smallint(),
	rarity: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.complexity],
			foreignColumns: [recipeMaterialsInNewContent.complexity],
			name: "weapon_recipes_complexity_fkey"
		}),
	foreignKey({
			columns: [table.weaponMod],
			foreignColumns: [weaponModsInNewContent.id],
			name: "weapon_recipes_weapon_mod_fkey"
		}),
]);

export const cookRecipeSkillsInNewContent = newContent.table("cook_recipe_skills", {
	id: smallserial().notNull(),
	cookId: smallint("cook_id"),
	skillId: smallint("skill_id"),
}, (table) => [
	foreignKey({
			columns: [table.cookId],
			foreignColumns: [cookRecipesInNewContent.id],
			name: "cook_recipe_skills_cook_id_fkey"
		}),
	foreignKey({
			columns: [table.skillId],
			foreignColumns: [skillsInNewContent.id],
			name: "cook_recipe_skills_skill_id_fkey"
		}),
]);

export const robotArmorRecipePerksInNewContent = newContent.table("robot_armor_recipe_perks", {
	id: smallserial().notNull(),
	robotArmorId: smallint("robot_armor_id"),
	perkId: smallint("perk_id"),
	rank: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.robotArmorId],
			foreignColumns: [robotArmorRecipesInNewContent.id],
			name: "robot_armor_recipe_perks_robot_armor_id_fkey"
		}),
	foreignKey({
			columns: [table.perkId],
			foreignColumns: [perksInNewContent.id],
			name: "robot_armor_recipe_perks_perk_id_fkey"
		}),
]);

export const robotArmorRecipeSkillsInNewContent = newContent.table("robot_armor_recipe_skills", {
	id: smallserial().notNull(),
	robotArmorId: smallint("robot_armor_id"),
	skillId: smallint("skill_id"),
}, (table) => [
	foreignKey({
			columns: [table.robotArmorId],
			foreignColumns: [robotArmorRecipesInNewContent.id],
			name: "robot_armor_recipe_skills_robot_armor_id_fkey"
		}),
	foreignKey({
			columns: [table.skillId],
			foreignColumns: [skillsInNewContent.id],
			name: "robot_armor_recipe_skills_skill_id_fkey"
		}),
]);

export const robotModuleRecipeSkillsInNewContent = newContent.table("robot_module_recipe_skills", {
	id: smallserial().notNull(),
	robotModuleId: smallint("robot_module_id"),
	skillId: smallint("skill_id"),
}, (table) => [
	foreignKey({
			columns: [table.robotModuleId],
			foreignColumns: [robotModuleRecipesInNewContent.id],
			name: "robot_module_recipe_skills_robot_module_id_fkey"
		}),
	foreignKey({
			columns: [table.skillId],
			foreignColumns: [skillsInNewContent.id],
			name: "robot_module_recipe_skills_skill_id_fkey"
		}),
]);

export const weaponRecipeSkillsInNewContent = newContent.table("weapon_recipe_skills", {
	id: smallserial().notNull(),
	weaponId: smallint("weapon_id"),
	skillId: smallint("skill_id"),
}, (table) => [
	foreignKey({
			columns: [table.weaponId],
			foreignColumns: [weaponRecipesInNewContent.id],
			name: "weapon_recipe_skills_weapon_id_fkey"
		}),
	foreignKey({
			columns: [table.skillId],
			foreignColumns: [skillsInNewContent.id],
			name: "weapon_recipe_skills_skill_id_fkey"
		}),
]);

export const creatureTypesInNewContent = newContent.table("creature_types", {
	id: smallserial().notNull(),
	name: text(),
});

export const encountersInNewContent = newContent.table("encounters", {
	id: smallserial().notNull(),
	sourceTable: text("source_table"),
	sourceId: smallint("source_id"),
	smallintitiative: smallint(),
	partyId: smallint("party_id"),
}, (table) => [
	foreignKey({
			columns: [table.partyId],
			foreignColumns: [partiesInNewContent.id],
			name: "encounters_party_id_fkey"
		}),
]);

export const characterTypesInNewContent = newContent.table("character_types", {
	id: smallserial().notNull(),
	name: text(),
});

export const storefrontsInNewContent = newContent.table("storefronts", {
	id: smallserial().notNull(),
	partyId: smallint("party_id"),
	owningNpc: smallint("owning_npc"),
	caps: smallint(),
	inventory: smallint(),
	junk: json(),
}, (table) => [
	foreignKey({
			columns: [table.partyId],
			foreignColumns: [partiesInNewContent.id],
			name: "storefronts_party_id_fkey"
		}),
	foreignKey({
			columns: [table.owningNpc],
			foreignColumns: [npcCharactersInNewContent.id],
			name: "storefronts_owning_npc_fkey"
		}),
	foreignKey({
			columns: [table.inventory],
			foreignColumns: [storeInventoryInNewContent.id],
			name: "storefronts_inventory_fkey"
		}),
]);

export const storeInventoryInNewContent = newContent.table("store_inventory", {
	id: smallserial().notNull(),
	sourceTable: text("source_table"),
	sourceId: smallint("source_id"),
	quantity: smallint(),
	otherData: text("other_data"),
});

export const coreAmmoLootInNewContent = newContent.table("core_ammo_loot", {
	rollValue: smallint("roll_value").notNull(),
	ammoId: smallint("ammo_id"),
	other: text(),
}, (table) => [
	foreignKey({
			columns: [table.ammoId],
			foreignColumns: [ammoInNewContent.id],
			name: "core_ammo_loot_ammo_id_fkey"
		}),
]);

export const coreArmorLootInNewContent = newContent.table("core_armor_loot", {
	id: smallserial().notNull(),
	rollValue: smallint("roll_value"),
	apparelId: smallint("apparel_id"),
}, (table) => [
	foreignKey({
			columns: [table.apparelId],
			foreignColumns: [apparelInNewContent.id],
			name: "core_armor_loot_apparel_id_fkey"
		}),
]);

export const activeNpcCharactersInNewContent = newContent.table("active_npc_characters", {
	id: smallserial().notNull(),
	character: smallint(),
	name: text(),
	lvl: smallint(),
	currentHealth: smallint("current_health"),
	radsDr: smallint("rads_dr"),
	poisonDr: smallint("poison_dr"),
	headHp: smallint("head_hp"),
	headInj: smallint("head_inj"),
	headPhysDr: smallint("head_phys_dr"),
	headEnrgDr: smallint("head_enrg_dr"),
	laHp: smallint("la_hp"),
	laInj: smallint("la_inj"),
	laPhysDr: smallint("la_phys_dr"),
	laEnrgDr: smallint("la_enrg_dr"),
	raHp: smallint("ra_hp"),
	raInj: smallint("ra_inj"),
	raPhysDr: smallint("ra_phys_dr"),
	raEnrgDr: smallint("ra_enrg_dr"),
	torsoHp: smallint("torso_hp"),
	torsoInj: smallint("torso_inj"),
	torsoPhysDr: smallint("torso_phys_dr"),
	torsoEnrgDr: smallint("torso_enrg_dr"),
	llHp: smallint("ll_hp"),
	llInj: smallint("ll_inj"),
	llPhysDr: smallint("ll_phys_dr"),
	llEnrgDr: smallint("ll_enrg_dr"),
	rlHp: smallint("rl_hp"),
	rlInj: smallint("rl_inj"),
	rlPhysDr: smallint("rl_phys_dr"),
	rlEnrgDr: smallint("rl_enrg_dr"),
	attacks: text().array(),
	abilities: text().array(),
	caps: text(),
	inventory: text().array(),
	partyId: smallint("party_id"),
	notes: text(),
	owningCharacter: smallint("owning_character"),
}, (table) => [
	foreignKey({
			columns: [table.character],
			foreignColumns: [npcCharactersInNewContent.id],
			name: "active_npc_characters_character_fkey"
		}),
	foreignKey({
			columns: [table.partyId],
			foreignColumns: [partiesInNewContent.id],
			name: "active_npc_characters_party_id_fkey"
		}),
	foreignKey({
			columns: [table.owningCharacter],
			foreignColumns: [charactersInNewContent.id],
			name: "active_npc_characters_owning_character_fkey"
		}),
]);

export const activeNpcCreaturesInNewContent = newContent.table("active_npc_creatures", {
	id: smallserial().notNull(),
	creature: smallint(),
	name: text(),
	lvl: smallint(),
	body: smallint(),
	mind: smallint(),
	melee: smallint(),
	guns: smallint(),
	other: smallint(),
	defense: smallint(),
	initiative: smallint(),
	maxHealth: smallint("max_health"),
	currentHealth: smallint("current_health"),
	physDr: smallint("phys_dr"),
	enrgDr: smallint("enrg_dr"),
	radsDr: smallint("rads_dr"),
	poisDr: smallint("pois_dr"),
	headHp: smallint("head_hp"),
	headInj: smallint("head_inj"),
	laHp: smallint("la_hp"),
	laInj: smallint("la_inj"),
	raHp: smallint("ra_hp"),
	raInj: smallint("ra_inj"),
	torsoHp: smallint("torso_hp"),
	torsoInj: smallint("torso_inj"),
	llHp: smallint("ll_hp"),
	llInj: smallint("ll_inj"),
	rlHp: smallint("rl_hp"),
	rlInj: smallint("rl_inj"),
	attacks: text().array(),
	abilities: text().array(),
	inventory: text().array(),
	partyId: smallint("party_id"),
	notes: text(),
	owningCharacter: smallint("owning_character"),
}, (table) => [
	foreignKey({
			columns: [table.creature],
			foreignColumns: [npcCreaturesInNewContent.id],
			name: "active_npc_creatures_creature_fkey"
		}),
	foreignKey({
			columns: [table.partyId],
			foreignColumns: [partiesInNewContent.id],
			name: "active_npc_creatures_party_id_fkey"
		}),
	foreignKey({
			columns: [table.owningCharacter],
			foreignColumns: [charactersInNewContent.id],
			name: "active_npc_creatures_owning_character_fkey"
		}),
]);

export const coreClothingLootInNewContent = newContent.table("core_clothing_loot", {
	rollValue: smallint("roll_value").notNull(),
	apparelId: smallint("apparel_id"),
}, (table) => [
	foreignKey({
			columns: [table.apparelId],
			foreignColumns: [apparelInNewContent.id],
			name: "core_clothing_loot_apparel_id_fkey"
		}),
]);

export const coreFoodLootInNewContent = newContent.table("core_food_loot", {
	rollValue: smallint("roll_value").notNull(),
	consumableId: smallint("consumable_id"),
}, (table) => [
	foreignKey({
			columns: [table.consumableId],
			foreignColumns: [consumablesInNewContent.id],
			name: "core_food_loot_consumable_id_fkey"
		}),
]);

export const coreForagingLootInNewContent = newContent.table("core_foraging_loot", {
	rollValue: smallint("roll_value").notNull(),
	consumableId: smallint("consumable_id"),
}, (table) => [
	foreignKey({
			columns: [table.consumableId],
			foreignColumns: [consumablesInNewContent.id],
			name: "core_foraging_loot_consumable_id_fkey"
		}),
]);

export const coreBeverageLootInNewContent = newContent.table("core_beverage_loot", {
	rollValue: smallint("roll_value").notNull(),
	consumableId: smallint("consumable_id"),
}, (table) => [
	foreignKey({
			columns: [table.consumableId],
			foreignColumns: [consumablesInNewContent.id],
			name: "core_beverage_loot_consumable_id_fkey"
		}),
]);

export const corePublicationsLootInNewContent = newContent.table("core_publications_loot", {
	id: smallserial().notNull(),
	rollValue: smallint("roll_value"),
	consumableId: smallint("consumable_id"),
}, (table) => [
	foreignKey({
			columns: [table.consumableId],
			foreignColumns: [consumablesInNewContent.id],
			name: "core_publications_loot_consumable_id_fkey"
		}),
]);

export const coreRandomLootConsumablesInNewContent = newContent.table("core_random_loot_consumables", {
	rollValue: smallint("roll_value").notNull(),
	consumableId: smallint("consumable_id"),
}, (table) => [
	foreignKey({
			columns: [table.consumableId],
			foreignColumns: [consumablesInNewContent.id],
			name: "core_random_loot_consumables_consumable_id_fkey"
		}),
]);

export const coreRandomLootMoneyInNewContent = newContent.table("core_random_loot_money", {
	rollValue: smallint("roll_value").notNull(),
	prewar: boolean(),
	d20S: smallint(),
});

export const coreRandomLootMiscInNewContent = newContent.table("core_random_loot_misc", {
	rollValue: smallint("roll_value").notNull(),
	item: text(),
});

export const extendedTestCharactersInNewContent = newContent.table("extended_test_characters", {
	id: smallserial().notNull(),
	testId: smallint("test_id"),
	characterId: smallint("character_id"),
}, (table) => [
	foreignKey({
			columns: [table.testId],
			foreignColumns: [extendedTestsInNewContent.id],
			name: "extended_test_characters_test_id_fkey"
		}),
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "extended_test_characters_character_id_fkey"
		}),
]);

export const coreNukaLootInNewContent = newContent.table("core_nuka_loot", {
	id: smallserial().notNull(),
	rollValue: smallint("roll_value"),
	consumableId: smallint("consumable_id"),
	empties: text(),
}, (table) => [
	foreignKey({
			columns: [table.consumableId],
			foreignColumns: [consumablesInNewContent.id],
			name: "core_nuka_loot_consumable_id_fkey"
		}),
]);

export const coreChemLootInNewContent = newContent.table("core_chem_loot", {
	rollValue: smallint("roll_value").notNull(),
	consumableId: smallint("consumable_id"),
}, (table) => [
	foreignKey({
			columns: [table.consumableId],
			foreignColumns: [consumablesInNewContent.id],
			name: "core_chem_loot_consumable_id_fkey"
		}),
]);

export const coreRangedLootInNewContent = newContent.table("core_ranged_loot", {
	id: smallserial().notNull(),
	rollValue: smallint("roll_value"),
	weaponId: smallint("weapon_id"),
	modId: smallint("mod_id"),
}, (table) => [
	foreignKey({
			columns: [table.weaponId],
			foreignColumns: [weaponsInNewContent.id],
			name: "core_ranged_loot_weapon_id_fkey"
		}),
	foreignKey({
			columns: [table.modId],
			foreignColumns: [weaponModsInNewContent.id],
			name: "core_ranged_loot_mod_id_fkey"
		}),
]);

export const coreMeleeLootInNewContent = newContent.table("core_melee_loot", {
	rollValue: smallint("roll_value").notNull(),
	weaponId: smallint("weapon_id"),
}, (table) => [
	foreignKey({
			columns: [table.weaponId],
			foreignColumns: [weaponsInNewContent.id],
			name: "core_melee_loot_weapon_id_fkey"
		}),
]);

export const coreThrownLootInNewContent = newContent.table("core_thrown_loot", {
	rollValue: smallint("roll_value").notNull(),
	weaponId: smallint("weapon_id"),
	quantity: text(),
}, (table) => [
	foreignKey({
			columns: [table.weaponId],
			foreignColumns: [weaponsInNewContent.id],
			name: "core_thrown_loot_weapon_id_fkey"
		}),
]);

export const wandererPublicationsLootInNewContent = newContent.table("wanderer_publications_loot", {
	rollValue: smallint("roll_value"),
	consumableId: smallint("consumable_id"),
}, (table) => [
	foreignKey({
			columns: [table.consumableId],
			foreignColumns: [consumablesInNewContent.id],
			name: "wanderer_publications_loot_consumable_id_fkey"
		}),
]);

export const coreRandomLootRobotModulesInNewContent = newContent.table("core_random_loot_robot_modules", {
	rollValue: smallint("roll_value").notNull(),
	robotModuleId: smallint("robot_module_id"),
}, (table) => [
	foreignKey({
			columns: [table.robotModuleId],
			foreignColumns: [robotModulesInNewContent.id],
			name: "core_random_loot_robot_modules_robot_module_id_fkey"
		}),
]);

export const coreRandomLootGearInNewContent = newContent.table("core_random_loot_gear", {
	rollValue: smallint("roll_value").notNull(),
	gearId: smallint("gear_id"),
	quantity: text(),
}, (table) => [
	foreignKey({
			columns: [table.gearId],
			foreignColumns: [gearInNewContent.id],
			name: "core_random_loot_gear_gear_id_fkey"
		}),
]);

export const extendedTestsInNewContent = newContent.table("extended_tests", {
	id: smallserial().notNull(),
	partyId: smallint("party_id"),
	name: text(),
	breakthroughs: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.partyId],
			foreignColumns: [partiesInNewContent.id],
			name: "extended_tests_party_id_fkey"
		}),
]);

export const factionsInNewContent = newContent.table("factions", {
	id: smallserial().notNull(),
	partyId: smallint("party_id"),
	partyReputation: smallint("party_reputation"),
	factionReputation: json("faction_reputation"),
}, (table) => [
	foreignKey({
			columns: [table.partyId],
			foreignColumns: [partiesInNewContent.id],
			name: "factions_party_id_fkey"
		}),
]);

export const characterDiseasesInNewContent = newContent.table("character_diseases", {
	id: smallserial().notNull(),
	characterId: smallint("character_id"),
	diseaseId: smallint("disease_id"),
}, (table) => [
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "character_diseases_character_id_fkey"
		}),
	foreignKey({
			columns: [table.diseaseId],
			foreignColumns: [diseasesInNewContent.id],
			name: "character_diseases_disease_id_fkey"
		}),
]);

export const diseasesInNewContent = newContent.table("diseases", {
	id: smallserial().notNull(),
	name: text(),
	eff: text(),
	duration: text(),
	sourcebookId: smallint("sourcebook_id"),
}, (table) => [
	foreignKey({
			columns: [table.sourcebookId],
			foreignColumns: [sourcebooksInNewContent.id],
			name: "diseases_sourcebook_id_fkey"
		}),
]);

export const characterApparelRecipesInNewContent = newContent.table("character_apparel_recipes", {
	id: smallserial().notNull(),
	characterId: smallint("character_id"),
	apparelRecipeId: smallint("apparel_recipe_id"),
}, (table) => [
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "character_apparel_recipes_character_id_fkey"
		}),
	foreignKey({
			columns: [table.apparelRecipeId],
			foreignColumns: [apparelRecipesInNewContent.id],
			name: "character_apparel_recipes_apparel_recipe_id_fkey"
		}),
]);

export const apparelRecipesInNewContent = newContent.table("apparel_recipes", {
	id: smallserial().notNull(),
	apparelMod: smallint("apparel_mod"),
	complexity: smallint(),
	rarity: smallint(),
}, (table) => [
	foreignKey({
			columns: [table.complexity],
			foreignColumns: [recipeMaterialsInNewContent.complexity],
			name: "apparel_recipes_complexity_fkey"
		}),
	foreignKey({
			columns: [table.apparelMod],
			foreignColumns: [apparelModsInNewContent.id],
			name: "apparel_recipes_apparel_mod_fkey"
		}),
]);

export const characterPublicationsReadInNewContent = newContent.table("character_publications_read", {
	id: smallserial().notNull(),
	characterId: smallint("character_id"),
	publicationId: smallint("publication_id"),
}, (table) => [
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "character_publications_read_character_id_fkey"
		}),
	foreignKey({
			columns: [table.publicationId],
			foreignColumns: [consumablesInNewContent.id],
			name: "character_publications_read_publication_id_fkey"
		}),
]);

export const playersInNewContent = newContent.table("players", {
	id: smallserial().notNull(),
	username: text(),
	auth: text(),
});

export const partyMembershipInNewContent = newContent.table("party_membership", {
	id: smallserial().notNull(),
	partyId: smallint("party_id"),
	characterId: smallint("character_id"),
}, (table) => [
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [charactersInNewContent.id],
			name: "party_membership_character_id_fkey"
		}),
	foreignKey({
			columns: [table.partyId],
			foreignColumns: [partiesInNewContent.id],
			name: "party_membership_party_id_fkey"
		}),
]);

export const npcCreaturesInNewContent = newContent.table("npc_creatures", {
	id: smallserial().notNull(),
	name: text(),
	lvl: smallint(),
	type: smallint(),
	keywords: text().array(),
	body: smallint(),
	mind: smallint(),
	melee: smallint(),
	guns: smallint(),
	other: smallint(),
	defense: smallint(),
	initiative: smallint(),
	health: smallint(),
	physDr: smallint("phys_dr"),
	enrgDr: smallint("enrg_dr"),
	radsDr: smallint("rads_dr"),
	poisDr: smallint("pois_dr"),
	attacks: text().array(),
	abilities: text().array(),
	butcher: text(),
	salvage: text(),
	caps: text(),
	junk: text(),
	inventory: text().array(),
}, (table) => [
	foreignKey({
			columns: [table.type],
			foreignColumns: [creatureTypesInNewContent.id],
			name: "npc_creatures_type_fkey"
		}),
]);

export const settlementsInNewContent = newContent.table("settlements", {
	id: smallserial().notNull(),
	name: text(),
	partyId: smallint("party_id"),
	isCampsite: boolean("is_campsite"),
	npcLeader: smallint("npc_leader"),
	people: smallint(),
	food: smallint(),
	water: smallint(),
	power: smallint(),
	defense: smallint(),
	beds: smallint(),
	happiness: smallint(),
	income: smallint(),
	stockpile: text().array(),
}, (table) => [
	foreignKey({
			columns: [table.partyId],
			foreignColumns: [partiesInNewContent.id],
			name: "settlements_party_id_fkey"
		}),
	foreignKey({
			columns: [table.npcLeader],
			foreignColumns: [activeNpcCharactersInNewContent.id],
			name: "settlements_npc_leader_fkey"
		}),
]);

export const settlementNpcCreaturesInNewContent = newContent.table("settlement_npc_creatures", {
	id: smallserial().notNull(),
	settlementId: smallint("settlement_id"),
	creatureId: smallint("creature_id"),
}, (table) => [
	foreignKey({
			columns: [table.settlementId],
			foreignColumns: [settlementsInNewContent.id],
			name: "settlement_npc_creatures_settlement_id_fkey"
		}),
	foreignKey({
			columns: [table.creatureId],
			foreignColumns: [activeNpcCreaturesInNewContent.id],
			name: "settlement_npc_creatures_creature_id_fkey"
		}),
]);

export const settlementNpcCharactersInNewContent = newContent.table("settlement_npc_characters", {
	id: smallserial().notNull(),
	settlementId: smallint("settlement_id"),
	characterId: smallint("character_id"),
}, (table) => [
	foreignKey({
			columns: [table.settlementId],
			foreignColumns: [settlementsInNewContent.id],
			name: "settlement_npc_characters_settlement_id_fkey"
		}),
	foreignKey({
			columns: [table.characterId],
			foreignColumns: [activeNpcCharactersInNewContent.id],
			name: "settlement_npc_characters_character_id_fkey"
		}),
]);
