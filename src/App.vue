<template>
    <div
        class="button"
        @click="login"
    >
        Dugme
    </div>

    <div @click="makeInstructor">Make Instructor</div>

    <div @click="removeInstructor">Remove Instructor</div>

    <input
        type="text"
        v-model="email"
    />
    <input
        type="text"
        v-model="password"
    />
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import router from "./router";
    import ppCLient from "./ppClient";

    function goTo(route: string) {
        router.push(route);
    }

    const email = ref("ramiz@gmail.com");
    const password = ref("Ramiz@123");

    function login() {
        ppCLient.auth.login(email.value, password.value);
    }

    function makeInstructor() {
        ppCLient.instructorAPI.makeInstructor(email.value);
    }

    function removeInstructor() {
        ppCLient.instructorAPI.removeInstructor(email.value);
    }
</script>

<style lang="scss" scoped>
    .button {
        background-color: rgb(83, 10, 10);
        width: 100px;
        height: 40px;
        border-radius: 10px;
        color: white;

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
