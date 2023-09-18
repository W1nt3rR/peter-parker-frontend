<template>
    <div
        v-show="!dialogStore.zoneEditing && !store.drawing"
        class="dialog-container"
        @click="dialogStore.closeDialog"
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
    import useDialogStore from "@/stores/dialogStore";
    import useStore from "@/stores/store";

    const dialogStore = useDialogStore();
    const store = useStore();
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
