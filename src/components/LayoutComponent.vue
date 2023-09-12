<template>
    <div id="layout">
        <nav>
            <div>{{ store.user }}</div>
        </nav>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
    import { useStore } from "@/stores/store";

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
            padding: 1rem;
            height: 4rem;
        }
    }
</style>
