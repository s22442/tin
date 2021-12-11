import type { ColorItemOption, ColorItemActionKey } from ".";

export interface StoreState {
  lastColorItemId: number;
  colorItemOptions: ColorItemOption[];
  activeAction: ColorItemActionKey;
  activeColor: string;
  maxDepth: number;
  maxChildrenCount: number;
}
