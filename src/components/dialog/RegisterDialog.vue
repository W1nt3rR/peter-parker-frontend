<template>
    <DialogBox>
        <div class="register-dialog">
            <h1>Register</h1>
            <InputComponent
                label="First Name"
                v-model="firstName"
            />
            <InputComponent
                label="Last Name"
                v-model="lastName"
            />
            <InputComponent
                label="Email"
                v-model="email"
            />
            <InputComponent
                label="Home Adress"
                v-model="homeAddress"
            />
            <InputComponent
                label="Password"
                v-model="password"
            />
            <InputComponent
                label="Confirm Password"
                v-model="confirmPassword"
            />
            <ButtonComponent
                label="Register"
                :callback="register"
                :type="EButtonType.PRIMARY"
            />

            <div v-if="errorMessage">
                {{ errorMessage }}
            </div>

            <ButtonComponent
                label="Go to login"
                :callback="() => (dialogStore.showRegisterDialog = false)"
                :type="EButtonType.SECONDARY"
                :loading="loading"
            />
        </div>
    </DialogBox>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import ppCLient from "@/ppClient";
    import useDialogStore from "@/stores/dialogStore";
    import type { IRegisterData } from "@/api/authApi";
    import useStore from "@/stores/store";

    // Components
    import DialogBox from "./DialogBox.vue";
    import InputComponent from "@/components/InputComponent.vue";
    import ButtonComponent from "@/components/button/ButtonComponent.vue";
    import { EButtonType } from "@/components/button/ButtonDefinitions";

    const dialogStore = useDialogStore();
    const store = useStore();

    // Data
    const errorMessage = ref<string | null>(null);
    const loading = ref<boolean>(false);
    const email = ref<string>("");
    const firstName = ref<string>("");
    const lastName = ref<string>("");
    const homeAddress = ref<string>("");
    const password = ref<string>("");
    const confirmPassword = ref<string>("");

    // Functions
    async function register() {
        errorMessage.value = null;

        if (!email.value || !password.value || !firstName.value || !lastName.value || !homeAddress.value) {
            errorMessage.value = "Please fill in all fields";
            return;
        }

        if (password.value !== confirmPassword.value) {
            errorMessage.value = "Passwords do not match";
            return;
        }

        loading.value = true;

        const data: IRegisterData = {
            firstName: firstName.value,
            lastName: lastName.value,
            homeAddress: homeAddress.value,
            password: password.value,
            email: email.value,
        };

        try {
            await ppCLient.authAPI.register(data);
            await store.requestZones();
        } catch (error: any) {
            errorMessage.value = error.backendErrorObj?.Message || error.message;
        }

        loading.value = false;
    }
</script>

<style scoped lang="scss">
    .register-dialog {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;

        width: 400px;

        overflow-y: auto;

        h1 {
            color: white;
        }
    }
</style>
