<template>
    <div class="loader"></div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
    .loader {
        border: 3px solid #f3f3f3;
        border-top: 3px solid #690069;
        border-radius: 50%;

        height: 100%;
        aspect-ratio: 1;

        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
