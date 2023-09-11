import "@/sass/main.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import ppClient from "@/ppClient";

const app = createApp(App);

app.use(createPinia());
app.use(router);

ppClient.init();

app.mount("#app");
