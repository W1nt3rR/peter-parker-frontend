import "@/sass/main.scss";
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "@/router";
import ppClient from "@/ppClient";

import "leaflet";
import "@geoman-io/leaflet-geoman-free";

const app = createApp(App);

app.use(createPinia());
app.use(router);

(async () => {
    try {
        await ppClient.init();
        router.push("/");
    } catch (error) {
        ppClient.authAPI.logout();
    }
    app.mount("#app");
})();
