<template>
    <div id="form-layout">
        <slot></slot>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
    @import "@/sass/includes";

    #form-layout {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw;
        background-color: $secondaryColor;
    }
</style>
