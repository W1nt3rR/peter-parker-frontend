<template>
    <div
        v-show="!dialogStore.zoneEditing"
        class="dialog-container"
        @click="dialogStore.closeDialog"
    >
        <ZoneModalDialogVue
            @click.stop
            v-if="dialogStore.dialogType === EDialogs.ZONE"
        />
    </div>
</template>

<script setup lang="ts">
    import useDialogStore, { EDialogs } from "@/stores/dialogStore";

    // Components
    import ZoneModalDialogVue from "@/components/dialog/ZoneModalDialog.vue";

    const dialogStore = useDialogStore();
</script>

<style scoped lang="scss">
    .dialog-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        z-index: 1000;

        background-color: rgba(0, 0, 0, 0.5);

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
