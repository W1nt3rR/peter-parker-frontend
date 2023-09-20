<template>
    <div class="settings profile">
        <h1>Profile Settings</h1>
        <div class="items">
            <InputComponent
                label="First name"
                v-model="firstName"
            />
            <InputComponent
                label="Last name"
                v-model="lastName"
            />
            <InputComponent
                label="Home address"
                v-model="homeAddress"
            />
            <InputComponent
                label="Password"
                v-model="password"
                :type="EInputTypes.PASSWORD"
            />
            <InputComponent
                label="Confirm password"
                v-model="confirmPassword"
                :type="EInputTypes.PASSWORD"
            />
        </div>

        <div class="buttons">
            <ButtonComponent
                label="Save Changes"
                :callback="saveChanges"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import useStore from "@/stores/store";

    // Components
    import InputComponent from "@/components/input/InputComponent.vue";
    import ppCLient from "@/ppClient";
    import ButtonComponent from "@/components/button/ButtonComponent.vue";
import { EInputTypes } from "@/components/input/InputDefinitions";

    const store = useStore();

    const firstName = ref<string>("");
    const lastName = ref<string>("");
    const homeAddress = ref<string>("");
    const password = ref<string>("");
    const confirmPassword = ref<string>("");

    async function saveChanges() {
        if (password.value !== confirmPassword.value) return alert("Passwords do not match");

        const data: any = {
            firstName: firstName.value,
            lastName: lastName.value,
            homeAddress: homeAddress.value,
        };

        if (password.value) data.password = password.value;

        try {
            await ppCLient.authAPI.updateUserData(data);
        } catch (error) {
            console.log("profile settings", error);
        }
    }

    onMounted(() => {
        if (!store.user) return;

        firstName.value = store.user.firstName;
        lastName.value = store.user.lastName;
        homeAddress.value = store.user.homeAddress;
    });
</script>

<style lang="scss">
    @import "@/sass/includes";
</style>
