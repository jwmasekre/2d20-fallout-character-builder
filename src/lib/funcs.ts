import { blankCharacter, blankSpecialGifted } from './constants.js'
import type { FullCharacter, SpecialStat } from './server/types.js';

export function resetCharacter() {
    return blankCharacter;
}

export function resetSpecial() {
    return { selectedArray: "", giftedSelected: blankSpecialGifted, special: blankCharacter.special };
}

export function getStatMax(stat:SpecialStat, character:FullCharacter) {
    if (character!.superMutant) {
        if (['intelligence','charisma'].includes(stat)) {
            return 6 + (character!.superMutant === 'super mutant' ? 0 : 2);
        }
    }
    return 10;
}

export function resetSkills() {
    return { skillPoints: blankCharacter.skills, extraTagSkillSelections: {}, baseTagSkillSelections: {}};
}

export function resetPerks() {
    return { selectedPerks: [], showEligibleOnly: false};
}

export function getStaggeredBonus(stat:number):number {
    if (stat === 7 || stat === 8) return 1;
    if (stat === 9 || stat === 10) return 2;
    if (stat > 10) return 3;
    return 0;
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

