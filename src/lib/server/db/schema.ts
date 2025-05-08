import { pgTable, serial, text, integer, boolean, json } from 'drizzle-orm/pg-core';

export const characters = pgTable('characters', {
	id: serial('id').primaryKey(),

	name: text('name').notNull(),
	level: integer('level').notNull(),
	xp: integer('xp').notNull(),
  
	origin: text('origin').notNull(),
	background: text('background'),
	isGhoul: boolean('is_ghoul').notNull(),
	isRobot: boolean('is_robot').notNull(),
	isSynth: boolean('is_synth').notNull(),
	hasDogmeat: boolean('has_dogmeat').notNull(),
  
	caps: integer('caps').notNull(),

	traits: json('traits').notNull(), // string[]
	specialStats: json('special_stats').notNull(), // { strength, perception, ... }
	skillStats: json('skill_stats').notNull(), // { athletics, barter, ... }
	tagSkills: json('tag_skills').notNull(), // { athletics: true, ... }
	perks: json('perks').notNull(), // string[]
	stats: json('stats').notNull(), // HP, DRs, etc.
	weapons: json('weapons').notNull(), // string[]
	weaponMods: json('weapon_mods').notNull(), // string[] or object[]
	apparel: json('apparel').notNull(), // [{ "vault-jumpsuit": true }, ...]
	armorMods: json('armor_mods').notNull(),
	robotModules: json('robot_modules').notNull(),
	ammo: json('ammo').notNull(), // [{ "10mm": 11 }]
	consumables: json('consumables').notNull(), // [{ "stimpak": 2 }]
	gear: json('gear').notNull(), // [{ "pip-boy": 1 }]
	junk: json('junk').notNull(), // { common, uncommon, rare }
	fatigue: json('fatigue').notNull(), // { hunger, sleep, etc. }
});
