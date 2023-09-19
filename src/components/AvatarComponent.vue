<template>
    <div
        id="avatar"
        v-on-click-outside="closeDropdown"
    >
        <div
            class="avatar"
            @click="toggleDropdown"
        >
            <img
                src="https://picsum.photos/200"
                alt="avatar"
            />
        </div>
        <Transition>
            <div
                v-if="dropdownActive"
                class="dropdown"
            >
                <div
                    class="dropdown-item"
                    @click="dialogStore.openSettingsDialog"
                >
                    Settings
                </div>
                <div
                    class="dropdown-item"
                    @click="logout"
                >
                    Logout
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import useDialogStore from "@/stores/dialogStore";

    // Directives
    import vOnClickOutside from "@/directives/vOnClickOutside";
    import ppCLient from "@/ppClient";

    const dialogStore = useDialogStore();

    // Data
    const dropdownActive = ref(false);

    // Functions
    function toggleDropdown() {
        dropdownActive.value = !dropdownActive.value;
    }

    function closeDropdown() {
        dropdownActive.value = false;
    }

    function logout() {
        ppCLient.authAPI.logout();
    }
</script>

<style scoped lang="scss">
    #avatar {
        position: relative;
        height: 100%;

        .avatar {
            height: 100%;
            aspect-ratio: 1;

            border: 1px solid #333;
            border-radius: 50%;

            cursor: pointer;

            img {
                width: 100%;
                height: 100%;

                border-radius: 50%;

                object-fit: cover;
            }
        }

        .dropdown {
            position: absolute;
            top: 4rem;
            right: 0;

            overflow: hidden;

            border-radius: 10px;

            width: 10rem;

            background-color: #333;
            color: #fff;

            display: flex;
            flex-direction: column;
            justify-content: space-between;

            transition: all 0.1s ease-in-out;

            z-index: 1000;

            .dropdown-item {
                padding: 0.75rem;
                height: 3rem;

                display: flex;
                align-items: center;

                cursor: pointer;

                &:hover {
                    background-color: #444;
                }
            }
        }

        .v-enter-from {
            transform: translateY(-10px);
        }
        .v-leave-to {
            transform: translateY(-10px);
        }
    }
</style>
