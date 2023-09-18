<template>
    <LayoutComponent class="home">
        <div id="map"></div>
    </LayoutComponent>
</template>

<script setup lang="ts">
    import { onMounted, watch } from "vue";
    import useStore from "@/stores/store";
    import useDialogStore from "@/stores/dialogStore";
    import { EAreaTypes, EZoneColors } from "@/api/ZoneApi";

    // Components
    import LayoutComponent from "@/components/LayoutComponent.vue";

    const store = useStore();
    const dialogStore = useDialogStore();

    // Functions
    async function setupZones() {
        if (store.zones.length === 0) return;

        const L = (window as any).L;

        // remove all layers
        store.map?.eachLayer((layer: any) => {
            if (!layer._url) {
                store.map?.removeLayer(layer);
            }
        });

        store.zones.forEach((zone) => {
            const zoneLayer = L.geoJSON(zone.geoJSON, {
                zoneInfo: zone,
                style: {
                    color: EZoneColors.ZONE_COLOR,
                },
            }).addTo(store.map);

            zone.parkingAreas.forEach((area) => {
                const color = area.type === EAreaTypes.GARAGE ? EZoneColors.GARAGE_AREA_COLOR : area.type === EAreaTypes.LOT ? EZoneColors.LOT_AREA_COLOR : EZoneColors.UNDERGROUND_AREA_COLOR;
                const areaLayer = L.geoJSON(area.geoJSON, {
                    areaInfo: area,
                    style: {
                        color: color,
                    },
                }).addTo(store.map);

                areaLayer.on("click", (e: MouseEvent) => {
                    console.log(area.name, e);
                    dialogStore.openZoneDialog(zone, e, area); // to imlement 
                });
            });

            console.log("zone", zone);

            zoneLayer.on("click", (e: MouseEvent) => {
                console.log(zone.name, e);
                dialogStore.openZoneDialog(zone, e);
            });
        });
    }

    function setupMap() {
        const L = (window as any).L;

        // Create map
        store.map = L.map("map").setView([43.1421256, 20.5084578], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
        }).addTo(store.map);
    }

    watch(
        () => store.zones,
        () => {
            setupZones();
        }
    );

    onMounted(async () => {
        setupMap();

        if (store.user) {
            await store.requestZones();
            setupZones();
        }
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
