import { blankCharacter, blankSpecialGifted } from './constants.js'

export function resetCharacter() {
    return blankCharacter;
}

export function resetSpecial() {
    return { selectedArray: "", giftedSelected: blankSpecialGifted, special: blankCharacter.special };
}

export function resetSkills() {
    return { skillPoints: blankCharacter.skills, extraTagSkillSelections: {}, baseTagSkillSelections: {}};
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