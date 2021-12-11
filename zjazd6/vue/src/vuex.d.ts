import type { Store } from "vuex";
import type { StoreState } from "@/types";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<StoreState>;
  }
}
