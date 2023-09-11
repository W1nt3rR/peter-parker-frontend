<template>
    <div class="form-box">
        <h1>{{ title }}</h1>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
    // Interfaces
    interface Props {
        title: string;
    }

    // Props
    const props = defineProps<Props>();
</script>

<style scoped lang="scss">
    @import "@/sass/includes";

    .form-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;

        width: 400px;

        border-radius: 10px;
        background-color: rgba($color: $mainColor, $alpha: 0.2);

        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
        padding: 20px;

        h1 {
            color: white;
        }
    }
</style>
