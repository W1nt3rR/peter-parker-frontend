<template>
    <RouterView />
    <DialogContainer v-if="dialogStore.dialogType || !store.user">
        <RegisterDialog v-if="!store.user && dialogStore.showRegisterDialog" />
        <LoginDialog v-else-if="!store.user" />
        <template v-else>
            <ZoneModalDialog
                @click.stop
                v-if="dialogStore.dialogType === EDialogs.ZONE"
            />
            <SettingsDialog
                @click.stop
                v-if="dialogStore.dialogType === EDialogs.SETTINGS"
            />
            <SubscriptionDialog
                @click.stop
                v-if="dialogStore.dialogType === EDialogs.SUBSCRIPTION"
            />
        </template>
    </DialogContainer>
    <FloatingButtons />
</template>

<script setup lang="ts">
    import useDialogStore, { EDialogs } from "./stores/dialogStore";
    import useStore from "./stores/store";

    // Components
    import DialogContainer from "@/components/dialog/DialogContainer.vue";
    import FloatingButtons from "@/components/FloatingButtons.vue";
    import ZoneModalDialog from "./components/dialog/ZoneModalDialog.vue";
    import SettingsDialog from "./components/dialog/settings/SettingsDialog.vue";
    import LoginDialog from "./components/dialog/LoginDialog.vue";
    import RegisterDialog from "./components/dialog/RegisterDialog.vue";
    import SubscriptionDialog from "./components/dialog/SubscriptionDialog.vue";

    const dialogStore = useDialogStore();
    const store = useStore();
</script>

<style lang="scss" scoped></style>
