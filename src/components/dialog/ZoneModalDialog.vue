<template>
    <div class="zone-dialog">
        <h1>{{ dialogStore.selectedZone?.name }}</h1>

        <template v-if="addingNewArea">
            <div class="add-area-form">
                <InputComponent
                    label="Name"
                    placeholder="Area Name"
                    v-model="newAreaData.name"
                />
                <InputComponent
                    label="Address"
                    placeholder="Area Address"
                    v-model="newAreaData.address"
                />
                <InputComponent
                    label="Area Parking spots"
                    v-model="newAreaData.parkingSpots"
                />
                <InputComponent
                    label="Area Type"
                    v-model="newAreaData.type"
                />
                <ButtonComponent
                    label="Draw Area"
                    :callback="getAreaGeoJSON"
                />

            </div>

            <div class="buttons">
                <ButtonComponent
                    label="Cancel"
                    :callback="() => (addingNewArea = false)"
                    :type="EButtonType.DANGER"
                />
                <ButtonComponent
                    label="Add"
                    :callback="addArea"
                    :type="EButtonType.PRIMARY"
                />
            </div>
        </template>

        <template v-else>
            <div class="zone-info">{{ dialogStore.selectedZone }}</div>

            <div class="buttons">
                <ButtonComponent
                    label="Delete"
                    :type="EButtonType.DANGER"
                    :callback="deleteZone"
                />
                <ButtonComponent
                    label="Edit"
                    :callback="dialogStore.toggleEditingZone"
                />
                <ButtonComponent
                    label="Add area"
                    :callback="() => (addingNewArea = true)"
                />
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import ppCLient from "@/ppClient";
    import useDialogStore from "@/stores/dialogStore";
    import useStore from "@/stores/store";
    import type { IAddAreaData } from "@/api/ZoneApi";

    // Components
    import ButtonComponent from "../button/ButtonComponent.vue";
    import { EButtonType } from "../button/ButtonDefinitions";
    import InputComponent from "../InputComponent.vue";

    const dialogStore = useDialogStore();
    const store = useStore();

    const addingNewArea = ref(false);
    const newAreaData = ref<IAddAreaData>({
        name: "",
        address: "",
        numberOfSpaces: 10,
        type: "EAreaTypes",
        geoJSON: {},
        workingHours: "08 - 16",
    });

    // Functions

    async function deleteZone() {
        await ppCLient.zoneAPI.delete(dialogStore.selectedZone!.guid);
        dialogStore.closeDialog();
        await store.requestZones();
    }

    async function getAreaGeoJSON() {
        const json = await store.drawArea();
        console.log(json);
    }

    async function addArea() {
        await ppCLient.zoneAPI.addArea(dialogStore.selectedZone!.guid, newAreaData.value);
        await store.requestZones();
    }
</script>

<style lang="scss" scoped>
    .zone-dialog {
        display: flex;
        flex-direction: column;

        min-height: 400px;
        width: 600px;
        background-color: rgba(69, 00, 69, 0.5);
        border-radius: 20px;

        padding: 20px;

        backdrop-filter: blur(16px);

        .add-area-form {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .zone-info {
            flex-grow: 1;
        }

        .buttons {
            display: flex;
            flex-direction: row-reverse;
            gap: 10px;
        }
    }
</style>
