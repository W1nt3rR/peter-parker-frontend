<template>
    <DialogBox>
        <div class="subscription-dialog">
            <div class="navigation">
                <div
                    class="navigation-item"
                    :class="{ active: activeTab === ESubscriptionTabs.SUBSCRIPTION }"
                    @click="activeTab = ESubscriptionTabs.SUBSCRIPTION"
                >
                    Subscription
                </div>
                <div
                    class="navigation-item"
                    :class="{ active: activeTab === ESubscriptionTabs.PASSES }"
                    @click="activeTab = ESubscriptionTabs.PASSES"
                >
                    Passes
                </div>
            </div>

            <div
                class="tab"
                v-if="activeTab === ESubscriptionTabs.SUBSCRIPTION"
            >
                <h1>Subscription</h1>

                <template v-if="store.user?.subscription">
                    <div class="expiry">Your subscription expires on {{ new Date(store.user.subscription.expiration).toLocaleString() }}</div>
                    <ButtonComponent
                        label="Unsubscribe"
                        :callback="unsubscribe"
                        :loading="loading"
                    />
                </template>

                <template v-else>
                    <SelectButtons
                        :select-values="Object.values(ESubscriptionPeriod)"
                        v-model="selectedPeriod"
                    />
                    <div class="price">{{ selectedPrice }}</div>
                    <ButtonComponent
                        label="Subscribe"
                        :callback="subscribe"
                        :loading="loading"
                    />
                </template>
            </div>

            <div
                class="tab"
                v-if="activeTab === ESubscriptionTabs.PASSES"
            >
                <h1>Passes</h1>

                <div class="zones-select">
                    <div
                        class="zone-item"
                        v-for="zone in store.zones"
                        :key="zone.guid"
                        @click="toggleSelectedZone(zone)"
                    >
                        <div class="name">
                            {{ zone.name }}
                        </div>
                        <div
                            class="checkmark"
                            v-if="selectedZones.includes(zone.guid)"
                        >
                            &#10004;
                        </div>
                    </div>
                </div>

                <div class="buttons">
                    <input
                        type="number"
                        v-model="hours"
                    />
                    <ButtonComponent
                        label="Buy Pass"
                        :callback="buyPass"
                    />
                    <div class="price">
                        {{ passPrice }}
                    </div>
                </div>
            </div>
        </div>
    </DialogBox>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref } from "vue";
    import useStore from "@/stores/store";
    import ppCLient from "@/ppClient";
    import type { IZoneData } from "@/api/ZoneApi";

    // Components
    import DialogBox from "./DialogBox.vue";
    import SelectButtons from "../SelectButtons.vue";
    import ButtonComponent from "../button/ButtonComponent.vue";

    const store = useStore();

    enum ESubscriptionTabs {
        SUBSCRIPTION,
        PASSES,
    }

    interface IPrice {
        weekly: number;
        monthly: number;
        annually: number;
    }

    enum ESubscriptionPeriod {
        WEEKLY = "weekly",
        MONTHLY = "monthly",
        ANNUALLY = "annually",
    }

    const activeTab = ref(ESubscriptionTabs.SUBSCRIPTION);
    const selectedPeriod = ref<ESubscriptionPeriod>(ESubscriptionPeriod.MONTHLY);
    const loading = ref(false);
    const prices = ref<IPrice | null>(null);

    const selectedZones = ref<Array<string>>([]);
    const hours = ref(1);

    const selectedPrice = computed(() => {
        if (!prices.value) return null;
        return prices.value[selectedPeriod.value];
    });

    const passPrice = computed(() => {
        if (!selectedZones.value.length) return 0;

        let price = 0;

        selectedZones.value.forEach((zoneGUID) => {
            const zone = store.zones.find((z) => z.guid === zoneGUID);
            price += zone!.hourlyRate * hours.value;
        });

        if (selectedZones.value.length > 6) {
            price *= 0.4;
        } else {
            price *= 1 - 0.1 * (selectedZones.value.length - 1);
            console.log("multipler", 1 - 0.1 * (selectedZones.value.length - 1));
            
        }

        return price;
    });

    function toggleSelectedZone(zone: IZoneData) {
        if (selectedZones.value.includes(zone.guid)) {
            selectedZones.value = selectedZones.value.filter((z) => z !== zone.guid);
        } else {
            selectedZones.value = [...selectedZones.value, zone.guid];
        }
    }

    async function subscribe() {
        loading.value = true;
        ppCLient.subscriptionApi.subscribe(selectedPeriod.value);
        loading.value = false;
    }

    async function unsubscribe() {
        loading.value = true;
        ppCLient.subscriptionApi.unsubscribe();
        loading.value = false;
    }

    async function buyPass() {
        await ppCLient.passApi.add(hours.value, selectedZones.value);
    }

    onMounted(async () => {
        prices.value = await ppCLient.subscriptionApi.getPrices();
    });
</script>

<style scoped lang="scss">
    .subscription-dialog {
        width: 600px;
        height: 500px;

        display: flex;
        flex-direction: column;

        .navigation {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            height: 50px;
            width: 100%;

            border-radius: 10px;
            overflow: hidden;

            .navigation-item {
                height: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                opacity: 0.5;
                background-color: #690069;
                color: white;

                cursor: pointer;

                &.active {
                    opacity: 1;
                }
            }
        }

        .tab {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: center;

            max-height: 85%;

            gap: 20px;

            h1 {
                color: white;
            }

            .expiry {
                color: white;
            }

            .price {
                color: white;
                font-size: 2rem;
            }

            .enum-select-buttons {
                width: unset;
            }

            .buttons {
                display: flex;
                gap: 10px;

                align-items: center;

                input {
                    width: 50px;
                }
            }

            .zones-select {
                display: flex;
                flex-direction: column;
                gap: 10px;

                width: 100%;
                height: 100%;

                overflow-y: auto;

                .zone-item {
                    display: flex;
                    justify-content: space-between;

                    flex-shrink: 0;

                    width: 100%;
                    height: 40px;

                    background-color: #690069;
                    color: white;
                    padding: 10px;
                    border-radius: 10px;

                    .checkmark {
                        height: 100%;
                        aspect-ratio: 1;
                    }
                }
            }
        }
    }
</style>
