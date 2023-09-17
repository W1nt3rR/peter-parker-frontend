<template>
    <LayoutComponent class="home">
        <div id="map"></div>
    </LayoutComponent>
</template>

<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import useStore from "@/stores/store";
    import { type Map } from "leaflet";

    // Components
    import LayoutComponent from "@/components/LayoutComponent.vue";

    const store = useStore();

    // Data
    const zoom = ref(200);
    const map = ref<Map | null>(null);

    function setupMap() {
        // Create map
        const L = (window as any).L;

        // Create map
        map.value = L.map("map").setView([43.1421256, 20.5084578], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
        }).addTo(map.value);

        map.value?.pm.addControls({
            position: "topleft",
            drawCircle: true,
        });

        console.log("Map", map.value);

        // Example create event to get geojson
        map.value?.on("pm:create", onCreated);

        function onCreated(e: any) {
            console.log(e);
            const geojson = e.layer.toGeoJSON();
        }

        // Example zone data
        const arrayOfJsons = [
            {
                name: "Zone 1",
                style: {
                    color: "#FF0000",
                },
                geoJson: {
                    type: "Feature",
                    properties: {},
                    id: 1,
                    geometry: {
                        type: "Polygon",
                        coordinates: [
                            [
                                [20.472679, 43.168128],
                                [20.488129, 43.135191],
                                [20.541859, 43.14684],
                                [20.472679, 43.168128],
                            ],
                        ],
                    },
                },
            },
            {
                name: "Zone 2",
                style: {
                    color: "#FF00FF",
                },
                geoJson: {
                    type: "Feature",
                    properties: {},
                    id: 2,
                    geometry: {
                        type: "Polygon",
                        coordinates: [
                            [
                                [20.472679, 43.13],
                                [20.488129, 43.12],
                                [20.541859, 43.13],
                                [20.472679, 43.17],
                            ],
                        ],
                    },
                },
            },
        ];

        // Example zone rendering with click event
        arrayOfJsons.forEach((zone) => {
            const zoneLayer = L.geoJSON(zone.geoJson, zone.style).addTo(map.value);
            zoneLayer.on("click", (e: MouseEvent) => {
                console.log(zone.name, e);
            });
        });
    }

    onMounted(() => {
        setupMap();
    });
</script>

<style scoped lang="scss">
    @import "@/sass/includes";

    .home {
        #map {
            height: 100%;
            width: 100%;
        }
    }
</style>
