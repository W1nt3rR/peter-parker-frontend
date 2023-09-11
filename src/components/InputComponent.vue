<template>
    <div class="input-component">
        <label>{{ label }}</label>
        <input
            type="text"
            v-model="modelValue"
            :placeholder="placeholder"
        />
    </div>
</template>

<script setup lang="ts">
    // Interfaces
    interface Props {
        label: string;
        placeholder?: string;
    }

    // Model
    const modelValue = defineModel<string>();

    // Props
    defineProps<Props>();
</script>

<style scoped lang="scss">
    @import "@/sass/includes";

    .input-component {
        width: 100%;

        label {
            color: white;
        }

        input {
            width: 100%;
            height: 40px;

            outline: 0;
            border: 0;
            border-radius: 10px;

            padding: 0 10px;

            color: white;
            background-color: $inputBackgroundColor;

            &:hover {
                background-color: $inputBackgroundColorHover;
            }

            &:focus {
                background-color: $inputBackgroundColorFocus;
            }
        }
    }
</style>
