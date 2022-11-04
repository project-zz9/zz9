import { atom } from "jotai";

export const permissionAtom = atom<Record<string, boolean>>({});

export const PERSONAL_DATA = "use_personal_data";
