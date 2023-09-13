<template>
    <FormBox title="Login">
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
    </FormBox>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import ppCLient from "@/ppClient";
    import router from "@/router";
    import type { IRegisterData } from "@/api/authApi";

    // Components
    import FormBox from "@/components/FormBox.vue";
    import InputComponent from "@/components/InputComponent.vue";
    import ButtonComponent from "@/components/button/ButtonComponent.vue";
    import { EButtonType } from "@/components/button/ButtonDefinitions";

    // Data
    const email = ref<string>("");
    const password = ref<string>("");
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

<style scoped lang="scss"></style>
