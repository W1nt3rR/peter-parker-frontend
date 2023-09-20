<template>
    <div
        class="button-component"
        :class="type"
    >
        <button @click="executeCallback">
            <Transition>
                <div
                    class="loader-container"
                    v-if="loading"
                >
                    <Loader />
                </div>
            </Transition>
            <div class="text">
                {{ label }}
            </div>
        </button>
    </div>
</template>

<script setup lang="ts">
    import { EButtonType } from "./ButtonDefinitions";

    // Components
    import Loader from "../LoaderComponent.vue";

    interface Props {
        label: string;
        callback: Function;
        type?: EButtonType;
        loading?: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        type: EButtonType.PRIMARY,
    });

    async function executeCallback() {
        await props.callback();
    }
</script>

<style scoped lang="scss">
    @import "@/sass/includes";

    .button-component {
        flex-shrink: 0;

        button {
            display: flex;
            align-items: center;

            gap: 10px;

            height: 40px;

            padding: 0 20px;

            border-radius: 10px;
            color: white;
            backdrop-filter: blur(16px);

            border: 0;

            transition: all 0.1s ease-in-out;

            cursor: pointer;

            .loader-container {
                width: 16px;
                height: 16px;
            }
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
