<template>
    <div class="zone-dialog">
        <h1>Zone Modal Dialog</h1>
        <div>{{ dialogStore.selectedZone }}</div>

        <ButtonComponent
            label="Delete"
            :callback="deleteZone"
        />
        <ButtonComponent
            label="Edit"
            :callback="dialogStore.toggleEditingZone"
        />
    </div>
</template>

<script setup lang="ts">
    import ppCLient from "@/ppClient";
    import useDialogStore from "@/stores/dialogStore";
    import ButtonComponent from "../button/ButtonComponent.vue";
    import useStore from "@/stores/store";

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
        height: 400px;
        width: 400px;
        background-color: rgba(69, 00, 69, 0.5);
        border-radius: 20px;

        backdrop-filter: blur(16px);
    }
</style>
