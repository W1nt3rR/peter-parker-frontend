<template>
    <LayoutComponent class="home">
        <div id="map"></div>
    </LayoutComponent>
</template>

<script setup lang="ts">
    import { onMounted, ref, watch } from "vue";
    import useStore from "@/stores/store";
    import useDialogStore from "@/stores/dialogStore";
    import ppCLient from "@/ppClient";
    import { EZoneColors, type IZoneData } from "@/api/ZoneApi";

    // Components
    import LayoutComponent from "@/components/LayoutComponent.vue";

    const store = useStore();
    const dialogStore = useDialogStore();

    // Data
    const zoom = ref(200);

    async function onShapeCreated(e: any) {
        console.log(e);

        const geojson = e.layer.toGeoJSON();

        await ppCLient.zoneAPI.create(`Zoneee ${store.zones.length + 1}`, geojson.geometry as any);
        await store.requestZones();

        setupZones();
    }

    async function setupZones() {
        if (store.zones.length === 0) {
            return;
        }

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

            console.log("zoneLayer", zoneLayer);

            zoneLayer.on("click", (e: MouseEvent) => {
                console.log(zone.name, e);
                dialogStore.openZoneDialog(zone, e);
            });
        });
    }

    async function updateZoneGeoJSON(e: any) {
        const zone = e.layer.options.zoneInfo as IZoneData;
        zone.geoJSON = e.layer.toGeoJSON();

        await ppCLient.zoneAPI.update(zone);
    }

    async function deleteZone(e: any) {
        const zone = e.layer.options.zoneInfo as IZoneData;
        await ppCLient.zoneAPI.delete(zone.guid);
    }

    function setupMap() {
        // Create map
        const L = (window as any).L;

        // Create map
        store.map = L.map("map").setView([43.1421256, 20.5084578], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
        }).addTo(store.map);

        // store.map?.pm.addControls({
        //     position: "topleft",
        //     drawCircle: true,
        // });

        store.map?.on("pm:create", onShapeCreated);

        store.map?.on("pm:edit", updateZoneGeoJSON);
        store.map?.on("pm:update", updateZoneGeoJSON);
        store.map?.on("pm:cut", updateZoneGeoJSON);
        store.map?.on("pm:remove", deleteZone);
        store.map?.on("pm:dragend", (e: any) => {
            console.log("dragend", e);
        });
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
