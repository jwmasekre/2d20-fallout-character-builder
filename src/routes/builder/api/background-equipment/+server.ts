import { json } from '@sveltejs/kit';
import { getBackgroundEquipment } from '$lib/server/db/queries';

export async function GET({ url }) {
	try {
		const backgroundId = parseInt(url.searchParams.get('backgroundId') || '');
		if (isNaN(backgroundId)) return json({ error: 'Invalid backgroundId' }, { status: 400 });

		const equipment = await getBackgroundEquipment(backgroundId);
		return json(equipment);
	} catch (err) {
		console.error('error from api:', err);
		return new Response(err, { status: 500 });
	}
}