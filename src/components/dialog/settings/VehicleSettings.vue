<template>
    <div class="settings vehicle">
        <h1>Vehicle Settings</h1>

        <div class="add-vehicle-input">
            <InputComponent
                label="Add vehicle by registration number"
                v-model="registration"
            />
            <ButtonComponent
                label="Add"
                :callback="addVehicle"
                :type="EButtonType.PRIMARY"
            />
        </div>

        <div class="items">
            <div
                class="vehicle-item"
                v-for="vehicle in store.user?.vehicles"
                :key="vehicle.guid"
            >
                {{ vehicle.registration }}
                <ButtonComponent
                    label="Remove"
                    :callback="() => removeVehicle(vehicle.registration)"
                    :type="EButtonType.DANGER"
                />
            </div>
        </div>

        <div class="buttons"></div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import ppCLient from "@/ppClient";
    import useStore from "@/stores/store";

    // Components
    import InputComponent from "@/components/input/InputComponent.vue";
    import ButtonComponent from "@/components/button/ButtonComponent.vue";
    import { EButtonType } from "@/components/button/ButtonDefinitions";

    const store = useStore();

    const registration = ref<string>("");

    async function addVehicle() {
        await ppCLient.vehicleApi.addVehicle(registration.value);
        await ppCLient.authAPI.requestUserData();
    }

    async function removeVehicle(vehicleRegistration: string) {
        await ppCLient.vehicleApi.removeVehicle(vehicleRegistration);
        await ppCLient.authAPI.requestUserData();
    }
</script>

<style lang="scss">
    @import "@/sass/includes";

    .settings.vehicle {
        .add-vehicle-input {
            display: flex;
            align-items: flex-end;
            gap: 10px;

            width: 100%;
        }

        .vehicle-item {
            display: flex;
            align-items: center;
            justify-content: space-between;

            width: 100%;
        }
    }
</style>
