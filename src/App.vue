<template>
    <div class="userInfo">
        {{ store.user }}
    </div>
    <div
        class="button"
        @click="login"
    >
        Dugme
    </div>

    <div @click="makeInspector">Make Inspector</div>

    <div @click="removeInspector">Remove Inspector</div>

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
    import { useStore } from "./stores/store";

    const store = useStore();

    function goTo(route: string) {
        router.push(route);
    }

    const email = ref("ramiz@gmail.com");
    const password = ref("Ramiz@123");

    function login() {
        ppCLient.auth.login(email.value, password.value);
    }

    function makeInspector() {
        ppCLient.inspectorAPI.makeInspector(email.value);
    }

    function removeInspector() {
        ppCLient.inspectorAPI.makeInspector(email.value);
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
