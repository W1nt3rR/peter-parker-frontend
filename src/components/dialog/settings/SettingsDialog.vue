<template>
    <DialogBox>
        <div class="settings-dialog">
            <div class="tabs">
                <div
                    class="tab"
                    v-for="tab in tabs"
                    :key="tab.name"
                    @click="selectedTab = tab.name"
                >
                    {{ tab.name }}
                </div>
            </div>

            <div class="tab-view">
                <ProfileSettings v-if="selectedTab === 'Profile'" />
                <VehicleSettings v-if="selectedTab === 'Vehicles'" />
                <TicketSettings v-if="selectedTab === 'Tickets'" />
            </div>
        </div>
    </DialogBox>
</template>

<script setup lang="ts">
    import { ref } from "vue";

    // Components
    import DialogBox from "../DialogBox.vue";
    import ProfileSettings from "./ProfileSettings.vue";
    import VehicleSettings from "./VehicleSettings.vue";
    import TicketSettings from "./TicketSettings.vue";

    const tabs = ref([
        {
            name: "Profile",
        },
        {
            name: "Vehicles",
        },
        {
            name: "Tickets",
        },
    ]);
    const selectedTab = ref<string>(tabs.value[0].name);
</script>

<style lang="scss">
    @import "@/sass/includes";

    .settings-dialog {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        gap: 20px;

        .tabs {
            width: 200px;
            height: 100%;
            display: flex;
            flex-direction: column;

            border-radius: 10px;
            overflow: hidden;

            gap: 4px;

            .tab {
                height: 40px;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 1.2rem;
                font-weight: 500;
                transition: all 0.2s ease-in-out;

                color: white;

                background-color: $buttonPrimaryColor;

                &:hover {
                    background-color: $buttonPrimaryColorHover;
                }
                &:active {
                    background-color: $buttonPrimaryColorActive;
                }
            }
        }

        .tab-view {
            height: 100%;
            flex-grow: 1;

            background-color: $buttonPrimaryColor;
            border-radius: 10px;

            .settings {
                height: 100%;
                width: 100%;
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;

                h1 {
                    margin: 0;
                    font-size: 2rem;
                    font-weight: 500;
                    color: white;
                }

                .items {
                    width: 100%;
                    flex-grow: 1;

                    display: flex;
                    flex-direction: column;

                    gap: 10px;
                }
            }
        }
    }
</style>
