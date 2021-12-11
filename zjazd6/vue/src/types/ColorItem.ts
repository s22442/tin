export interface ColorItem {
  id: number;
  depth: number;
  bgColor: string;
  borderColor: string;
  isCircular: boolean;
  children: ColorItem[];
  updateBgColor(color: string): void;
  updateBorderColor(color: string): void;
  roundRadius(): void;
  addChild(): void;
  removeChild(id: number): void;
  removeSelf(): void;
}

export type ColorItemActionKey =
  | null
  | "colorize_bg"
  | "colorize_border"
  | "add"
  | "remove"
  | "round";

export interface ColorItemOption {
  text: string;
  value: ColorItemActionKey;
}
