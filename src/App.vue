<script setup lang="ts">
    import { ref } from "vue";
    import { RouterLink, RouterView } from "vue-router";
    import HelloWorld from "./components/HelloWorld.vue";
    import router from "./router";
import config from "./config";
import ppCLient from "./ppClient";

    function goTo(route: string) {
        router.push(route);
    }

    let broj = 10;

    const countRef = ref(0);
    const email = ref("ramiz@gmail.com");
    const password = ref("Ramiz@123");

    function count() {
        // countRef.value = countRef.value + 1;
        broj = broj + 1;
        console.log("broj", broj);
        
    }

    function login() {
        ppCLient.auth.login(email.value, password.value);
    }

    function makeInstructor() {
        ppCLient.instructorAPI.makeInstructor(email.value);
    }

    function removeInstructor() {
        ppCLient.instructorAPI.removeInstructor(email.value);
    }

    function doubleCount() {
        countRef.value = countRef.value * 2;
    }

    function idk() {
        // config.apiBaseURL
    }
</script>

<template>
    <!-- <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

        <div class="wrapper" @click="goTo('bro')">
            <HelloWorld msg="You did it!" />

            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
            </nav>
        </div>
    </header>

    <RouterView /> -->

    <p>counter {{ countRef }}</p>
    <p>{{ broj }}</p>
    <p>{{ config.apiBaseURL }}</p>

    <div class="button" @click="login">
        Dugme
    </div>

    <div @click="makeInstructor">
        Make Instructor
    </div>

    <div @click="removeInstructor">
        Remove Instructor
    </div>

    <input type="text" v-model="email">
    <input type="text" v-model="password">
</template>

<style lang="scss" scoped>

    .button {
        background-color: red;
        width: 100px;
        height: 40px;

        
    }

    header {
        line-height: 1.5;
        max-height: 100vh;
    }

    .logo {
        display: block;
        margin: 0 auto 2rem;
    }

    nav {
        width: 100%;
        font-size: 12px;
        text-align: center;
        margin-top: 2rem;
    }

    nav a.router-link-exact-active {
        color: var(--color-text);
    }

    nav a.router-link-exact-active:hover {
        background-color: transparent;
    }

    nav a {
        display: inline-block;
        padding: 0 1rem;
        border-left: 1px solid var(--color-border);
    }

    nav a:first-of-type {
        border: 0;
    }

    @media (min-width: 1024px) {
        header {
            display: flex;
            place-items: center;
            padding-right: calc(var(--section-gap) / 2);
        }

        .logo {
            margin: 0 2rem 0 0;
        }

        header .wrapper {
            display: flex;
            place-items: flex-start;
            flex-wrap: wrap;
        }

        nav {
            text-align: left;
            margin-left: -1rem;
            font-size: 1rem;

            padding: 1rem 0;
            margin-top: 1rem;
        }
    }
</style>
