<template>
    <div class="floating-buttons">
        <template v-if="store.isAdmin">
            <ButtonComponent
                v-if="!dialogStore.zoneEditing"
                :label="store.drawing ? 'Cancel' : 'Add Zone'"
                :callback="store.drawing ? store.disableDraw : store.drawZone"
            />
            <ButtonComponent
                v-if="dialogStore.zoneEditing"
                label="Cancel"
                :callback="() => dialogStore.toggleEditingZone(true)"
            />
            <ButtonComponent
                v-if="dialogStore.zoneEditing"
                label="Finish"
                :callback="dialogStore.toggleEditingZone"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
    import useDialogStore from "@/stores/dialogStore";
    import useStore from "@/stores/store";

    // Components
    import ButtonComponent from "./button/ButtonComponent.vue";

    const store = useStore();
    const dialogStore = useDialogStore();
</script>

<style scoped lang="scss">
    .floating-buttons {
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 1rem;

        z-index: 900;

        display: flex;
        gap: 10px;
    }
</style>
