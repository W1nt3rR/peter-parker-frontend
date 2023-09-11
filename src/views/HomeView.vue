<template>
    <div>Home</div>
    <div>
        {{ store.user }}
    </div>
</template>

<script setup lang="ts">
    import { useStore } from "@/stores/store";

    const store = useStore();
</script>

<style scoped lang="scss">
    @import "@/sass/includes";
</style>
