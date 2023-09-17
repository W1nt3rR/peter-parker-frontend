import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { IZoneData } from "@/api/ZoneApi";
import useStore from "./store";
import ppCLient from "@/ppClient";

export enum EDialogs {
    LOGIN = "login",
    REGISTER = "register",
    ZONE = "zone",
}

const useDialogStore = defineStore("dialogStore", () => {
    // Data
    const dialogType = ref<EDialogs | null>(null);

    // Functions
    function openDialog(type: EDialogs) {
        dialogType.value = type;
    }

    function closeDialog() {
        dialogType.value = null;

        // Reset Values
        selectedZone.value = null;
    }

    // Zone Dialog
    const selectedZone = ref<IZoneData | null>(null);
    const selectedZonePolygon = ref<any>(null);
    const zoneEditing = ref<boolean>(false);

    function openZoneDialog(zoneData: IZoneData, zonePolygon: any) {
        selectedZone.value = zoneData;
        selectedZonePolygon.value = zonePolygon;
        openDialog(EDialogs.ZONE);
    }

    async function toggleEditingZone(cancel: boolean = false) {
        zoneEditing.value = !zoneEditing.value;
        selectedZonePolygon.value.layer.pm.toggleEdit();

        if (cancel) {
            const store = useStore();
            store.requestZones();
            return;
        }

        const tempZone = selectedZonePolygon.value.layer.options.zoneInfo as IZoneData;
        tempZone.geoJSON = selectedZonePolygon.value.layer.toGeoJSON();

        await ppCLient.zoneAPI.update(tempZone);
    }

    return {
        dialogType,
        selectedZone,
        selectedZonePolygon,
        zoneEditing,
        openDialog,
        closeDialog,
        openZoneDialog,
        toggleEditingZone,
    };
});

export default useDialogStore;
