<template>
    <RouterView />
    <DialogContainer v-if="dialogStore.dialogType" />
    <FloatingButtons />
</template>

<script setup lang="ts">
    import useDialogStore from "./stores/dialogStore";

    // Components
    import DialogContainer from "@/components/dialog/DialogContainer.vue";
    import FloatingButtons from "@/components/FloatingButtons.vue";

    const dialogStore = useDialogStore();
</script>

<style lang="scss" scoped></style>
