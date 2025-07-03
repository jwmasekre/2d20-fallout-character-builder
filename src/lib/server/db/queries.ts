import { db } from '$lib/server/db/index';
import * as schema from '$lib/server/db/schema';
import { eq, inArray } from 'drizzle-orm';

export async function getOriginsSourcesTraits() {
    const [origins, sourcebooks, originTraits] = await Promise.all([
        db.select().from(schema.originsInNewContent),
        db.select().from(schema.sourcebooksInNewContent),
        db.select().from(schema.originTraitsInNewContent).leftJoin(schema.traitsInNewContent, eq(schema.originTraitsInNewContent.traitId, schema.traitsInNewContent.id))
    ]);

    const sourcebookMap = Object.fromEntries(
        sourcebooks.map((sb) => [sb.id.toString(), sb.name ?? `Sourcebook ${sb.id}`])
    );

    const traitsByOrigin: Record<string, {
        id: number;
        name: string;
        description: string
    }[]> = {};
    for (const row of originTraits) {
        if (!row.origin_traits.originId || !row.traits) continue;
        const key = row.origin_traits.originId.toString();
        if (!traitsByOrigin[key]) traitsByOrigin[key] = [];
        traitsByOrigin[key].push(row.traits);
    } 

    const groupedOrigins = origins.reduce((acc, origin) => {
        if (!origin.sourcebookId) return acc;

        const key = origin.sourcebookId.toString();
        if (!acc[key]) acc[key] = [];
        acc[key].push({
            ...origin,
            traits: traitsByOrigin[origin.id.toString()] ?? []
        });
        return acc;
    }, {} as Record<string, Array<typeof origins[0] & { traits: typeof traitsByOrigin[string] }>>);
    
    return { groupedOrigins, sourcebookMap };
}

export async function getAllPerks() {
    return db.select().from(schema.perksInNewContent);
}

export async function getBackgroundEquipment(backgroundId: number) {
	const weaponIdsResult = await db
        .select({ id: schema.backgroundWeaponsInNewContent.id })
        .from(schema.backgroundWeaponsInNewContent)
        .where(eq(schema.backgroundWeaponsInNewContent.backgroundId, backgroundId))
    const weaponIds = weaponIdsResult.map(w => w.id);
    
    let ammo = [];

    if (weaponIds.length > 0) {
        ammo = await db
            .select({
                ammo: schema.ammoInNewContent,
                ...schema.backgroundAmmoInNewContent,
            })
            .from(schema.backgroundAmmoInNewContent)
            .innerJoin(
                schema.ammoInNewContent,
                eq(schema.backgroundAmmoInNewContent.ammoId, schema.ammoInNewContent.id)
            )
            .where(
                inArray(schema.backgroundAmmoInNewContent.bgWeaponId, weaponIds)
            );
    }

    const [weapons, apparel, consumables, gear, robotModules] = await Promise.all([
		db.select({
			weapon: schema.weaponsInNewContent,
            mod: schema.weaponModsInNewContent,
            ...schema.backgroundWeaponsInNewContent,
		})
			.from(schema.backgroundWeaponsInNewContent)
			.innerJoin(
                schema.weaponsInNewContent,
                eq(schema.backgroundWeaponsInNewContent.weaponId, schema.weaponsInNewContent.id)
            )
            .leftJoin(
                schema.weaponModsInNewContent,
                eq(schema.backgroundWeaponsInNewContent.modId, schema.weaponModsInNewContent.id)
            )
			.where(eq(schema.backgroundWeaponsInNewContent.backgroundId, backgroundId)),

		db.select({
			apparel: schema.apparelInNewContent,
            covers: schema.bodyLocationsInNewContent,
            type: schema.apparelTypesInNewContent,
            ...schema.backgroundApparelInNewContent,
		})
			.from(schema.backgroundApparelInNewContent)
			.innerJoin(
                schema.apparelInNewContent, eq(schema.backgroundApparelInNewContent.apparelId, schema.apparelInNewContent.id)
            )
            .innerJoin(
                schema.apparelCoversInNewContent, eq(schema.backgroundApparelInNewContent.apparelId, schema.apparelCoversInNewContent.apparelId)
            )
            .innerJoin(
                schema.bodyLocationsInNewContent, eq(schema.apparelCoversInNewContent.locationId, schema.bodyLocationsInNewContent.id)
            )
            .innerJoin(
                schema.apparelTypesInNewContent, eq(schema.apparelTypesInNewContent.id, schema.apparelInNewContent.type)
            )
			.where(eq(schema.backgroundApparelInNewContent.backgroundId, backgroundId)),

		db.select({
			consumable: schema.consumablesInNewContent,
            ...schema.backgroundConsumablesInNewContent,
		})
			.from(schema.backgroundConsumablesInNewContent)
			.innerJoin(
                schema.consumablesInNewContent, eq(schema.backgroundConsumablesInNewContent.consumableId, schema.consumablesInNewContent.id)
            )
			.where(eq(schema.backgroundConsumablesInNewContent.backgroundId, backgroundId)),

		db.select({
			gear: schema.gearInNewContent,
            ...schema.backgroundGearInNewContent,
		})
			.from(schema.backgroundGearInNewContent)
			.innerJoin(
                schema.gearInNewContent, eq(schema.backgroundGearInNewContent.gearId, schema.gearInNewContent.id)
            )
			.where(eq(schema.backgroundGearInNewContent.backgroundId, backgroundId)),

		db.select({
			robotModule: schema.robotModulesInNewContent,
            ...schema.backgroundRobotModulesInNewContent,
		})
			.from(schema.backgroundRobotModulesInNewContent)
			.innerJoin(
                schema.robotModulesInNewContent, eq(schema.backgroundRobotModulesInNewContent.robotModuleId, schema.robotModulesInNewContent.id)
            )
			.where(eq(schema.backgroundRobotModulesInNewContent.backgroundId, backgroundId)),
	]);

    const apparelCoverMap = new Map<number,string[]>();
    const apparelAdded = []
    const newApparel = []
    for (const item of apparel) {
        const currentId = item.apparel.id;
        const currentCover = item.covers.name;
        if (!apparelCoverMap.has(currentId)) {
            apparelCoverMap.set(currentId,[])
        }
        if (!apparelCoverMap.get(currentId)?.includes(currentCover)) {
            apparelCoverMap.get(currentId)?.push(currentCover);
        }
    }

    for (const item of apparel) {
        const currentId = item.apparel.id;
        if (!apparelAdded.includes(currentId) || apparelCoverMap.get(currentId).length === 1) {
            let alteredApparel = item;
            alteredApparel.covers = apparelCoverMap.get(currentId);
            newApparel.push(alteredApparel);
            apparelAdded.push(currentId);
        }
    }
    apparel.length = 0;
    for (const item of newApparel) {
        apparel.push(item);
    }

	return {
		weapons,
		apparel,
		ammo,
		consumables,
		gear,
		robotModules
	};
}
