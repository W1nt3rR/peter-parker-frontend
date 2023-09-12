import "@/sass/main.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import ppClient from "@/ppClient";

const app = createApp(App);

app.use(createPinia());
app.use(router);

(async () => {
    try {
        await ppClient.init();
        router.push("/");
    } catch (error) {
        router.push("/login");
    }
    app.mount("#app");
})();
