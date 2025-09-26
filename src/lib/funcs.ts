import { blankCharacter } from './constants.js'

export function resetCharacter() {
    return blankCharacter;
}

export async function fetchBackgrounds(originId:string) {
    let backgrounds = [];
    const res = await fetch(`/builder/api/backgrounds?originId=${originId}`, { method: 'GET' });
    if (!res.ok) {
        console.error('Failed to fetch backgrounds:', await res.text());
    }
    backgrounds = await res.json();
    return backgrounds;
}