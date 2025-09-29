import type { BackgroundApparel, BackgroundConsumable, BackgroundEquipment, BackgroundRobotModule, BackgroundWeapon } from "./server/types.ts";

function formatWeaponName(w: BackgroundWeapon): string {
    let weaponName:string = ""
    if (Array.isArray(w.mod)) {
        for (const mod of w.mod) {
            weaponName += mod.prefix + " "
        }
        weaponName += w.weapon.name
    } else if (w.modId !== null) {
        weaponName = w.mod.name + " " + w.weapon.name;
    } else weaponName = w.weapon.name;
    return weaponName;
}

export function getWeaponOptionLabel(group: (BackgroundWeapon | BackgroundWeapon[])): string {
    if (Array.isArray(group)) {
        return group.map(formatWeaponName).join(" + ");
    } else {
        return formatWeaponName(group);
    }
}

export function getWeaponOptionKey(group: (BackgroundWeapon | BackgroundWeapon[])): string {
    if (Array.isArray(group)) {
        return group.map(w => w.id).sort((a, b) => a - b).join("-");
    } else {
        return String(group.id);
    }
}

export function formatDoubleText(doubleText:string, backgroundEquipment: BackgroundEquipment) {
    doubleText = ""
    for (const group of backgroundEquipment!.groupApparel[2]) {
        if (doubleText !== "") {
            doubleText += " and "
        }
        doubleText += group[0].apparel.name
        doubleText += " or "
        doubleText += group[1].apparel.name
    }
}

export function formatPackText(packText:string, backgroundEquipment:BackgroundEquipment) {
    packText = ""
    for (const group of backgroundEquipment!.groupApparel[2]) {
        if (packText !== "") {
            packText += " and "
        }
        packText += group.apparel.name
    }
}

function formatApparelName(a: BackgroundApparel): string {
    return a.apparel.name;
}

export function getApparelOptionLabel(group: (BackgroundApparel | BackgroundApparel[])): string {
    if (Array.isArray(group)) {
        return group.map(formatApparelName).join(" + ");
    } else {
        return formatApparelName(group);
    }
}

export function getApparelOptionKey(group: (BackgroundApparel | BackgroundApparel[])): string {
    if (Array.isArray(group)) {
        return group.map(w => w.id).sort((a, b) => a - b).join("-");
    } else {
        return String(group.id);
    }
}

function formatConsumableName(w: BackgroundConsumable): string {
    return w.consumable.name;
}

export function getConsumableOptionLabel(group: (BackgroundConsumable | BackgroundConsumable[])): string {
    if (Array.isArray(group)) {
        return group.map(formatConsumableName).join(" + ");
    } else {
        return formatConsumableName(group);
    }
}

export function getConsumableOptionKey(group: (BackgroundConsumable | BackgroundConsumable[])): string {
    if (Array.isArray(group)) {
        return group.map(w => w.id).sort((a, b) => a - b).join("-");
    } else {
        return String(group.id);
    }
}

function formatRobotModuleName(w: BackgroundRobotModule): string {
    return w.robotModule.name;
}

export function getRobotModuleOptionLabel(group: (BackgroundRobotModule | BackgroundRobotModule[])): string {
    if (Array.isArray(group)) {
        return group.map(formatRobotModuleName).join(" + ");
    } else {
        return formatRobotModuleName(group);
    }
}

export function getRobotModuleOptionKey(group: (BackgroundRobotModule | BackgroundRobotModule[])): string {
    if (Array.isArray(group)) {
        return group.map(w => w.id).sort((a, b) => a - b).join("-");
    } else {
        return String(group.id);
    }
}
