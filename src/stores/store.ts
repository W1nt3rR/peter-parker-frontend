import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import type { IUserData } from "@/api/authApi";
import ppCLient from "@/ppClient";
import type { IZoneData } from "@/api/ZoneApi";
import { type Map } from "leaflet";
import type { IVehicleData } from "@/api/vehicleApi";

const useStore = defineStore("store", () => {
    // Data
    const user = ref<IUserData | null>(null);
    const userDataFromToken = ref<any>(null);

    const selectedVehicle = ref<IVehicleData | null>(null);

    const map = ref<Map | null>(null);

    const zones = ref<Array<IZoneData>>([]);
    const drawing = ref(false);

    // Computed
    const userClaims = computed<string | Array<string>>(() => {
        return userDataFromToken.value?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    });

    const isAdmin = computed<boolean>(() => {
        if (!userClaims.value) return false;
        if (typeof userClaims.value === "string") return userClaims.value === "Admin";
        return userClaims.value.includes("Admin");
    });

    const isInspector = computed<boolean>(() => {
        if (!userClaims.value) return false;
        if (typeof userClaims.value === "string") return userClaims.value === "Inspector";
        return userClaims.value.includes("Inspector");
    });

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
            });
        });
    }

    function drawZone() {
        enableDraw();

        map.value?.once("pm:create", async (e: any) => {
            const geojson = e.layer.toGeoJSON();
            await ppCLient.zoneAPI.create(geojson.geometry as any);
            disableDraw();
            await requestZones();
        });
    }

    async function requestZones() {
        zones.value = await ppCLient.zoneAPI.all();
    }

    watch(user, (newValue, oldValue) => {
        if (!newValue) return;
        selectedVehicle.value = newValue.vehicles[0];
    });

    return {
        user,
        userDataFromToken,
        selectedVehicle,
        map,
        zones,
        drawing,
        userClaims,
        isAdmin,
        isInspector,
        enableDraw,
        disableDraw,
        drawZone,
        drawArea,
        requestZones,
    };
});

export default useStore;
