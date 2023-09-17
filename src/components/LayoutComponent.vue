<template>
    <div id="layout">
        <nav>
            <div>{{ store.user ? store.user.email : "logged out" }}</div>
            <AvatarComponent />
        </nav>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
    import useStore from "@/stores/store";

    // Components
    import AvatarComponent from "./AvatarComponent.vue";

    const store = useStore();
</script>

<style scoped lang="scss">
    #layout {
        display: flex;
        flex-direction: column;
        height: 100vh;

        nav {
            background-color: #333;
            color: #fff;
            padding: 0.75rem;
            height: 4rem;

            display: flex;
            justify-content: space-between;
        }
    }
</style>
