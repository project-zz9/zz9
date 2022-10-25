import { atom } from "jotai";
import type { ReactNode } from "react";

export type ModalParameter = {
  type: "information" | "confirm" | "fullscreen";
  content?: Content;
  elements?: ReactNode;
  onSubmit?: EventHandler;
  onCancel?: EventHandler;
};

type Content = {
  title?: string;
  body: string;
};

type EventHandler = {
  label?: string;
  handler?: Function;
  nested?: boolean;
};

export const modalAtom = atom<ModalParameter | null>(null);
export const visibleAtom = atom<boolean>(false);

export const modalControlAtom = atom(null, (_, set, value: ModalParameter) => {
  set(visibleAtom, true);
  set(modalAtom, value);
});