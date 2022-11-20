import { atom } from "jotai";
import type { FC } from "react";

export type ModalParameter = {
  type: "information" | "confirm" | "fullscreen";
  content?: Content;
  Element?: FC<{
    activate: SetState<boolean>;
  }>;
  onSubmit?: EventHandler;
  onCancel?: EventHandler;
  clean?: Function;
};

type Content = {
  title?: string;
  body: string;
};

type EventHandler = {
  label?: string;
  handler?: Function;
  hide?: boolean;
};

export const modalAtom = atom<ModalParameter | null>(null);
export const modalVisibilityAtom = atom<boolean>(false);
export const remoteModalActionAtom = atom<string>("");

export const modalControlAtom = atom(null, (_, set, value: ModalParameter) => {
  set(modalVisibilityAtom, true);
  set(modalAtom, value);
});
