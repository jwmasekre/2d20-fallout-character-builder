import { db } from '$lib/server/db/index';
import * as schema from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

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
