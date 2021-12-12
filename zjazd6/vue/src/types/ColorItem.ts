export interface ColorItem {
  id: number;
  depth: number;
  bgColor: string;
  borderColor: string;
  isCircular: boolean;
  children: ColorItem[];
  childToSwapId: number | null;
  updateBgColor(color: string): void;
  updateBorderColor(color: string): void;
  roundRadius(): void;
  addChild(): void;
  suggestSwap(): void;
  acceptSwap(): void;
  swapChildren(targedChildId: number): void;
  removeChild(id: number): void;
  removeSelf(): void;
}

export type ColorItemActionKey =
  | null
  | "colorizeBg"
  | "colorizeBorder"
  | "add"
  | "swap"
  | "remove"
  | "round";

export interface ColorItemOption {
  text: string;
  value: ColorItemActionKey;
}
