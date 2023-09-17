<template>
    <RouterView />
    <DialogContainer v-if="dialogStore.dialogType" />
</template>

<script setup lang="ts">
    // Components
    import DialogContainer from "@/components/dialog/DialogContainer.vue";

    import useDialogStore from "./stores/dialogStore";

    const dialogStore = useDialogStore();
</script>

<style lang="scss" scoped></style>
