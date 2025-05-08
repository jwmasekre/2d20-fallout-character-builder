CREATE TABLE "characters" (
  "id" smallserial PRIMARY KEY,
  "player_id" smallint,
  "character_name" text,
  "xp" int,
  "origin" smallint,
  "special" json,
  "skills" json,
  "tags" json,
  "luck_points" smallint,
  "current_health" smallint,
  "head_hp" smallint,
  "head_inj" smallint,
  "la_hp" smallint,
  "la_inj" smallint,
  "ra_hp" smallint,
  "ra_inj" smallint,
  "torso_hp" smallint,
  "torso_inj" smallint,
  "ll_hp" smallint,
  "ll_inj" smallint,
  "rl_hp" smallint,
  "rl_inj" smallint,
  "caps" smallint,
  "perks" smallint[],
  "traits" smallint[],
  "addictions" smallint[],
  "weapons" smallint[],
  "ammo" smallint[],
  "apparel" smallint[],
  "powerarmor_frames" smallint[],
  "powerarmor_pieces" smallint[],
  "consumables" smallint[],
  "junk" json,
  "gear" smallint[],
  "robot_modules" smallint[],
  "hunger" smallint,
  "thirst" smallint,
  "sleep" smallint,
  "exposure" smallint,
  "diseases" smallint[],
  "party" smallint,
  "known_apparel_recipes" smallint[],
  "known_chem_recipes" smallint[],
  "known_cook_recipes" smallint[],
  "known_parmor_recipes" smallint[],
  "known_rarmor_recipes" smallint[],
  "known_rmod_recipes" smallint[],
  "known_weapon_recipes" smallint[]
);

CREATE TABLE "players" (
  "id" smallserial PRIMARY KEY,
  "username" text,
  "parties" smallint[],
  "auth" text
);

CREATE TABLE "origins" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "description" text,
  "traits" smallint[],
  "can_ghoul" boolean
);

CREATE TABLE "weapons" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "type" smallint[],
  "dam" text,
  "eff" smallint[],
  "dtype" text,
  "rate" smallint,
  "range" char,
  "quals" smallint[],
  "wgt" smallint,
  "cost" smallint,
  "rarity" smallint,
  "ammo" smallint[],
  "mods_availiable" smallint[],
  "mod_slots" text[]
);

CREATE TABLE "weapon_types" (
  "id" smallserial PRIMARY KEY,
  "name" text
);

CREATE TABLE "weapon_mods" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "prefix" text,
  "slot" smallint,
  "eff" text[],
  "wgt" smallint,
  "cost" smallint,
  "perks" smallint[]
);

CREATE TABLE "weapon_slots" (
  "id" smallserial PRIMARY KEY,
  "name" text
);

CREATE TABLE "ammo" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "roll_quantity" text,
  "wgt" smallint,
  "cost" smallint,
  "rarity" smallint
);

CREATE TABLE "apparel" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "type" smallint,
  "species" text,
  "phys_dr" smallint,
  "enrg_dr" smallint,
  "rads_dr" smallint,
  "covers" smallint[],
  "wgt" smallint,
  "cost" smallint,
  "rarity" smallint,
  "mods_available" smallint[],
  "mod_slots" smallint[],
  "base_health" smallint
);

CREATE TABLE "apparel_types" (
  "id" smallserial PRIMARY KEY,
  "name" text
);

CREATE TABLE "body_locations" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "alternate_names" text[]
);

CREATE TABLE "apparel_mods" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "slot" smallint,
  "phys_dr" smallint,
  "enrg_dr" smallint,
  "rads_dr" smallint,
  "effects" text[],
  "wgt" smallint,
  "cost" smallint,
  "perks" smallint[],
  "skill" smallint
);

CREATE TABLE "apparel_slots" (
  "id" smallserial PRIMARY KEY,
  "name" text
);

CREATE TABLE "consumables" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "type" smallint,
  "heals" smallint,
  "eff" text[],
  "rads" smallint,
  "wgt" smallint,
  "cost" smallint,
  "rarity" smallint,
  "duration" text,
  "addiction" text
);

CREATE TABLE "consumable_types" (
  "id" smallserial PRIMARY KEY,
  "name" text
);

CREATE TABLE "gear" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "eff" text[],
  "wgt" smallint,
  "cost" smallint,
  "rarity" smallint
);

CREATE TABLE "robot_modules" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "eff" text[],
  "wgt" smallint,
  "cost" smallint,
  "rarity" smallint,
  "perks" smallint[]
);

CREATE TABLE "traits" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "description" text,
  "effects" text[]
);

CREATE TABLE "perks" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "description" text,
  "ranks" smallint,
  "rank_range" smallint,
  "reqs" text[],
  "effects" text[],
  "limits" text[]
);

CREATE TABLE "parties" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "ap_players" smallint,
  "ap_gm" smallint
);

CREATE TABLE "skills" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "special" smallint,
  "examples" text,
  "description" text
);

CREATE TABLE "special" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "description" text
);

CREATE TABLE "dam_effects" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "description" text
);

CREATE TABLE "qualities" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "description" text,
  "opposed_to" smallint
);

CREATE TABLE "diseases" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "eff" text[],
  "duration" text
);

CREATE TABLE "player_weapons" (
  "id" smallserial PRIMARY KEY,
  "base_weapon" smallint,
  "mods_applied" smallint[],
  "player_id" smallint
);

CREATE TABLE "player_ammo" (
  "id" smallserial PRIMARY KEY,
  "quantity" smallint,
  "player_id" smallint
);

CREATE TABLE "player_apparel" (
  "id" smallserial PRIMARY KEY,
  "base_apparel" smallint,
  "mods_applied" smallint[],
  "player_id" smallint,
  "equipped" boolean
);

CREATE TABLE "player_consumables" (
  "id" smallserial PRIMARY KEY,
  "quantity" smallint,
  "player_id" smallint
);

CREATE TABLE "player_gear" (
  "id" smallserial PRIMARY KEY,
  "quantity" smallint,
  "player_id" smallint
);

CREATE TABLE "player_powerarmor_frames" (
  "id" smallserial PRIMARY KEY,
  "pieces_installed" smallint[],
  "player_id" smallint,
  "equipped" boolean,
  "location" text
);

CREATE TABLE "player_powerarmor_pieces" (
  "id" smallserial PRIMARY KEY,
  "base_piece" smallint,
  "mods_applied" smallint[],
  "player_id" smallint
);

CREATE TABLE "player_robot_modules" (
  "id" smallserial PRIMARY KEY,
  "base_module" smallint,
  "player_id" smallint,
  "equipped" boolean
);

CREATE TABLE "repair_materials" (
  "rarity" smallint PRIMARY KEY,
  "common" smallint,
  "uncommon" smallint,
  "rare" smallint
);

CREATE TABLE "recipe_materials" (
  "complexity" smallint PRIMARY KEY,
  "common" smallint,
  "uncommon" smallint,
  "rare" smallint
);

CREATE TABLE "apparel_recipes" (
  "id" smallserial PRIMARY KEY,
  "apparel_mod" smallint,
  "complexity" smallint,
  "rarity" smallint
);

CREATE TABLE "chem_recipes" (
  "id" smallserial PRIMARY KEY,
  "consumable" smallint,
  "junk_materials" json,
  "consumable_materials" smallint[],
  "perks" smallint[],
  "skill" smallint[],
  "complexity" smallint,
  "rarity" smallint
);

CREATE TABLE "cook_recipes" (
  "id" smallserial PRIMARY KEY,
  "consumable" smallint,
  "junk_materials" json,
  "consumable_materials" smallint[],
  "skill" smallint[],
  "complexity" smallint,
  "rarity" smallint
);

CREATE TABLE "powerarmor_recipes" (
  "id" smallserial PRIMARY KEY,
  "apparel_mod" smallint,
  "complexity" smallint,
  "rarity" smallint
);

CREATE TABLE "robot_armor_recipes" (
  "id" smallserial PRIMARY KEY,
  "apparel" smallint,
  "perks" smallint[],
  "skill" smallint[],
  "complexity" smallint,
  "rarity" smallint
);

CREATE TABLE "robot_module_recipes" (
  "id" smallserial PRIMARY KEY,
  "robot_module" smallint,
  "skill" smallint[],
  "complexity" smallint,
  "rarity" smallint
);

CREATE TABLE "weapon_recipes" (
  "id" smallserial PRIMARY KEY,
  "weapon_mod" smallint,
  "skill" smallint[],
  "complexity" smallint,
  "rarity" smallint
);

CREATE TABLE "npc_creatures" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "lvl" smallint,
  "type" smallint,
  "keywords" text[],
  "body" smallint,
  "mind" smallint,
  "melee" smallint,
  "guns" smallint,
  "other" smallint,
  "defense" smallint,
  "initiative" smallint,
  "health" smallint,
  "phys_dr" smallint,
  "enrg_dr" smallint,
  "rads_dr" smallint,
  "pois_dr" smallint,
  "attacks" text[],
  "abilities" text[],
  "butcher" text,
  "salvage" text,
  "caps" text,
  "junk" text,
  "inventory" text[]
);

CREATE TABLE "creature_types" (
  "id" smallserial PRIMARY KEY,
  "name" text
);

CREATE TABLE "npc_characters" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "lvl" smallint,
  "type" smallint,
  "keywords" text[],
  "special" json,
  "skills" json,
  "rads_dr" smallint,
  "poison_dr" smallint,
  "head_hp" smallint,
  "head_inj" smallint,
  "head_phys_dr" smallint,
  "head_enrg_dr" smallint,
  "la_hp" smallint,
  "la_inj" smallint,
  "la_phys_dr" smallint,
  "la_enrg_dr" smallint,
  "ra_hp" smallint,
  "ra_inj" smallint,
  "ra_phys_dr" smallint,
  "ra_enrg_dr" smallint,
  "torso_hp" smallint,
  "torso_inj" smallint,
  "torso_phys_dr" smallint,
  "torso_enrg_dr" smallint,
  "ll_hp" smallint,
  "ll_inj" smallint,
  "ll_phys_dr" smallint,
  "ll_enrg_dr" smallint,
  "rl_hp" smallint,
  "rl_inj" smallint,
  "rl_phys_dr" smallint,
  "rl_enrg_dr" smallint,
  "attacks" text[],
  "abilities" text[],
  "caps" text,
  "inventory" text[]
);

CREATE TABLE "character_types" (
  "id" smallserial PRIMARY KEY,
  "name" text
);

CREATE TABLE "active_npc_creatures" (
  "id" smallserial PRIMARY KEY,
  "creature" smallint,
  "name" text,
  "lvl" smallint,
  "body" smallint,
  "mind" smallint,
  "melee" smallint,
  "guns" smallint,
  "other" smallint,
  "defense" smallint,
  "initiative" smallint,
  "max_health" smallint,
  "current_health" smallint,
  "phys_dr" smallint,
  "enrg_dr" smallint,
  "rads_dr" smallint,
  "pois_dr" smallint,
  "head_hp" smallint,
  "head_inj" smallint,
  "la_hp" smallint,
  "la_inj" smallint,
  "ra_hp" smallint,
  "ra_inj" smallint,
  "torso_hp" smallint,
  "torso_inj" smallint,
  "ll_hp" smallint,
  "ll_inj" smallint,
  "rl_hp" smallint,
  "rl_inj" smallint,
  "attacks" text[],
  "abilities" text[],
  "inventory" text[],
  "party_id" smallint,
  "notes" text,
  "owning_player" smallint
);

CREATE TABLE "active_npc_characters" (
  "id" smallserial PRIMARY KEY,
  "character" smallint,
  "name" text,
  "lvl" smallint,
  "special" json,
  "skills" json,
  "current_health" smallint,
  "rads_dr" smallint,
  "poison_dr" smallint,
  "head_hp" smallint,
  "head_inj" smallint,
  "head_phys_dr" smallint,
  "head_enrg_dr" smallint,
  "la_hp" smallint,
  "la_inj" smallint,
  "la_phys_dr" smallint,
  "la_enrg_dr" smallint,
  "ra_hp" smallint,
  "ra_inj" smallint,
  "ra_phys_dr" smallint,
  "ra_enrg_dr" smallint,
  "torso_hp" smallint,
  "torso_inj" smallint,
  "torso_phys_dr" smallint,
  "torso_enrg_dr" smallint,
  "ll_hp" smallint,
  "ll_inj" smallint,
  "ll_phys_dr" smallint,
  "ll_enrg_dr" smallint,
  "rl_hp" smallint,
  "rl_inj" smallint,
  "rl_phys_dr" smallint,
  "rl_enrg_dr" smallint,
  "attacks" text[],
  "abilities" text[],
  "caps" text,
  "inventory" text[],
  "party_id" smallint,
  "notes" text,
  "owning_player" smallint
);

CREATE TABLE "encounters" (
  "id" smallserial PRIMARY KEY,
  "source_table" text,
  "source_id" smallint,
  "smallintitiative" smallint,
  "party_id" smallint
);

CREATE TABLE "storefronts" (
  "id" smallserial PRIMARY KEY,
  "party_id" smallint,
  "owning_npc" smallint,
  "caps" smallint,
  "inventory" smallint,
  "junk" json
);

CREATE TABLE "store_inventory" (
  "id" smallserial PRIMARY KEY,
  "source_table" text,
  "source_id" smallint,
  "quantity" smallint,
  "other_data" text
);

CREATE TABLE "loot_tables" (
  "id" smallserial PRIMARY KEY,
  "type" text,
  "d20s" smallint,
  "die_value" smallint,
  "source_table" text,
  "source_id" smallint,
  "quantity" smallint,
  "other_data" text
);

CREATE TABLE "extended_tests" (
  "id" smallserial PRIMARY KEY,
  "party_id" smallint,
  "name" text,
  "breakthroughs" smallint,
  "characters" smallint[]
);

CREATE TABLE "factions" (
  "id" smallserial PRIMARY KEY,
  "party_id" smallint,
  "party_reputation" smallint,
  "faction_reputation" json
);

CREATE TABLE "scavenging_locations" (
  "id" smallserial PRIMARY KEY
);

CREATE TABLE "encounter_tables" (
  "id" smallserial PRIMARY KEY,
  "type" text,
  "die_roll" smallint,
  "name" text,
  "description" text
);

CREATE TABLE "settlements" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "party_id" smallint,
  "is_campsite" boolean,
  "npc_leader" smallint,
  "creatures" smallint[],
  "npcs" smallint[],
  "people" smallint,
  "food" smallint,
  "water" smallint,
  "power" smallint,
  "defense" smallint,
  "beds" smallint,
  "happiness" smallint,
  "income" smallint,
  "stockpile" text[]
);

ALTER TABLE "characters" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id");

ALTER TABLE "characters" ADD FOREIGN KEY ("origin") REFERENCES "origins" ("id");

ALTER TABLE "weapons" ADD FOREIGN KEY ("type") REFERENCES "weapon_types" ("id");

ALTER TABLE "weapons" ADD FOREIGN KEY ("mods_availiable") REFERENCES "weapon_mods" ("id");

ALTER TABLE "weapons" ADD FOREIGN KEY ("mod_slots") REFERENCES "weapon_slots" ("id");

ALTER TABLE "weapon_mods" ADD FOREIGN KEY ("slot") REFERENCES "weapon_slots" ("id");

ALTER TABLE "weapons" ADD FOREIGN KEY ("ammo") REFERENCES "ammo" ("id");

ALTER TABLE "apparel" ADD FOREIGN KEY ("type") REFERENCES "apparel_types" ("id");

ALTER TABLE "apparel" ADD FOREIGN KEY ("covers") REFERENCES "body_locations" ("id");

ALTER TABLE "apparel" ADD FOREIGN KEY ("mods_available") REFERENCES "apparel_mods" ("id");

ALTER TABLE "apparel" ADD FOREIGN KEY ("mod_slots") REFERENCES "apparel_slots" ("id");

ALTER TABLE "apparel_mods" ADD FOREIGN KEY ("slot") REFERENCES "apparel_slots" ("id");

ALTER TABLE "consumables" ADD FOREIGN KEY ("type") REFERENCES "consumable_types" ("id");

ALTER TABLE "origins" ADD FOREIGN KEY ("traits") REFERENCES "traits" ("id");

ALTER TABLE "characters" ADD FOREIGN KEY ("traits") REFERENCES "traits" ("id");

ALTER TABLE "characters" ADD FOREIGN KEY ("perks") REFERENCES "perks" ("id");

ALTER TABLE "weapon_mods" ADD FOREIGN KEY ("perks") REFERENCES "perks" ("id");

ALTER TABLE "apparel_mods" ADD FOREIGN KEY ("perks") REFERENCES "perks" ("id");

ALTER TABLE "robot_modules" ADD FOREIGN KEY ("perks") REFERENCES "perks" ("id");

ALTER TABLE "characters" ADD FOREIGN KEY ("party") REFERENCES "parties" ("id");

ALTER TABLE "apparel_mods" ADD FOREIGN KEY ("skill") REFERENCES "skills" ("id");

ALTER TABLE "skills" ADD FOREIGN KEY ("special") REFERENCES "special" ("id");

ALTER TABLE "weapons" ADD FOREIGN KEY ("eff") REFERENCES "dam_effects" ("id");

ALTER TABLE "weapons" ADD FOREIGN KEY ("quals") REFERENCES "qualities" ("id");

ALTER TABLE "qualities" ADD FOREIGN KEY ("opposed_to") REFERENCES "qualities" ("id");

ALTER TABLE "player_weapons" ADD FOREIGN KEY ("base_weapon") REFERENCES "weapons" ("id");

ALTER TABLE "player_weapons" ADD FOREIGN KEY ("mods_applied") REFERENCES "weapon_mods" ("id");

ALTER TABLE "player_weapons" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id");

ALTER TABLE "characters" ADD FOREIGN KEY ("weapons") REFERENCES "player_weapons" ("id");

ALTER TABLE "player_ammo" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id");

ALTER TABLE "characters" ADD FOREIGN KEY ("ammo") REFERENCES "player_ammo" ("id");

ALTER TABLE "player_apparel" ADD FOREIGN KEY ("base_apparel") REFERENCES "apparel" ("id");

ALTER TABLE "player_apparel" ADD FOREIGN KEY ("mods_applied") REFERENCES "apparel_mods" ("id");

ALTER TABLE "player_apparel" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id");

ALTER TABLE "characters" ADD FOREIGN KEY ("apparel") REFERENCES "player_apparel" ("id");

ALTER TABLE "player_consumables" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id");

ALTER TABLE "characters" ADD FOREIGN KEY ("consumables") REFERENCES "player_consumables" ("id");

ALTER TABLE "player_gear" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id");

ALTER TABLE "characters" ADD FOREIGN KEY ("gear") REFERENCES "player_gear" ("id");

ALTER TABLE "characters" ADD FOREIGN KEY ("powerarmor_frames") REFERENCES "player_powerarmor_frames" ("id");

ALTER TABLE "player_powerarmor_frames" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id");

ALTER TABLE "player_powerarmor_frames" ADD FOREIGN KEY ("pieces_installed") REFERENCES "player_powerarmor_pieces" ("id");

ALTER TABLE "characters" ADD FOREIGN KEY ("powerarmor_pieces") REFERENCES "player_powerarmor_pieces" ("id");

ALTER TABLE "player_powerarmor_pieces" ADD FOREIGN KEY ("base_piece") REFERENCES "apparel" ("id");

ALTER TABLE "player_powerarmor_pieces" ADD FOREIGN KEY ("mods_applied") REFERENCES "apparel_mods" ("id");

ALTER TABLE "player_powerarmor_pieces" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id");

ALTER TABLE "player_robot_modules" ADD FOREIGN KEY ("base_module") REFERENCES "robot_modules" ("id");

ALTER TABLE "player_robot_modules" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id");

ALTER TABLE "characters" ADD FOREIGN KEY ("robot_modules") REFERENCES "player_robot_modules" ("id");

ALTER TABLE "apparel_recipes" ADD FOREIGN KEY ("complexity") REFERENCES "recipe_materials" ("complexity");

ALTER TABLE "apparel_recipes" ADD FOREIGN KEY ("apparel_mod") REFERENCES "apparel_mods" ("id");

ALTER TABLE "characters" ADD FOREIGN KEY ("known_apparel_recipes") REFERENCES "apparel_recipes" ("id");

ALTER TABLE "chem_recipes" ADD FOREIGN KEY ("complexity") REFERENCES "recipe_materials" ("complexity");

ALTER TABLE "chem_recipes" ADD FOREIGN KEY ("consumable") REFERENCES "consumables" ("id");

ALTER TABLE "chem_recipes" ADD FOREIGN KEY ("consumable_materials") REFERENCES "consumables" ("id");

ALTER TABLE "chem_recipes" ADD FOREIGN KEY ("perks") REFERENCES "perks" ("id");

ALTER TABLE "chem_recipes" ADD FOREIGN KEY ("skill") REFERENCES "skills" ("id");

ALTER TABLE "characters" ADD FOREIGN KEY ("known_chem_recipes") REFERENCES "chem_recipes" ("id");

ALTER TABLE "cook_recipes" ADD FOREIGN KEY ("complexity") REFERENCES "recipe_materials" ("complexity");

ALTER TABLE "cook_recipes" ADD FOREIGN KEY ("consumable") REFERENCES "consumables" ("id");

ALTER TABLE "cook_recipes" ADD FOREIGN KEY ("consumable_materials") REFERENCES "consumables" ("id");

ALTER TABLE "cook_recipes" ADD FOREIGN KEY ("skill") REFERENCES "skills" ("id");

ALTER TABLE "characters" ADD FOREIGN KEY ("known_cook_recipes") REFERENCES "cook_recipes" ("id");

ALTER TABLE "powerarmor_recipes" ADD FOREIGN KEY ("complexity") REFERENCES "recipe_materials" ("complexity");

ALTER TABLE "powerarmor_recipes" ADD FOREIGN KEY ("apparel_mod") REFERENCES "apparel_mods" ("id");

ALTER TABLE "characters" ADD FOREIGN KEY ("known_parmor_recipes") REFERENCES "powerarmor_recipes" ("id");

ALTER TABLE "robot_armor_recipes" ADD FOREIGN KEY ("complexity") REFERENCES "recipe_materials" ("complexity");

ALTER TABLE "robot_armor_recipes" ADD FOREIGN KEY ("apparel") REFERENCES "apparel" ("id");

ALTER TABLE "robot_armor_recipes" ADD FOREIGN KEY ("perks") REFERENCES "perks" ("id");

ALTER TABLE "robot_armor_recipes" ADD FOREIGN KEY ("skill") REFERENCES "skills" ("id");

ALTER TABLE "characters" ADD FOREIGN KEY ("known_rarmor_recipes") REFERENCES "robot_armor_recipes" ("id");

ALTER TABLE "robot_module_recipes" ADD FOREIGN KEY ("complexity") REFERENCES "recipe_materials" ("complexity");

ALTER TABLE "robot_module_recipes" ADD FOREIGN KEY ("robot_module") REFERENCES "robot_modules" ("id");

ALTER TABLE "robot_module_recipes" ADD FOREIGN KEY ("skill") REFERENCES "skills" ("id");

ALTER TABLE "characters" ADD FOREIGN KEY ("known_rmod_recipes") REFERENCES "robot_module_recipes" ("id");

ALTER TABLE "weapon_recipes" ADD FOREIGN KEY ("complexity") REFERENCES "recipe_materials" ("complexity");

ALTER TABLE "weapon_recipes" ADD FOREIGN KEY ("weapon_mod") REFERENCES "weapon_mods" ("id");

ALTER TABLE "weapon_recipes" ADD FOREIGN KEY ("skill") REFERENCES "skills" ("id");

ALTER TABLE "characters" ADD FOREIGN KEY ("known_weapon_recipes") REFERENCES "weapon_recipes" ("id");

ALTER TABLE "npc_creatures" ADD FOREIGN KEY ("type") REFERENCES "creature_types" ("id");

ALTER TABLE "npc_characters" ADD FOREIGN KEY ("type") REFERENCES "character_types" ("id");

ALTER TABLE "active_npc_creatures" ADD FOREIGN KEY ("creature") REFERENCES "npc_creatures" ("id");

ALTER TABLE "active_npc_creatures" ADD FOREIGN KEY ("party_id") REFERENCES "parties" ("id");

ALTER TABLE "active_npc_creatures" ADD FOREIGN KEY ("owning_player") REFERENCES "players" ("id");

ALTER TABLE "active_npc_characters" ADD FOREIGN KEY ("character") REFERENCES "npc_characters" ("id");

ALTER TABLE "active_npc_characters" ADD FOREIGN KEY ("party_id") REFERENCES "parties" ("id");

ALTER TABLE "active_npc_characters" ADD FOREIGN KEY ("owning_player") REFERENCES "players" ("id");

ALTER TABLE "encounters" ADD FOREIGN KEY ("party_id") REFERENCES "parties" ("id");

ALTER TABLE "storefronts" ADD FOREIGN KEY ("party_id") REFERENCES "parties" ("id");

ALTER TABLE "storefronts" ADD FOREIGN KEY ("owning_npc") REFERENCES "npc_characters" ("id");

ALTER TABLE "storefronts" ADD FOREIGN KEY ("inventory") REFERENCES "store_inventory" ("id");

ALTER TABLE "extended_tests" ADD FOREIGN KEY ("party_id") REFERENCES "parties" ("id");

ALTER TABLE "extended_tests" ADD FOREIGN KEY ("characters") REFERENCES "characters" ("id");

ALTER TABLE "factions" ADD FOREIGN KEY ("party_id") REFERENCES "parties" ("id");

ALTER TABLE "settlements" ADD FOREIGN KEY ("party_id") REFERENCES "parties" ("id");

ALTER TABLE "settlements" ADD FOREIGN KEY ("npc_leader") REFERENCES "active_npc_characters" ("id");

ALTER TABLE "settlements" ADD FOREIGN KEY ("creatures") REFERENCES "active_npc_creatures" ("id");

ALTER TABLE "settlements" ADD FOREIGN KEY ("npcs") REFERENCES "active_npc_characters" ("id");
