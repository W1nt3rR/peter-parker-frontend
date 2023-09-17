import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { IUserData } from "@/api/authApi";
import ppCLient from "@/ppClient";
import type { IZoneData } from "@/api/ZoneApi";

const useStore = defineStore("store", () => {
    // Data
    const user = ref<IUserData | null>(null);

    const zones = ref<Array<IZoneData>>([]);

    async function requestZones() {
        zones.value = await ppCLient.zoneAPI.all();
    }

    return {
        user,
        zones,
        requestZones,
    };
});

export default useStore;
