<template>
    <FormBox title="Login">
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
    </FormBox>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import ppCLient from "@/ppClient";
    import router from "@/router";

    // Components
    import FormBox from "@/components/FormBox.vue";
    import InputComponent from "@/components/InputComponent.vue";
    import ButtonComponent from "@/components/button/ButtonComponent.vue";
    import { EButtonType } from "@/components/button/ButtonDefinitions";

    // Data
    const email = ref<string>("");
    const password = ref<string>("");

    // Functions
    async function login() {
        try {
            await ppCLient.authAPI.login(email.value, password.value);
            router.push("/");
        } catch (error) {
            // TODO: Handle error
        }
    }
</script>

<style scoped lang="scss"></style>
