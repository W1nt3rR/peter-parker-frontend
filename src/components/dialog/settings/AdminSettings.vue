<template>
    <div class="settings admin">
        <h1>Administration</h1>
        <div class="row">
            <InputComponent
                label="User email"
                v-model="makeInspectorEmail"
            />
            <ButtonComponent
                label="Make Inspector"
                :callback="makeInspector"
                :loading="makeInspectorLoading"
            />
        </div>

        <div class="row">
            <InputComponent
                label="User email"
                v-model="revokeInspectorEmail"
            />
            <ButtonComponent
                label="Revoke Inspector"
                :callback="revokeInspector"
                :loading="revokeInspectorLoading"
            />
        </div>

        <div class="row">
            <InputComponent
                label="User email"
                v-model="makeAdminEmail"
            />
            <ButtonComponent
                label="Make Admin"
                :callback="makeAdmin"
                :loading="makeAdminLoading"
            />
        </div>

        <div class="row">
            <InputComponent
                label="User email"
                v-model="revokeAdminEmail"
            />
            <ButtonComponent
                label="Revoke Admin"
                :callback="revokeAdmin"
                :loading="revokeAdminLoading"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import ppCLient from "@/ppClient";

    // Components
    import ButtonComponent from "@/components/button/ButtonComponent.vue";
    import InputComponent from "@/components/input/InputComponent.vue";

    const makeInspectorEmail = ref<string>("");
    const makeAdminEmail = ref<string>("");
    const revokeInspectorEmail = ref<string>("");
    const revokeAdminEmail = ref<string>("");

    const makeInspectorLoading = ref<boolean>(false);
    const makeAdminLoading = ref<boolean>(false);
    const revokeInspectorLoading = ref<boolean>(false);
    const revokeAdminLoading = ref<boolean>(false);

    async function makeInspector() {
        makeInspectorLoading.value = true;
        await ppCLient.inspectorAPI.makeInspector(makeInspectorEmail.value);
        makeInspectorLoading.value = false;
    }

    async function revokeInspector() {
        revokeInspectorLoading.value = true;
        await ppCLient.inspectorAPI.removeInspector(revokeInspectorEmail.value);
        revokeInspectorLoading.value = false;
    }

    async function makeAdmin() {
        makeAdminLoading.value = true;
        await ppCLient.inspectorAPI.makeAdmin(makeAdminEmail.value);
        makeAdminLoading.value = false;
    }

    async function revokeAdmin() {
        revokeAdminLoading.value = true;
        await ppCLient.inspectorAPI.removeAdmin(revokeAdminEmail.value);
        revokeAdminLoading.value = false;
    }
</script>

<style lang="scss">
    @import "@/sass/includes";

    .admin {
        gap: 20px;
        .row {
            width: 100%;
            display: flex;
            align-items: flex-end;
            gap: 10px;
        }
    }
</style>
