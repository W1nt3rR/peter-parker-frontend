<template>
    <DialogBox>
        <div class="zone-dialog">
            <h1>{{ dialogStore.selectedZone?.name }}</h1>

            <template v-if="addingNewArea">
                <div class="add-area-form">
                    <SelectButtons
                        label="Select"
                        :select-values="['lot', 'underground', 'garage']"
                        v-model="newAreaData.type"
                    />
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
                        v-model="newAreaData.numberOfSpaces"
                    />
                    <InputComponent
                        label="Working hours"
                        v-model="newAreaData.workingHours"
                        :maska="'##-##'"
                        placeholder="08-20"
                    />
                    <div class="combined-input">
                        <InputComponent
                            label="GeoJSON"
                            :disabled="true"
                            :placeholder="newAreaData.geoJSON ? 'Area GeoJSON added' : 'Draw Area'"
                        />
                        <ButtonComponent
                            label="Draw Area"
                            :callback="getAreaGeoJSON"
                        />
                    </div>
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
                <div class="zone-info">
                    <div class="tabs">
                        <div
                            class="tab"
                            :class="{
                                selected: area.guid === dialogStore.selectedArea?.guid,
                                underground: area.type === 'underground',
                                lot: area.type === 'lot',
                                garage: area.type === 'garage',
                            }"
                            v-for="area in dialogStore.selectedZone?.parkingAreas"
                            :key="area.guid"
                            @click="dialogStore.selectedArea = area"
                        >
                            {{ area.name }}
                        </div>
                    </div>

                    <div
                        class="parking"
                        v-if="dialogStore.selectedArea"
                    >
                        <div class="parking-spaces">
                            <div
                                class="parking-space"
                                :class="{
                                    selected: parking.guid === dialogStore.selectedParkingSpace?.guid,
                                    free: parking.vehicle === null,
                                    occupied: parking.vehicle !== null,
                                }"
                                v-for="parking in dialogStore.selectedArea.parkingSpaces"
                                :key="parking.guid"
                                @click="dialogStore.selectedParkingSpace = parking"
                            >
                                {{ parking.number }}
                            </div>
                        </div>

                        <div class="parking-info">
                            <div class="parking-space-info">
                                <div>Number: {{ dialogStore.selectedParkingSpace?.number }}</div>
                                <div>Vehicle: {{ dialogStore.selectedParkingSpace?.vehicle?.registration || "Unoccupied" }}</div>
                            </div>
                            <div class="actions">
                                <ButtonComponent
                                    :label="dialogStore.selectedParkingSpace?.vehicle ? 'Unpark' : 'Park'"
                                    :callback="togglePark"
                                />
                            </div>
                            <div class="error" v-if="errorMessage">
                                {{ errorMessage }}
                            </div>
                        </div>
                    </div>
                </div>

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
    </DialogBox>
</template>

<script setup lang="ts">
    import { onMounted, ref, watch } from "vue";
    import ppCLient from "@/ppClient";
    import useDialogStore from "@/stores/dialogStore";
    import useStore from "@/stores/store";
    import type { IAddAreaData } from "@/api/ZoneApi";

    // Components
    import ButtonComponent from "../button/ButtonComponent.vue";
    import { EButtonType } from "../button/ButtonDefinitions";
    import InputComponent from "../InputComponent.vue";
    import SelectButtons from "../SelectButtons.vue";
    import DialogBox from "./DialogBox.vue";

    const dialogStore = useDialogStore();
    const store = useStore();

    const errorMessage = ref<string | null>();
    const addingNewArea = ref<boolean>(false);
    const newAreaData = ref<IAddAreaData>({
        name: "",
        address: "",
        numberOfSpaces: "10",
        type: "",
        geoJSON: null,
        workingHours: "",
    });

    // Functions

    async function deleteZone() {
        await ppCLient.zoneAPI.delete(dialogStore.selectedZone!.guid);
        dialogStore.closeDialog();
        await store.requestZones();
    }

    async function getAreaGeoJSON() {
        const json = await store.drawArea();
        newAreaData.value.geoJSON = json as object;
    }

    async function addArea() {
        await ppCLient.zoneAPI.addArea(dialogStore.selectedZone!.guid, newAreaData.value);
        dialogStore.closeDialog();
        await store.requestZones();
    }

    async function togglePark() {
        errorMessage.value = null;

        if (!dialogStore.selectedParkingSpace || !store.selectedVehicle) {
            return;
        }

        if (dialogStore.selectedParkingSpace?.vehicle) {
            await ppCLient.vehicleApi.unpark(dialogStore.selectedParkingSpace.guid);
        } else {
            try {
                await ppCLient.vehicleApi.park(store.selectedVehicle.guid, dialogStore.selectedParkingSpace.guid);
            } catch (error) {
                console.log(error);
                errorMessage.value = "Vehicle already parked";
            }
        }

        await store.requestZones();

        // Update selected zone, area and parking space
        dialogStore.selectedZone = store.zones.find((z) => z.guid === dialogStore.selectedZone?.guid) || null;
        dialogStore.selectedArea = dialogStore.selectedZone?.parkingAreas.find((a) => a.guid === dialogStore.selectedArea?.guid) || null;
        console.log("parking space", dialogStore.selectedParkingSpace);

        dialogStore.selectedParkingSpace = dialogStore.selectedArea?.parkingSpaces.find((p) => p.guid === dialogStore.selectedParkingSpace?.guid) || null;
        console.log("parking space", dialogStore.selectedParkingSpace);
    }

    function preselect() {
        if (!dialogStore.selectedArea) {
            dialogStore.selectedArea = dialogStore.selectedZone?.parkingAreas[0] || null;
        }

        if (dialogStore.selectedParkingSpace) {
            if (dialogStore.selectedArea?.parkingSpaces.find((p) => p.guid === dialogStore.selectedParkingSpace?.guid)) {
                return;
            }
        }

        // find lowerst parking space with lowest number and vehicle is null in parking spaces
        const parkingSpaces = dialogStore.selectedArea?.parkingSpaces.filter((p) => p.vehicle === null);
        const lowestParkingSpace = parkingSpaces?.reduce((prev, curr) => {
            return prev.number < curr.number ? prev : curr;
        });
        dialogStore.selectedParkingSpace = lowestParkingSpace || null;
    }

    watch(
        () => dialogStore.selectedArea,
        (newValue, oldValue) => {
            if (newValue) {
                preselect();
            }
        }
    );

    onMounted(async () => {
        preselect();
    });
</script>

<style lang="scss" scoped>
    @import "@/sass/includes";

    .zone-dialog {
        display: flex;
        flex-direction: column;

        height: 550px;
        width: 800px;

        h1 {
            color: white;
        }

        .add-area-form,
        .zone-info {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-bottom: 20px;
            overflow: hidden;
        }

        .add-area-form {
            gap: 10px;

            overflow-y: auto;

            padding-right: 20px;

            .combined-input {
                display: flex;
                align-items: flex-end;
                gap: 10px;
            }
        }

        .zone-info {
            gap: 20px;

            .tabs {
                display: flex;
                height: 40px;
                gap: 4px;

                flex-shrink: 0;

                .tab {
                    height: 100%;
                    padding-inline: 20px;
                    background-color: rgba(69, 00, 69);
                    color: white;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    cursor: pointer;
                    user-select: none;

                    opacity: 0.6;

                    &.selected {
                        opacity: 1;
                    }

                    &.garage {
                        background-color: #006900;
                    }
                    &.underground {
                        background-color: #696900;
                    }
                    &.lot {
                        background-color: #000069;
                    }
                }
            }

            .parking {
                display: flex;
                .parking-spaces {
                    flex-grow: 1;
                    display: grid;
                    grid-template-columns: repeat(6, 1fr);
                    gap: 20px;

                    overflow-y: auto;

                    padding: 20px;

                    .example::-webkit-scrollbar {
                        display: none;
                    }

                    .parking-space {
                        height: 100px;
                        width: 100%;

                        outline: 3px solid white;
                        color: white;

                        display: flex;
                        align-items: center;
                        justify-content: center;

                        font-size: 2rem;

                        cursor: pointer;
                        user-select: none;

                        &.selected {
                            outline: 3px solid #ff00ff;
                        }

                        &.free {
                            background-color: #006900;
                        }
                        &.occupied {
                            background-color: #690000;
                        }
                    }
                }

                .parking-info {
                    flex-shrink: 0;
                    width: 200px;

                    padding: 20px;

                    color: white;
                }
            }
        }

        .buttons {
            flex-shrink: 0;
            display: flex;
            flex-direction: row-reverse;
            gap: 10px;
        }
    }
</style>
