import * as queries from '$lib/server/db/queries';

export const load = async () => {
    const { groupedOrigins, sourcebookMap } = await queries.getOriginsSourcesTraits();

    return {
        groupedOrigins,
        sourcebookMap
    };
};