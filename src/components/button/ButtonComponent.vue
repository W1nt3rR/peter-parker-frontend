<template>
    <div
        class="button-component"
        :class="type"
    >
        <button @click="executeCallback">{{ label }}</button>
    </div>
</template>

<script setup lang="ts">
    import { EButtonType } from "./ButtonDefinitions";

    interface Props {
        label: string;
        callback: Function;
        type?: EButtonType;
    }

    const props = withDefaults(defineProps<Props>(), {
        type: EButtonType.PRIMARY,
    });

    function executeCallback() {
        props.callback();
    }
</script>

<style scoped lang="scss">
    @import "@/sass/includes";

    .button-component {
        button {
            height: 40px;

            padding: 0 20px;

            border-radius: 10px;
            color: white;

            border: 0;

            transition: all 0.1s ease-in-out;

            cursor: pointer;
        }

        @mixin button-color($color, $hover, $active) {
            button {
                background-color: $color;

                &:hover {
                    background-color: $hover;
                }

                &:active {
                    background-color: $active;
                }
            }
        }

        &.primary {
            @include button-color($buttonPrimaryColor, $buttonPrimaryColorHover, $buttonPrimaryColorActive);
        }
        &.danger {
            @include button-color($buttonDangerColor, $buttonDangerColorHover, $buttonDangerColorActive);
        }
        &.secondary {
            @include button-color($buttonSecondaryColor, $buttonSecondaryColorHover, $buttonSecondaryColorActive);
        }
    }
</style>
