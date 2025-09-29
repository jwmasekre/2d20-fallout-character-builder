import type { Apparel, BackgroundApparel, BackgroundConsumable, BackgroundRobotModule, BackgroundWeapon, WeaponMod } from "./server/types.ts";

//quite proud of this one, handles all the logic of choices, including many for one swaps
export function groupBackgroundWeapons(weapons: BackgroundWeapon[]): (BackgroundWeapon | BackgroundWeapon[])[][] {
    const idMap = new Map<number, BackgroundWeapon>();
    const fwdLinks = new Map<number, number>();
    const revLinks = new Map<number, BackgroundWeapon[]>();
    const revMap = new Map<BackgroundWeapon, number>();
    const results: (BackgroundWeapon | BackgroundWeapon[])[][] = [];
    
    for (const w of weapons) {
        idMap.set(w.id, w)
        revMap.set(w, w.id)
        let id = w.id
        let alt = w.altId
        if (alt !== null) {
            if (!fwdLinks.has(id)) {
                fwdLinks.set(id,alt);
            }
            if (!revLinks.has(alt)) {
                revLinks.set(alt,[w]);
            } else if (!revLinks.get(alt)!.includes(w)) {
                revLinks.get(alt)!.push(w)
            }
        } else {
            //if it doesn't have an alt, then add it as its own array, so it doesn't get grouped with others
            results.push([w]);
        }
    }

    //fwdLinks will always be >= revLinks, since we can't have more than one iteration of an id but we can have duplicate alts, which would consolidate the related ids into a set and reduce the size of the map
    // that means that if they're equal, there must not be any single weapons that replace multiple weapons
    let loops = new Map<BackgroundWeapon, BackgroundWeapon[]>();
    let flatGroup: BackgroundWeapon[][] = [];
    let clearedIds: BackgroundWeapon[] = [];
    for (const entry of fwdLinks) {
        const id: BackgroundWeapon = idMap.get(entry[0])!;
        const alt: BackgroundWeapon = idMap.get(entry[1])!;
        let idSet = false;
        if (loops.size === 0) {
            loops.set(id,[alt]);
            continue;
        }
        if (loops.has(alt) && loops.get(alt)!.includes(id)) {
            continue;
        }
        if (loops.has(alt) && !loops.get(alt)!.includes(id)) {
            loops.get(alt)!.push(id)
            continue;
        }
        for (const item of loops) {
            if (clearedIds.includes(alt)) {
                break;
            }
            if (item[1].includes(alt)) {
                const oldId = item[0];
                const oldAlts = item[1];
                oldAlts.splice(oldAlts.indexOf(alt),1);
                loops.delete(item[0]);
                oldAlts.push(oldId);
                oldAlts.push(id);
                loops.set(alt,oldAlts);
                for (const oldAlt of oldAlts) {
                    clearedIds.push(oldAlt);
                }
                idSet = true;
                break;
            }
            if (item[1].includes(id)) {
                loops.get(item[0])!.push(alt);
                idSet = true;
                continue;
            }
        }
        if (!idSet) {
            loops.set(id,[alt]);
            idSet = false;
            continue;
        }
    }
    //loop cleanup, in case of out-of-order long loops that form two partial loops
    const fixedLoops:BackgroundWeapon[][] = [];
    for (const group of loops) {
        const id = group[0];
        let altSet = new Set(group[1]);
        const alts = [...altSet];
        alts.push(id)
        if (fixedLoops.length === 0) {
            fixedLoops.push(alts);
        } else {
            let isLoopMember = false;
            for (const loop of fixedLoops) {
                for (const item of alts) {
                    if ((loop.includes(item))) {
                        isLoopMember = true;
                    }
                    if (isLoopMember) break;
                }
                if (isLoopMember) {
                    const fullLoop = [...loop, ...alts];
                    let loopSet = new Set(fullLoop);
                    fixedLoops[fixedLoops.indexOf(loop)] = [...loopSet];
                }
            }
            if (!isLoopMember) {
                fixedLoops.push(alts);
            }
        }
    }
    //check for multi-mod weapons
    const modCheck:BackgroundWeapon[][] = []
    let modGroups:number[] = [];
    for (const [gindex, group] of fixedLoops.entries()) {
        if (group.length !== 1) continue;
        if (group[0].modId === null) continue;
        if (modCheck.length === 0) {
            modCheck.push(group);
            continue;
        }
        let isMultiMod = false;
        for (const [index, check] of modCheck.entries()) {
            for (const weapon of check) {
                if (weapon.weaponId === group[0].weaponId) {
                    modCheck[index].push(group[0]);
                    isMultiMod = true;
                    modGroups.push(gindex);
                    break;
                }
            }
            if (isMultiMod) break;
        }
    }
    //clear non-multi-mod
    const multiMod:BackgroundWeapon[][] = []
    for (const check of modCheck) {
        if (check.length !== 0) multiMod.push(check);
    }
    //map weapons to a new, unified id
    let revId = new Map<number, number>();
    for (const [index, group] of multiMod.entries()) {
        for (const weapon of group) {
            if (!revId.has(weapon.id)) {
                revId.set(weapon.id, index);
            }
        }
    }
    //map mods to the new id
    let modMap = new Map<number,WeaponMod>();
    let consolidatedMods = new Map<number,number[]>();
    for (const [index,group] of multiMod.entries()) {
        for (const weapon of group) {
            if (Array.isArray(weapon.modId)) continue;
            if (Array.isArray(weapon.mod)) continue;
            if (modMap.has(weapon.modId)) continue;
            modMap.set(weapon.modId,weapon.mod)
            if (!consolidatedMods.has(index)) {
                consolidatedMods.set(index,[weapon.modId])
            } else {
                consolidatedMods.get(index)!.push(weapon.modId)
            }
        }
    }
    //replace fixedLoops entries with the consolidated versions
    const writtenWeapons:number[] = [];
    const finalLoops:BackgroundWeapon[][] = [];
    for (const [index, group] of fixedLoops.entries()) {
        if (!modGroups.includes(index)) {
            finalLoops.push(group);
            continue;
        } else {
            let newWeapon = group[0];
            const newWeapId = revId.get(newWeapon.id)
            if (writtenWeapons.includes(newWeapId)) continue;
            const newWeapModIds = consolidatedMods.get(newWeapId);
            const newWeapMods:WeaponMod[] = []
            for (const modId of newWeapModIds) {
                newWeapMods.push(modMap.get(modId));
            }
            newWeapon.modId = newWeapModIds;
            newWeapon.mod = newWeapMods;
            finalLoops.push([newWeapon]);
        }
    }
    for (const group of finalLoops) {
        if (fwdLinks.size === revLinks.size) {
            results.push(group);
        } else {
            flatGroup.push(group);
        }
    }
    if (flatGroup.length > 0) {
        const revGroup: (BackgroundWeapon | BackgroundWeapon[])[] = [];
        for (const group of flatGroup) {
            for (const alt of group) {
                let altId: number | null = null;
                if (revMap.has(alt)) altId = revMap.get(alt)!;
                if (altId !== null) {
                    if (revLinks.has(altId)) {
                        revGroup.push(revLinks.get(revMap.get(alt)!)!)
                    };
                }
            }
        }
        results.push(revGroup);    
    }
    return results;
}

// Apparel logic is going to function differently than weapon logic because i used a different ruleset for building the apparel table, apparently
// this probably needs to be re-written, initial was heavily adapted from weapons since it worked for that, with logic bolted on to handle differences, but correcting for nuance has added so much more that some codes is 100% redundant or practically unused, so it needs to be cleaned up
export function groupBackgroundApparel (apparel: BackgroundApparel[]) {
    const idMap = new Map<number, BackgroundApparel>();
    const apparelIdMap = new Map<number, Apparel>();
    const fwdLinks = new Map<number, number>();
    const revLinks = new Map<number, BackgroundApparel[]>();
    const fwdLinkUniques = new Map<number, number>();
    const revLinkUniques = new Map<number, BackgroundApparel[]>();
    const revMap = new Map<BackgroundApparel, number>();
    const apparelMap = new Map<number, Apparel>();
    const revApparelMap = new Map<number, number[]>();
    let isSingleDouble = new Map<BackgroundApparel,boolean>();
    let single: BackgroundApparel | null = null;
    let double: BackgroundApparel[][] = [];
    const normalResults: (BackgroundApparel | BackgroundApparel[])[][] = [];

    for (const a of apparel) {
        const apparelId = a.apparel.id;
        if (!apparelIdMap.has(apparelId)) {
            apparelIdMap.set(apparelId,a.apparel);
        }
        idMap.set(a.id, a)
        revMap.set(a, a.id)
        let id = a.id
        let alt = a.altId
        if (alt !== null) {
            if (!fwdLinks.has(id)) {
                fwdLinks.set(id,alt);
            }
            if (!revLinks.has(alt)) {
                revLinks.set(alt,[a]);
            } else if (!revLinks.get(alt)!.includes(a)) {
                revLinks.get(alt)!.push(a)
            }
        } else {
            //if it doesn't have an alt, then add it as its own array, so it doesn't get grouped with others
            normalResults.push([a]);
        }
        if (!apparelMap.has(id)) {
            apparelMap.set(id,a.apparel);
        }
        if (!revApparelMap.has(apparelId)) {
            revApparelMap.set(apparelId,[id]);
        } else if (!revApparelMap.get(apparelId)!.includes(id)) {
            revApparelMap.get(apparelId)!.push(id);
        }
    }
    
    let repeatApparel = new Map<BackgroundApparel, BackgroundApparel[]>();
    let repeatApparelAlts = new Map<BackgroundApparel, BackgroundApparel[]>();
    for (const a of revApparelMap) {
        if (a[1].length > 1) {
            for (const id of a[1]) {
                const bgApparel = idMap.get(id);
                const bgAppAlt = idMap.get(bgApparel!.altId)!;
                if (repeatApparel.size === 0) {
                    isSingleDouble.set(bgApparel!,true);
                    single = bgApparel!;
                    repeatApparel.set(bgApparel!,[]);
                    repeatApparelAlts.set(bgApparel!,[bgAppAlt]);
                } else {
                    repeatApparel.get(idMap.get(a[1][0])!)!.push(bgApparel!)
                    repeatApparelAlts.get(idMap.get(a[1][0]!)!)?.push(bgAppAlt)
                }
            }
        } else {
            isSingleDouble.set(idMap.get(a[1][0])!,false);
        }
    }
    let flatRepeatApparel: BackgroundApparel[][] = [];
    for (const repeat of repeatApparel) {
        const repeatStore = repeat[1];
        repeatStore.push(repeat[0]);
        flatRepeatApparel.push(repeatStore);
    }

    //building maps that don't include individual items or repeat items
    for (const a of apparel) {
        const id = a.id
        const alt = a.altId
        let isRepeater = false;
        for (const repeat of flatRepeatApparel) {
            if (repeat.includes(a)) {
                isRepeater = true;
                break;
            }
        }
        if (isRepeater) continue;
        if (alt !== null) {
            if (!fwdLinkUniques.has(id)) {
                fwdLinkUniques.set(id,alt);
            }
            if (!revLinkUniques.has(alt)) {
                revLinkUniques.set(alt,[a]);
            } else if (!revLinkUniques.get(alt)!.includes(a)) {
                revLinkUniques.get(alt)!.push(a);
            }
        }
    }
    let isSinglePack = false;
    let singlePackOption: BackgroundApparel[] = [];
    for (const repeat of flatRepeatApparel) {
        for (const id of repeat) {
            if (revLinkUniques.has(id.id)) {
                isSinglePack = true;
                break;
            }
        }
        if (isSinglePack) break;
    }

    let loops = new Map<BackgroundApparel, BackgroundApparel[]>();
    let flatGroup: BackgroundApparel[][] = [];
    let clearedIds: BackgroundApparel[] = [];
    for (const entry of fwdLinkUniques) {
        const id: BackgroundApparel = idMap.get(entry[0])!;
        if (repeatApparel.has(id) && isSingleDouble.has(id)) continue;
        let repeater = false;
        for (const match of repeatApparel) {
            if (match[1].includes(id) && isSingleDouble.has(match[0])) repeater = true;
        }
        if (repeater) continue;
        const alt: BackgroundApparel = idMap.get(entry[1])!;
        let idSet = false;
        if (loops.size === 0) {
            loops.set(id,[alt]);
            continue;
        }
        if (loops.has(alt) && loops.get(alt)!.includes(id)) {
            continue;
        }
        if (loops.has(alt) && !loops.get(alt)!.includes(id)) {
            loops.get(alt)!.push(id)
            continue;
        }
        for (const item of loops) {
            if (clearedIds.includes(alt)) {
                break;
            }
            if (item[1].includes(alt)) {
                const oldId = item[0];
                const oldAlts = item[1];
                oldAlts.splice(oldAlts.indexOf(alt),1);
                loops.delete(item[0]);
                oldAlts.push(oldId);
                oldAlts.push(id);
                loops.set(alt,oldAlts);
                for (const oldAlt of oldAlts) {
                    clearedIds.push(oldAlt);
                }
                idSet = true;
                break;
            }
            if (item[1].includes(id)) {
                loops.get(item[0])!.push(alt);
                idSet = true;
                continue;
            }
        }
        if (!idSet) {
            loops.set(id,[alt]);
            idSet = false;
            continue;
        }
    }
    let pack: {single:BackgroundApparel,pack:BackgroundApparel[]};
    for (const group of loops) {
        const id = group[0];
        let altSet = new Set(group[1]);
        const alts = [...altSet]
        alts.push(id);
        if (fwdLinkUniques.size === revLinkUniques.size && single === null) {
            normalResults.push(alts);
        } else if (isSinglePack) {
            for (const alt of revLinkUniques)
                for (const repeat of flatRepeatApparel) {
                    const singleId = idMap.get(alt[0])!
                    if (repeat.includes(singleId)) {
                        pack = { single: singleId, pack: alt[1] }
                    }
                }
        } else {
            flatGroup.push(alts);
        }
    }
    if (flatGroup.length > 0 && single === null) {
        const revGroup: BackgroundApparel[][] = [];
        for (const group of flatGroup) {
            for (const alt of group) {
                let altId: number | null = null;
                if (revMap.has(alt)) altId = revMap.get(alt)!;
                if (altId !== null) {
                    if (revLinks.has(altId)) {
                        revGroup.push(revLinks.get(revMap.get(alt)!)!)
                    };
                }
            }
        }
        double = revGroup;
    } else double = flatGroup;
    if (isSinglePack) {
        return [normalResults, pack.single, pack.pack, isSinglePack]
    } else if (single != null && double.length > 0) {
        return [normalResults, single, double];
    }
    return [normalResults];
}

// consumables are mostly straightforward, but the nuka selections add complexity
export function groupBackgroundConsumables(consumables: BackgroundConsumable[]): (BackgroundConsumable | BackgroundConsumable[])[][] {
    const idMap = new Map<number, BackgroundConsumable>();
    const fwdLinks = new Map<number, number>();
    const revLinks = new Map<number, BackgroundConsumable[]>();
    const revMap = new Map<BackgroundConsumable, number>();
    const results: (BackgroundConsumable | BackgroundConsumable[])[][] = [];
    
    for (const w of consumables) {
        idMap.set(w.id, w)
        revMap.set(w, w.id)
        let id = w.id
        let alt = w.altId
        if (alt !== null) {
            if (!fwdLinks.has(id)) {
                fwdLinks.set(id,alt);
            }
            if (!revLinks.has(alt)) {
                revLinks.set(alt,[w]);
            } else if (!revLinks.get(alt)!.includes(w)) {
                revLinks.get(alt)!.push(w)
            }
        } else {
            //if it doesn't have an alt, then add it as its own array, so it doesn't get grouped with others
            results.push([w]);
        }
    }

    let loops = new Map<BackgroundConsumable, BackgroundConsumable[]>();
    let flatGroup: BackgroundConsumable[][] = [];
    let clearedIds: BackgroundConsumable[] = [];
    for (const entry of fwdLinks) {
        const id: BackgroundConsumable = idMap.get(entry[0])!;
        const alt: BackgroundConsumable = idMap.get(entry[1])!;
        let idSet = false;
        if (loops.size === 0) {
            loops.set(id,[alt]);
            continue;
        }
        if (loops.has(alt) && loops.get(alt)!.includes(id)) {
            continue;
        }
        if (loops.has(alt) && !loops.get(alt)!.includes(id)) {
            loops.get(alt)!.push(id)
            continue;
        }
        for (const item of loops) {
            if (clearedIds.includes(alt)) {
                break;
            }
            if (item[1].includes(alt)) {
                const oldId = item[0];
                const oldAlts = item[1];
                oldAlts.splice(oldAlts.indexOf(alt),1);
                loops.delete(item[0]);
                oldAlts.push(oldId);
                oldAlts.push(id);
                loops.set(alt,oldAlts);
                for (const oldAlt of oldAlts) {
                    clearedIds.push(oldAlt);
                }
                idSet = true;
                break;
            }
            if (item[1].includes(id)) {
                loops.get(item[0])!.push(alt);
                idSet = true;
                continue;
            }
        }
        if (!idSet) {
            loops.set(id,[alt]);
            idSet = false;
            continue;
        }
    }
    for (const group of loops) {
        const id = group[0];
        let altSet = new Set(group[1]);
        const alts = [...altSet]
        alts.push(id);
        if (fwdLinks.size === revLinks.size) {
            results.push(alts);
        } else {
            flatGroup.push(alts);
        }
    }
    if (flatGroup.length > 0) {
        for (const group of flatGroup) {
            const revGroup: (BackgroundConsumable | BackgroundConsumable[])[] = [];
            for (const alt of group) {
                let altId: number | null = null;
                if (revMap.has(alt)) altId = revMap.get(alt)!;
                if (altId !== null) {
                    if (revLinks.has(altId)) {
                        revGroup.push(revLinks.get(revMap.get(alt)!)!)
                    };
                }
            }
            results.push(revGroup);
        }
    }
    return results;
}

// robot modules have no complexity, just basic choices
export function groupBackgroundRobotModules(robotModules: BackgroundRobotModule[]): (BackgroundRobotModule | BackgroundRobotModule[])[][] {
    const idMap = new Map<number, BackgroundRobotModule>();
    const fwdLinks = new Map<number, number>();
    const revLinks = new Map<number, BackgroundRobotModule[]>();
    const revMap = new Map<BackgroundRobotModule, number>();
    const results: (BackgroundRobotModule | BackgroundRobotModule[])[][] = [];
    
    for (const w of robotModules) {
        idMap.set(w.id, w)
        revMap.set(w, w.id)
        let id = w.id
        let alt = w.altId
        if (alt !== null) {
            if (!fwdLinks.has(id)) {
                fwdLinks.set(id,alt);
            }
            if (!revLinks.has(alt)) {
                revLinks.set(alt,[w]);
            } else if (!revLinks.get(alt)!.includes(w)) {
                revLinks.get(alt)!.push(w)
            }
        } else {
            //if it doesn't have an alt, then add it as its own array, so it doesn't get grouped with others
            results.push([w]);
        }
    }

    let loops = new Map<BackgroundRobotModule, BackgroundRobotModule[]>();
    let flatGroup: BackgroundRobotModule[][] = [];
    let clearedIds: BackgroundRobotModule[] = [];
    for (const entry of fwdLinks) {
        const id: BackgroundRobotModule = idMap.get(entry[0])!;
        const alt: BackgroundRobotModule = idMap.get(entry[1])!;
        let idSet = false;
        if (loops.size === 0) {
            loops.set(id,[alt]);
            continue;
        }
        if (loops.has(alt) && loops.get(alt)!.includes(id)) {
            continue;
        }
        if (loops.has(alt) && !loops.get(alt)!.includes(id)) {
            loops.get(alt)!.push(id)
            continue;
        }
        for (const item of loops) {
            if (clearedIds.includes(alt)) {
                break;
            }
            if (item[1].includes(alt)) {
                const oldId = item[0];
                const oldAlts = item[1];
                oldAlts.splice(oldAlts.indexOf(alt),1);
                loops.delete(item[0]);
                oldAlts.push(oldId);
                oldAlts.push(id);
                loops.set(alt,oldAlts);
                for (const oldAlt of oldAlts) {
                    clearedIds.push(oldAlt);
                }
                idSet = true;
                break;
            }
            if (item[1].includes(id)) {
                loops.get(item[0])!.push(alt);
                idSet = true;
                continue;
            }
        }
        if (!idSet) {
            loops.set(id,[alt]);
            idSet = false;
            continue;
        }
    }
    for (const group of loops) {
        const id = group[0];
        let altSet = new Set(group[1]);
        const alts = [...altSet]
        alts.push(id);
        if (fwdLinks.size === revLinks.size) {
            results.push(alts);
        } else {
            flatGroup.push(alts);
        }
    }
    if (flatGroup.length > 0) {
        const revGroup: (BackgroundRobotModule | BackgroundRobotModule[])[] = [];
        for (const group of flatGroup) {
            for (const alt of group) {
                let altId: number | null = null;
                if (revMap.has(alt)) altId = revMap.get(alt)!;
                if (altId !== null) {
                    if (revLinks.has(altId)) {
                        revGroup.push(revLinks.get(revMap.get(alt)!)!)
                    };
                }
            }
        }
        results.push(revGroup);
    }
    return results;
}
