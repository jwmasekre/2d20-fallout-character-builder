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
                quantity: schema.backgroundAmmoInNewContent.quantity
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
		})
			.from(schema.backgroundWeaponsInNewContent)
			.innerJoin(schema.weaponsInNewContent, eq(schema.backgroundWeaponsInNewContent.weaponId, schema.weaponsInNewContent.id))
			.where(eq(schema.backgroundWeaponsInNewContent.backgroundId, backgroundId)),

		db.select({
			apparel: schema.apparelInNewContent,
		})
			.from(schema.backgroundApparelInNewContent)
			.innerJoin(schema.apparelInNewContent, eq(schema.backgroundApparelInNewContent.apparelId, schema.apparelInNewContent.id))
			.where(eq(schema.backgroundApparelInNewContent.backgroundId, backgroundId)),

		db.select({
			consumable: schema.consumablesInNewContent,
		})
			.from(schema.backgroundConsumablesInNewContent)
			.innerJoin(schema.consumablesInNewContent, eq(schema.backgroundConsumablesInNewContent.consumableId, schema.consumablesInNewContent.id))
			.where(eq(schema.backgroundConsumablesInNewContent.backgroundId, backgroundId)),

		db.select({
			gear: schema.gearInNewContent,
		})
			.from(schema.backgroundGearInNewContent)
			.innerJoin(schema.gearInNewContent, eq(schema.backgroundGearInNewContent.gearId, schema.gearInNewContent.id))
			.where(eq(schema.backgroundGearInNewContent.backgroundId, backgroundId)),

		db.select({
			robotModule: schema.robotModulesInNewContent,
		})
			.from(schema.backgroundRobotModulesInNewContent)
			.innerJoin(schema.robotModulesInNewContent, eq(schema.backgroundRobotModulesInNewContent.robotModuleId, schema.robotModulesInNewContent.id))
			.where(eq(schema.backgroundRobotModulesInNewContent.backgroundId, backgroundId)),
	]);

	return {
		weapons,
		apparel,
		ammo,
		consumables,
		gear,
		robotModules
	};
}
