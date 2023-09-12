<template>
    <LayoutComponent class="home">
        <div class="map">
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
    </LayoutComponent>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import { useStore } from "@/stores/store";
    import "leaflet/dist/leaflet.css";
    import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";

    // Components
    import LayoutComponent from "@/components/LayoutComponent.vue";

    const store = useStore();

    // Data
    const zoom = ref(200);
    const map = ref(null);
</script>

<style scoped lang="scss">
    @import "@/sass/includes";

    .home {
        .map {
            height: 100%;
            width: 100%;
        }
    }
</style>
