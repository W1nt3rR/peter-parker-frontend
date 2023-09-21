<template>
    <div class="input-component">
        <label>{{ label }}</label>
        <input
            :type="type"
            v-model="modelValue"
            :placeholder="placeholder"
            :disabled="disabled"
            v-maska
            :data-maska="maska"
        />
    </div>
</template>

<script setup lang="ts">
    import { vMaska } from "maska";
    import { EInputTypes } from "./InputDefinitions";

    // Interfaces
    interface Props {
        label?: string;
        placeholder?: string;
        disabled?: boolean;
        type?: EInputTypes;
        maska?: string;
    }

    // Model
    const modelValue = defineModel<string>();

    // Props
    withDefaults(defineProps<Props>(), {
        type: EInputTypes.TEXT,
    });
</script>

<style scoped lang="scss">
    @import "@/sass/includes";

    .input-component {
        width: 100%;

        :has(input[disabled]) {
            opacity: 0.5;
            pointer-events: none;
        }

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
