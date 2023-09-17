<template>
    <div class="enum-select-buttons">
        <label>{{ label }}</label>
        <div class="select-items">
            <div
                class="select-item"
                :class="{
                    selected: modelValue === item,
                }"
                v-for="item in selectValues"
                :key="item"
                @click="modelValue = item"
            >
                {{ item }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { defineProps } from "vue";

    interface Props {
        label?: string;
        selectValues: Array<string>;
    }

    const modelValue = defineModel<string>();

    defineProps<Props>();
</script>

<style scoped lang="scss">
    @import "@/sass/includes";
    .enum-select-buttons {
        width: 100%;

        display: flex;
        flex-direction: column;

        color: white;

        .select-items {
            display: flex;
            flex-direction: row;
            gap: 10px;

            .select-item {
                height: 30px;

                padding-inline: 20px;
                border-radius: 6px;

                display: flex;
                align-items: center;
                justify-content: center;

                background-color: $buttonPrimaryColor;

                cursor: pointer;
                user-select: none;

                text-transform: capitalize;
                font-size: 0.875rem;

                &:hover {
                    background-color: $buttonPrimaryColorHover;
                }

                &:active {
                    background-color: $buttonPrimaryColorActive;
                }

                &.selected {
                    background-color: $buttonPrimaryColorActive;
                }
            }
        }
    }
</style>
