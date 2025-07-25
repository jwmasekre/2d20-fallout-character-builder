import * as queries from '$lib/server/db/queries';
import { db } from '$lib/server/db/index';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { SPECIAL_FIELDS } from '$lib/server/constants';
import { backgroundsInNewContent } from '$lib/server/db/schema.js';

export const actions = {
    saveCharacter: async ({ request }) => {
        const data = await request. formData();

        const charName = data.get('charName')?.toString();
        const level = parseInt(data.get('level') as string);
        const originId = parseInt(data.get('originId') as string);
        //const isGhoul = data.get('isGhoul') === 'on';
        const traitIds = data.getAll('selectedTraits').map(Number);
        //const selectedTraitNames = data.getAll('selectedTraits').map(t => t.toString());
        const characterId = parseInt(data.get('characterId') as string);

        if (!charName || !originId || !level) {
            return fail(400, { error: 'must have at least a name, origin, and level to save'});
        }

        const xp = !isNaN(level) && level >= 1 ? level * (level - 1) * 50 : 0;

        const specialValid = data.get('specialValid') === 'true';
        const special = Object.fromEntries(
            SPECIAL_FIELDS.map((stat) => [stat, parseInt(data.get(stat)?.toString() || '')])
        );
        const skillValid = data.get('skillValid') === 'true';
        const skillPointsEntries = Array.from(data.entries())
            .filter(([key]) => key.startsWith('skillPoints['))
            .map(([key, val]) => {
                const match = key.match(/skillPoints\[(.+?)\]/);
                if (match) return [match[1], parseInt(val.toString())] as const;
                return null;
            })
            .filter((e): e is readonly [string, number] => e !== null);
    
        const skillPoints = Object.fromEntries(skillPointsEntries);
        const tagSkillsEntries = Array.from(data.entries())
            .filter(([key]) => key.startsWith('tagSkills['))
            .map(([key, val]) => {
                const match = key.match(/tagSkills\[(.+?)\]/);
                if (match) return [match[1], val === 'on'] as const;
                return null;
            })
            .filter((e): e is readonly [string, boolean] => e !== null);

        const tagSkills = Object.fromEntries(tagSkillsEntries);
        function toCamelCase(str: string) {
			return str
				.replace(/\s(.)/g, (_, c) => c.toUpperCase())
				.replace(/\s/g, '')
				.replace(/^(.)/, (_, c) => c.toLowerCase());
		}
        const camelSkillPoints = Object.fromEntries(
			Object.entries(skillPoints).map(([k, v]) => [toCamelCase(k), v])
		);
		const camelTagSkills = Object.fromEntries(
			Object.entries(tagSkills).map(([k, v]) => [toCamelCase(k), v])
		);
        
        try {
            let newCharacterId = characterId;

            if (!characterId || isNaN(characterId)) {
                const inserted = await db.insert(db.schema.charactersInNewContent).values({
                    characterName: charName,
                    origin: originId,
                    xp
                }).returning({ id: db.schema.charactersInNewContent.id });

                newCharacterId = inserted[0].id;
            } else {
                await db.update(db.schema.charactersInNewContent)
                    .set({ characterName: charName, origin: originId, xp})
                    .where(eq(db.schema.charactersInNewContent.id, characterId));
            }
            await db.delete(db.schema.characterTraitsInNewContent)
                .where(eq(db.schema.characterTraitsInNewContent.characterId, newCharacterId));
            await db.insert(db.schema.characterTraitsInNewContent).values(
                traitIds.map((traitId) => ({
                    characterId: newCharacterId,
                    traitId
                }))
            );

            if (specialValid && specialFields.every((stat) => !isNaN(special[stat]))) {
                const existingSpecial = await db.query.characterSpecialInNewContent.findFirst({
                    where: (c, { eq }) => eq(c.characterId, newCharacterId)
                });
    
                if (existingSpecial) {
                    await db.update(db.schema.characterSpecialInNewContent)
                        .set(special)
                        .where(eq(db.schema.characterSpecialInNewContent.characterId, newCharacterId));
                } else {
                    await db.insert(db.schema.characterSpecialInNewContent).values({
                        characterId: newCharacterId,
                        ...special
                    });
                }
            }

            const existingSkills =
				await db.query.characterSkillsInNewContent.findFirst({
					where: (c, { eq }) => eq(c.characterId, newCharacterId)
				});

			if (existingSkills) {
				await db
					.update(db.schema.characterSkillsInNewContent)
					.set(camelSkillPoints)
					.where(
						eq(
							db.schema.characterSkillsInNewContent.characterId,
							newCharacterId
                        )
					);
			} else {
				await db
					.insert(db.schema.characterSkillsInNewContent)
					.values({
						characterId: newCharacterId,
						...camelSkillPoints
					});
			}
            const existingTags =
				await db.query.characterTagsInNewContent.findFirst({
					where: (c, { eq }) => eq(c.characterId, newCharacterId)
				});

			if (existingTags) {
				await db
					.update(db.schema.characterTagsInNewContent)
					.set(camelTagSkills)
					.where(
						eq(
							db.schema.characterTagsInNewContent.characterId,
							newCharacterId
                        )
					);
			} else {
				await db
					.insert(db.schema.characterTagsInNewContent)
					.values({
						characterId: newCharacterId,
						...camelTagSkills
					});
			}

            return { data: { success: true, characterId: newCharacterId } };
        } catch (error) {
            console.error(error)
            return { data: { success: false, error: 'Error saving character, see console for details' } };
        }
    }
}

export const load = async () => {
    const [originsData, allPerks] = await Promise.all([
        queries.getOriginsSourcesTraits(),
        queries.getAllPerks()
    ]);

    return {
        groupedOrigins: originsData.groupedOrigins,
        sourcebookMap: originsData.sourcebookMap,
        allPerks
    };
};

/*

 Handle existing character loading: Update load() to fetch a character if an ID is passed via query or store.

 Split UI logic per step: Let the form work incrementally (origin → SPECIAL → skills → perks).

 Add background/perks/equipment data to the schema (if not already in your SQL).

 Create a utility layer for DB upserts: As seen with upsertOneToOne() above.

 Add createdAt/updatedAt timestamps (if you haven’t already; helpful for UX down the road).

*/