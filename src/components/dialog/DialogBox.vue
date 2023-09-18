<template>
    <div class="dialog-box">
        <slot></slot>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
    @import "@/sass/includes";

    .dialog-box {
        height: 500px;
        width: 800px;
        background-color: rgba(69, 00, 69, 0.5);
        border-radius: 20px;
        padding: 20px;
        backdrop-filter: blur(16px);
    }
</style>
