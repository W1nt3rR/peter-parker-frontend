<template>
    <div class="input-component">
        <label>{{ label }}</label>
        <input
            type="text"
            v-model="inputText"
            :placeholder="placeholder"
            @input="emitText"
        />
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";

    // Interfaces
    interface Props {
        modelValue: string;
        label: string;
        placeholder?: string;
    }

    // Props
    const props = defineProps<Props>();

    // Emits
    const emit = defineEmits<{
        update: [value: string];
    }>();

    // Data
    const inputText = ref<string>("");

    // Functions
    function emitText() {
        emit("update", inputText.value);
    }
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
