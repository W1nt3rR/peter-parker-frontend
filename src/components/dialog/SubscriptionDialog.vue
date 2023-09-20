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
                    {{ store.user.subscription }}
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
            </div>
        </div>
    </DialogBox>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref } from "vue";
    import useStore from "@/stores/store";
    import ppCLient from "@/ppClient";

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

    const selectedPrice = computed(() => {
        if (!prices.value) return null;
        return prices.value[selectedPeriod.value];
    });

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
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;

            gap: 20px;

            h1 {
                color: white;
            }

            .price {
                color: white;
                font-size: 2rem;
            }

            .enum-select-buttons {
                width: unset;
            }
        }
    }
</style>
