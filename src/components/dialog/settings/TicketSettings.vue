<template>
    <div class="settings ticket">
        <h1>Ticket Settings</h1>
        <div class="items">
            <div
                class="ticket-item"
                v-for="ticket in tickets"
                :key="ticket.guid"
            >
                <div class="reason">
                    {{ ticket.issueReason }}
                </div>
                <template v-if="!ticket.paid">
                    <InputComponent v-model="settleReason" />
                    <ButtonComponent label="Settle" :callback="() => settle(ticket.guid)"/>
                </template>
                <div class="filler"></div>
                <div v-if="ticket.paid">
                    Paid
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import type { ITicketData } from "@/api/TicketApi";
    import ppCLient from "@/ppClient";

    // Components
    import ButtonComponent from "@/components/button/ButtonComponent.vue";
    import InputComponent from "@/components/input/InputComponent.vue";

    const settleReason = ref<string>("");
    const tickets = ref<Array<ITicketData> | null>(null);

    async function settle(ticketGuid: string) {
        await ppCLient.ticketApi.settle({
            GUID: ticketGuid,
            SettleReason: settleReason.value,
        });
        tickets.value = await ppCLient.ticketApi.all();
    }

    onMounted(async () => {
        tickets.value = await ppCLient.ticketApi.all();
    });
</script>

<style lang="scss">
    @import "@/sass/includes";

    .ticket {
        .items {
            gap: 10px;
            .ticket-item {
                display: flex;
                align-items: center;
                padding-inline: 10px;

                height: 40px;
                border-radius: 10px;
                color: white;
                background-color: #690069;
            }
        }
    }
</style>
