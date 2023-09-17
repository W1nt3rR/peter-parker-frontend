<template>
    <div class="zone-dialog">
        <h1>{{ dialogStore.selectedZone?.name }}</h1>

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
        </div>
    </div>
</template>

<script setup lang="ts">
    import ppCLient from "@/ppClient";
    import useDialogStore from "@/stores/dialogStore";
    import ButtonComponent from "../button/ButtonComponent.vue";
    import useStore from "@/stores/store";
    import { EButtonType } from "../button/ButtonDefinitions";

    const dialogStore = useDialogStore();
    const store = useStore();

    // Functions

    async function deleteZone() {
        await ppCLient.zoneAPI.delete(dialogStore.selectedZone!.guid);
        dialogStore.closeDialog();
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
