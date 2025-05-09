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
  "hunger" smallint,
  "thirst" smallint,
  "sleep" smallint,
  "exposure" smallint,
  "party" smallint
);

CREATE TABLE "character_perks" (
  "id" smallserial PRIMARY KEY,
  "character_id" smallint,
  "perk_id" smallint
);

CREATE TABLE "character_traits" (
  "id" smallserial PRIMARY KEY,
  "character_id" smallint,
  "trait_id" smallint
);

CREATE TABLE "character_addictions" (
  "id" smallserial PRIMARY KEY,
  "character_id" smallint,
  "consumable_id" smallint
);

CREATE TABLE "character_diseases" (
  "id" smallserial PRIMARY KEY,
  "character_id" smallint,
  "disease_id" smallint
);

CREATE TABLE "character_apparel_recipes" (
  "id" smallserial PRIMARY KEY,
  "character_id" smallint,
  "apparel_recipe_id" smallint
);

CREATE TABLE "character_chem_recipes" (
  "id" smallserial PRIMARY KEY,
  "character_id" smallint,
  "chem_recipe_id" smallint
);

CREATE TABLE "character_cook_recipes" (
  "id" smallserial PRIMARY KEY,
  "character_id" smallint,
  "cook_recipe_id" smallint
);

CREATE TABLE "character_powerarmor_recipes" (
  "id" smallserial PRIMARY KEY,
  "character_id" smallint,
  "powerarmor_recipe_id" smallint
);

CREATE TABLE "character_robot_armor_recipes" (
  "id" smallserial PRIMARY KEY,
  "character_id" smallint,
  "robot_armor_recipe_id" smallint
);

CREATE TABLE "character_robot_modules_recipes" (
  "id" smallserial PRIMARY KEY,
  "character_id" smallint,
  "robot_modules_recipe_id" smallint
);

CREATE TABLE "character_weapon_recipes" (
  "id" smallserial PRIMARY KEY,
  "character_id" smallint,
  "weapon_recipe_id" smallint
);

CREATE TABLE "players" (
  "id" smallserial PRIMARY KEY,
  "username" text,
  "auth" text
);

CREATE TABLE "party_membership" (
  "id" smallserial PRIMARY KEY,
  "party_id" smallint,
  "player_id" smallint
);

CREATE TABLE "origins" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "description" text,
  "can_ghoul" boolean
);

CREATE TABLE "origin_traits" (
  "id" smallserial PRIMARY KEY,
  "origin_id" smallint,
  "trait_id" smallint
);

CREATE TABLE "weapons" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "type" smallint,
  "dam" text,
  "dtype" text,
  "rate" smallint,
  "range" char,
  "wgt" smallint,
  "cost" smallint,
  "rarity" smallint,
  "ammo" smallint
);

CREATE TABLE "weapon_effects" (
  "id" smallserial PRIMARY KEY,
  "weapon_id" smallint,
  "effect_id" smallint
);

CREATE TABLE "weapon_quals" (
  "id" smallserial PRIMARY KEY,
  "weapon_id" smallint,
  "qual_id" smallint
);

CREATE TABLE "weapon_mod_available" (
  "id" smallserial PRIMARY KEY,
  "weapon_id" smallint,
  "mod_id" smallint
);

CREATE TABLE "weapon_slot_available" (
  "id" smallserial PRIMARY KEY,
  "weapon_id" smallint,
  "slot_id" smallint
);

CREATE TABLE "weapon_mods" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "prefix" text,
  "slot" smallint,
  "wgt" smallint,
  "cost" smallint
);

CREATE TABLE "weapon_mod_effects" (
  "id" smallserial PRIMARY KEY,
  "mod_id" smallint,
  "effect_id" smallint
);

CREATE TABLE "weapon_mod_perks" (
  "id" smallserial PRIMARY KEY,
  "mod_id" smallint,
  "perk_id" smallint
);

CREATE TABLE "weapon_slots" (
  "id" smallserial PRIMARY KEY,
  "name" text
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
  "wgt" smallint,
  "cost" smallint,
  "rarity" smallint,
  "base_health" smallint
);

CREATE TABLE "apparel_types" (
  "id" smallserial PRIMARY KEY,
  "name" text
);

CREATE TABLE "apparel_covers" (
  "id" smallserial PRIMARY KEY,
  "apparel_id" smallint,
  "location_id" smallint
);

CREATE TABLE "body_locations" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "alternate_names" text[]
);

CREATE TABLE "apparel_mod_available" (
  "id" smallserial PRIMARY KEY,
  "apparel_id" smallint,
  "mod_id" smallint
);

CREATE TABLE "apparel_slot_available" (
  "id" smallserial PRIMARY KEY,
  "apparel_id" smallint,
  "slot_id" smallint
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
  "skill" smallint
);

CREATE TABLE "apparel_slots" (
  "id" smallserial PRIMARY KEY,
  "name" text
);

CREATE TABLE "apparel_mod_perks" (
  "id" smallserial PRIMARY KEY,
  "mod_id" smallint,
  "perk_id" smallint
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
  "rarity" smallint
);

CREATE TABLE "robot_module_perks" (
  "id" smallserial PRIMARY KEY,
  "robot_module_id" smallint,
  "perk_id" smallint
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

CREATE TABLE "diseases" (
  "id" smallserial PRIMARY KEY,
  "name" text,
  "eff" text[],
  "duration" text
);

CREATE TABLE "character_weapons" (
  "id" smallserial PRIMARY KEY,
  "weapon_id" smallint,
  "character_id" smallint
);

CREATE TABLE "character_weapon_mods" (
  "id" smallserial PRIMARY KEY,
  "character_weapon_id" smallint,
  "mod_id" smallint
);

CREATE TABLE "character_ammo" (
  "id" smallserial PRIMARY KEY,
  "quantity" smallint,
  "character_id" smallint
);

CREATE TABLE "character_apparel" (
  "id" smallserial PRIMARY KEY,
  "apparel_id" smallint,
  "character_id" smallint,
  "equipped" boolean
);

CREATE TABLE "character_apparel_mods" (
  "id" smallserial PRIMARY KEY,
  "character_apparel_id" smallint,
  "mod_id" smallint
);

CREATE TABLE "character_consumables" (
  "id" smallserial PRIMARY KEY,
  "quantity" smallint,
  "character_id" smallint
);

CREATE TABLE "character_gear" (
  "id" smallserial PRIMARY KEY,
  "quantity" smallint,
  "character_id" smallint
);

CREATE TABLE "character_powerarmor_frames" (
  "id" smallserial PRIMARY KEY,
  "head" smallint,
  "la" smallint,
  "ra" smallint,
  "torso" smallint,
  "ll" smallint,
  "rl" smallint,
  "character_id" smallint,
  "equipped" boolean,
  "location" text
);

CREATE TABLE "character_powerarmor_pieces" (
  "id" smallserial PRIMARY KEY,
  "piece_id" smallint,
  "mods_applied" smallint[],
  "character_id" smallint
);

CREATE TABLE "character_powerarmor_piece_mods" (
  "id" smallserial PRIMARY KEY,
  "piece_id" smallint,
  "mod_id" smallint
);

CREATE TABLE "character_robot_modules" (
  "id" smallserial PRIMARY KEY,
  "module_id" smallint,
  "character_id" smallint,
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
  "complexity" smallint,
  "rarity" smallint
);

CREATE TABLE "chem_recipe_consumables" (
  "id" smallserial PRIMARY KEY,
  "chem_id" smallint,
  "consumable_id" smallint
);

CREATE TABLE "chem_recipe_perks" (
  "id" smallserial PRIMARY KEY,
  "chem_id" smallint,
  "perk_id" smallint
);

CREATE TABLE "chem_recipe_skills" (
  "id" smallserial PRIMARY KEY,
  "chem_id" smallint,
  "skill_id" smallint
);

CREATE TABLE "cook_recipes" (
  "id" smallserial PRIMARY KEY,
  "consumable" smallint,
  "junk_materials" json,
  "complexity" smallint,
  "rarity" smallint
);

CREATE TABLE "cook_recipe_consumables" (
  "id" smallserial PRIMARY KEY,
  "cook_id" smallint,
  "consumable_id" smallint
);

CREATE TABLE "cook_recipe_skills" (
  "id" smallserial PRIMARY KEY,
  "cook_id" smallint,
  "skill_id" smallint
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
  "complexity" smallint,
  "rarity" smallint
);

CREATE TABLE "robot_armor_recipe_perks" (
  "id" smallserial PRIMARY KEY,
  "robot_armor_id" smallint,
  "perk_id" smallint
);

CREATE TABLE "robot_armor_recipe_skills" (
  "id" smallserial PRIMARY KEY,
  "robot_armor_id" smallint,
  "skill_id" smallint
);

CREATE TABLE "robot_module_recipes" (
  "id" smallserial PRIMARY KEY,
  "robot_module" smallint,
  "complexity" smallint,
  "rarity" smallint
);

CREATE TABLE "robot_module_recipe_skills" (
  "id" smallserial PRIMARY KEY,
  "robot_module_id" smallint,
  "skill_id" smallint
);

CREATE TABLE "weapon_recipes" (
  "id" smallserial PRIMARY KEY,
  "weapon_mod" smallint,
  "complexity" smallint,
  "rarity" smallint
);

CREATE TABLE "weapon_recipe_skills" (
  "id" smallserial PRIMARY KEY,
  "weapon_id" smallint,
  "skill_id" smallint
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
  "owning_character" smallint
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
  "owning_character" smallint
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
  "breakthroughs" smallint
);

CREATE TABLE "extended_test_characters" (
  "id" smallserial PRIMARY KEY,
  "test_id" smallint,
  "character_id" smallint
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

CREATE TABLE "settlement_npc_creatures" (
  "id" smallserial PRIMARY KEY,
  "settlement_id" smallint,
  "creature_id" smallint
);

CREATE TABLE "settlement_npc_characters" (
  "id" smallserial PRIMARY KEY,
  "settlement_id" smallint,
  "character_id" smallint
);

ALTER TABLE "character_perks" ADD FOREIGN KEY ("character_id") REFERENCES "characters" ("id");

ALTER TABLE "character_perks" ADD FOREIGN KEY ("perk_id") REFERENCES "perks" ("id");

ALTER TABLE "character_traits" ADD FOREIGN KEY ("character_id") REFERENCES "characters" ("id");

ALTER TABLE "character_traits" ADD FOREIGN KEY ("trait_id") REFERENCES "traits" ("id");

ALTER TABLE "character_addictions" ADD FOREIGN KEY ("character_id") REFERENCES "characters" ("id");

ALTER TABLE "character_addictions" ADD FOREIGN KEY ("consumable_id") REFERENCES "consumables" ("id");

ALTER TABLE "character_diseases" ADD FOREIGN KEY ("character_id") REFERENCES "characters" ("id");

ALTER TABLE "character_diseases" ADD FOREIGN KEY ("disease_id") REFERENCES "diseases" ("id");

ALTER TABLE "character_apparel_recipes" ADD FOREIGN KEY ("character_id") REFERENCES "characters" ("id");

ALTER TABLE "character_apparel_recipes" ADD FOREIGN KEY ("apparel_recipe_id") REFERENCES "apparel_recipes" ("id");

ALTER TABLE "character_chem_recipes" ADD FOREIGN KEY ("character_id") REFERENCES "characters" ("id");

ALTER TABLE "character_chem_recipes" ADD FOREIGN KEY ("chem_recipe_id") REFERENCES "chem_recipes" ("id");

ALTER TABLE "character_cook_recipes" ADD FOREIGN KEY ("character_id") REFERENCES "characters" ("id");

ALTER TABLE "character_cook_recipes" ADD FOREIGN KEY ("cook_recipe_id") REFERENCES "cook_recipes" ("id");

ALTER TABLE "character_powerarmor_recipes" ADD FOREIGN KEY ("character_id") REFERENCES "characters" ("id");

ALTER TABLE "character_powerarmor_recipes" ADD FOREIGN KEY ("powerarmor_recipe_id") REFERENCES "powerarmor_recipes" ("id");

ALTER TABLE "character_robot_armor_recipes" ADD FOREIGN KEY ("character_id") REFERENCES "characters" ("id");

ALTER TABLE "character_robot_armor_recipes" ADD FOREIGN KEY ("robot_armor_recipe_id") REFERENCES "robot_armor_recipes" ("id");

ALTER TABLE "character_robot_modules_recipes" ADD FOREIGN KEY ("character_id") REFERENCES "characters" ("id");

ALTER TABLE "character_robot_modules_recipes" ADD FOREIGN KEY ("robot_modules_recipe_id") REFERENCES "robot_module_recipes" ("id");

ALTER TABLE "character_weapon_recipes" ADD FOREIGN KEY ("character_id") REFERENCES "characters" ("id");

ALTER TABLE "character_weapon_recipes" ADD FOREIGN KEY ("weapon_recipe_id") REFERENCES "weapon_recipes" ("id");

ALTER TABLE "characters" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id");

ALTER TABLE "party_membership" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id");

ALTER TABLE "characters" ADD FOREIGN KEY ("origin") REFERENCES "origins" ("id");

ALTER TABLE "origin_traits" ADD FOREIGN KEY ("origin_id") REFERENCES "origins" ("id");

ALTER TABLE "weapon_effects" ADD FOREIGN KEY ("weapon_id") REFERENCES "weapons" ("id");

ALTER TABLE "weapon_quals" ADD FOREIGN KEY ("weapon_id") REFERENCES "weapons" ("id");

ALTER TABLE "weapon_mod_available" ADD FOREIGN KEY ("weapon_id") REFERENCES "weapons" ("id");

ALTER TABLE "weapon_slot_available" ADD FOREIGN KEY ("weapon_id") REFERENCES "weapons" ("id");

ALTER TABLE "weapon_mod_available" ADD FOREIGN KEY ("mod_id") REFERENCES "weapon_mods" ("id");

ALTER TABLE "weapon_mod_effects" ADD FOREIGN KEY ("mod_id") REFERENCES "weapon_mods" ("id");

ALTER TABLE "weapon_mod_perks" ADD FOREIGN KEY ("mod_id") REFERENCES "weapon_mods" ("id");

ALTER TABLE "weapon_slot_available" ADD FOREIGN KEY ("slot_id") REFERENCES "weapon_slots" ("id");

ALTER TABLE "weapon_mods" ADD FOREIGN KEY ("slot") REFERENCES "weapon_slots" ("id");

ALTER TABLE "weapon_effects" ADD FOREIGN KEY ("effect_id") REFERENCES "dam_effects" ("id");

ALTER TABLE "weapon_mod_effects" ADD FOREIGN KEY ("effect_id") REFERENCES "dam_effects" ("id");

ALTER TABLE "weapon_quals" ADD FOREIGN KEY ("qual_id") REFERENCES "qualities" ("id");

ALTER TABLE "qualities" ADD FOREIGN KEY ("opposed_to") REFERENCES "qualities" ("id");

ALTER TABLE "weapons" ADD FOREIGN KEY ("ammo") REFERENCES "ammo" ("id");

ALTER TABLE "apparel" ADD FOREIGN KEY ("type") REFERENCES "apparel_types" ("id");

ALTER TABLE "apparel_covers" ADD FOREIGN KEY ("apparel_id") REFERENCES "apparel" ("id");

ALTER TABLE "apparel_covers" ADD FOREIGN KEY ("location_id") REFERENCES "body_locations" ("id");

ALTER TABLE "apparel_mod_available" ADD FOREIGN KEY ("apparel_id") REFERENCES "apparel" ("id");

ALTER TABLE "apparel_slot_available" ADD FOREIGN KEY ("apparel_id") REFERENCES "apparel" ("id");

ALTER TABLE "apparel_mod_available" ADD FOREIGN KEY ("mod_id") REFERENCES "apparel_mods" ("id");

ALTER TABLE "apparel_slot_available" ADD FOREIGN KEY ("slot_id") REFERENCES "apparel_slots" ("id");

ALTER TABLE "apparel_mods" ADD FOREIGN KEY ("slot") REFERENCES "apparel_slots" ("id");

ALTER TABLE "apparel_mod_perks" ADD FOREIGN KEY ("mod_id") REFERENCES "apparel_mods" ("id");

ALTER TABLE "consumables" ADD FOREIGN KEY ("type") REFERENCES "consumable_types" ("id");

ALTER TABLE "robot_module_perks" ADD FOREIGN KEY ("robot_module_id") REFERENCES "robot_modules" ("id");

ALTER TABLE "origin_traits" ADD FOREIGN KEY ("trait_id") REFERENCES "traits" ("id");

ALTER TABLE "weapon_mod_perks" ADD FOREIGN KEY ("perk_id") REFERENCES "perks" ("id");

ALTER TABLE "apparel_mod_perks" ADD FOREIGN KEY ("perk_id") REFERENCES "perks" ("id");

ALTER TABLE "robot_module_perks" ADD FOREIGN KEY ("perk_id") REFERENCES "perks" ("id");

ALTER TABLE "characters" ADD FOREIGN KEY ("party") REFERENCES "parties" ("id");

ALTER TABLE "weapons" ADD FOREIGN KEY ("type") REFERENCES "skills" ("id");

ALTER TABLE "apparel_mods" ADD FOREIGN KEY ("skill") REFERENCES "skills" ("id");

ALTER TABLE "skills" ADD FOREIGN KEY ("special") REFERENCES "special" ("id");

ALTER TABLE "character_weapons" ADD FOREIGN KEY ("weapon_id") REFERENCES "weapons" ("id");

ALTER TABLE "character_weapons" ADD FOREIGN KEY ("character_id") REFERENCES "characters" ("id");

ALTER TABLE "character_weapon_mods" ADD FOREIGN KEY ("character_weapon_id") REFERENCES "character_weapons" ("id");

ALTER TABLE "character_weapon_mods" ADD FOREIGN KEY ("mod_id") REFERENCES "weapon_mods" ("id");

ALTER TABLE "character_ammo" ADD FOREIGN KEY ("character_id") REFERENCES "characters" ("id");

ALTER TABLE "character_apparel" ADD FOREIGN KEY ("apparel_id") REFERENCES "apparel" ("id");

ALTER TABLE "character_apparel" ADD FOREIGN KEY ("character_id") REFERENCES "players" ("id");

ALTER TABLE "character_apparel_mods" ADD FOREIGN KEY ("character_apparel_id") REFERENCES "character_apparel" ("id");

ALTER TABLE "character_apparel_mods" ADD FOREIGN KEY ("mod_id") REFERENCES "apparel_mods" ("id");

ALTER TABLE "character_consumables" ADD FOREIGN KEY ("character_id") REFERENCES "characters" ("id");

ALTER TABLE "character_gear" ADD FOREIGN KEY ("character_id") REFERENCES "characters" ("id");

ALTER TABLE "character_powerarmor_frames" ADD FOREIGN KEY ("character_id") REFERENCES "characters" ("id");

ALTER TABLE "character_powerarmor_pieces" ADD FOREIGN KEY ("piece_id") REFERENCES "apparel" ("id");

ALTER TABLE "character_powerarmor_pieces" ADD FOREIGN KEY ("character_id") REFERENCES "characters" ("id");

ALTER TABLE "character_powerarmor_frames" ADD FOREIGN KEY ("head") REFERENCES "character_powerarmor_pieces" ("id");

ALTER TABLE "character_powerarmor_frames" ADD FOREIGN KEY ("la") REFERENCES "character_powerarmor_pieces" ("id");

ALTER TABLE "character_powerarmor_frames" ADD FOREIGN KEY ("ra") REFERENCES "character_powerarmor_pieces" ("id");

ALTER TABLE "character_powerarmor_frames" ADD FOREIGN KEY ("torso") REFERENCES "character_powerarmor_pieces" ("id");

ALTER TABLE "character_powerarmor_frames" ADD FOREIGN KEY ("ll") REFERENCES "character_powerarmor_pieces" ("id");

ALTER TABLE "character_powerarmor_frames" ADD FOREIGN KEY ("rl") REFERENCES "character_powerarmor_pieces" ("id");

ALTER TABLE "character_powerarmor_piece_mods" ADD FOREIGN KEY ("piece_id") REFERENCES "character_powerarmor_pieces" ("id");

ALTER TABLE "character_powerarmor_piece_mods" ADD FOREIGN KEY ("mod_id") REFERENCES "apparel_mods" ("id");

ALTER TABLE "character_robot_modules" ADD FOREIGN KEY ("module_id") REFERENCES "robot_modules" ("id");

ALTER TABLE "character_robot_modules" ADD FOREIGN KEY ("character_id") REFERENCES "characters" ("id");

ALTER TABLE "apparel_recipes" ADD FOREIGN KEY ("complexity") REFERENCES "recipe_materials" ("complexity");

ALTER TABLE "apparel_recipes" ADD FOREIGN KEY ("apparel_mod") REFERENCES "apparel_mods" ("id");

ALTER TABLE "chem_recipes" ADD FOREIGN KEY ("complexity") REFERENCES "recipe_materials" ("complexity");

ALTER TABLE "chem_recipes" ADD FOREIGN KEY ("consumable") REFERENCES "consumables" ("id");

ALTER TABLE "chem_recipe_consumables" ADD FOREIGN KEY ("chem_id") REFERENCES "chem_recipes" ("id");

ALTER TABLE "chem_recipe_consumables" ADD FOREIGN KEY ("consumable_id") REFERENCES "consumables" ("id");

ALTER TABLE "chem_recipe_perks" ADD FOREIGN KEY ("chem_id") REFERENCES "chem_recipes" ("id");

ALTER TABLE "chem_recipe_perks" ADD FOREIGN KEY ("perk_id") REFERENCES "perks" ("id");

ALTER TABLE "chem_recipe_skills" ADD FOREIGN KEY ("chem_id") REFERENCES "chem_recipes" ("id");

ALTER TABLE "chem_recipe_skills" ADD FOREIGN KEY ("skill_id") REFERENCES "skills" ("id");

ALTER TABLE "cook_recipes" ADD FOREIGN KEY ("complexity") REFERENCES "recipe_materials" ("complexity");

ALTER TABLE "cook_recipes" ADD FOREIGN KEY ("consumable") REFERENCES "consumables" ("id");

ALTER TABLE "cook_recipe_consumables" ADD FOREIGN KEY ("cook_id") REFERENCES "cook_recipes" ("id");

ALTER TABLE "cook_recipe_consumables" ADD FOREIGN KEY ("consumable_id") REFERENCES "consumables" ("id");

ALTER TABLE "cook_recipe_skills" ADD FOREIGN KEY ("cook_id") REFERENCES "cook_recipes" ("id");

ALTER TABLE "cook_recipe_skills" ADD FOREIGN KEY ("skill_id") REFERENCES "skills" ("id");

ALTER TABLE "powerarmor_recipes" ADD FOREIGN KEY ("complexity") REFERENCES "recipe_materials" ("complexity");

ALTER TABLE "powerarmor_recipes" ADD FOREIGN KEY ("apparel_mod") REFERENCES "apparel_mods" ("id");

ALTER TABLE "robot_armor_recipes" ADD FOREIGN KEY ("complexity") REFERENCES "recipe_materials" ("complexity");

ALTER TABLE "robot_armor_recipes" ADD FOREIGN KEY ("apparel") REFERENCES "apparel" ("id");

ALTER TABLE "robot_armor_recipe_perks" ADD FOREIGN KEY ("robot_armor_id") REFERENCES "robot_armor_recipes" ("id");

ALTER TABLE "robot_armor_recipe_perks" ADD FOREIGN KEY ("perk_id") REFERENCES "perks" ("id");

ALTER TABLE "robot_armor_recipe_skills" ADD FOREIGN KEY ("robot_armor_id") REFERENCES "robot_armor_recipes" ("id");

ALTER TABLE "robot_armor_recipe_skills" ADD FOREIGN KEY ("skill_id") REFERENCES "skills" ("id");

ALTER TABLE "robot_module_recipes" ADD FOREIGN KEY ("complexity") REFERENCES "recipe_materials" ("complexity");

ALTER TABLE "robot_module_recipes" ADD FOREIGN KEY ("robot_module") REFERENCES "robot_modules" ("id");

ALTER TABLE "robot_module_recipe_skills" ADD FOREIGN KEY ("robot_module_id") REFERENCES "robot_module_recipes" ("id");

ALTER TABLE "robot_module_recipe_skills" ADD FOREIGN KEY ("skill_id") REFERENCES "skills" ("id");

ALTER TABLE "weapon_recipes" ADD FOREIGN KEY ("complexity") REFERENCES "recipe_materials" ("complexity");

ALTER TABLE "weapon_recipes" ADD FOREIGN KEY ("weapon_mod") REFERENCES "weapon_mods" ("id");

ALTER TABLE "weapon_recipe_skills" ADD FOREIGN KEY ("weapon_id") REFERENCES "weapon_recipes" ("id");

ALTER TABLE "weapon_recipe_skills" ADD FOREIGN KEY ("skill_id") REFERENCES "skills" ("id");

ALTER TABLE "npc_creatures" ADD FOREIGN KEY ("type") REFERENCES "creature_types" ("id");

ALTER TABLE "npc_characters" ADD FOREIGN KEY ("type") REFERENCES "character_types" ("id");

ALTER TABLE "active_npc_creatures" ADD FOREIGN KEY ("creature") REFERENCES "npc_creatures" ("id");

ALTER TABLE "active_npc_creatures" ADD FOREIGN KEY ("party_id") REFERENCES "parties" ("id");

ALTER TABLE "active_npc_creatures" ADD FOREIGN KEY ("owning_character") REFERENCES "characters" ("id");

ALTER TABLE "active_npc_characters" ADD FOREIGN KEY ("character") REFERENCES "npc_characters" ("id");

ALTER TABLE "active_npc_characters" ADD FOREIGN KEY ("party_id") REFERENCES "parties" ("id");

ALTER TABLE "active_npc_characters" ADD FOREIGN KEY ("owning_character") REFERENCES "characters" ("id");

ALTER TABLE "encounters" ADD FOREIGN KEY ("party_id") REFERENCES "parties" ("id");

ALTER TABLE "storefronts" ADD FOREIGN KEY ("party_id") REFERENCES "parties" ("id");

ALTER TABLE "storefronts" ADD FOREIGN KEY ("owning_npc") REFERENCES "npc_characters" ("id");

ALTER TABLE "storefronts" ADD FOREIGN KEY ("inventory") REFERENCES "store_inventory" ("id");

ALTER TABLE "extended_tests" ADD FOREIGN KEY ("party_id") REFERENCES "parties" ("id");

ALTER TABLE "extended_test_characters" ADD FOREIGN KEY ("test_id") REFERENCES "extended_tests" ("id");

ALTER TABLE "extended_test_characters" ADD FOREIGN KEY ("character_id") REFERENCES "characters" ("id");

ALTER TABLE "factions" ADD FOREIGN KEY ("party_id") REFERENCES "parties" ("id");

ALTER TABLE "settlements" ADD FOREIGN KEY ("party_id") REFERENCES "parties" ("id");

ALTER TABLE "settlements" ADD FOREIGN KEY ("npc_leader") REFERENCES "active_npc_characters" ("id");

ALTER TABLE "settlement_npc_creatures" ADD FOREIGN KEY ("settlement_id") REFERENCES "settlements" ("id");

ALTER TABLE "settlement_npc_creatures" ADD FOREIGN KEY ("creature_id") REFERENCES "active_npc_creatures" ("id");

ALTER TABLE "settlement_npc_characters" ADD FOREIGN KEY ("settlement_id") REFERENCES "settlements" ("id");

ALTER TABLE "settlement_npc_characters" ADD FOREIGN KEY ("character_id") REFERENCES "active_npc_characters" ("id");
