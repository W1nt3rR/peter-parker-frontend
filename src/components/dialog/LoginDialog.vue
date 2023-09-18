<template>
    <DialogBox>
        <div class="login-dialog">
            <h1>Login</h1>
            <InputComponent
                label="Email"
                v-model="email"
            />
            <InputComponent
                label="Password"
                v-model="password"
            />
            <ButtonComponent
                label="Login"
                :callback="login"
                :type="EButtonType.PRIMARY"
            />

            <ButtonComponent
                label="Go to register"
                :callback="() => dialogStore.showRegisterDialog = true"
                :type="EButtonType.SECONDARY"
            />
        </div>
    </DialogBox>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import ppCLient from "@/ppClient";
    import useStore from "@/stores/store";
    import useDialogStore from "@/stores/dialogStore";

    // Components
    import DialogBox from "./DialogBox.vue";
    import InputComponent from "@/components/InputComponent.vue";
    import ButtonComponent from "@/components/button/ButtonComponent.vue";
    import { EButtonType } from "@/components/button/ButtonDefinitions";

    const dialogStore = useDialogStore();
    const store = useStore();

    // Data
    const email = ref<string>("");
    const password = ref<string>("");

    // Functions
    async function login() {
        try {
            await ppCLient.authAPI.login(email.value, password.value);
            await store.requestZones();
        } catch (error: any) {
            // TODO: Handle error
        }
    }
</script>

<style scoped lang="scss">
    .login-dialog {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;

        padding: 40px;

        h1 {
            color: white;
        }
    }
</style>
