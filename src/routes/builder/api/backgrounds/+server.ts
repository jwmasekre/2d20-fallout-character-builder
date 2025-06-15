import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { backgroundsInNewContent } from '$lib/server/db/schema';

export async function GET({ url }) {
	const originId = parseInt(url.searchParams.get('originId') || '');
	if (isNaN(originId)) {
		return json({ error: 'Invalid originId' }, { status: 400 });
	}

	const backgrounds = await db
		.select()
		.from(backgroundsInNewContent)
		.where(eq(backgroundsInNewContent.originId, originId));
	console.log(backgrounds);
	return json(backgrounds);
}