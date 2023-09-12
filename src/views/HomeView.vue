<template>
    <div>Home</div>
    <div>
        {{ store.user }}
    </div>
    <div style="height: 600px; width: 800px">
        <LMap
            ref="map"
            :use-global-leaflet="false"
            v-model:zoom="zoom"
            :center="[43.1421256, 20.5084578]"
        >
            <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
            ></LTileLayer>
        </LMap>
    </div>
</template>

<script setup lang="ts">
    import { useStore } from "@/stores/store";
    import "leaflet/dist/leaflet.css";
    import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
    import { ref } from "vue";

    const zoom = ref(200);
    const store = useStore();
</script>

<style scoped lang="scss">
    @import "@/sass/includes";
</style>
