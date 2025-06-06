import { relations } from "drizzle-orm/relations";
import { npcCharactersInNewContent, npcCharacterSpecialInNewContent, activeNpcCharactersInNewContent, activeNpcCharacterSpecialInNewContent, recipeMaterialsInNewContent, powerarmorRecipesInNewContent, apparelModsInNewContent, charactersInNewContent, characterSkillsInNewContent, npcCharacterSkillsInNewContent, activeNpcCharacterSkillsInNewContent, characterTagsInNewContent, characterPerksInNewContent, perksInNewContent, characterTraitsInNewContent, traitsInNewContent, characterAddictionsInNewContent, consumablesInNewContent, playersInNewContent, originsInNewContent, partiesInNewContent, characterSpecialInNewContent, characterChemRecipesInNewContent, chemRecipesInNewContent, characterCookRecipesInNewContent, cookRecipesInNewContent, characterPowerarmorRecipesInNewContent, characterRobotArmorRecipesInNewContent, robotArmorRecipesInNewContent, characterRobotModulesRecipesInNewContent, robotModuleRecipesInNewContent, characterWeaponRecipesInNewContent, weaponRecipesInNewContent, backgroundsInNewContent, sourcebooksInNewContent, backgroundWeaponsInNewContent, weaponsInNewContent, backgroundApparelInNewContent, apparelInNewContent, ammoInNewContent, backgroundAmmoInNewContent, backgroundConsumablesInNewContent, backgroundGearInNewContent, gearInNewContent, backgroundRobotModulesInNewContent, robotModulesInNewContent, originTraitsInNewContent, weaponEffectsInNewContent, damEffectsInNewContent, weaponModsInNewContent, weaponModPerksInNewContent, qualitiesInNewContent, skillsInNewContent, weaponQualsInNewContent, weaponModAvailableInNewContent, weaponSlotAvailableInNewContent, weaponSlotsInNewContent, ammoVariantsInNewContent, apparelCoversInNewContent, bodyLocationsInNewContent, apparelModAvailableInNewContent, apparelModPerksInNewContent, apparelTypesInNewContent, apparelSlotAvailableInNewContent, apparelSlotsInNewContent, robotModulePerksInNewContent, consumableTypesInNewContent, specialInNewContent, characterAmmoInNewContent, characterConsumablesInNewContent, characterWeaponsInNewContent, characterWeaponModsInNewContent, characterWeaponLegendaryInNewContent, weaponLegendaryInNewContent, characterApparelInNewContent, characterApparelModsInNewContent, characterArmorLegendaryInNewContent, armorLegendaryInNewContent, characterGearInNewContent, characterPowerarmorPiecesInNewContent, characterPowerarmorPieceModsInNewContent, characterPowerarmorFramesInNewContent, characterRobotModulesInNewContent, chemRecipeConsumablesInNewContent, chemRecipePerksInNewContent, chemRecipeSkillsInNewContent, cookRecipeConsumablesInNewContent, characterTypesInNewContent, cookRecipeSkillsInNewContent, robotArmorRecipePerksInNewContent, robotArmorRecipeSkillsInNewContent, robotModuleRecipeSkillsInNewContent, weaponRecipeSkillsInNewContent, encountersInNewContent, storefrontsInNewContent, storeInventoryInNewContent, coreAmmoLootInNewContent, coreArmorLootInNewContent, npcCreaturesInNewContent, activeNpcCreaturesInNewContent, coreClothingLootInNewContent, coreFoodLootInNewContent, coreForagingLootInNewContent, coreBeverageLootInNewContent, corePublicationsLootInNewContent, coreRandomLootConsumablesInNewContent, extendedTestsInNewContent, extendedTestCharactersInNewContent, coreNukaLootInNewContent, coreChemLootInNewContent, coreRangedLootInNewContent, coreMeleeLootInNewContent, coreThrownLootInNewContent, wandererPublicationsLootInNewContent, coreRandomLootRobotModulesInNewContent, coreRandomLootGearInNewContent, factionsInNewContent, characterDiseasesInNewContent, diseasesInNewContent, characterApparelRecipesInNewContent, apparelRecipesInNewContent, characterPublicationsReadInNewContent, partyMembershipInNewContent, creatureTypesInNewContent, settlementsInNewContent, settlementNpcCreaturesInNewContent, settlementNpcCharactersInNewContent } from "./schema";

export const npcCharacterSpecialInNewContentRelations = relations(npcCharacterSpecialInNewContent, ({one}) => ({
	npcCharactersInNewContent: one(npcCharactersInNewContent, {
		fields: [npcCharacterSpecialInNewContent.npcCharacterId],
		references: [npcCharactersInNewContent.id]
	}),
}));

export const npcCharactersInNewContentRelations = relations(npcCharactersInNewContent, ({one, many}) => ({
	npcCharacterSpecialInNewContents: many(npcCharacterSpecialInNewContent),
	npcCharacterSkillsInNewContents: many(npcCharacterSkillsInNewContent),
	characterTypesInNewContent: one(characterTypesInNewContent, {
		fields: [npcCharactersInNewContent.type],
		references: [characterTypesInNewContent.id]
	}),
	storefrontsInNewContents: many(storefrontsInNewContent),
	activeNpcCharactersInNewContents: many(activeNpcCharactersInNewContent),
}));

export const activeNpcCharacterSpecialInNewContentRelations = relations(activeNpcCharacterSpecialInNewContent, ({one}) => ({
	activeNpcCharactersInNewContent: one(activeNpcCharactersInNewContent, {
		fields: [activeNpcCharacterSpecialInNewContent.npcCharacterId],
		references: [activeNpcCharactersInNewContent.id]
	}),
}));

export const activeNpcCharactersInNewContentRelations = relations(activeNpcCharactersInNewContent, ({one, many}) => ({
	activeNpcCharacterSpecialInNewContents: many(activeNpcCharacterSpecialInNewContent),
	activeNpcCharacterSkillsInNewContents: many(activeNpcCharacterSkillsInNewContent),
	npcCharactersInNewContent: one(npcCharactersInNewContent, {
		fields: [activeNpcCharactersInNewContent.character],
		references: [npcCharactersInNewContent.id]
	}),
	partiesInNewContent: one(partiesInNewContent, {
		fields: [activeNpcCharactersInNewContent.partyId],
		references: [partiesInNewContent.id]
	}),
	charactersInNewContent: one(charactersInNewContent, {
		fields: [activeNpcCharactersInNewContent.owningCharacter],
		references: [charactersInNewContent.id]
	}),
	settlementsInNewContents: many(settlementsInNewContent),
	settlementNpcCharactersInNewContents: many(settlementNpcCharactersInNewContent),
}));

export const powerarmorRecipesInNewContentRelations = relations(powerarmorRecipesInNewContent, ({one, many}) => ({
	recipeMaterialsInNewContent: one(recipeMaterialsInNewContent, {
		fields: [powerarmorRecipesInNewContent.complexity],
		references: [recipeMaterialsInNewContent.complexity]
	}),
	apparelModsInNewContent: one(apparelModsInNewContent, {
		fields: [powerarmorRecipesInNewContent.apparelMod],
		references: [apparelModsInNewContent.id]
	}),
	characterPowerarmorRecipesInNewContents: many(characterPowerarmorRecipesInNewContent),
}));

export const recipeMaterialsInNewContentRelations = relations(recipeMaterialsInNewContent, ({many}) => ({
	powerarmorRecipesInNewContents: many(powerarmorRecipesInNewContent),
	cookRecipesInNewContents: many(cookRecipesInNewContent),
	chemRecipesInNewContents: many(chemRecipesInNewContent),
	robotArmorRecipesInNewContents: many(robotArmorRecipesInNewContent),
	robotModuleRecipesInNewContents: many(robotModuleRecipesInNewContent),
	weaponRecipesInNewContents: many(weaponRecipesInNewContent),
	apparelRecipesInNewContents: many(apparelRecipesInNewContent),
}));

export const apparelModsInNewContentRelations = relations(apparelModsInNewContent, ({one, many}) => ({
	powerarmorRecipesInNewContents: many(powerarmorRecipesInNewContent),
	apparelModAvailableInNewContents: many(apparelModAvailableInNewContent),
	apparelModPerksInNewContents: many(apparelModPerksInNewContent),
	apparelSlotsInNewContent: one(apparelSlotsInNewContent, {
		fields: [apparelModsInNewContent.slot],
		references: [apparelSlotsInNewContent.id]
	}),
	skillsInNewContent: one(skillsInNewContent, {
		fields: [apparelModsInNewContent.skill],
		references: [skillsInNewContent.id]
	}),
	characterApparelModsInNewContents: many(characterApparelModsInNewContent),
	characterPowerarmorPieceModsInNewContents: many(characterPowerarmorPieceModsInNewContent),
	apparelRecipesInNewContents: many(apparelRecipesInNewContent),
}));

export const characterSkillsInNewContentRelations = relations(characterSkillsInNewContent, ({one}) => ({
	charactersInNewContent: one(charactersInNewContent, {
		fields: [characterSkillsInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
}));

export const charactersInNewContentRelations = relations(charactersInNewContent, ({one, many}) => ({
	characterSkillsInNewContents: many(characterSkillsInNewContent),
	characterTagsInNewContents: many(characterTagsInNewContent),
	characterPerksInNewContents: many(characterPerksInNewContent),
	characterTraitsInNewContents: many(characterTraitsInNewContent),
	characterAddictionsInNewContents: many(characterAddictionsInNewContent),
	playersInNewContent: one(playersInNewContent, {
		fields: [charactersInNewContent.playerId],
		references: [playersInNewContent.id]
	}),
	originsInNewContent: one(originsInNewContent, {
		fields: [charactersInNewContent.origin],
		references: [originsInNewContent.id]
	}),
	partiesInNewContent: one(partiesInNewContent, {
		fields: [charactersInNewContent.party],
		references: [partiesInNewContent.id]
	}),
	characterSpecialInNewContents: many(characterSpecialInNewContent),
	characterChemRecipesInNewContents: many(characterChemRecipesInNewContent),
	characterCookRecipesInNewContents: many(characterCookRecipesInNewContent),
	characterPowerarmorRecipesInNewContents: many(characterPowerarmorRecipesInNewContent),
	characterRobotArmorRecipesInNewContents: many(characterRobotArmorRecipesInNewContent),
	characterRobotModulesRecipesInNewContents: many(characterRobotModulesRecipesInNewContent),
	characterWeaponRecipesInNewContents: many(characterWeaponRecipesInNewContent),
	characterAmmoInNewContents: many(characterAmmoInNewContent),
	characterConsumablesInNewContents: many(characterConsumablesInNewContent),
	characterWeaponsInNewContents: many(characterWeaponsInNewContent),
	characterGearInNewContents: many(characterGearInNewContent),
	characterPowerarmorPiecesInNewContents: many(characterPowerarmorPiecesInNewContent),
	characterPowerarmorFramesInNewContents: many(characterPowerarmorFramesInNewContent),
	characterRobotModulesInNewContents: many(characterRobotModulesInNewContent),
	activeNpcCharactersInNewContents: many(activeNpcCharactersInNewContent),
	activeNpcCreaturesInNewContents: many(activeNpcCreaturesInNewContent),
	extendedTestCharactersInNewContents: many(extendedTestCharactersInNewContent),
	characterDiseasesInNewContents: many(characterDiseasesInNewContent),
	characterApparelRecipesInNewContents: many(characterApparelRecipesInNewContent),
	characterPublicationsReadInNewContents: many(characterPublicationsReadInNewContent),
	partyMembershipInNewContents: many(partyMembershipInNewContent),
}));

export const npcCharacterSkillsInNewContentRelations = relations(npcCharacterSkillsInNewContent, ({one}) => ({
	npcCharactersInNewContent: one(npcCharactersInNewContent, {
		fields: [npcCharacterSkillsInNewContent.npcCharacterId],
		references: [npcCharactersInNewContent.id]
	}),
}));

export const activeNpcCharacterSkillsInNewContentRelations = relations(activeNpcCharacterSkillsInNewContent, ({one}) => ({
	activeNpcCharactersInNewContent: one(activeNpcCharactersInNewContent, {
		fields: [activeNpcCharacterSkillsInNewContent.npcCharacterId],
		references: [activeNpcCharactersInNewContent.id]
	}),
}));

export const characterTagsInNewContentRelations = relations(characterTagsInNewContent, ({one}) => ({
	charactersInNewContent: one(charactersInNewContent, {
		fields: [characterTagsInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
}));

export const characterPerksInNewContentRelations = relations(characterPerksInNewContent, ({one}) => ({
	charactersInNewContent: one(charactersInNewContent, {
		fields: [characterPerksInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
	perksInNewContent: one(perksInNewContent, {
		fields: [characterPerksInNewContent.perkId],
		references: [perksInNewContent.id]
	}),
}));

export const perksInNewContentRelations = relations(perksInNewContent, ({one, many}) => ({
	characterPerksInNewContents: many(characterPerksInNewContent),
	weaponModPerksInNewContents: many(weaponModPerksInNewContent),
	apparelModPerksInNewContents: many(apparelModPerksInNewContent),
	robotModulePerksInNewContents: many(robotModulePerksInNewContent),
	sourcebooksInNewContent: one(sourcebooksInNewContent, {
		fields: [perksInNewContent.sourcebookId],
		references: [sourcebooksInNewContent.id]
	}),
	chemRecipePerksInNewContents: many(chemRecipePerksInNewContent),
	robotArmorRecipePerksInNewContents: many(robotArmorRecipePerksInNewContent),
}));

export const characterTraitsInNewContentRelations = relations(characterTraitsInNewContent, ({one}) => ({
	charactersInNewContent: one(charactersInNewContent, {
		fields: [characterTraitsInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
	traitsInNewContent: one(traitsInNewContent, {
		fields: [characterTraitsInNewContent.traitId],
		references: [traitsInNewContent.id]
	}),
}));

export const traitsInNewContentRelations = relations(traitsInNewContent, ({many}) => ({
	characterTraitsInNewContents: many(characterTraitsInNewContent),
	originTraitsInNewContents: many(originTraitsInNewContent),
}));

export const characterAddictionsInNewContentRelations = relations(characterAddictionsInNewContent, ({one}) => ({
	charactersInNewContent: one(charactersInNewContent, {
		fields: [characterAddictionsInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
	consumablesInNewContent: one(consumablesInNewContent, {
		fields: [characterAddictionsInNewContent.consumableId],
		references: [consumablesInNewContent.id]
	}),
}));

export const consumablesInNewContentRelations = relations(consumablesInNewContent, ({one, many}) => ({
	characterAddictionsInNewContents: many(characterAddictionsInNewContent),
	backgroundConsumablesInNewContents: many(backgroundConsumablesInNewContent),
	sourcebooksInNewContent: one(sourcebooksInNewContent, {
		fields: [consumablesInNewContent.sourcebookId],
		references: [sourcebooksInNewContent.id]
	}),
	consumableTypesInNewContent: one(consumableTypesInNewContent, {
		fields: [consumablesInNewContent.type],
		references: [consumableTypesInNewContent.id]
	}),
	characterConsumablesInNewContents: many(characterConsumablesInNewContent),
	cookRecipesInNewContents: many(cookRecipesInNewContent),
	chemRecipesInNewContents: many(chemRecipesInNewContent),
	chemRecipeConsumablesInNewContents: many(chemRecipeConsumablesInNewContent),
	cookRecipeConsumablesInNewContents: many(cookRecipeConsumablesInNewContent),
	coreFoodLootInNewContents: many(coreFoodLootInNewContent),
	coreForagingLootInNewContents: many(coreForagingLootInNewContent),
	coreBeverageLootInNewContents: many(coreBeverageLootInNewContent),
	corePublicationsLootInNewContents: many(corePublicationsLootInNewContent),
	coreRandomLootConsumablesInNewContents: many(coreRandomLootConsumablesInNewContent),
	coreNukaLootInNewContents: many(coreNukaLootInNewContent),
	coreChemLootInNewContents: many(coreChemLootInNewContent),
	wandererPublicationsLootInNewContents: many(wandererPublicationsLootInNewContent),
	characterPublicationsReadInNewContents: many(characterPublicationsReadInNewContent),
}));

export const playersInNewContentRelations = relations(playersInNewContent, ({many}) => ({
	charactersInNewContents: many(charactersInNewContent),
	characterApparelInNewContents: many(characterApparelInNewContent),
}));

export const originsInNewContentRelations = relations(originsInNewContent, ({one, many}) => ({
	charactersInNewContents: many(charactersInNewContent),
	backgroundsInNewContents: many(backgroundsInNewContent),
	sourcebooksInNewContent: one(sourcebooksInNewContent, {
		fields: [originsInNewContent.sourcebookId],
		references: [sourcebooksInNewContent.id]
	}),
	originTraitsInNewContents: many(originTraitsInNewContent),
}));

export const partiesInNewContentRelations = relations(partiesInNewContent, ({many}) => ({
	charactersInNewContents: many(charactersInNewContent),
	encountersInNewContents: many(encountersInNewContent),
	storefrontsInNewContents: many(storefrontsInNewContent),
	activeNpcCharactersInNewContents: many(activeNpcCharactersInNewContent),
	activeNpcCreaturesInNewContents: many(activeNpcCreaturesInNewContent),
	extendedTestsInNewContents: many(extendedTestsInNewContent),
	factionsInNewContents: many(factionsInNewContent),
	partyMembershipInNewContents: many(partyMembershipInNewContent),
	settlementsInNewContents: many(settlementsInNewContent),
}));

export const characterSpecialInNewContentRelations = relations(characterSpecialInNewContent, ({one}) => ({
	charactersInNewContent: one(charactersInNewContent, {
		fields: [characterSpecialInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
}));

export const characterChemRecipesInNewContentRelations = relations(characterChemRecipesInNewContent, ({one}) => ({
	charactersInNewContent: one(charactersInNewContent, {
		fields: [characterChemRecipesInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
	chemRecipesInNewContent: one(chemRecipesInNewContent, {
		fields: [characterChemRecipesInNewContent.chemRecipeId],
		references: [chemRecipesInNewContent.id]
	}),
}));

export const chemRecipesInNewContentRelations = relations(chemRecipesInNewContent, ({one, many}) => ({
	characterChemRecipesInNewContents: many(characterChemRecipesInNewContent),
	recipeMaterialsInNewContent: one(recipeMaterialsInNewContent, {
		fields: [chemRecipesInNewContent.complexity],
		references: [recipeMaterialsInNewContent.complexity]
	}),
	consumablesInNewContent: one(consumablesInNewContent, {
		fields: [chemRecipesInNewContent.consumable],
		references: [consumablesInNewContent.id]
	}),
	chemRecipeConsumablesInNewContents: many(chemRecipeConsumablesInNewContent),
	chemRecipePerksInNewContents: many(chemRecipePerksInNewContent),
	chemRecipeSkillsInNewContents: many(chemRecipeSkillsInNewContent),
}));

export const characterCookRecipesInNewContentRelations = relations(characterCookRecipesInNewContent, ({one}) => ({
	charactersInNewContent: one(charactersInNewContent, {
		fields: [characterCookRecipesInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
	cookRecipesInNewContent: one(cookRecipesInNewContent, {
		fields: [characterCookRecipesInNewContent.cookRecipeId],
		references: [cookRecipesInNewContent.id]
	}),
}));

export const cookRecipesInNewContentRelations = relations(cookRecipesInNewContent, ({one, many}) => ({
	characterCookRecipesInNewContents: many(characterCookRecipesInNewContent),
	recipeMaterialsInNewContent: one(recipeMaterialsInNewContent, {
		fields: [cookRecipesInNewContent.complexity],
		references: [recipeMaterialsInNewContent.complexity]
	}),
	consumablesInNewContent: one(consumablesInNewContent, {
		fields: [cookRecipesInNewContent.consumable],
		references: [consumablesInNewContent.id]
	}),
	cookRecipeConsumablesInNewContents: many(cookRecipeConsumablesInNewContent),
	cookRecipeSkillsInNewContents: many(cookRecipeSkillsInNewContent),
}));

export const characterPowerarmorRecipesInNewContentRelations = relations(characterPowerarmorRecipesInNewContent, ({one}) => ({
	charactersInNewContent: one(charactersInNewContent, {
		fields: [characterPowerarmorRecipesInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
	powerarmorRecipesInNewContent: one(powerarmorRecipesInNewContent, {
		fields: [characterPowerarmorRecipesInNewContent.powerarmorRecipeId],
		references: [powerarmorRecipesInNewContent.id]
	}),
}));

export const characterRobotArmorRecipesInNewContentRelations = relations(characterRobotArmorRecipesInNewContent, ({one}) => ({
	charactersInNewContent: one(charactersInNewContent, {
		fields: [characterRobotArmorRecipesInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
	robotArmorRecipesInNewContent: one(robotArmorRecipesInNewContent, {
		fields: [characterRobotArmorRecipesInNewContent.robotArmorRecipeId],
		references: [robotArmorRecipesInNewContent.id]
	}),
}));

export const robotArmorRecipesInNewContentRelations = relations(robotArmorRecipesInNewContent, ({one, many}) => ({
	characterRobotArmorRecipesInNewContents: many(characterRobotArmorRecipesInNewContent),
	recipeMaterialsInNewContent: one(recipeMaterialsInNewContent, {
		fields: [robotArmorRecipesInNewContent.complexity],
		references: [recipeMaterialsInNewContent.complexity]
	}),
	apparelInNewContent: one(apparelInNewContent, {
		fields: [robotArmorRecipesInNewContent.apparel],
		references: [apparelInNewContent.id]
	}),
	robotArmorRecipePerksInNewContents: many(robotArmorRecipePerksInNewContent),
	robotArmorRecipeSkillsInNewContents: many(robotArmorRecipeSkillsInNewContent),
}));

export const characterRobotModulesRecipesInNewContentRelations = relations(characterRobotModulesRecipesInNewContent, ({one}) => ({
	charactersInNewContent: one(charactersInNewContent, {
		fields: [characterRobotModulesRecipesInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
	robotModuleRecipesInNewContent: one(robotModuleRecipesInNewContent, {
		fields: [characterRobotModulesRecipesInNewContent.robotModulesRecipeId],
		references: [robotModuleRecipesInNewContent.id]
	}),
}));

export const robotModuleRecipesInNewContentRelations = relations(robotModuleRecipesInNewContent, ({one, many}) => ({
	characterRobotModulesRecipesInNewContents: many(characterRobotModulesRecipesInNewContent),
	recipeMaterialsInNewContent: one(recipeMaterialsInNewContent, {
		fields: [robotModuleRecipesInNewContent.complexity],
		references: [recipeMaterialsInNewContent.complexity]
	}),
	robotModulesInNewContent: one(robotModulesInNewContent, {
		fields: [robotModuleRecipesInNewContent.robotModule],
		references: [robotModulesInNewContent.id]
	}),
	robotModuleRecipeSkillsInNewContents: many(robotModuleRecipeSkillsInNewContent),
}));

export const characterWeaponRecipesInNewContentRelations = relations(characterWeaponRecipesInNewContent, ({one}) => ({
	charactersInNewContent: one(charactersInNewContent, {
		fields: [characterWeaponRecipesInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
	weaponRecipesInNewContent: one(weaponRecipesInNewContent, {
		fields: [characterWeaponRecipesInNewContent.weaponRecipeId],
		references: [weaponRecipesInNewContent.id]
	}),
}));

export const weaponRecipesInNewContentRelations = relations(weaponRecipesInNewContent, ({one, many}) => ({
	characterWeaponRecipesInNewContents: many(characterWeaponRecipesInNewContent),
	recipeMaterialsInNewContent: one(recipeMaterialsInNewContent, {
		fields: [weaponRecipesInNewContent.complexity],
		references: [recipeMaterialsInNewContent.complexity]
	}),
	weaponModsInNewContent: one(weaponModsInNewContent, {
		fields: [weaponRecipesInNewContent.weaponMod],
		references: [weaponModsInNewContent.id]
	}),
	weaponRecipeSkillsInNewContents: many(weaponRecipeSkillsInNewContent),
}));

export const backgroundsInNewContentRelations = relations(backgroundsInNewContent, ({one, many}) => ({
	originsInNewContent: one(originsInNewContent, {
		fields: [backgroundsInNewContent.originId],
		references: [originsInNewContent.id]
	}),
	sourcebooksInNewContent: one(sourcebooksInNewContent, {
		fields: [backgroundsInNewContent.sourcebookId],
		references: [sourcebooksInNewContent.id]
	}),
	backgroundWeaponsInNewContents: many(backgroundWeaponsInNewContent),
	backgroundApparelInNewContents: many(backgroundApparelInNewContent),
	backgroundConsumablesInNewContents: many(backgroundConsumablesInNewContent),
	backgroundGearInNewContents: many(backgroundGearInNewContent),
	backgroundRobotModulesInNewContents: many(backgroundRobotModulesInNewContent),
}));

export const sourcebooksInNewContentRelations = relations(sourcebooksInNewContent, ({many}) => ({
	backgroundsInNewContents: many(backgroundsInNewContent),
	originsInNewContents: many(originsInNewContent),
	weaponsInNewContents: many(weaponsInNewContent),
	ammoInNewContents: many(ammoInNewContent),
	apparelInNewContents: many(apparelInNewContent),
	robotModulesInNewContents: many(robotModulesInNewContent),
	consumablesInNewContents: many(consumablesInNewContent),
	gearInNewContents: many(gearInNewContent),
	perksInNewContents: many(perksInNewContent),
	diseasesInNewContents: many(diseasesInNewContent),
}));

export const backgroundWeaponsInNewContentRelations = relations(backgroundWeaponsInNewContent, ({one, many}) => ({
	backgroundsInNewContent: one(backgroundsInNewContent, {
		fields: [backgroundWeaponsInNewContent.backgroundId],
		references: [backgroundsInNewContent.id]
	}),
	weaponsInNewContent: one(weaponsInNewContent, {
		fields: [backgroundWeaponsInNewContent.weaponId],
		references: [weaponsInNewContent.id]
	}),
	backgroundWeaponsInNewContent: one(backgroundWeaponsInNewContent, {
		fields: [backgroundWeaponsInNewContent.altId],
		references: [backgroundWeaponsInNewContent.id],
		relationName: "backgroundWeaponsInNewContent_altId_backgroundWeaponsInNewContent_id"
	}),
	backgroundWeaponsInNewContents: many(backgroundWeaponsInNewContent, {
		relationName: "backgroundWeaponsInNewContent_altId_backgroundWeaponsInNewContent_id"
	}),
	backgroundAmmoInNewContents: many(backgroundAmmoInNewContent),
}));

export const weaponsInNewContentRelations = relations(weaponsInNewContent, ({one, many}) => ({
	backgroundWeaponsInNewContents: many(backgroundWeaponsInNewContent),
	weaponEffectsInNewContents: many(weaponEffectsInNewContent),
	sourcebooksInNewContent: one(sourcebooksInNewContent, {
		fields: [weaponsInNewContent.sourcebookId],
		references: [sourcebooksInNewContent.id]
	}),
	ammoInNewContent: one(ammoInNewContent, {
		fields: [weaponsInNewContent.ammo],
		references: [ammoInNewContent.id]
	}),
	skillsInNewContent: one(skillsInNewContent, {
		fields: [weaponsInNewContent.type],
		references: [skillsInNewContent.id]
	}),
	weaponQualsInNewContents: many(weaponQualsInNewContent),
	weaponModAvailableInNewContents: many(weaponModAvailableInNewContent),
	weaponSlotAvailableInNewContents: many(weaponSlotAvailableInNewContent),
	characterWeaponsInNewContents: many(characterWeaponsInNewContent),
	coreRangedLootInNewContents: many(coreRangedLootInNewContent),
	coreMeleeLootInNewContents: many(coreMeleeLootInNewContent),
	coreThrownLootInNewContents: many(coreThrownLootInNewContent),
}));

export const backgroundApparelInNewContentRelations = relations(backgroundApparelInNewContent, ({one, many}) => ({
	backgroundsInNewContent: one(backgroundsInNewContent, {
		fields: [backgroundApparelInNewContent.backgroundId],
		references: [backgroundsInNewContent.id]
	}),
	apparelInNewContent: one(apparelInNewContent, {
		fields: [backgroundApparelInNewContent.apparelId],
		references: [apparelInNewContent.id]
	}),
	backgroundApparelInNewContent: one(backgroundApparelInNewContent, {
		fields: [backgroundApparelInNewContent.altId],
		references: [backgroundApparelInNewContent.id],
		relationName: "backgroundApparelInNewContent_altId_backgroundApparelInNewContent_id"
	}),
	backgroundApparelInNewContents: many(backgroundApparelInNewContent, {
		relationName: "backgroundApparelInNewContent_altId_backgroundApparelInNewContent_id"
	}),
}));

export const apparelInNewContentRelations = relations(apparelInNewContent, ({one, many}) => ({
	backgroundApparelInNewContents: many(backgroundApparelInNewContent),
	apparelCoversInNewContents: many(apparelCoversInNewContent),
	apparelModAvailableInNewContents: many(apparelModAvailableInNewContent),
	sourcebooksInNewContent: one(sourcebooksInNewContent, {
		fields: [apparelInNewContent.sourcebookId],
		references: [sourcebooksInNewContent.id]
	}),
	apparelTypesInNewContent: one(apparelTypesInNewContent, {
		fields: [apparelInNewContent.type],
		references: [apparelTypesInNewContent.id]
	}),
	apparelSlotAvailableInNewContents: many(apparelSlotAvailableInNewContent),
	characterApparelInNewContents: many(characterApparelInNewContent),
	characterPowerarmorPiecesInNewContents: many(characterPowerarmorPiecesInNewContent),
	robotArmorRecipesInNewContents: many(robotArmorRecipesInNewContent),
	coreArmorLootInNewContents: many(coreArmorLootInNewContent),
	coreClothingLootInNewContents: many(coreClothingLootInNewContent),
}));

export const backgroundAmmoInNewContentRelations = relations(backgroundAmmoInNewContent, ({one}) => ({
	ammoInNewContent: one(ammoInNewContent, {
		fields: [backgroundAmmoInNewContent.ammoId],
		references: [ammoInNewContent.id]
	}),
	backgroundWeaponsInNewContent: one(backgroundWeaponsInNewContent, {
		fields: [backgroundAmmoInNewContent.bgWeaponId],
		references: [backgroundWeaponsInNewContent.id]
	}),
}));

export const ammoInNewContentRelations = relations(ammoInNewContent, ({one, many}) => ({
	backgroundAmmoInNewContents: many(backgroundAmmoInNewContent),
	weaponsInNewContents: many(weaponsInNewContent),
	ammoVariantsInNewContents_variant: many(ammoVariantsInNewContent, {
		relationName: "ammoVariantsInNewContent_variant_ammoInNewContent_id"
	}),
	ammoVariantsInNewContents_base: many(ammoVariantsInNewContent, {
		relationName: "ammoVariantsInNewContent_base_ammoInNewContent_id"
	}),
	sourcebooksInNewContent: one(sourcebooksInNewContent, {
		fields: [ammoInNewContent.sourcebookId],
		references: [sourcebooksInNewContent.id]
	}),
	characterAmmoInNewContents: many(characterAmmoInNewContent),
	coreAmmoLootInNewContents: many(coreAmmoLootInNewContent),
}));

export const backgroundConsumablesInNewContentRelations = relations(backgroundConsumablesInNewContent, ({one, many}) => ({
	backgroundsInNewContent: one(backgroundsInNewContent, {
		fields: [backgroundConsumablesInNewContent.backgroundId],
		references: [backgroundsInNewContent.id]
	}),
	consumablesInNewContent: one(consumablesInNewContent, {
		fields: [backgroundConsumablesInNewContent.consumableId],
		references: [consumablesInNewContent.id]
	}),
	backgroundConsumablesInNewContent: one(backgroundConsumablesInNewContent, {
		fields: [backgroundConsumablesInNewContent.altId],
		references: [backgroundConsumablesInNewContent.id],
		relationName: "backgroundConsumablesInNewContent_altId_backgroundConsumablesInNewContent_id"
	}),
	backgroundConsumablesInNewContents: many(backgroundConsumablesInNewContent, {
		relationName: "backgroundConsumablesInNewContent_altId_backgroundConsumablesInNewContent_id"
	}),
}));

export const backgroundGearInNewContentRelations = relations(backgroundGearInNewContent, ({one}) => ({
	backgroundsInNewContent: one(backgroundsInNewContent, {
		fields: [backgroundGearInNewContent.backgroundId],
		references: [backgroundsInNewContent.id]
	}),
	gearInNewContent: one(gearInNewContent, {
		fields: [backgroundGearInNewContent.gearId],
		references: [gearInNewContent.id]
	}),
}));

export const gearInNewContentRelations = relations(gearInNewContent, ({one, many}) => ({
	backgroundGearInNewContents: many(backgroundGearInNewContent),
	sourcebooksInNewContent: one(sourcebooksInNewContent, {
		fields: [gearInNewContent.sourcebookId],
		references: [sourcebooksInNewContent.id]
	}),
	characterGearInNewContents: many(characterGearInNewContent),
	coreRandomLootGearInNewContents: many(coreRandomLootGearInNewContent),
}));

export const backgroundRobotModulesInNewContentRelations = relations(backgroundRobotModulesInNewContent, ({one, many}) => ({
	backgroundsInNewContent: one(backgroundsInNewContent, {
		fields: [backgroundRobotModulesInNewContent.backgroundId],
		references: [backgroundsInNewContent.id]
	}),
	robotModulesInNewContent: one(robotModulesInNewContent, {
		fields: [backgroundRobotModulesInNewContent.robotModuleId],
		references: [robotModulesInNewContent.id]
	}),
	backgroundRobotModulesInNewContent: one(backgroundRobotModulesInNewContent, {
		fields: [backgroundRobotModulesInNewContent.altId],
		references: [backgroundRobotModulesInNewContent.id],
		relationName: "backgroundRobotModulesInNewContent_altId_backgroundRobotModulesInNewContent_id"
	}),
	backgroundRobotModulesInNewContents: many(backgroundRobotModulesInNewContent, {
		relationName: "backgroundRobotModulesInNewContent_altId_backgroundRobotModulesInNewContent_id"
	}),
}));

export const robotModulesInNewContentRelations = relations(robotModulesInNewContent, ({one, many}) => ({
	backgroundRobotModulesInNewContents: many(backgroundRobotModulesInNewContent),
	robotModulePerksInNewContents: many(robotModulePerksInNewContent),
	sourcebooksInNewContent: one(sourcebooksInNewContent, {
		fields: [robotModulesInNewContent.sourcebookId],
		references: [sourcebooksInNewContent.id]
	}),
	characterRobotModulesInNewContents: many(characterRobotModulesInNewContent),
	robotModuleRecipesInNewContents: many(robotModuleRecipesInNewContent),
	coreRandomLootRobotModulesInNewContents: many(coreRandomLootRobotModulesInNewContent),
}));

export const originTraitsInNewContentRelations = relations(originTraitsInNewContent, ({one}) => ({
	originsInNewContent: one(originsInNewContent, {
		fields: [originTraitsInNewContent.originId],
		references: [originsInNewContent.id]
	}),
	traitsInNewContent: one(traitsInNewContent, {
		fields: [originTraitsInNewContent.traitId],
		references: [traitsInNewContent.id]
	}),
}));

export const weaponEffectsInNewContentRelations = relations(weaponEffectsInNewContent, ({one}) => ({
	weaponsInNewContent: one(weaponsInNewContent, {
		fields: [weaponEffectsInNewContent.weaponId],
		references: [weaponsInNewContent.id]
	}),
	damEffectsInNewContent: one(damEffectsInNewContent, {
		fields: [weaponEffectsInNewContent.effectId],
		references: [damEffectsInNewContent.id]
	}),
}));

export const damEffectsInNewContentRelations = relations(damEffectsInNewContent, ({many}) => ({
	weaponEffectsInNewContents: many(weaponEffectsInNewContent),
}));

export const weaponModPerksInNewContentRelations = relations(weaponModPerksInNewContent, ({one}) => ({
	weaponModsInNewContent: one(weaponModsInNewContent, {
		fields: [weaponModPerksInNewContent.modId],
		references: [weaponModsInNewContent.id]
	}),
	perksInNewContent: one(perksInNewContent, {
		fields: [weaponModPerksInNewContent.perkId],
		references: [perksInNewContent.id]
	}),
}));

export const weaponModsInNewContentRelations = relations(weaponModsInNewContent, ({one, many}) => ({
	weaponModPerksInNewContents: many(weaponModPerksInNewContent),
	weaponModAvailableInNewContents: many(weaponModAvailableInNewContent),
	weaponSlotsInNewContent: one(weaponSlotsInNewContent, {
		fields: [weaponModsInNewContent.slot],
		references: [weaponSlotsInNewContent.id]
	}),
	characterWeaponModsInNewContents: many(characterWeaponModsInNewContent),
	weaponRecipesInNewContents: many(weaponRecipesInNewContent),
	coreRangedLootInNewContents: many(coreRangedLootInNewContent),
}));

export const qualitiesInNewContentRelations = relations(qualitiesInNewContent, ({one, many}) => ({
	qualitiesInNewContent: one(qualitiesInNewContent, {
		fields: [qualitiesInNewContent.opposedTo],
		references: [qualitiesInNewContent.id],
		relationName: "qualitiesInNewContent_opposedTo_qualitiesInNewContent_id"
	}),
	qualitiesInNewContents: many(qualitiesInNewContent, {
		relationName: "qualitiesInNewContent_opposedTo_qualitiesInNewContent_id"
	}),
	weaponQualsInNewContents: many(weaponQualsInNewContent),
}));

export const skillsInNewContentRelations = relations(skillsInNewContent, ({one, many}) => ({
	weaponsInNewContents: many(weaponsInNewContent),
	apparelModsInNewContents: many(apparelModsInNewContent),
	specialInNewContent: one(specialInNewContent, {
		fields: [skillsInNewContent.special],
		references: [specialInNewContent.id]
	}),
	chemRecipeSkillsInNewContents: many(chemRecipeSkillsInNewContent),
	cookRecipeSkillsInNewContents: many(cookRecipeSkillsInNewContent),
	robotArmorRecipeSkillsInNewContents: many(robotArmorRecipeSkillsInNewContent),
	robotModuleRecipeSkillsInNewContents: many(robotModuleRecipeSkillsInNewContent),
	weaponRecipeSkillsInNewContents: many(weaponRecipeSkillsInNewContent),
}));

export const weaponQualsInNewContentRelations = relations(weaponQualsInNewContent, ({one}) => ({
	weaponsInNewContent: one(weaponsInNewContent, {
		fields: [weaponQualsInNewContent.weaponId],
		references: [weaponsInNewContent.id]
	}),
	qualitiesInNewContent: one(qualitiesInNewContent, {
		fields: [weaponQualsInNewContent.qualId],
		references: [qualitiesInNewContent.id]
	}),
}));

export const weaponModAvailableInNewContentRelations = relations(weaponModAvailableInNewContent, ({one}) => ({
	weaponsInNewContent: one(weaponsInNewContent, {
		fields: [weaponModAvailableInNewContent.weaponId],
		references: [weaponsInNewContent.id]
	}),
	weaponModsInNewContent: one(weaponModsInNewContent, {
		fields: [weaponModAvailableInNewContent.modId],
		references: [weaponModsInNewContent.id]
	}),
}));

export const weaponSlotAvailableInNewContentRelations = relations(weaponSlotAvailableInNewContent, ({one}) => ({
	weaponsInNewContent: one(weaponsInNewContent, {
		fields: [weaponSlotAvailableInNewContent.weaponId],
		references: [weaponsInNewContent.id]
	}),
	weaponSlotsInNewContent: one(weaponSlotsInNewContent, {
		fields: [weaponSlotAvailableInNewContent.slotId],
		references: [weaponSlotsInNewContent.id]
	}),
}));

export const weaponSlotsInNewContentRelations = relations(weaponSlotsInNewContent, ({many}) => ({
	weaponSlotAvailableInNewContents: many(weaponSlotAvailableInNewContent),
	weaponModsInNewContents: many(weaponModsInNewContent),
}));

export const ammoVariantsInNewContentRelations = relations(ammoVariantsInNewContent, ({one}) => ({
	ammoInNewContent_variant: one(ammoInNewContent, {
		fields: [ammoVariantsInNewContent.variant],
		references: [ammoInNewContent.id],
		relationName: "ammoVariantsInNewContent_variant_ammoInNewContent_id"
	}),
	ammoInNewContent_base: one(ammoInNewContent, {
		fields: [ammoVariantsInNewContent.base],
		references: [ammoInNewContent.id],
		relationName: "ammoVariantsInNewContent_base_ammoInNewContent_id"
	}),
}));

export const apparelCoversInNewContentRelations = relations(apparelCoversInNewContent, ({one}) => ({
	apparelInNewContent: one(apparelInNewContent, {
		fields: [apparelCoversInNewContent.apparelId],
		references: [apparelInNewContent.id]
	}),
	bodyLocationsInNewContent: one(bodyLocationsInNewContent, {
		fields: [apparelCoversInNewContent.locationId],
		references: [bodyLocationsInNewContent.id]
	}),
}));

export const bodyLocationsInNewContentRelations = relations(bodyLocationsInNewContent, ({many}) => ({
	apparelCoversInNewContents: many(apparelCoversInNewContent),
}));

export const apparelModAvailableInNewContentRelations = relations(apparelModAvailableInNewContent, ({one}) => ({
	apparelInNewContent: one(apparelInNewContent, {
		fields: [apparelModAvailableInNewContent.apparelId],
		references: [apparelInNewContent.id]
	}),
	apparelModsInNewContent: one(apparelModsInNewContent, {
		fields: [apparelModAvailableInNewContent.modId],
		references: [apparelModsInNewContent.id]
	}),
}));

export const apparelModPerksInNewContentRelations = relations(apparelModPerksInNewContent, ({one}) => ({
	apparelModsInNewContent: one(apparelModsInNewContent, {
		fields: [apparelModPerksInNewContent.modId],
		references: [apparelModsInNewContent.id]
	}),
	perksInNewContent: one(perksInNewContent, {
		fields: [apparelModPerksInNewContent.perkId],
		references: [perksInNewContent.id]
	}),
}));

export const apparelTypesInNewContentRelations = relations(apparelTypesInNewContent, ({many}) => ({
	apparelInNewContents: many(apparelInNewContent),
}));

export const apparelSlotAvailableInNewContentRelations = relations(apparelSlotAvailableInNewContent, ({one}) => ({
	apparelInNewContent: one(apparelInNewContent, {
		fields: [apparelSlotAvailableInNewContent.apparelId],
		references: [apparelInNewContent.id]
	}),
	apparelSlotsInNewContent: one(apparelSlotsInNewContent, {
		fields: [apparelSlotAvailableInNewContent.slotId],
		references: [apparelSlotsInNewContent.id]
	}),
}));

export const apparelSlotsInNewContentRelations = relations(apparelSlotsInNewContent, ({many}) => ({
	apparelSlotAvailableInNewContents: many(apparelSlotAvailableInNewContent),
	apparelModsInNewContents: many(apparelModsInNewContent),
}));

export const robotModulePerksInNewContentRelations = relations(robotModulePerksInNewContent, ({one}) => ({
	robotModulesInNewContent: one(robotModulesInNewContent, {
		fields: [robotModulePerksInNewContent.robotModuleId],
		references: [robotModulesInNewContent.id]
	}),
	perksInNewContent: one(perksInNewContent, {
		fields: [robotModulePerksInNewContent.perkId],
		references: [perksInNewContent.id]
	}),
}));

export const consumableTypesInNewContentRelations = relations(consumableTypesInNewContent, ({many}) => ({
	consumablesInNewContents: many(consumablesInNewContent),
}));

export const specialInNewContentRelations = relations(specialInNewContent, ({many}) => ({
	skillsInNewContents: many(skillsInNewContent),
}));

export const characterAmmoInNewContentRelations = relations(characterAmmoInNewContent, ({one}) => ({
	ammoInNewContent: one(ammoInNewContent, {
		fields: [characterAmmoInNewContent.ammoId],
		references: [ammoInNewContent.id]
	}),
	charactersInNewContent: one(charactersInNewContent, {
		fields: [characterAmmoInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
}));

export const characterConsumablesInNewContentRelations = relations(characterConsumablesInNewContent, ({one}) => ({
	consumablesInNewContent: one(consumablesInNewContent, {
		fields: [characterConsumablesInNewContent.consumableId],
		references: [consumablesInNewContent.id]
	}),
	charactersInNewContent: one(charactersInNewContent, {
		fields: [characterConsumablesInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
}));

export const characterWeaponsInNewContentRelations = relations(characterWeaponsInNewContent, ({one, many}) => ({
	weaponsInNewContent: one(weaponsInNewContent, {
		fields: [characterWeaponsInNewContent.weaponId],
		references: [weaponsInNewContent.id]
	}),
	charactersInNewContent: one(charactersInNewContent, {
		fields: [characterWeaponsInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
	characterWeaponModsInNewContents: many(characterWeaponModsInNewContent),
	characterWeaponLegendaryInNewContents: many(characterWeaponLegendaryInNewContent),
}));

export const characterWeaponModsInNewContentRelations = relations(characterWeaponModsInNewContent, ({one}) => ({
	characterWeaponsInNewContent: one(characterWeaponsInNewContent, {
		fields: [characterWeaponModsInNewContent.characterWeaponId],
		references: [characterWeaponsInNewContent.id]
	}),
	weaponModsInNewContent: one(weaponModsInNewContent, {
		fields: [characterWeaponModsInNewContent.modId],
		references: [weaponModsInNewContent.id]
	}),
}));

export const characterWeaponLegendaryInNewContentRelations = relations(characterWeaponLegendaryInNewContent, ({one}) => ({
	characterWeaponsInNewContent: one(characterWeaponsInNewContent, {
		fields: [characterWeaponLegendaryInNewContent.characterWeaponId],
		references: [characterWeaponsInNewContent.id]
	}),
	weaponLegendaryInNewContent: one(weaponLegendaryInNewContent, {
		fields: [characterWeaponLegendaryInNewContent.legendaryId],
		references: [weaponLegendaryInNewContent.id]
	}),
}));

export const weaponLegendaryInNewContentRelations = relations(weaponLegendaryInNewContent, ({many}) => ({
	characterWeaponLegendaryInNewContents: many(characterWeaponLegendaryInNewContent),
}));

export const characterApparelInNewContentRelations = relations(characterApparelInNewContent, ({one, many}) => ({
	apparelInNewContent: one(apparelInNewContent, {
		fields: [characterApparelInNewContent.apparelId],
		references: [apparelInNewContent.id]
	}),
	playersInNewContent: one(playersInNewContent, {
		fields: [characterApparelInNewContent.characterId],
		references: [playersInNewContent.id]
	}),
	characterApparelModsInNewContents: many(characterApparelModsInNewContent),
	characterArmorLegendaryInNewContents: many(characterArmorLegendaryInNewContent),
}));

export const characterApparelModsInNewContentRelations = relations(characterApparelModsInNewContent, ({one}) => ({
	characterApparelInNewContent: one(characterApparelInNewContent, {
		fields: [characterApparelModsInNewContent.characterApparelId],
		references: [characterApparelInNewContent.id]
	}),
	apparelModsInNewContent: one(apparelModsInNewContent, {
		fields: [characterApparelModsInNewContent.modId],
		references: [apparelModsInNewContent.id]
	}),
}));

export const characterArmorLegendaryInNewContentRelations = relations(characterArmorLegendaryInNewContent, ({one}) => ({
	characterApparelInNewContent: one(characterApparelInNewContent, {
		fields: [characterArmorLegendaryInNewContent.characterApparelId],
		references: [characterApparelInNewContent.id]
	}),
	armorLegendaryInNewContent: one(armorLegendaryInNewContent, {
		fields: [characterArmorLegendaryInNewContent.legendaryId],
		references: [armorLegendaryInNewContent.id]
	}),
}));

export const armorLegendaryInNewContentRelations = relations(armorLegendaryInNewContent, ({many}) => ({
	characterArmorLegendaryInNewContents: many(characterArmorLegendaryInNewContent),
}));

export const characterGearInNewContentRelations = relations(characterGearInNewContent, ({one}) => ({
	gearInNewContent: one(gearInNewContent, {
		fields: [characterGearInNewContent.gearId],
		references: [gearInNewContent.id]
	}),
	charactersInNewContent: one(charactersInNewContent, {
		fields: [characterGearInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
}));

export const characterPowerarmorPiecesInNewContentRelations = relations(characterPowerarmorPiecesInNewContent, ({one, many}) => ({
	apparelInNewContent: one(apparelInNewContent, {
		fields: [characterPowerarmorPiecesInNewContent.pieceId],
		references: [apparelInNewContent.id]
	}),
	charactersInNewContent: one(charactersInNewContent, {
		fields: [characterPowerarmorPiecesInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
	characterPowerarmorPieceModsInNewContents: many(characterPowerarmorPieceModsInNewContent),
	characterPowerarmorFramesInNewContents_head: many(characterPowerarmorFramesInNewContent, {
		relationName: "characterPowerarmorFramesInNewContent_head_characterPowerarmorPiecesInNewContent_id"
	}),
	characterPowerarmorFramesInNewContents_la: many(characterPowerarmorFramesInNewContent, {
		relationName: "characterPowerarmorFramesInNewContent_la_characterPowerarmorPiecesInNewContent_id"
	}),
	characterPowerarmorFramesInNewContents_ra: many(characterPowerarmorFramesInNewContent, {
		relationName: "characterPowerarmorFramesInNewContent_ra_characterPowerarmorPiecesInNewContent_id"
	}),
	characterPowerarmorFramesInNewContents_torso: many(characterPowerarmorFramesInNewContent, {
		relationName: "characterPowerarmorFramesInNewContent_torso_characterPowerarmorPiecesInNewContent_id"
	}),
	characterPowerarmorFramesInNewContents_ll: many(characterPowerarmorFramesInNewContent, {
		relationName: "characterPowerarmorFramesInNewContent_ll_characterPowerarmorPiecesInNewContent_id"
	}),
	characterPowerarmorFramesInNewContents_rl: many(characterPowerarmorFramesInNewContent, {
		relationName: "characterPowerarmorFramesInNewContent_rl_characterPowerarmorPiecesInNewContent_id"
	}),
}));

export const characterPowerarmorPieceModsInNewContentRelations = relations(characterPowerarmorPieceModsInNewContent, ({one}) => ({
	characterPowerarmorPiecesInNewContent: one(characterPowerarmorPiecesInNewContent, {
		fields: [characterPowerarmorPieceModsInNewContent.pieceId],
		references: [characterPowerarmorPiecesInNewContent.id]
	}),
	apparelModsInNewContent: one(apparelModsInNewContent, {
		fields: [characterPowerarmorPieceModsInNewContent.modId],
		references: [apparelModsInNewContent.id]
	}),
}));

export const characterPowerarmorFramesInNewContentRelations = relations(characterPowerarmorFramesInNewContent, ({one}) => ({
	charactersInNewContent: one(charactersInNewContent, {
		fields: [characterPowerarmorFramesInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
	characterPowerarmorPiecesInNewContent_head: one(characterPowerarmorPiecesInNewContent, {
		fields: [characterPowerarmorFramesInNewContent.head],
		references: [characterPowerarmorPiecesInNewContent.id],
		relationName: "characterPowerarmorFramesInNewContent_head_characterPowerarmorPiecesInNewContent_id"
	}),
	characterPowerarmorPiecesInNewContent_la: one(characterPowerarmorPiecesInNewContent, {
		fields: [characterPowerarmorFramesInNewContent.la],
		references: [characterPowerarmorPiecesInNewContent.id],
		relationName: "characterPowerarmorFramesInNewContent_la_characterPowerarmorPiecesInNewContent_id"
	}),
	characterPowerarmorPiecesInNewContent_ra: one(characterPowerarmorPiecesInNewContent, {
		fields: [characterPowerarmorFramesInNewContent.ra],
		references: [characterPowerarmorPiecesInNewContent.id],
		relationName: "characterPowerarmorFramesInNewContent_ra_characterPowerarmorPiecesInNewContent_id"
	}),
	characterPowerarmorPiecesInNewContent_torso: one(characterPowerarmorPiecesInNewContent, {
		fields: [characterPowerarmorFramesInNewContent.torso],
		references: [characterPowerarmorPiecesInNewContent.id],
		relationName: "characterPowerarmorFramesInNewContent_torso_characterPowerarmorPiecesInNewContent_id"
	}),
	characterPowerarmorPiecesInNewContent_ll: one(characterPowerarmorPiecesInNewContent, {
		fields: [characterPowerarmorFramesInNewContent.ll],
		references: [characterPowerarmorPiecesInNewContent.id],
		relationName: "characterPowerarmorFramesInNewContent_ll_characterPowerarmorPiecesInNewContent_id"
	}),
	characterPowerarmorPiecesInNewContent_rl: one(characterPowerarmorPiecesInNewContent, {
		fields: [characterPowerarmorFramesInNewContent.rl],
		references: [characterPowerarmorPiecesInNewContent.id],
		relationName: "characterPowerarmorFramesInNewContent_rl_characterPowerarmorPiecesInNewContent_id"
	}),
}));

export const characterRobotModulesInNewContentRelations = relations(characterRobotModulesInNewContent, ({one}) => ({
	robotModulesInNewContent: one(robotModulesInNewContent, {
		fields: [characterRobotModulesInNewContent.moduleId],
		references: [robotModulesInNewContent.id]
	}),
	charactersInNewContent: one(charactersInNewContent, {
		fields: [characterRobotModulesInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
}));

export const chemRecipeConsumablesInNewContentRelations = relations(chemRecipeConsumablesInNewContent, ({one}) => ({
	chemRecipesInNewContent: one(chemRecipesInNewContent, {
		fields: [chemRecipeConsumablesInNewContent.chemId],
		references: [chemRecipesInNewContent.id]
	}),
	consumablesInNewContent: one(consumablesInNewContent, {
		fields: [chemRecipeConsumablesInNewContent.consumableId],
		references: [consumablesInNewContent.id]
	}),
}));

export const chemRecipePerksInNewContentRelations = relations(chemRecipePerksInNewContent, ({one}) => ({
	chemRecipesInNewContent: one(chemRecipesInNewContent, {
		fields: [chemRecipePerksInNewContent.chemId],
		references: [chemRecipesInNewContent.id]
	}),
	perksInNewContent: one(perksInNewContent, {
		fields: [chemRecipePerksInNewContent.perkId],
		references: [perksInNewContent.id]
	}),
}));

export const chemRecipeSkillsInNewContentRelations = relations(chemRecipeSkillsInNewContent, ({one}) => ({
	chemRecipesInNewContent: one(chemRecipesInNewContent, {
		fields: [chemRecipeSkillsInNewContent.chemId],
		references: [chemRecipesInNewContent.id]
	}),
	skillsInNewContent: one(skillsInNewContent, {
		fields: [chemRecipeSkillsInNewContent.skillId],
		references: [skillsInNewContent.id]
	}),
}));

export const cookRecipeConsumablesInNewContentRelations = relations(cookRecipeConsumablesInNewContent, ({one}) => ({
	cookRecipesInNewContent: one(cookRecipesInNewContent, {
		fields: [cookRecipeConsumablesInNewContent.cookId],
		references: [cookRecipesInNewContent.id]
	}),
	consumablesInNewContent: one(consumablesInNewContent, {
		fields: [cookRecipeConsumablesInNewContent.consumableId],
		references: [consumablesInNewContent.id]
	}),
}));

export const characterTypesInNewContentRelations = relations(characterTypesInNewContent, ({many}) => ({
	npcCharactersInNewContents: many(npcCharactersInNewContent),
}));

export const cookRecipeSkillsInNewContentRelations = relations(cookRecipeSkillsInNewContent, ({one}) => ({
	cookRecipesInNewContent: one(cookRecipesInNewContent, {
		fields: [cookRecipeSkillsInNewContent.cookId],
		references: [cookRecipesInNewContent.id]
	}),
	skillsInNewContent: one(skillsInNewContent, {
		fields: [cookRecipeSkillsInNewContent.skillId],
		references: [skillsInNewContent.id]
	}),
}));

export const robotArmorRecipePerksInNewContentRelations = relations(robotArmorRecipePerksInNewContent, ({one}) => ({
	robotArmorRecipesInNewContent: one(robotArmorRecipesInNewContent, {
		fields: [robotArmorRecipePerksInNewContent.robotArmorId],
		references: [robotArmorRecipesInNewContent.id]
	}),
	perksInNewContent: one(perksInNewContent, {
		fields: [robotArmorRecipePerksInNewContent.perkId],
		references: [perksInNewContent.id]
	}),
}));

export const robotArmorRecipeSkillsInNewContentRelations = relations(robotArmorRecipeSkillsInNewContent, ({one}) => ({
	robotArmorRecipesInNewContent: one(robotArmorRecipesInNewContent, {
		fields: [robotArmorRecipeSkillsInNewContent.robotArmorId],
		references: [robotArmorRecipesInNewContent.id]
	}),
	skillsInNewContent: one(skillsInNewContent, {
		fields: [robotArmorRecipeSkillsInNewContent.skillId],
		references: [skillsInNewContent.id]
	}),
}));

export const robotModuleRecipeSkillsInNewContentRelations = relations(robotModuleRecipeSkillsInNewContent, ({one}) => ({
	robotModuleRecipesInNewContent: one(robotModuleRecipesInNewContent, {
		fields: [robotModuleRecipeSkillsInNewContent.robotModuleId],
		references: [robotModuleRecipesInNewContent.id]
	}),
	skillsInNewContent: one(skillsInNewContent, {
		fields: [robotModuleRecipeSkillsInNewContent.skillId],
		references: [skillsInNewContent.id]
	}),
}));

export const weaponRecipeSkillsInNewContentRelations = relations(weaponRecipeSkillsInNewContent, ({one}) => ({
	weaponRecipesInNewContent: one(weaponRecipesInNewContent, {
		fields: [weaponRecipeSkillsInNewContent.weaponId],
		references: [weaponRecipesInNewContent.id]
	}),
	skillsInNewContent: one(skillsInNewContent, {
		fields: [weaponRecipeSkillsInNewContent.skillId],
		references: [skillsInNewContent.id]
	}),
}));

export const encountersInNewContentRelations = relations(encountersInNewContent, ({one}) => ({
	partiesInNewContent: one(partiesInNewContent, {
		fields: [encountersInNewContent.partyId],
		references: [partiesInNewContent.id]
	}),
}));

export const storefrontsInNewContentRelations = relations(storefrontsInNewContent, ({one}) => ({
	partiesInNewContent: one(partiesInNewContent, {
		fields: [storefrontsInNewContent.partyId],
		references: [partiesInNewContent.id]
	}),
	npcCharactersInNewContent: one(npcCharactersInNewContent, {
		fields: [storefrontsInNewContent.owningNpc],
		references: [npcCharactersInNewContent.id]
	}),
	storeInventoryInNewContent: one(storeInventoryInNewContent, {
		fields: [storefrontsInNewContent.inventory],
		references: [storeInventoryInNewContent.id]
	}),
}));

export const storeInventoryInNewContentRelations = relations(storeInventoryInNewContent, ({many}) => ({
	storefrontsInNewContents: many(storefrontsInNewContent),
}));

export const coreAmmoLootInNewContentRelations = relations(coreAmmoLootInNewContent, ({one}) => ({
	ammoInNewContent: one(ammoInNewContent, {
		fields: [coreAmmoLootInNewContent.ammoId],
		references: [ammoInNewContent.id]
	}),
}));

export const coreArmorLootInNewContentRelations = relations(coreArmorLootInNewContent, ({one}) => ({
	apparelInNewContent: one(apparelInNewContent, {
		fields: [coreArmorLootInNewContent.apparelId],
		references: [apparelInNewContent.id]
	}),
}));

export const activeNpcCreaturesInNewContentRelations = relations(activeNpcCreaturesInNewContent, ({one, many}) => ({
	npcCreaturesInNewContent: one(npcCreaturesInNewContent, {
		fields: [activeNpcCreaturesInNewContent.creature],
		references: [npcCreaturesInNewContent.id]
	}),
	partiesInNewContent: one(partiesInNewContent, {
		fields: [activeNpcCreaturesInNewContent.partyId],
		references: [partiesInNewContent.id]
	}),
	charactersInNewContent: one(charactersInNewContent, {
		fields: [activeNpcCreaturesInNewContent.owningCharacter],
		references: [charactersInNewContent.id]
	}),
	settlementNpcCreaturesInNewContents: many(settlementNpcCreaturesInNewContent),
}));

export const npcCreaturesInNewContentRelations = relations(npcCreaturesInNewContent, ({one, many}) => ({
	activeNpcCreaturesInNewContents: many(activeNpcCreaturesInNewContent),
	creatureTypesInNewContent: one(creatureTypesInNewContent, {
		fields: [npcCreaturesInNewContent.type],
		references: [creatureTypesInNewContent.id]
	}),
}));

export const coreClothingLootInNewContentRelations = relations(coreClothingLootInNewContent, ({one}) => ({
	apparelInNewContent: one(apparelInNewContent, {
		fields: [coreClothingLootInNewContent.apparelId],
		references: [apparelInNewContent.id]
	}),
}));

export const coreFoodLootInNewContentRelations = relations(coreFoodLootInNewContent, ({one}) => ({
	consumablesInNewContent: one(consumablesInNewContent, {
		fields: [coreFoodLootInNewContent.consumableId],
		references: [consumablesInNewContent.id]
	}),
}));

export const coreForagingLootInNewContentRelations = relations(coreForagingLootInNewContent, ({one}) => ({
	consumablesInNewContent: one(consumablesInNewContent, {
		fields: [coreForagingLootInNewContent.consumableId],
		references: [consumablesInNewContent.id]
	}),
}));

export const coreBeverageLootInNewContentRelations = relations(coreBeverageLootInNewContent, ({one}) => ({
	consumablesInNewContent: one(consumablesInNewContent, {
		fields: [coreBeverageLootInNewContent.consumableId],
		references: [consumablesInNewContent.id]
	}),
}));

export const corePublicationsLootInNewContentRelations = relations(corePublicationsLootInNewContent, ({one}) => ({
	consumablesInNewContent: one(consumablesInNewContent, {
		fields: [corePublicationsLootInNewContent.consumableId],
		references: [consumablesInNewContent.id]
	}),
}));

export const coreRandomLootConsumablesInNewContentRelations = relations(coreRandomLootConsumablesInNewContent, ({one}) => ({
	consumablesInNewContent: one(consumablesInNewContent, {
		fields: [coreRandomLootConsumablesInNewContent.consumableId],
		references: [consumablesInNewContent.id]
	}),
}));

export const extendedTestCharactersInNewContentRelations = relations(extendedTestCharactersInNewContent, ({one}) => ({
	extendedTestsInNewContent: one(extendedTestsInNewContent, {
		fields: [extendedTestCharactersInNewContent.testId],
		references: [extendedTestsInNewContent.id]
	}),
	charactersInNewContent: one(charactersInNewContent, {
		fields: [extendedTestCharactersInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
}));

export const extendedTestsInNewContentRelations = relations(extendedTestsInNewContent, ({one, many}) => ({
	extendedTestCharactersInNewContents: many(extendedTestCharactersInNewContent),
	partiesInNewContent: one(partiesInNewContent, {
		fields: [extendedTestsInNewContent.partyId],
		references: [partiesInNewContent.id]
	}),
}));

export const coreNukaLootInNewContentRelations = relations(coreNukaLootInNewContent, ({one}) => ({
	consumablesInNewContent: one(consumablesInNewContent, {
		fields: [coreNukaLootInNewContent.consumableId],
		references: [consumablesInNewContent.id]
	}),
}));

export const coreChemLootInNewContentRelations = relations(coreChemLootInNewContent, ({one}) => ({
	consumablesInNewContent: one(consumablesInNewContent, {
		fields: [coreChemLootInNewContent.consumableId],
		references: [consumablesInNewContent.id]
	}),
}));

export const coreRangedLootInNewContentRelations = relations(coreRangedLootInNewContent, ({one}) => ({
	weaponsInNewContent: one(weaponsInNewContent, {
		fields: [coreRangedLootInNewContent.weaponId],
		references: [weaponsInNewContent.id]
	}),
	weaponModsInNewContent: one(weaponModsInNewContent, {
		fields: [coreRangedLootInNewContent.modId],
		references: [weaponModsInNewContent.id]
	}),
}));

export const coreMeleeLootInNewContentRelations = relations(coreMeleeLootInNewContent, ({one}) => ({
	weaponsInNewContent: one(weaponsInNewContent, {
		fields: [coreMeleeLootInNewContent.weaponId],
		references: [weaponsInNewContent.id]
	}),
}));

export const coreThrownLootInNewContentRelations = relations(coreThrownLootInNewContent, ({one}) => ({
	weaponsInNewContent: one(weaponsInNewContent, {
		fields: [coreThrownLootInNewContent.weaponId],
		references: [weaponsInNewContent.id]
	}),
}));

export const wandererPublicationsLootInNewContentRelations = relations(wandererPublicationsLootInNewContent, ({one}) => ({
	consumablesInNewContent: one(consumablesInNewContent, {
		fields: [wandererPublicationsLootInNewContent.consumableId],
		references: [consumablesInNewContent.id]
	}),
}));

export const coreRandomLootRobotModulesInNewContentRelations = relations(coreRandomLootRobotModulesInNewContent, ({one}) => ({
	robotModulesInNewContent: one(robotModulesInNewContent, {
		fields: [coreRandomLootRobotModulesInNewContent.robotModuleId],
		references: [robotModulesInNewContent.id]
	}),
}));

export const coreRandomLootGearInNewContentRelations = relations(coreRandomLootGearInNewContent, ({one}) => ({
	gearInNewContent: one(gearInNewContent, {
		fields: [coreRandomLootGearInNewContent.gearId],
		references: [gearInNewContent.id]
	}),
}));

export const factionsInNewContentRelations = relations(factionsInNewContent, ({one}) => ({
	partiesInNewContent: one(partiesInNewContent, {
		fields: [factionsInNewContent.partyId],
		references: [partiesInNewContent.id]
	}),
}));

export const characterDiseasesInNewContentRelations = relations(characterDiseasesInNewContent, ({one}) => ({
	charactersInNewContent: one(charactersInNewContent, {
		fields: [characterDiseasesInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
	diseasesInNewContent: one(diseasesInNewContent, {
		fields: [characterDiseasesInNewContent.diseaseId],
		references: [diseasesInNewContent.id]
	}),
}));

export const diseasesInNewContentRelations = relations(diseasesInNewContent, ({one, many}) => ({
	characterDiseasesInNewContents: many(characterDiseasesInNewContent),
	sourcebooksInNewContent: one(sourcebooksInNewContent, {
		fields: [diseasesInNewContent.sourcebookId],
		references: [sourcebooksInNewContent.id]
	}),
}));

export const characterApparelRecipesInNewContentRelations = relations(characterApparelRecipesInNewContent, ({one}) => ({
	charactersInNewContent: one(charactersInNewContent, {
		fields: [characterApparelRecipesInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
	apparelRecipesInNewContent: one(apparelRecipesInNewContent, {
		fields: [characterApparelRecipesInNewContent.apparelRecipeId],
		references: [apparelRecipesInNewContent.id]
	}),
}));

export const apparelRecipesInNewContentRelations = relations(apparelRecipesInNewContent, ({one, many}) => ({
	characterApparelRecipesInNewContents: many(characterApparelRecipesInNewContent),
	recipeMaterialsInNewContent: one(recipeMaterialsInNewContent, {
		fields: [apparelRecipesInNewContent.complexity],
		references: [recipeMaterialsInNewContent.complexity]
	}),
	apparelModsInNewContent: one(apparelModsInNewContent, {
		fields: [apparelRecipesInNewContent.apparelMod],
		references: [apparelModsInNewContent.id]
	}),
}));

export const characterPublicationsReadInNewContentRelations = relations(characterPublicationsReadInNewContent, ({one}) => ({
	charactersInNewContent: one(charactersInNewContent, {
		fields: [characterPublicationsReadInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
	consumablesInNewContent: one(consumablesInNewContent, {
		fields: [characterPublicationsReadInNewContent.publicationId],
		references: [consumablesInNewContent.id]
	}),
}));

export const partyMembershipInNewContentRelations = relations(partyMembershipInNewContent, ({one}) => ({
	charactersInNewContent: one(charactersInNewContent, {
		fields: [partyMembershipInNewContent.characterId],
		references: [charactersInNewContent.id]
	}),
	partiesInNewContent: one(partiesInNewContent, {
		fields: [partyMembershipInNewContent.partyId],
		references: [partiesInNewContent.id]
	}),
}));

export const creatureTypesInNewContentRelations = relations(creatureTypesInNewContent, ({many}) => ({
	npcCreaturesInNewContents: many(npcCreaturesInNewContent),
}));

export const settlementsInNewContentRelations = relations(settlementsInNewContent, ({one, many}) => ({
	partiesInNewContent: one(partiesInNewContent, {
		fields: [settlementsInNewContent.partyId],
		references: [partiesInNewContent.id]
	}),
	activeNpcCharactersInNewContent: one(activeNpcCharactersInNewContent, {
		fields: [settlementsInNewContent.npcLeader],
		references: [activeNpcCharactersInNewContent.id]
	}),
	settlementNpcCreaturesInNewContents: many(settlementNpcCreaturesInNewContent),
	settlementNpcCharactersInNewContents: many(settlementNpcCharactersInNewContent),
}));

export const settlementNpcCreaturesInNewContentRelations = relations(settlementNpcCreaturesInNewContent, ({one}) => ({
	settlementsInNewContent: one(settlementsInNewContent, {
		fields: [settlementNpcCreaturesInNewContent.settlementId],
		references: [settlementsInNewContent.id]
	}),
	activeNpcCreaturesInNewContent: one(activeNpcCreaturesInNewContent, {
		fields: [settlementNpcCreaturesInNewContent.creatureId],
		references: [activeNpcCreaturesInNewContent.id]
	}),
}));

export const settlementNpcCharactersInNewContentRelations = relations(settlementNpcCharactersInNewContent, ({one}) => ({
	settlementsInNewContent: one(settlementsInNewContent, {
		fields: [settlementNpcCharactersInNewContent.settlementId],
		references: [settlementsInNewContent.id]
	}),
	activeNpcCharactersInNewContent: one(activeNpcCharactersInNewContent, {
		fields: [settlementNpcCharactersInNewContent.characterId],
		references: [activeNpcCharactersInNewContent.id]
	}),
}));