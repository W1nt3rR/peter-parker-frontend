<template>
    <DialogBox>
        <div class="register-dialog">
            <h1>Register</h1>
            <InputComponent
                label="First Name"
                v-model="data.firstName"
            />
            <InputComponent
                label="Last Name"
                v-model="data.lastName"
            />
            <InputComponent
                label="Email"
                v-model="data.email"
            />
            <InputComponent
                label="Password"
                v-model="data.password"
            />
            <InputComponent
                label="Confirm Password"
                v-model="data.passwordConfirmation"
            />
            <ButtonComponent
                label="Register"
                :callback="register"
                :type="EButtonType.PRIMARY"
            />

            <ButtonComponent
                label="Go to login"
                :callback="() => (dialogStore.showRegisterDialog = false)"
                :type="EButtonType.SECONDARY"
            />
        </div>
    </DialogBox>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import ppCLient from "@/ppClient";
    import router from "@/router";
    import useDialogStore from "@/stores/dialogStore";
    import type { IRegisterData } from "@/api/authApi";


    // Components
    import DialogBox from "./DialogBox.vue";
    import InputComponent from "@/components/InputComponent.vue";
    import ButtonComponent from "@/components/button/ButtonComponent.vue";
    import { EButtonType } from "@/components/button/ButtonDefinitions";

    const dialogStore = useDialogStore();

    // Data
    const data = ref<IRegisterData>({
        email: "",
        password: "",
        passwordConfirmation: "",
        firstName: "",
        lastName: "",
    });

    // Functions
    async function register() {
        try {
            await ppCLient.authAPI.register(data.value);
            router.push("/home");
        } catch (error) {
            // TODO: Handle error
        }
    }
</script>

<style scoped lang="scss">
    .register-dialog {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;

        height: 100%;

        overflow-y: auto;

        padding: 40px;

        h1 {
            color: white;
        }
    }
</style>
