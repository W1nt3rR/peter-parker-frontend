import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { IAreaData, IParkingSpaceData, IZoneData } from "@/api/ZoneApi";
import useStore from "./store";
import ppCLient from "@/ppClient";

export enum EDialogs {
    LOGIN = "login",
    REGISTER = "register",
    ZONE = "zone",
    SETTINGS = "settings",
}

const useDialogStore = defineStore("dialogStore", () => {
    // Data
    const dialogType = ref<EDialogs | null>(null);
    const showRegisterDialog = ref<boolean>(false);

    // Functions
    function openDialog(type: EDialogs) {
        dialogType.value = type;
    }

    function closeDialog() {
        dialogType.value = null;

        // Reset Values
        selectedZone.value = null;
        selectedZonePolygon.value = null;
        zoneEditing.value = false;
        selectedArea.value = null;
        selectedParkingSpace.value = null;
    }

    // Zone Dialog
    const selectedZone = ref<IZoneData | null>(null);
    const selectedZonePolygon = ref<any>(null);
    const zoneEditing = ref<boolean>(false);
    const selectedArea = ref<IAreaData | null>(null);
    const selectedParkingSpace = ref<IParkingSpaceData | null>(null);

    function openZoneDialog(zoneData: IZoneData, zonePolygon: any, zoneArea?: IAreaData) {
        selectedZone.value = zoneData;
        selectedZonePolygon.value = zonePolygon;
        if (zoneArea) selectedArea.value = zoneArea;
        openDialog(EDialogs.ZONE);
    }

    function openSettingsDialog() {
        openDialog(EDialogs.SETTINGS);
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
        showRegisterDialog,
        selectedZone,
        selectedZonePolygon,
        zoneEditing,
        selectedArea,
        selectedParkingSpace,
        openDialog,
        closeDialog,
        openZoneDialog,
        openSettingsDialog,
        toggleEditingZone,
    };
});

export default useDialogStore;
