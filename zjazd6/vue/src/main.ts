import { createApp } from "vue";
import App from "./App.vue";

import store from "./store";

import * as globalComponents from "@/components/global";

const app = createApp(App).use(store);

for (const [componentName, component] of Object.entries(globalComponents)) {
  app.component(componentName, component);
}

app.mount("#app");
