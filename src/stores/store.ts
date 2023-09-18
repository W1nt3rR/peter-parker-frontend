import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { IUserData } from "@/api/authApi";
import ppCLient from "@/ppClient";
import type { IZoneData } from "@/api/ZoneApi";
import { type Map } from "leaflet";

const useStore = defineStore("store", () => {
    // Data
    const user = ref<IUserData | null>(null);
    const userDataFromToken = ref<any>(null);

    const map = ref<Map | null>(null);

    const zones = ref<Array<IZoneData>>([]);
    const drawing = ref(false);

    // Computed
    const userClaims = computed(() => {
        return userDataFromToken.value?.claims;
    })

    // Functions

    function enableDraw() {
        drawing.value = true;
        map.value?.pm.enableDraw("Poly", {
            snappable: false,
        });
    }

    function disableDraw() {
        drawing.value = false;
        map.value?.pm.disableDraw("Poly");
        map.value?.off("pm:create");
    }

    function drawArea() {
        enableDraw();

        return new Promise((resolve, reject) => {
            map.value?.once("pm:create", (e: any) => {
                const geojson = e.layer.toGeoJSON();
                resolve(geojson.geometry);
                disableDraw();
            })
        });
    }

    function drawZone() {
        enableDraw();

        map.value?.once("pm:create", async (e: any) => {
            const geojson = e.layer.toGeoJSON();
            await ppCLient.zoneAPI.create(geojson.geometry as any);
            disableDraw();
            await requestZones();
        })
    }

    async function requestZones() {
        zones.value = await ppCLient.zoneAPI.all();
    }

    return {
        user,
        userDataFromToken,
        map,
        zones,
        drawing,
        userClaims,
        enableDraw,
        disableDraw,
        drawZone,
        drawArea,
        requestZones,
    };
});

export default useStore;